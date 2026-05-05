"use client";

import { cn } from "@/lib/utils";

interface ChoiceCardProps {
  icon: string;
  iconBg?: string;
  iconText?: string;
  title: string;
  description: string;
  selected?: boolean;
  onClick: () => void;
  className?: string;
}

export function ChoiceCard({
  icon,
  iconBg = "bg-terracotta-soft",
  iconText = "text-terracotta",
  title,
  description,
  selected,
  onClick,
  className,
}: ChoiceCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full text-left bg-white border-2 border-line rounded-[14px] p-5 md:p-6",
        "hover:border-ink transition-all duration-150",
        selected && "border-terracotta bg-terracotta-soft",
        className
      )}
    >
      <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center text-[22px] mb-3.5", iconBg, iconText)}>
        {icon}
      </div>
      <h4 className="text-base md:text-lg font-bold mb-1.5">{title}</h4>
      <p className="text-sm text-ink-soft leading-relaxed">{description}</p>
    </button>
  );
}
