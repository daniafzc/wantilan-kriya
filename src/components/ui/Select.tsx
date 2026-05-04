"use client";

import { cn } from "@/lib/utils";
import { SelectHTMLAttributes, forwardRef } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  helperText?: string;
  options: string[];
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, helperText, options, ...props }, ref) => {
    return (
      <div className="mb-4">
        {label && (
          <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1.5">
            {label}
          </label>
        )}
        <select
          ref={ref}
          className={cn(
            "w-full bg-white border-[1.5px] border-line rounded-[10px] px-4 py-3 text-sm text-ink",
            "focus:border-terracotta focus:outline-none transition-colors appearance-none",
            "bg-[url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%237a7a7a' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")] bg-no-repeat bg-right-3 bg-[length:16px] pr-10",
            className
          )}
          {...props}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {helperText && (
          <small className="block text-[11.5px] text-ink-muted mt-1">{helperText}</small>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

export { Select };
