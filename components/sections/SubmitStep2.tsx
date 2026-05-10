"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";
import { SubmitStepper } from "./SubmitStepper";
import { CategoryCard } from "@/components/shared/CategoryCard";
import { CATEGORIES } from "@/lib/constants";

export function SubmitStep2() {
  const router = useRouter();

  const handleSelectCategory = (slug: string) => {
    router.push(`/submit?step=3&category=${slug}`);
  };

  return (
    <div className="max-w-[640px] mx-auto px-5 md:px-10 py-10 md:py-[60px]">
      <Link
        href="/submit"
        className="inline-flex items-center gap-1.5 text-sm text-ink-soft hover:text-terracotta transition-colors mb-6"
      >
        <IoArrowBack className="w-4 h-4" />
        Kembali
      </Link>

      <SubmitStepper currentStep={2} />

      <h2 className="font-serif text-2xl md:text-4xl mb-2.5 leading-tight">
        Pilih kategori
      </h2>
      <p className="text-base text-ink-muted mb-6 md:mb-8">
        Bantu kami merapikan kontribusi Anda ke kategori yang tepat.
      </p>

      <div className="space-y-3.5">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleSelectCategory(cat.slug)}
            className="w-full text-left"
          >
            <CategoryCard
              slug={cat.slug}
              name={cat.name}
              description={cat.description}
              icon={cat.icon}
              color={cat.color}
              articleCount=""
              variant="list"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
