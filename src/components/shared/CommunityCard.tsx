"use client";

import { cn } from "@/lib/utils";
import { Community } from "../../../types";

interface CommunityCardProps {
  community: Community;
  onClick: () => void;
  className?: string;
}

export function CommunityCard({
  community,
  onClick,
  className,
}: CommunityCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full text-left bg-white border border-line rounded-[12px] p-4 md:p-5",
        "border-l-[4px] border-l-teal",
        "hover:scale-[0.99] hover:bg-teal-soft/50 transition-all duration-150",
        className,
      )}
    >
      <div className="flex justify-between items-start gap-3 mb-1.5">
        <h3 className="text-sm md:text-[17px] font-bold text-ink">
          {community.name}
        </h3>
        <span className="shrink-0 bg-teal-soft text-teal text-xs font-bold px-2 py-0.5 rounded-xl">
          {community.members} anggota
        </span>
      </div>
      <p className="text-sm text-ink-soft leading-relaxed mb-2">
        {community.description}
      </p>
      <span className="text-xs md:text-[12.5px] text-ink-muted">
        Moderator · {community.moderator}
      </span>
    </button>
  );
}
