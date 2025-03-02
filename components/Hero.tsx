"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CheckCircle, Activity, Shield } from "lucide-react";
import Dna from "./svg/Dna";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* Decorative background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -right-10 -top-20 h-72 w-72 rounded-full bg-green-100/60 blur-3xl" />
        <div className="absolute left-0 top-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-green-200/40 blur-3xl" />
        <div className="absolute bottom-0 right-1/3 h-64 w-64 rounded-full bg-green-50/80 blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-4 py-20 md:py-32">
        <div className="grid gap-12 md:grid-cols-2 md:items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-start"
          >
            <h1 className="mb-6 max-w-xl text-4xl font-bold tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
              Predict and Prevent{" "}
              <span className="text-green-600">Hereditary Conditions</span>
            </h1>
            <p className="mb-8 max-w-lg text-lg text-gray-600">
              Use advanced genetic analysis to understand your hereditary risks
              and take proactive steps towards a healthier future for you and
              your family.
            </p>

            <div className="mb-8 grid gap-4 sm:grid-cols-3">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-sm text-gray-700">99.8% Accurate</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-600" />
                <span className="text-sm text-gray-700">HIPAA Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-green-600" />
                <span className="text-sm text-gray-700">Personalised Data</span>
              </div>
            </div>

            <div className="flex  gap-4">
              <Button
                size="lg"
                className="bg-green-600 text-white hover:bg-green-700"
              >
                Start Free Assessment
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-green-600 text-green-600 hover:bg-green-50"
              >
                Talk to an Expert
              </Button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative mx-auto max-w-lg md:mx-0"
          >
            <div className="relative overflow-hidden rounded-xl border bg-white shadow-xl">
              {/* DNA Double Helix Illustration */}
              <div className="size-[350px] grid place-items-center">
                <Dna />
              </div>

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white p-6 pt-24">
                <div className="rounded-lg bg-green-50 p-4">
                  <h3 className="text-lg font-semibold text-green-800">
                    Your Genetic Profile
                  </h3>
                  <p className="mt-1 text-sm text-green-700">
                    Understand your unique genetic makeup and take control of
                    your health journey.
                  </p>
                </div>
              </div>
            </div>

            {/* Floating badges */}
            <div className="absolute -left-8 top-1/4 rounded-full bg-white p-3 shadow-lg">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <svg
                  className="h-6 w-6 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
            </div>
            <div className="absolute -right-8 top-2/3 rounded-full bg-white p-3 shadow-lg">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <svg
                  className="h-6 w-6 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                  />
                </svg>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
