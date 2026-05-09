"use client";

import { cn } from "@/lib/utils";

interface InsightCardProps {
  title: string;
  content: string;
  className?: string;
}

export function InsightCard({ title, content, className }: InsightCardProps) {
  return (
    <div className={cn("bg-white border border-line rounded-[14px] p-5 md:p-6 mb-3.5", className)}>
      <h4 className="text-xs uppercase tracking-wider text-terracotta font-bold mb-2">{title}</h4>
      <p className="text-sm md:text-[14.5px] text-ink-soft leading-relaxed">{content}</p>
    </div>
  );
}
