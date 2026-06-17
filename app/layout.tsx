import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/Layout/theme-provider";
import { ThemeCustomizer } from "@/components/Layout/theme-customizer";
import ElevenLabsWidget from "@/components/ChatBot/ElevenLabsWidget";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CMSFullForm Dashboard - OpenSource CMS",
  description: "CmsFullForm dashboard build with Next.js and Tailwind CSS",
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <ThemeCustomizer />
          <ElevenLabsWidget />
        </ThemeProvider>
      </body>
    </html>
  );
}
