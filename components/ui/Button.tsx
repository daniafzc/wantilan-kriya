"use client";

import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "wa" | "cancel";
  size?: "default" | "lg" | "sm";
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "default", fullWidth, children, ...props }, ref) => {
    const variants = {
      primary: "bg-terracotta text-white hover:bg-terracotta-deep active:bg-terracotta-deep",
      secondary: "bg-white text-ink border-[1.5px] border-line hover:border-ink active:bg-sand-soft",
      wa: "bg-[#25d366] text-white hover:bg-[#1ea952] active:bg-[#1ea952]",
      cancel: "bg-line-soft text-ink hover:bg-line active:bg-line",
    };

    const sizes = {
      default: "px-5 py-3 text-sm",
      lg: "px-6 py-4 text-base",
      sm: "px-4 py-2 text-xs",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-[10px] font-semibold transition-all duration-150 cursor-pointer",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          variants[variant],
          sizes[size],
          fullWidth && "w-full",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
