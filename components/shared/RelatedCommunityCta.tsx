"use client";

import { cn } from "@/lib/utils";

interface RelatedCommunityCtaProps {
  label: string;
  title: string;
  subtitle: string;
  onClick?: () => void;
  className?: string;
}

export function RelatedCommunityCta({ label, title, subtitle, onClick, className }: RelatedCommunityCtaProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full text-left bg-teal-soft border border-teal rounded-[12px] p-4 md:p-5",
        "hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(47,107,107,0.2)] transition-all duration-150",
        className
      )}
    >
      <div className="text-[11px] uppercase tracking-wider text-teal font-bold mb-1">{label}</div>
      <strong className="block text-sm md:text-[15px] text-ink mb-1 font-serif">{title}</strong>
      <span className="text-xs md:text-[13px] text-ink-soft">{subtitle}</span>
    </button>
  );
}
