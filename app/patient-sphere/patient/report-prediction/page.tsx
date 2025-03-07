"use client";

import React, { useState, useEffect, useContext } from "react";
import { Container, LoadingOverlay, Title, Text, Paper } from "@mantine/core";
import { motion } from "framer-motion";
import { IconChartBar, IconAlertCircle } from "@tabler/icons-react";
import { AppContext } from "@/lib/hooks/AppContext/AppContext";
import PatientHeader from "@/lib/components/fhir/PatientHeader";

interface PredictionPayload {
  patients: Array<{
    id: string;
    patient_condition: string;
    patient_immunization: string;
    patient_allergy: string;
  }>;
  relationships: Array<{
    id_patient: string;
    related_patient: string;
    type: string;
  }>;
}

interface PredictionResponse {
  probabilities: {
    [patientId: string]: {
      [condition: string]: number;
    };
  };
}

interface RawDataState {
  conditions: any;
  immunizations: any;
  allergies: any;
  familyHistories: any;
  predictionResponse: PredictionResponse | null;
}

export default function PredictionReport() {
  const appContext = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const [prediction, setPrediction] = useState<PredictionResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [rawData, setRawData] = useState<RawDataState>({
    conditions: null,
    immunizations: null,
    allergies: null,
    familyHistories: null,
    predictionResponse: null,
  });

  const deduplicateAndJoin = (items: any[], path: string) => {
    const uniqueItems = new Set(
      items
        ?.map((item: any) => {
          const parts = path.split(".");
          return parts.reduce((obj, key) => obj?.[key], item) || "";
        })
        .filter(Boolean)
    );
    return Array.from(uniqueItems).join(" ");
  };

  const groupFamilyHistories = (histories: any[]) => {
    const grouped: { [key: string]: Set<string> } = {
      Father: new Set(),
      Mother: new Set(),
      Sibling: new Set(),
    };

    histories?.forEach((history: any) => {
      const type = history.relationship?.coding?.[0]?.display || "Unknown";
      const baseType =
        type.includes("Sister") || type.includes("Brother") ? "Sibling" : type;

      history.condition?.forEach((condition: any) => {
        const conditionText =
          condition.code?.coding?.[0]?.display || condition.code?.text;
        if (conditionText && grouped[baseType]) {
          grouped[baseType].add(conditionText);
        }
      });
    });

    return grouped;
  };

  useEffect(() => {
    const fetchFhirDataAndPredict = async () => {
      if (!appContext.patientFhirId || !appContext.fhirClient) return;

      setIsLoading(true);
      setError(null);

      try {
        // Fetch and deduplicate conditions
        const conditions = await appContext.fhirClient.request(
          `Condition?patient=${appContext.patientFhirId}`,
          { flat: true }
        );
        const conditionsList = deduplicateAndJoin(
          conditions,
          "code.coding.0.display"
        );

        // Fetch and deduplicate immunizations
        const immunizations = await appContext.fhirClient.request(
          `Immunization?patient=${appContext.patientFhirId}`,
          { flat: true }
        );
        const immunizationsList = deduplicateAndJoin(
          immunizations,
          "vaccineCode.coding.0.display"
        );

        // Fetch allergies
        const allergies = await appContext.fhirClient.request(
          `AllergyIntolerance?patient=${appContext.patientFhirId}`,
          { flat: true }
        );
        const allergiesList = deduplicateAndJoin(
          allergies,
          "code.coding.0.display"
        );

        // Fetch and group family histories
        const familyHistories = await appContext.fhirClient.request(
          `FamilyMemberHistory?patient=${appContext.patientFhirId}`,
          { flat: true }
        );
        const groupedFamilyHistory = groupFamilyHistories(familyHistories);

        // Store raw data
        setRawData({
          conditions,
          immunizations,
          allergies,
          familyHistories,
          predictionResponse: null,
        });

        // Prepare payload
        const payload: PredictionPayload = {
          patients: [
            {
              id: appContext.patientFhirId,
              patient_condition: conditionsList || "None",
              patient_immunization: immunizationsList || "None",
              patient_allergy: allergiesList || "None",
            },
            ...Object.entries(groupedFamilyHistory)
              .filter(([_, conditions]) => conditions.size > 0)
              .map(([type, conditions]) => ({
                id: `${type.toLowerCase()}-${appContext.patientFhirId}`,
                patient_condition: Array.from(conditions).join(" "),
                patient_immunization: "None",
                patient_allergy: "None",
              })),
          ],
          relationships: Object.entries(groupedFamilyHistory)
            .filter(([_, conditions]) => conditions.size > 0)
            .map(([type, _]) => ({
              id_patient: `${type.toLowerCase()}-${appContext.patientFhirId}`,
              related_patient: appContext.patientFhirId,
              type,
            })),
        };

        console.log("Sending Payload:", JSON.stringify(payload, null, 2));

        // Send to prediction endpoint
        const response = await fetch(
          "https://api-heredicheck.up.railway.app/predict_proba",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to get prediction");
        }

        const result = await response.json();
        console.log("Prediction Response:", JSON.stringify(result, null, 2));
        setRawData((prev: RawDataState) => ({
          ...prev,
          predictionResponse: result,
        }));
        setPrediction(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        console.error("Error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFhirDataAndPredict();
  }, [appContext.patientFhirId, appContext.fhirClient]);

  const getRiskLevel = (
    probability: number
  ): { color: string; level: string } => {
    if (probability >= 0.7) return { color: "red", level: "High" };
    if (probability >= 0.4) return { color: "yellow", level: "Moderate" };
    return { color: "green", level: "Low" };
  };

  const renderPredictions = () => {
    if (!prediction?.probabilities || !appContext.patientFhirId) {
      return null;
    }

    const patientPredictions =
      prediction.probabilities[appContext.patientFhirId];
    if (!patientPredictions) {
      return null;
    }

    const container = {
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
        },
      },
    };

    const item = {
      hidden: { opacity: 0, x: -20 },
      show: { opacity: 1, x: 0 },
    };

    return (
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-6"
      >
        <div className="grid gap-4 md:grid-cols-2">
          {Object.entries(patientPredictions).map(
            ([condition, probability]) => (
              <motion.div key={condition} variants={item}>
                <Paper
                  p="md"
                  className="bg-white shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <Text weight={500} size="lg">
                        {condition}
                      </Text>
                      <div
                        className={`px-3 py-1 rounded-full text-sm font-medium
                      ${
                        getRiskLevel(probability).color === "red"
                          ? "bg-red-100 text-red-700"
                          : getRiskLevel(probability).color === "yellow"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                      }`}
                      >
                        {getRiskLevel(probability).level} Risk
                      </div>
                    </div>

                    <div className="relative pt-4">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${probability * 100}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className={`h-2 rounded-full ${
                          getRiskLevel(probability).color === "red"
                            ? "bg-red-500"
                            : getRiskLevel(probability).color === "yellow"
                            ? "bg-yellow-500"
                            : "bg-green-500"
                        }`}
                      />
                      <div className="absolute -right-2 top-0 transform -translate-y-full">
                        <Text size="sm" weight={500}></Text>
                      </div>
                    </div>
                  </div>
                </Paper>
              </motion.div>
            )
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Paper p="lg" className="bg-blue-50 border border-blue-200">
            <div className="flex items-start gap-3">
              <IconAlertCircle className="text-blue-500 mt-1" size={20} />
              <div>
                <Text weight={500} size="sm" className="text-blue-900">
                  Understanding Your Risk Factors
                </Text>
                <Text size="sm" color="dimmed">
                  These predictions are based on your health records and family
                  history. Consult with your healthcare provider to develop a
                  personalized prevention plan.
                </Text>
              </div>
            </div>
          </Paper>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <Container fluid>
      <LoadingOverlay visible={isLoading} />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="flex items-center gap-3">
          <IconChartBar size={24} className="text-blue-600" />
          <Title order={2}>Health Risk Prediction Report</Title>
        </div>

        {appContext.patient && <PatientHeader patient={appContext.patient} />}

        {error ? (
          <Paper p="md" className="bg-red-50 border border-red-200">
            <Text color="red">{error}</Text>
          </Paper>
        ) : prediction ? (
          renderPredictions()
        ) : (
          <div className="flex justify-center py-12">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="text-center"
            >
              <Text size="lg" color="dimmed">
                Analyzing your health data...
              </Text>
            </motion.div>
          </div>
        )}
      </motion.div>
    </Container>
  );
}
