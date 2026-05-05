"use client";

import { cn } from "@/lib/utils";

interface SubmitStepperProps {
  currentStep: number;
  totalSteps?: number;
}

export function SubmitStepper({ currentStep, totalSteps = 4 }: SubmitStepperProps) {
  return (
    <div className="flex gap-1.5 mb-6 md:mb-8">
      {Array.from({ length: totalSteps }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "flex-1 h-[5px] rounded-[3px] transition-colors duration-200",
            i < currentStep ? "bg-terracotta" : "bg-line"
          )}
        />
      ))}
    </div>
  );
}
