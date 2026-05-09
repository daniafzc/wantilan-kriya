"use client";

import { cn } from "@/lib/utils";

interface ReviewItem {
  label: string;
  value: string;
}

interface ReviewSummaryProps {
  items: ReviewItem[];
  className?: string;
}

export function ReviewSummary({ items, className }: ReviewSummaryProps) {
  return (
    <div className={cn("bg-white border border-line rounded-[14px] p-5 md:p-6 mb-5", className)}>
      {items.map((item, i) => (
        <div
          key={i}
          className={cn(
            "flex justify-between py-3 md:py-3.5 text-sm md:text-[15px]",
            i < items.length - 1 && "border-b border-dashed border-line-soft"
          )}
        >
          <span className="text-xs md:text-[13px] text-ink-muted uppercase tracking-wider font-semibold shrink-0">
            {item.label}
          </span>
          <span className="text-ink font-semibold text-right ml-6">{item.value}</span>
        </div>
      ))}
    </div>
  );
}
