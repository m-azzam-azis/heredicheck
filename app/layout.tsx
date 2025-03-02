import "./globals.css";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import { AppProvider } from "@/lib/hooks/AppContext/AppProvider";
import Head from "next/head";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

// import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "Heredicheck",
  description:
    "Heredicheck is a genetic analysis platform that helps you understand your hereditary risks and take proactive steps towards a healthier future for you and your family.",
  keywords: ["AI", "Genetic", "Hereditary", "FHIR", "Healthcare", "HIPAA"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className={inter.className}>
        <AppProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
