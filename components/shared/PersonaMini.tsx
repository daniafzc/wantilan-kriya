"use client";

import { cn } from "@/lib/utils";
import { Persona } from "@/types";

interface PersonaMiniProps {
  persona: Persona;
  className?: string;
}

export function PersonaMini({ persona, className }: PersonaMiniProps) {
  const colorMap: Record<string, string> = {
    gold: "border-t-gold",
    green: "border-t-green",
    terracotta: "border-t-terracotta",
  };

  return (
    <div
      className={cn(
        "bg-white border border-line rounded-[14px] p-6 md:p-[26px]",
        "border-t-[4px] border-t-transparent",
        colorMap[persona.color] || "border-t-gold",
        className
      )}
    >
      <h3 className="font-serif text-[22px] mb-1">{persona.name}</h3>
      <div className="text-[11.5px] uppercase tracking-wider text-ink-muted font-bold mb-3">
        {persona.role}
      </div>
      <p className="text-sm md:text-[14.5px] text-ink-soft leading-relaxed">{persona.description}</p>
    </div>
  );
}
