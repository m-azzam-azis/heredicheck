"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { IconAlertCircle } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

const conditions = [
  "Diabetes",
  "Hypertension",
  "Cancer",
  "Heart Disease",
  "Alzheimer",
  "Asthma",
];

const formSchema = z.object({
  personalInfo: z.object({
    age: z.string().min(1, "Age is required"),
    gender: z.string().min(1, "Gender is required"),
  }),
  conditions: z.array(z.string()),
  familyHistory: z.object({
    father: z.array(z.string()),
    mother: z.array(z.string()),
    siblings: z.array(z.string()),
  }),
});

interface PredictionResponse {
  probabilities: {
    [patientId: string]: {
      [condition: string]: number;
    };
  };
}

export default function AssessmentPage() {
  const [step, setStep] = useState(1);
  const [results, setResults] = useState<PredictionResponse | null>(null);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      personalInfo: { age: "", gender: "" },
      conditions: [],
      familyHistory: {
        father: [],
        mother: [],
        siblings: [],
      },
    },
  });

  const getRiskLevel = (probability: number) => {
    if (probability >= 0.7)
      return { color: "destructive", level: "High", bgColor: "bg-red-100" };
    if (probability >= 0.4)
      return { color: "warning", level: "Moderate", bgColor: "bg-yellow-100" };
    return { color: "success", level: "Low", bgColor: "bg-green-100" };
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const payload = {
      patients: [
        {
          id: "self-assessment",
          patient_condition: values.conditions.join(" "),
          patient_immunization: "None",
          patient_allergy: "None",
        },
        {
          id: "father-self-assessment",
          patient_condition: values.familyHistory.father.join(" "),
          patient_immunization: "None",
          patient_allergy: "None",
        },
        {
          id: "mother-self-assessment",
          patient_condition: values.familyHistory.mother.join(" "),
          patient_immunization: "None",
          patient_allergy: "None",
        },
        {
          id: "sibling-self-assessment",
          patient_condition: values.familyHistory.siblings.join(" "),
          patient_immunization: "None",
          patient_allergy: "None",
        },
      ],
      relationships: [
        {
          id_patient: "father-self-assessment",
          related_patient: "self-assessment",
          type: "Father",
        },
        {
          id_patient: "mother-self-assessment",
          related_patient: "self-assessment",
          type: "Mother",
        },
        {
          id_patient: "sibling-self-assessment",
          related_patient: "self-assessment",
          type: "Sibling",
        },
      ],
    };

    try {
      const response = await fetch(
        "https://api-heredicheck.up.railway.app/predict_proba",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        const result = await response.json();
        setResults(result);
        setStep(4); // Move to results step
      }
    } catch (error) {
      console.error("Error submitting assessment:", error);
    }
  };

  const totalSteps = 3;

  const renderResults = () => {
    if (!results?.probabilities?.["self-assessment"]) return null;

    const predictions = results.probabilities["self-assessment"];

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-6 p-6"
      >
        <h3 className="text-xl font-semibold mb-4">
          Your Health Risk Assessment
        </h3>

        <div className="grid gap-4">
          {Object.entries(predictions).map(([condition, probability]) => {
            const risk = getRiskLevel(probability);
            return (
              <div
                key={condition}
                className="bg-white p-4 rounded-lg shadow-sm"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">{condition}</span>
                  <span
                    className={`px-2 py-1 rounded-full text-sm font-medium ${risk.bgColor}`}
                  >
                    {risk.level} Risk
                  </span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${probability * 100}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className={`h-full ${
                      risk.color === "destructive"
                        ? "bg-red-500"
                        : risk.color === "warning"
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    }`}
                  />
                </div>
                <div className="text-right mt-1">
                  <span className="text-sm text-gray-500">
                    {(probability * 100).toFixed(1)}% probability
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-blue-50 p-4 rounded-lg mt-6">
          <div className="flex gap-2">
            <IconAlertCircle className="text-blue-500 h-5 w-5" />
            <div className="flex-1">
              <h4 className="text-sm font-medium text-blue-900">Next Steps</h4>
              <p className="text-sm text-blue-700 mt-1">
                Consider discussing these results with a healthcare provider for
                personalized advice.
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <Button onClick={() => router.push("/")} variant="outline">
            Back to Home
          </Button>
        </div>
      </motion.div>
    );
  };

  const renderStep = () => {
    if (step === 4) {
      return renderResults();
    }

    switch (step) {
      case 1:
        return (
          <CardContent className="min-h-[400px] space-y-4">
            <FormField
              control={form.control}
              name="personalInfo.age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Age</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="personalInfo.gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        );

      case 2:
        return (
          <CardContent className="min-h-[400px] space-y-4">
            <FormField
              control={form.control}
              name="conditions"
              render={() => (
                <FormItem>
                  <FormLabel>Current Medical Conditions</FormLabel>
                  <div className="grid grid-cols-2 gap-4">
                    {conditions.map((condition) => (
                      <FormField
                        key={condition}
                        control={form.control}
                        name="conditions"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-2">
                            <Checkbox
                              checked={field.value?.includes(condition)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  field.onChange([...field.value, condition]);
                                } else {
                                  field.onChange(
                                    field.value?.filter(
                                      (value) => value !== condition
                                    )
                                  );
                                }
                              }}
                            />
                            <FormLabel className="font-normal">
                              {condition}
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                </FormItem>
              )}
            />
          </CardContent>
        );

      case 3:
        return (
          <CardContent className="min-h-[400px] space-y-6">
            <div>
              <h3 className="font-semibold mb-4">Father's Health History</h3>
              <FormField
                control={form.control}
                name="familyHistory.father"
                render={() => (
                  <FormItem>
                    <div className="grid grid-cols-2 gap-4">
                      {conditions.map((condition) => (
                        <FormField
                          key={`father-${condition}`}
                          control={form.control}
                          name="familyHistory.father"
                          render={({ field }) => (
                            <FormItem className="flex items-center space-x-2">
                              <Checkbox
                                checked={field.value?.includes(condition)}
                                onCheckedChange={(checked) => {
                                  const newValue = checked
                                    ? [...field.value, condition]
                                    : field.value?.filter(
                                        (value) => value !== condition
                                      );
                                  field.onChange(newValue);
                                }}
                              />
                              <FormLabel className="font-normal">
                                {condition}
                              </FormLabel>
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                  </FormItem>
                )}
              />
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold mb-4">Mother's Health History</h3>
              <FormField
                control={form.control}
                name="familyHistory.mother"
                render={() => (
                  <FormItem>
                    <div className="grid grid-cols-2 gap-4">
                      {conditions.map((condition) => (
                        <FormField
                          key={`mother-${condition}`}
                          control={form.control}
                          name="familyHistory.mother"
                          render={({ field }) => (
                            <FormItem className="flex items-center space-x-2">
                              <Checkbox
                                checked={field.value?.includes(condition)}
                                onCheckedChange={(checked) => {
                                  const newValue = checked
                                    ? [...field.value, condition]
                                    : field.value?.filter(
                                        (value) => value !== condition
                                      );
                                  field.onChange(newValue);
                                }}
                              />
                              <FormLabel className="font-normal">
                                {condition}
                              </FormLabel>
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                  </FormItem>
                )}
              />
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold mb-4">Siblings' Health History</h3>
              <FormField
                control={form.control}
                name="familyHistory.siblings"
                render={() => (
                  <FormItem>
                    <div className="grid grid-cols-2 gap-4">
                      {conditions.map((condition) => (
                        <FormField
                          key={`sibling-${condition}`}
                          control={form.control}
                          name="familyHistory.siblings"
                          render={({ field }) => (
                            <FormItem className="flex items-center space-x-2">
                              <Checkbox
                                checked={field.value?.includes(condition)}
                                onCheckedChange={(checked) => {
                                  const newValue = checked
                                    ? [...field.value, condition]
                                    : field.value?.filter(
                                        (value) => value !== condition
                                      );
                                  field.onChange(newValue);
                                }}
                              />
                              <FormLabel className="font-normal">
                                {condition}
                              </FormLabel>
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        );
    }
  };

  const handleNextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    // Only process submission if it's the final step and submit button is clicked
    if (step === totalSteps) {
      const payload = {
        patients: [
          {
            id: "self-assessment",
            patient_condition: values.conditions.join(" "),
            patient_immunization: "None",
            patient_allergy: "None",
          },
          {
            id: "father-self-assessment",
            patient_condition: values.familyHistory.father.join(" "),
            patient_immunization: "None",
            patient_allergy: "None",
          },
          {
            id: "mother-self-assessment",
            patient_condition: values.familyHistory.mother.join(" "),
            patient_immunization: "None",
            patient_allergy: "None",
          },
          {
            id: "sibling-self-assessment",
            patient_condition: values.familyHistory.siblings.join(" "),
            patient_immunization: "None",
            patient_allergy: "None",
          },
        ],
        relationships: [
          {
            id_patient: "father-self-assessment",
            related_patient: "self-assessment",
            type: "Father",
          },
          {
            id_patient: "mother-self-assessment",
            related_patient: "self-assessment",
            type: "Mother",
          },
          {
            id_patient: "sibling-self-assessment",
            related_patient: "self-assessment",
            type: "Sibling",
          },
        ],
      };

      try {
        const response = await fetch(
          "https://api-heredicheck.up.railway.app/predict_proba",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          }
        );

        if (response.ok) {
          const result = await response.json();
          setResults(result);
          setStep(4);
        }
      } catch (error) {
        console.error("Error submitting assessment:", error);
      }
    }
  };

  return (
    <div className="container mx-auto py-10 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto"
      >
        <Card className="min-h-[600px] flex flex-col">
          <CardHeader>
            <CardTitle>Health Assessment Form</CardTitle>
            <CardDescription>
              {step === 4
                ? "Assessment Results"
                : `Step ${step} of ${totalSteps}: ${
                    step === 1
                      ? "Personal Information"
                      : step === 2
                      ? "Medical Conditions"
                      : "Family History"
                  }`}
            </CardDescription>
          </CardHeader>

          <Form {...form}>
            <form className="flex flex-col flex-1">
              <div className="flex-1">{renderStep()}</div>

              {step !== 4 && (
                <div className="flex justify-between p-6 mt-auto border-t">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(step - 1)}
                    disabled={step === 1}
                  >
                    Previous
                  </Button>
                  <Button
                    type="button"
                    onClick={() => {
                      if (step === totalSteps) {
                        form.handleSubmit(handleSubmit)();
                      } else {
                        handleNextStep();
                      }
                    }}
                  >
                    {step === totalSteps ? "Submit" : "Next"}
                  </Button>
                </div>
              )}
            </form>
          </Form>
        </Card>
      </motion.div>
    </div>
  );
}
