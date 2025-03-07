"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import {
  Heart,
  Brain,
  Stethoscope,
  Dna,
  ChevronRight,
  Users,
  Clock,
  CheckCircle,
  Shield,
  LineChart,
  RefreshCw,
  DivideCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import BgDecoration from "./svg/BgDecoration";
import FamilyTree from "./svg/FamilyTree";
import { useRouter } from "next/navigation";
import { useIntersectionObserver } from "@/lib/hooks/useIntersectionObserver";

const integrations = [
  "athenahealth-logo.png",
  "cerner-logo.png",
  "darena-logo.png",
  "epic-logo.png",
  "meldrx-logo.png",
  "smarthealthit-logo.png",
];

const AboutSection = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);

  const Router = useRouter();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");

      // Animate statistics
      const duration = 2000; // ms
      const interval1 = setInterval(() => {
        setCount1((prev) => {
          const newValue = Math.min(prev + 1, 40);
          if (newValue === 40) clearInterval(interval1);
          return newValue;
        });
      }, duration / 40);

      const interval2 = setInterval(() => {
        setCount2((prev) => {
          const newValue = Math.min(prev + 3, 650);
          if (newValue === 650) clearInterval(interval2);
          return newValue;
        });
      }, duration / (650 / 3));

      const interval3 = setInterval(() => {
        setCount3((prev) => {
          const newValue = Math.min(prev + 1, 87);
          if (newValue === 87) clearInterval(interval3);
          return newValue;
        });
      }, duration / 87);

      return () => {
        clearInterval(interval1);
        clearInterval(interval2);
        clearInterval(interval3);
      };
    }
  }, [isInView, controls]);

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.5,
      },
    }),
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const conditions = [
    {
      name: "Heart Disease",
      icon: <Heart className="h-6 w-6 text-red-500" />,
      description:
        "Identify genetic markers related to cardiovascular conditions for early prevention.",
    },
    {
      name: "Neurological Disorders",
      icon: <Brain className="h-6 w-6 text-purple-500" />,
      description:
        "Screen for genetic factors associated with various neurological conditions.",
    },
    {
      name: "Respiratory Issues",
      icon: <Stethoscope className="h-6 w-6 text-blue-500" />,
      description:
        "Detect hereditary risks for asthma, COPD, and other respiratory conditions.",
    },
    {
      name: "Cancer Predisposition",
      icon: <Dna className="h-6 w-6 text-green-500" />,
      description:
        "Screen for genetic markers associated with increased cancer risk.",
    },
  ];

  const processSteps = [
    {
      icon: <Dna className="h-6 w-6 text-green-600" />,
      title: "Submit DNA Sample",
      description:
        "Provide a simple saliva sample with our easy-to-use home collection kit.",
    },
    {
      icon: <LineChart className="h-6 w-6 text-green-600" />,
      title: "Advanced Analysis",
      description:
        "Our lab analyzes your sample for over 650 genetic markers related to hereditary conditions.",
    },
    {
      icon: <Shield className="h-6 w-6 text-green-600" />,
      title: "Receive Insights",
      description:
        "Get a comprehensive report of your genetic predispositions and risk factors.",
    },
    {
      icon: <RefreshCw className="h-6 w-6 text-green-600" />,
      title: "Ongoing Monitoring",
      description:
        "Regular updates as new research emerges about your specific genetic markers.",
    },
  ];

  const integrationsRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  useIntersectionObserver(integrationsRef, (entries) => {
    entries.forEach((entry) => {
      setIsPaused(!entry.isIntersecting);
    });
  });

  return (
    <section
      id="about"
      ref={ref}
      className="relative overflow-hidden bg-green-50 py-24"
    >
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <BgDecoration />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={controls}
            variants={{
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
            className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl"
          >
            About <span className="text-green-600">HerediCheck</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={controls}
            variants={{
              visible: {
                opacity: 1,
                transition: { duration: 0.5, delay: 0.2 },
              },
            }}
            className="text-lg text-gray-600"
          >
            Using advanced genetic analysis and AI-powered predictions to help
            you understand and manage hereditary health risks.
          </motion.p>
        </div>

        {/* Statistics Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
          }}
          className="mb-16 flex flex-wrap justify-center gap-8 md:gap-12"
        >
          <div className="flex flex-col items-center">
            <div className="mb-2 text-4xl font-bold text-green-600">
              {count1}%
            </div>
            <p className="text-center text-sm text-gray-600">
              of health conditions <br />
              have genetic components
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="mb-2 text-4xl font-bold text-green-600">
              {count2}+
            </div>
            <p className="text-center text-sm text-gray-600">
              genetic conditions <br />
              can be identified
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="mb-2 text-4xl font-bold text-green-600">
              {count3}%
            </div>
            <p className="text-center text-sm text-gray-600">
              improvement in outcomes <br />
              with early detection
            </p>
          </div>
        </motion.div>

        <div className="mb-16 grid gap-8 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={controls}
            variants={{
              visible: {
                opacity: 1,
                x: 0,
                transition: { duration: 0.6, delay: 0.2 },
              },
            }}
          >
            <h3 className="mb-4 text-2xl font-bold text-gray-900">
              How We Can Help
            </h3>
            <p className="mb-6 text-gray-600">
              HerediCheck provides comprehensive genetic analysis to identify
              potential hereditary risks, allowing for early intervention and
              preventive care. Our platform combines advanced algorithms with
              expert medical guidance.
            </p>

            <ul className="space-y-3">
              {[
                "Early detection of hereditary conditions",
                "Personalized prevention strategies",
                "Family health mapping",
                "Ongoing monitoring and alerts",
                "Connection to specialized care providers",
              ].map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={controls}
                  variants={{
                    visible: {
                      opacity: 1,
                      x: 0,
                      transition: { duration: 0.3, delay: 0.3 + i * 0.1 },
                    },
                  }}
                  className="flex items-start gap-2"
                >
                  <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={controls}
            variants={{
              visible: {
                opacity: 1,
                scale: 1,
                transition: { duration: 0.5, delay: 0.4 },
              },
            }}
            className="relative rounded-xl bg-white p-1 shadow-lg"
          >
            <div className="aspect-video overflow-hidden rounded-lg bg-green-100">
              {/* Interactive Family Tree Visualization */}
              <FamilyTree />
            </div>

            <div className="absolute -right-4 -top-4 rounded-full bg-white p-2 shadow-md">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                <Users className="h-5 w-5 text-green-600" />
              </div>
            </div>

            <div className="mt-4 p-4">
              <h4 className="text-lg font-semibold text-gray-900">
                Family Health Mapping
              </h4>
              <p className="text-sm text-gray-600">
                Track hereditary conditions across generations to identify
                patterns and risks for proactive health management.
              </p>
            </div>
          </motion.div>
        </div>

        <motion.h3
          initial={{ opacity: 0, y: -20 }}
          animate={controls}
          variants={titleVariants}
          className="mb-8 text-center text-2xl font-bold text-gray-900"
        >
          Conditions We Screen For
        </motion.h3>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {conditions.map((condition, i) => (
            <motion.div
              key={condition.name}
              custom={i}
              initial="hidden"
              animate={controls}
              variants={cardVariants}
            >
              <Card className="h-full transition-all duration-300 hover:shadow-md">
                <CardContent className="flex h-full flex-col p-6">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                    {condition.icon}
                  </div>
                  <h4 className="mb-2 text-lg font-semibold">
                    {condition.name}
                  </h4>
                  <p className="mt-auto text-sm text-gray-600">
                    {condition.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Process Section */}
        <div className="mt-16 rounded-xl bg-gradient-to-r from-green-600 to-emerald-500 p-8 text-white shadow-lg">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <h3 className="mb-4 text-2xl font-bold">
                Our Process is Simple and Effective
              </h3>
              <p className="mb-6 text-green-50">
                From sample collection to personalized insights, we've
                streamlined the process to make genetic screening accessible and
                actionable.
              </p>
              <Button
                onClick={() => Router.push("/assessment")}
                className="bg-white text-green-600 hover:bg-green-50"
              >
                Start Your Assessment
              </Button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 ">
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={controls}
                  variants={{
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.5, delay: 0.2 + index * 0.1 },
                    },
                  }}
                  className="rounded-lg bg-white/10 p-4 backdrop-blur-sm"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-white">
                    {step.icon}
                  </div>
                  <h4 className="mb-1 font-semibold">{step.title}</h4>
                  <p className="text-sm text-green-50">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Partner Logos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.5 },
            },
          }}
          className="my-24"
        >
          <motion.h3
            initial={{ opacity: 0, y: -20 }}
            animate={controls}
            variants={titleVariants}
            className="mb-6 text-center text-2xl font-bold text-gray-900"
          >
            Integrated with Leading Health Providers
          </motion.h3>

          <div
            ref={integrationsRef}
            className="relative w-full overflow-hidden"
          >
            <div
              className={`flex w-[200%] ${
                isPaused ? "animate-none" : "animate-horizontal-scroll"
              }`}
            >
              {/* First set of logos */}
              <div className="flex w-1/2 justify-around">
                {integrations.map((logo, i) => (
                  <motion.div
                    key={`first-${i}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={controls}
                    variants={{
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.5, delay: i * 0.1 },
                      },
                    }}
                    className="flex h-16 w-32 shrink-0 items-center justify-center opacity-70 hover:opacity-100 transition-opacity"
                  >
                    <div className="relative h-16 w-40">
                      <Image
                        src={`/images/${logo}`}
                        alt={`${logo.replace("-logo.png", "")} logo`}
                        fill
                        sizes="(max-width: 160px) 100vw, 160px"
                        className="object-contain"
                        priority
                      />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Second set of logos (duplicate) */}
              <div className="flex w-1/2 justify-around">
                {integrations.map((logo, i) => (
                  <motion.div
                    key={`second-${i}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={controls}
                    variants={{
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.5, delay: i * 0.1 },
                      },
                    }}
                    className="flex h-16 w-32 shrink-0 items-center justify-center opacity-70 hover:opacity-100 transition-opacity"
                  >
                    <div className="relative h-8 w-24">
                      <Image
                        src={`/images/${logo}`}
                        alt={`${logo.replace("-logo.png", "")} logo`}
                        fill
                        sizes="(max-width: 96px) 100vw, 96px"
                        className="object-contain"
                        priority
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
