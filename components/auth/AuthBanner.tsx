"use client";

import React from "react";

interface AuthBannerProps {
  title?: string;
  subtitle?: string;
  description?: string;
  footerText?: string;
  showWave?: boolean;
}
 
// Custom Asterisk SVG to match the SaleSkip logo brand mark
const SaleSkipAsterisk: React.FC = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    className="h-16 w-16 text-white mb-6"
  >
    <line x1="12" y1="2" x2="12" y2="22" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
    <line x1="4.93" y1="19.07" x2="19.07" y2="4.93" />
  </svg>
);

export default function AuthBanner({
  title = "Hello",
  subtitle = "Welcome to SFS!",
  description = "Streamline administrative tasks, enhance learning, and foster better communication in one unified platform.",
  showWave = true,
}: AuthBannerProps) {
  return (
    <section className="hidden md:flex flex-1 flex-col justify-between p-12 relative overflow-hidden bg-gradient-to-b from-blue-600 to-blue-800  ">
      {/* Subtle Background Geometric Swirl Lines using CSS radial structures */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute -bottom-20 -left-20 w-[600px] h-[600px] rounded-full border border-white" />
        <div className="absolute -bottom-10 -left-10 w-[600px] h-[600px] rounded-full border border-white" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full border border-white" />
      </div>

      {/* Brand Content Body */}
      <div className="flex flex-col items-start justify-center my-auto max-w-md mx-auto">
        <SaleSkipAsterisk />
        
        <h2 className="text-5xl font-bold tracking-tight text-white mb-2">
         {title}
        </h2>
        <h2 className="text-5xl font-bold tracking-tight text-white mb-6 flex items-center gap-2">
         {subtitle}
          {showWave && (
            <span className="inline-block animate-bounce text-4xl">
              👋
            </span>
          )}
        </h2>
        
        <p className="text-blue-100 text-lg leading-relaxed font-light">
           {description}
        </p>
      </div>

      {/* Footer info matching the source image bottom text */}
      <div className="text-center text-blue-200/60 text-sm font-light w-full">
       {new Date().getFullYear()} SFS  All rights reserved.
      </div>
    </section>
  );
}