"use client";

import Link from "next/link";
import { SubmitStepper } from "./SubmitStepper";
import { CategoryCard } from "@/components/shared/CategoryCard";
import { CATEGORIES } from "@/constant/constant";

export function SubmitStep2() {
  return (
    <div className="max-w-[640px] mx-auto px-5 md:px-10 py-10 md:py-[60px]">
      <Link
        href="/submit"
        className="inline-flex items-center gap-1.5 text-sm text-ink-soft hover:text-terracotta transition-colors mb-6"
      >
        ‹ Kembali
      </Link>

      <SubmitStepper currentStep={2} />

      <h2 className="font-serif text-2xl md:text-4xl mb-2.5 leading-tight">Pilih kategori</h2>
      <p className="text-base text-ink-muted mb-6 md:mb-8">
        Bantu kami merapikan kontribusi Anda ke kategori yang tepat.
      </p>

      <div className="space-y-3.5">
        {CATEGORIES.map((cat) => (
          <Link key={cat.id} href="/submit?step=3">
            <CategoryCard
              slug={cat.slug}
              name={cat.name}
              description={cat.description}
              icon={cat.icon}
              color={cat.color}
              articleCount=""
              variant="list"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
