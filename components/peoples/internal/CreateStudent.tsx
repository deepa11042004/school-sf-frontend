 
"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPlus, ChevronLeft, ChevronRight, Check } from "lucide-react";

import { PHASES, FormState, initialFormState } from "@/components/peoples/create-student/types";
import { StepTimeline } from "@/components/peoples/create-student/StepTimeline";
import { StepAdmission } from "@/components/peoples/create-student/steps/StepAdmission";
import { StepPersonal } from "@/components/peoples/create-student/steps/StepPersonal";
import { StepContact } from "@/components/peoples/create-student/steps/StepContact";
import { StepParents } from "@/components/peoples/create-student/steps/StepParents";
import { StepAcademic } from "@/components/peoples/create-student/steps/StepAcademic";
import { StepServices } from "@/components/peoples/create-student/steps/StepServices";
import { StepDocuments } from "@/components/peoples/create-student/steps/StepDocuments";

export default function CreateStudent() {
  const [currentStep, setCurrentStep] = useState(1);
  const [form, setForm] = useState<FormState>(initialFormState);

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  const isFirst = currentStep === 1;
  const isLast = currentStep === PHASES.length;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: wire up to API
    console.log("Submit student:", form);
  }

  return (
    <div className="min-h-screen p-4  bg-slate-50/50 dark:bg-neutral-950">
      <div className="max-w-5xl mx-auto space-y-5">

        {/* Page header */}
        <div>
           
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
            Add Student
          </h1>
        </div>

        {/* Timeline stepper */}
        <Card className="shadow-sm">
          <CardContent className="p-4 ">
            <div className="flex items-center gap-2 mb-4">
              <UserPlus className="h-5 w-5 text-indigo-600 shrink-0" />
              <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Student Admission Process
              </h2>
            </div>
            <StepTimeline
              currentStep={currentStep}
              onStepClick={(step) => step < currentStep && setCurrentStep(step)}
            />
          </CardContent>
        </Card>

        {/* Step content */}
        <Card className="shadow-sm">
          <CardContent className="p-4 sm:p-6">
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              {currentStep === 1 && (
                <StepAdmission data={form} onChange={updateField} />
              )}
              {currentStep === 2 && (
                <StepPersonal data={form} onChange={updateField} />
              )}
              {currentStep === 3 && (
                <StepContact data={form} onChange={updateField} />
              )}
              {currentStep === 4 && <StepParents />}
              {currentStep === 5 && <StepAcademic />}
              {currentStep === 6 && <StepServices />}
              {currentStep === 7 && (
                <StepDocuments data={form} onChange={updateField} />
              )}

              {/* Navigation */}
              <div className="flex items-center justify-start gap-3 pt-5 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setCurrentStep((s) => s - 1)}
                  disabled={isFirst}
                  className="flex items-center gap-1.5"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>

                {isLast ? (
                  <Button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-1.5"
                  >
                    <Check className="h-4 w-4" />
                    Save Student
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={() => setCurrentStep((s) => s + 1)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-1.5"
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
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