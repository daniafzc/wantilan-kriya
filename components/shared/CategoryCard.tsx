"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { PiWrench, PiFlowerLotus, PiGlobe, PiHandshake } from "react-icons/pi";
import type { IconType } from "react-icons";

const ICON_MAP: Record<string, IconType> = {
  PiWrench,
  PiFlowerLotus,
  PiGlobe,
  PiHandshake,
};

interface CategoryCardProps {
  slug: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  articleCount: string;
  variant?: "grid" | "list";
  className?: string;
}

export function CategoryCard({
  slug,
  name,
  description,
  icon,
  color,
  articleCount,
  variant = "grid",
  className,
}: CategoryCardProps) {
  const colorStyles: Record<
    string,
    { border: string; iconBg: string; iconText: string }
  > = {
    green: {
      border: "border-t-green",
      iconBg: "bg-green-soft",
      iconText: "text-green",
    },
    gold: {
      border: "border-t-gold",
      iconBg: "bg-gold-soft",
      iconText: "text-gold",
    },
    plum: {
      border: "border-t-plum",
      iconBg: "bg-plum-soft",
      iconText: "text-plum",
    },
    teal: {
      border: "border-t-teal",
      iconBg: "bg-teal-soft",
      iconText: "text-teal",
    },
  };

  const styles = colorStyles[color] || colorStyles.gold;
  const IconComponent = ICON_MAP[icon];

  if (variant === "list") {
    return (
      <Link
        href={`/kategori/${slug}`}
        className={cn(
          "block bg-white border border-line rounded-2xl p-8",
          "border-l-[6px] border-l-transparent",
          styles.border.replace("border-t", "border-l"),
          "hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(0,0,0,0.06)] transition-all duration-200",
          className,
        )}
      >
        <div className="flex items-center gap-4 mb-3.5">
          <div
            className={cn(
              "w-14 h-14 rounded-[14px] flex items-center justify-center",
              styles.iconBg,
              styles.iconText,
            )}
          >
            {
              IconComponent ? (
                <IconComponent size={28} />
              ) : (
                <span className="text-[26px]">{icon}</span>
              ) // fallback ke emoji
            }
          </div>
          <h3 className="font-serif text-[22px] font-bold">{name}</h3>
        </div>
        <p className="text-sm text-ink-soft leading-relaxed mb-3">
          {description}
        </p>
        <span className="text-xs text-ink-muted font-semibold">
          {articleCount}
        </span>
      </Link>
    );
  }

  return (
    <Link
      href={`/kategori/${slug}`}
      className={cn(
        "block bg-white border border-line rounded-[14px] p-7",
        "border-t-[4px] border-t-transparent",
        styles.border,
        "hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(0,0,0,0.06)] transition-all duration-200",
        className,
      )}
    >
      <div
        className={cn(
          "w-12 h-12 rounded-xl flex items-center justify-center mb-4",
          styles.iconBg,
          styles.iconText,
        )}
      >
        {
          IconComponent ? (
            <IconComponent size={24} />
          ) : (
            <span className="text-2xl">{icon}</span>
          ) // fallback ke emoji
        }
      </div>
      <h3 className="text-lg font-bold mb-2">{name}</h3>
      <p className="text-sm text-ink-soft leading-relaxed mb-3.5">
        {description}
      </p>
      <span className="text-xs text-ink-muted font-semibold">
        {articleCount}
      </span>
    </Link>
  );
}
