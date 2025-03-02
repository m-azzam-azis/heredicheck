"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Github, Linkedin, Youtube, Code2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { IconBrandGithub, IconBrandGithubFilled } from "@tabler/icons-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();

  // Don't render footer in patient-sphere
  if (pathname?.startsWith("/patient-sphere")) {
    return null;
  }

  return (
    <footer className="z-50 w-full bg-gradient-to-b from-green-950 to-emerald-900 text-green-50 py-8 mt-auto ">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* App Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-green-300">HerediCheck</h3>
            <p className="text-sm text-green-200">
              Helping you understand your genetic history and health risks in an
              accessible way.
            </p>
          </div>

          {/* Developers */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-green-300">Developers</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="flex gap-2">
                  <Link
                    href="https://github.com/m-azzam-azis"
                    className="text-green-200 hover:text-white transition-colors"
                    target="_blank"
                  >
                    <Github size={16} />
                  </Link>
                  <Link
                    href="https://linkedin.com/in/m-azzam-azis"
                    className="text-green-200 hover:text-white transition-colors"
                    target="_blank"
                  >
                    <Linkedin size={16} />
                  </Link>
                  <span className="text-slate-100"> | </span>
                  <span className="text-sm">Azzam</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex gap-2">
                  <Link
                    href="https://github.com/fassabilf"
                    className="text-green-200 hover:text-white transition-colors"
                    target="_blank"
                  >
                    <Github size={16} />
                  </Link>
                  <Link
                    href="https://linkedin.com/in/fassabilf/"
                    className="text-green-200 hover:text-white transition-colors"
                    target="_blank"
                  >
                    <Linkedin size={16} />
                  </Link>
                  <span className="text-slate-100"> | </span>
                  <span className="text-sm">Faiz Assabil</span>
                </div>
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-green-300">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="https://github.com/m-azzam-azis/heredicheck"
                  target="_blank"
                  className="text-sm text-green-200 hover:text-white transition-colors flex items-center gap-2"
                >
                  <IconBrandGithub size={16} />
                  <span>Github - Front-end</span>
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/fassabilf/heredicheck-ai"
                  target="_blank"
                  className="text-sm text-green-200 hover:text-white transition-colors flex items-center gap-2"
                >
                  <IconBrandGithub size={16} />
                  <span>Github - AI model</span>
                </Link>
              </li>
              <li>
                <Link
                  href="https://youtube.com/watch?v=heredicheck-demo"
                  target="_blank"
                  className="text-sm text-green-200 hover:text-white transition-colors flex items-center gap-2"
                >
                  <Youtube size={16} />
                  <span>Video Demonstration</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Disclaimer */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-green-300">Disclaimer</h3>
            <p className="text-xs text-green-200">
              All assets and resources used in this application are the property
              of their respective owners. HerediCheck does not claim ownership
              of any third-party assets. For educational purposes only.
            </p>
          </div>
        </div>

        <Separator className="my-6 bg-green-800" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-green-300">
            &copy; {currentYear} HerediCheck. All rights reserved.
          </p>
          <p className="text-xs text-green-300">
            Not for diagnostic purposes. Consult healthcare professionals for
            medical advice.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
