import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeCustomizer } from "@/components/theme-customizer";
import ElevenLabsWidget from "@/components/ChatBot/ElevenLabsWidget";

const inter = Inter({ subsets: ["latin"] });
import Layout from "@/components/cmsfullform/layout";
export const metadata: Metadata = {
  title: "CMSFullForm Dashboard - OpenSource CMS",
  description: "CmsFullForm dashboard build with Next.js and Tailwind CSS",
  generator: "v0.app",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      <Layout>{children}</Layout>

      <ThemeCustomizer />
      <ElevenLabsWidget />
    </ThemeProvider>
  );
}
