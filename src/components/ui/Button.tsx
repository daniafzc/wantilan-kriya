"use client";

import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "wa" | "cancel";
  size?: "default" | "lg" | "sm";
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "default",
      fullWidth,
      children,
      ...props
    },
    ref,
  ) => {
    const variants = {
      primary:
        "bg-[var(--terracotta)] text-white hover:bg-[var(--terracotta-deep)] active:bg-[var(--terracotta-deep)]",
      secondary:
        "bg-white text-[var(--ink)] border-[1.5px] border-[var(--line)] hover:border-[var(--ink)] active:bg-[var(--sand-soft)]",
      wa: "bg-[#25d366] text-white hover:bg-[#1ea952] active:bg-[#1ea952]",
      cancel:
        "bg-[var(--line-soft)] text-[var(--ink)] hover:bg-[var(--line)] active:bg-[var(--line)]",
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
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

export { Button };
