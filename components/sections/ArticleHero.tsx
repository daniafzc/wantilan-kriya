"use client";

import { cn } from "@/lib/utils";

interface ArticleHeroProps {
  color?: string;
  className?: string;
}

export function ArticleHero({ color = "green", className }: ArticleHeroProps) {
  const gradients: Record<string, string> = {
    green: "from-[#c9d6c4] to-green",
    gold: "from-[#d9c9a6] to-gold",
    plum: "from-[#e0c8d4] to-plum",
    teal: "from-[#c5dcdc] to-teal",
    terracotta: "from-[#e6bfb1] to-terracotta",
  };

  return (
    <div
      className={cn(
        "h-[200px] md:h-[380px] bg-gradient-to-br relative mb-0",
        gradients[color] || gradients.green,
        className
      )}
    />
  );
}
