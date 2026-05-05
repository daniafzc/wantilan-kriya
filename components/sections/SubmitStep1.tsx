"use client";

import { useState } from "react";
import Link from "next/link";
import { SubmitStepper } from "./SubmitStepper";
import { ChoiceCard } from "@/components/shared/ChoiceCard";
import { Button } from "@/components/ui/Button";

export function SubmitStep1() {
  const [selected, setSelected] = useState<"story" | "question" | null>(null);

  return (
    <div className="max-w-[640px] mx-auto px-5 md:px-10 py-10 md:py-[60px]">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-ink-soft hover:text-terracotta transition-colors mb-6"
      >
        ‹ Batal & kembali ke Beranda
      </Link>

      <SubmitStepper currentStep={1} />

      <h2 className="font-serif text-2xl md:text-4xl mb-2.5 leading-tight">
        Apa yang ingin Anda bagikan?
      </h2>
      <p className="text-base text-ink-muted mb-6 md:mb-8">
        Pilih salah satu — Anda bisa selesaikan dalam 2 menit, tanpa perlu daftar akun.
      </p>

      <ChoiceCard
        icon="📖"
        title="Cerita / Pengalaman"
        description="Pengalaman membuat karya, ekspor pertama, atau cerita motif keluarga yang ingin Anda lestarikan."
        selected={selected === "story"}
        onClick={() => setSelected("story")}
        className="mb-3.5"
      />
      <ChoiceCard
        icon="❓"
        iconBg="bg-green-soft"
        iconText="text-green"
        title="Pertanyaan untuk Komunitas"
        description="Minta saran teknik, validasi desain, atau diskusi pasar dari pengrajin lain di seluruh Bali."
        selected={selected === "question"}
        onClick={() => setSelected("question")}
      />

      <div className="flex justify-end mt-8">
        <Link href="/submit?step=2">
          <Button>Lanjut →</Button>
        </Link>
      </div>
    </div>
  );
}
