"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  UserPlus,
  User,
  MapPin,
  Briefcase,
  Globe,
  Check,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import PersonalInformation from "../create-staff/steps/PersonalInformation";
import AddressInformation from "../create-staff/steps/AddressInformation";
import PayrollLeaves from "../create-staff/steps/PayrollLeaves";
import BankSocialMedia from "../create-staff/steps/BankSocialMedia";

const phases = [
  { step: 1, title: "Personal Information", icon: User },
  { step: 2, title: "Address Information", icon: MapPin },
  { step: 3, title: "Payroll & Leaves", icon: Briefcase },
  { step: 4, title: "Bank & Social Media", icon: Globe },
];

export default function CreateStaff() {
  const [currentStep, setCurrentStep] = useState(1);
 

  const nextStep = () => {
    if (currentStep < phases.length) setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  const renderHorizontalTimeline = () => (
    <div className="overflow-x-auto pb-4 -mx-2 px-2">
      <div className="flex items-start min-w-[600px]">
        {phases.map((phase, index) => {
          const isCompleted = currentStep > phase.step;
          const isActive = currentStep === phase.step;
          const Icon = phase.icon;
          const isLast = index === phases.length - 1;

          return (
            <div
              key={phase.step}
              className="flex-1 flex flex-col items-center relative"
            >
              <div className="flex items-center w-full">
                <div className="flex-1 h-0.5">
                  {index > 0 && (
                    <div
                      className={cn(
                        "h-full transition-colors duration-300",
                        currentStep >= phase.step
                          ? "bg-indigo-600"
                          : "bg-slate-200 dark:bg-neutral-800",
                      )}
                    />
                  )}
                </div>
                <div
                  className={cn(
                    "relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300",
                    isCompleted && "border-indigo-600 bg-indigo-600 text-white",
                    isActive &&
                      "border-indigo-600 bg-indigo-600 text-white ring-4 ring-indigo-100 dark:ring-indigo-900/50",
                    !isCompleted &&
                      !isActive &&
                      "border-slate-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 text-slate-500",
                  )}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 h-0.5">
                  {!isLast && (
                    <div
                      className={cn(
                        "h-full transition-colors duration-300",
                        isCompleted
                          ? "bg-indigo-600"
                          : "bg-slate-200 dark:bg-neutral-800",
                      )}
                    />
                  )}
                </div>
              </div>
              <div className="mt-3 text-center px-1 w-full">
                <p
                  className={cn(
                    "text-xs font-medium mb-0.5",
                    isActive
                      ? "text-indigo-600"
                      : "text-slate-500 dark:text-slate-400",
                  )}
                >
                  Phase {phase.step}
                </p>
                <h4
                  className={cn(
                    "text-sm font-semibold truncate",
                    isActive
                      ? "text-indigo-600"
                      : "text-slate-900 dark:text-slate-100",
                  )}
                >
                  {phase.title}
                </h4>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8 bg-slate-50/50 dark:bg-neutral-950">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Add Staff
          </h1>
        </div>

        {/* Horizontal Timeline Stepper */}
        <Card className="shadow-sm">
          <CardContent className="p-6">
            <div className="mb-4 flex items-center gap-2">
              <UserPlus className="h-5 w-5 text-indigo-600" />
              <h2 className="text-lg font-semibold">
                Staff Onboarding Process
              </h2>
            </div>
            {renderHorizontalTimeline()}
          </CardContent>
        </Card>

        {/* Form Content */}
        <Card className="shadow-sm min-h-[500px]">
          <CardContent className="p-6">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              {/* STEP 1: Personal Information */}
              {currentStep === 1 && <PersonalInformation />}

              {/* STEP 2: Address Information */}
              {currentStep === 2 && <AddressInformation />}

              {/* STEP 3: Payroll & Leaves */}
              {currentStep === 3 && <PayrollLeaves />}

              {/* STEP 4: Bank & Social Media */}
              {currentStep === 4 && <BankSocialMedia />}

              {/* Navigation Buttons */}
              <div className="flex flex-wrap gap-3 justify-start pt-6 border-t mt-8">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="flex items-center gap-2"
                >
                  <ChevronLeft className="h-4 w-4" /> Previous
                </Button>

                {currentStep < phases.length ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm flex items-center gap-2"
                  >
                    Next <ChevronRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm flex items-center gap-2"
                  >
                    <Check className="h-4 w-4" /> Submit & Save Staff
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
