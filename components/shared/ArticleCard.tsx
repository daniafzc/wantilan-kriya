"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";

interface ArticleCardProps {
  slug: string;
  title: string;
  author: string;
  readTime: string;
  imageColor: string;
  badge: string;
  badgeColor?: string;
  className?: string;
}

export function ArticleCard({
  slug,
  title,
  author,
  readTime,
  imageColor,
  badge,
  badgeColor = "default",
  className,
}: ArticleCardProps) {
  const gradients: Record<string, string> = {
    green: "from-[#c9d6c4] to-green",
    gold: "from-[#d9c9a6] to-gold",
    plum: "from-[#e0c8d4] to-plum",
    teal: "from-[#c5dcdc] to-teal",
    terracotta: "from-[#e6bfb1] to-terracotta",
  };

  return (
    <Link
      href={`/artikel/${slug}`}
      className={cn(
        "block bg-white border border-line rounded-[14px] overflow-hidden",
        "hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(0,0,0,0.08)] transition-all duration-200",
        className
      )}
    >
      <div className={cn("h-[180px] relative bg-gradient-to-br", gradients[imageColor])}>
        <Badge className="absolute bottom-3.5 left-3.5">{badge}</Badge>
      </div>
      <div className="p-5 md:p-[22px]">
        <h3 className="text-base md:text-lg font-bold text-ink leading-snug mb-3">{title}</h3>
        <div className="flex items-center gap-2 text-[13px] text-ink-muted">
          <span>{author}</span>
          <span className="w-[3px] h-[3px] bg-ink-muted rounded-full" />
          <span>{readTime}</span>
        </div>
      </div>
    </Link>
  );
}
