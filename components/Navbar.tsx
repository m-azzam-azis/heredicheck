"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { useCallback } from "react";
import FHIR from "fhirclient";
import { launchOptions } from "@/config/config";
import IMeldRxLaunchData from "@/config/IMeldRxLaunchData";
import { Menu } from "lucide-react";
import { motion } from "framer-motion";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const onLaunchClick = useCallback((launchData: IMeldRxLaunchData) => {
    console.log(JSON.stringify(launchData));
    const fhirUrl = launchData.workspaceUrl;
    FHIR.oauth2.authorize({
      clientId: launchData.clientId,
      scope: launchData.scope,
      redirectUri: launchData.redirectUrl,
      iss: fhirUrl,
    });
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2"
        >
          <Link href="/" className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-green-600"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            <span className="text-xl font-bold text-green-600">
              HerediCheck
            </span>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:items-center md:gap-6">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Link
              href="/"
              className="text-sm font-medium transition-colors hover:text-green-600"
            >
              Home
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link
              href="/chatbot"
              className="text-sm font-medium transition-colors hover:text-green-600"
            >
              Chatbot
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link
              href="/conditions"
              className="text-sm font-medium transition-colors hover:text-green-600"
            >
              Check for Conditions
            </Link>
          </motion.div>
        </nav>

        <div className="flex items-center gap-4">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Button
              asChild
              variant="outline"
              className="hidden border-green-600 text-green-600 hover:bg-green-50 hover:text-green-50 md:inline-flex"
            >
              <div className="flex justify-center h-fit sm:rounded-lg my-2 w-fit hover:bg-green-600 hover:text-green-50">
                {launchOptions.map(
                  (launchConfiguration: IMeldRxLaunchData, index: number) => (
                    <button
                      key={`launch-button-${index}`}
                      onClick={() => onLaunchClick(launchConfiguration)}
                    >
                      Launch with MeldRx
                    </button>
                  )
                )}
              </div>
            </Button>
          </motion.div>

          {/* Mobile Menu Button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Toggle Menu"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetTitle>Menu</SheetTitle>
              <nav className="flex flex-col gap-4 pt-10">
                <Link
                  href="/"
                  className="text-lg font-medium hover:text-green-600"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/chatbot"
                  className="text-lg font-medium hover:text-green-600"
                  onClick={() => setIsOpen(false)}
                >
                  Chatbot
                </Link>
                <Link
                  href="/conditions"
                  className="text-lg font-medium hover:text-green-600"
                  onClick={() => setIsOpen(false)}
                >
                  Check for Conditions
                </Link>
                <Button
                  asChild
                  variant="outline"
                  className="mt-4 border-green-600 text-green-600 hover:bg-green-600 hover:text-green-50"
                >
                  <div className="flex justify-center  sm:rounded-lg my-2 w-3/4 h-fit">
                    {launchOptions.map(
                      (
                        launchConfiguration: IMeldRxLaunchData,
                        index: number
                      ) => (
                        <button
                          key={`launch-button-${index}`}
                          onClick={() => onLaunchClick(launchConfiguration)}
                        >
                          Launch with MeldRx
                        </button>
                      )
                    )}
                  </div>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
