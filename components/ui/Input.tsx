"use client";

import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, helperText, ...props }, ref) => {
    return (
      <div className="mb-4">
        {label && (
          <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1.5">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            "w-full bg-white border-[1.5px] border-line rounded-[10px] px-4 py-3 text-sm text-ink",
            "placeholder:text-ink-muted",
            "focus:border-terracotta focus:outline-none transition-colors",
            className
          )}
          {...props}
        />
        {helperText && (
          <small className="block text-[11.5px] text-ink-muted mt-1">{helperText}</small>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
