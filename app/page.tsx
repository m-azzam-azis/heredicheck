"use client";
import { useCallback } from "react";
import Head from "next/head";
import styles from "@/app/styles/Home.module.css";
import FHIR from "fhirclient";
import { launchOptions } from "@/config/config";
import IMeldRxLaunchData from "@/config/IMeldRxLaunchData";
import AboutSection from "@/components/About";
import { FAQSection } from "@/components/FAQ";
import HeroSection from "@/components/Hero";

export default function Page() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <FAQSection />
    </>
  );
}
