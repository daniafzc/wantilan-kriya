"use client";

import { cn } from "@/lib/utils";
import { Community } from "@/types";

interface FullCommunityCardProps {
  community: Community;
  onClick: () => void;
  className?: string;
}

export function FullCommunityCard({ community, onClick, className }: FullCommunityCardProps) {
  const colorMap: Record<string, string> = {
    gold: "border-t-gold",
    green: "border-t-green",
    silver: "border-t-[#6b6b85]",
    terracotta: "border-t-terracotta",
    plum: "border-t-plum",
    teal: "border-t-teal",
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full text-left bg-white border border-line rounded-[14px] p-6",
        "border-t-[4px] border-t-transparent",
        colorMap[community.color] || "border-t-gold",
        "hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(0,0,0,0.07)] transition-all duration-200",
        className
      )}
    >
      <div className="flex justify-between items-start gap-3 mb-3">
        <h3 className="font-serif text-[19px] font-bold text-ink">{community.name}</h3>
        <span className="shrink-0 bg-sand-soft text-ink-soft text-xs font-bold px-2.5 py-1 rounded-xl">
          {community.members}
        </span>
      </div>
      <p className="text-sm text-ink-soft leading-relaxed mb-4">{community.description}</p>
      <div className="flex justify-between items-center text-xs text-ink-muted pt-3.5 border-t border-line-soft">
        <span className="flex items-center gap-1.5">
          <span>👤</span> {community.moderator}
        </span>
        <span className="text-terracotta font-bold">Lihat aturan →</span>
      </div>
    </button>
  );
}
