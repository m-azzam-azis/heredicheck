"use client";

import React, { useState, useEffect, useContext } from "react";
import * as r4 from "fhir/r4";
import { Container, LoadingOverlay, Title, Text } from "@mantine/core";
import Head from "next/head";
import { AppContext } from "@/lib/hooks/AppContext/AppContext";
import PatientHeader from "@/lib/components/fhir/PatientHeader";
import FamilyMemberHistoryView from "@/lib/components/fhir/FamilyMemberHistoryView";

export interface IPageProps {}
export default function Page(props: IPageProps) {
  const appContext = useContext(AppContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [patient, setPatient] = useState<r4.Patient | undefined>(undefined);
  const [familyHistory, setFamilyHistory] = useState<r4.FamilyMemberHistory[]>(
    []
  );

  useEffect(() => {
    const load = async () => {
      if (!appContext.accessToken || !appContext.fhirClient) {
        return;
      }

      setIsLoading(true);
      try {
        // Get the patient
        const patientId = appContext.patientFhirId;
        const patients = await appContext.fhirClient.request(
          `Patient?_id=${patientId}`,
          { flat: true }
        );
        const patient = patients[0] ?? null;
        setPatient(patient);

        // Get family history
        const familyHistoryResponse = await appContext.fhirClient.request(
          `FamilyMemberHistory?patient=${patientId}`,
          { flat: true }
        );
        setFamilyHistory(familyHistoryResponse || []);

        // Update app context
        if (patient !== null && appContext.patient === null) {
          appContext.setPatient(patient);
        }

        if (appContext.fhirUser !== null && appContext.user === null) {
          try {
            const user = await appContext.fhirClient.request(
              appContext.fhirUser
            );
            appContext.setUser(user);
          } catch (e: any) {}
        }
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, [appContext]);

  return (
    <Container fluid={true}>
      <Head>
        <title>Family Health History</title>
      </Head>
      <LoadingOverlay visible={isLoading} />
      <Title>Family Health History</Title>

      <div className="space-y-6">
        <div className="flex items-center gap-4"></div>

        <div className="mt-8">
          {familyHistory.length > 0 ? (
            <FamilyMemberHistoryView familyHistories={familyHistory} />
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <Text color="dimmed">
                No family health history found for this patient.
              </Text>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
}
