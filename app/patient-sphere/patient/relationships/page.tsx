"use client";

import React, { useState, useEffect, useContext } from "react";
import * as r4 from "fhir/r4";
import { Container, LoadingOverlay, Title, Text } from "@mantine/core";
import Head from "next/head";
import { AppContext } from "@/lib/hooks/AppContext/AppContext";
import PatientHeader from "@/lib/components/fhir/PatientHeader";
import RelatedPersonView from "@/lib/components/fhir/RelatedPersonView";

export interface IPageProps {}
export default function Page(props: IPageProps) {
  const appContext = useContext(AppContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [patient, setPatient] = useState<r4.Patient | undefined>(undefined);
  const [relatedPersons, setRelatedPersons] = useState<r4.RelatedPerson[]>([]);

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

        // Get related persons
        const relatedPersonsResponse = await appContext.fhirClient.request(
          `RelatedPerson?patient=${patientId}`,
          { flat: true }
        );
        setRelatedPersons(relatedPersonsResponse || []);

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
        <title>Patient Relations</title>
      </Head>
      <LoadingOverlay visible={isLoading} />

      <div className="space-y-6">
        <Title>Patient Relations</Title>
        <PatientHeader patient={patient} />

        <div className="mt-8">
          {relatedPersons.length > 0 ? (
            <div className="space-y-4">
              {relatedPersons.map((person, index) => (
                <RelatedPersonView
                  key={person.id || index}
                  relatedPerson={person}
                />
              ))}
            </div>
          ) : (
            <Text color="dimmed" className="text-center py-8">
              No related persons found for this patient.
            </Text>
          )}
        </div>
      </div>
    </Container>
  );
}
