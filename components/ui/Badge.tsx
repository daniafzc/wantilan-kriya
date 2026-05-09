"use client";

import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "outline" | "soft";
  color?: "green" | "gold" | "plum" | "teal" | "terracotta";
}

export function Badge({ children, className, variant = "default", color = "gold" }: BadgeProps) {
  const colorStyles = {
    green: "bg-green-soft text-green",
    gold: "bg-gold-soft text-gold",
    plum: "bg-plum-soft text-plum",
    teal: "bg-teal-soft text-teal",
    terracotta: "bg-terracotta-soft text-terracotta",
  };

  const variants = {
    default: cn("px-[9px] py-1 rounded-[5px] text-[10.5px] font-bold uppercase tracking-wider", colorStyles[color]),
    outline: cn("px-[9px] py-1 rounded-[5px] text-[10.5px] font-bold uppercase tracking-wider border", colorStyles[color]),
    soft: cn("px-3 py-1 rounded-full text-xs font-semibold", colorStyles[color]),
  };

  return <span className={cn(variants[variant], className)}>{children}</span>;
}
