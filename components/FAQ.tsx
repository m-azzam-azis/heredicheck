"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQSection() {
  const faqs = [
    {
      question: "How does HerediCheck's genetic testing work?",
      answer:
        "HerediCheck uses advanced DNA sequencing technology to analyze specific genetic markers associated with hereditary conditions. After receiving your saliva sample, our CLIA-certified lab extracts the DNA and screens for over 650 genetic variants linked to hereditary conditions. Our AI-powered system then analyzes your genetic profile against research databases to identify potential risks and provide personalized insights.",
    },
    {
      question: "Is my genetic data secure and private?",
      answer:
        "Absolutely. Security and privacy are our top priorities. Your genetic data is protected with bank-level encryption and we adhere to HIPAA compliance standards. We never sell or share your data with third parties without your explicit consent. You maintain full ownership of your genetic information, with options to delete your data at any time.",
    },
    {
      question: "How accurate are the hereditary risk assessments?",
      answer:
        "HerediCheck achieves >90% accuracy in detecting genetic variants. However, it's important to understand that genetic risk is just one factor in developing a condition. Our reports clearly explain what your genetic markers mean in context, including environmental and lifestyle factors. We recommend discussing your results with healthcare providers for a comprehensive understanding.",
    },
    {
      question: "Can HerediCheck replace medical diagnosis?",
      answer:
        "No, HerediCheck is not a diagnostic tool and doesn't replace professional medical advice, diagnosis, or treatment. Our service provides insights into genetic predispositions and risk factors that you can discuss with healthcare providers. Always consult with qualified medical professionals for diagnosis and treatment decisions.",
    },
    {
      question: "Can I test my children or family members?",
      answer:
        "Yes, we offer family testing options. For children under 18, a parent or legal guardian must provide consent. Family package discounts are available, and our family mapping feature helps visualize hereditary patterns across generations. For specific situations, we recommend consulting with a genetic counselor, which we can help arrange.",
    },
    {
      question: "What happens after I receive my results?",
      answer:
        "After receiving your results, you can access your comprehensive report through our secure portal. You'll have the option to schedule a consultation with a genetic counselor to discuss your findings. Our platform also provides personalized recommendations based on your genetic profile, regular updates as new research emerges, and optional connections to specialists if needed.",
    },
    {
      question: "Is genetic counseling included with my test?",
      answer:
        "Basic result interpretation guidance is included with every test. For in-depth counseling, we offer optional sessions with certified genetic counselors for an additional fee. These professionals can help you understand your results, their implications for you and your family, and develop appropriate action plans.",
    },
  ];

  return (
    <section id="faq" className="bg-white py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-12 max-w-2xl text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600">
            Everything you need to know about HerediCheck's genetic testing and
            hereditary risk assessment.
          </p>
        </motion.div>

        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <AccordionItem value={`item-${index}`}>
                  <AccordionTrigger className="text-left text-lg font-medium">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mx-auto mt-12 max-w-2xl text-center"
        >
          <p className="mb-6 text-gray-700">
            Still have questions? Our support team is here to help.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="mailto:m.azzam.azis@gmail.com"
              className="inline-flex items-center justify-center rounded-md border border-green-600 px-6 py-2 text-sm font-medium text-green-600 hover:bg-green-50"
            >
              Contact Support
            </a>
            <a
              href="https://github.com/m-azzam-azis/heredicheck"
              target="_blank"
              className="inline-flex items-center justify-center rounded-md bg-green-100 px-6 py-2 text-sm font-medium text-green-700 hover:bg-green-200"
            >
              View Resources
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
