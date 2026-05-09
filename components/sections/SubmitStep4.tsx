"use client";

import Link from "next/link";
import { SubmitStepper } from "./SubmitStepper";
import { ReviewSummary } from "@/components/shared/ReviewSummary";
import { Button } from "@/components/ui/Button";

export function SubmitStep4() {
  const reviewItems = [
    { label: "Tipe", value: "Cerita" },
    { label: "Kategori", value: "Pasar & Bisnis" },
    { label: "Nama", value: "Ibu Ayu Kartini" },
    { label: "Asal", value: "Sidemen, Karangasem" },
    { label: "Judul", value: "Pengalaman Ekspor Endek Pertama" },
  ];

  return (
    <div className="max-w-[640px] mx-auto px-5 md:px-10 py-10 md:py-[60px]">
      <Link
        href="/submit?step=3"
        className="inline-flex items-center gap-1.5 text-sm text-ink-soft hover:text-terracotta transition-colors mb-6"
      >
        ‹ Kembali
      </Link>

      <SubmitStepper currentStep={4} />

      <h2 className="font-serif text-2xl md:text-4xl mb-2.5 leading-tight">
        Tinjau sebelum kirim
      </h2>
      <p className="text-base text-ink-muted mb-6 md:mb-8">
        Pastikan informasi sudah benar.
      </p>

      <ReviewSummary items={reviewItems} />

      <div className="bg-gold-soft text-ink-soft rounded-xl p-4 md:p-5 text-sm leading-relaxed mb-6">
        <strong className="text-gold">Catatan kurator</strong> — Kontribusi akan ditinjau tim dalam 1–2 hari sebelum tayang. Anda akan mendapat notifikasi via WhatsApp ke nomor yang nanti kami minta saat publikasi.
      </div>

      <div className="flex justify-end gap-3">
        <Link href="/submit?step=3">
          <Button variant="secondary">‹ Edit</Button>
        </Link>
        <Link href="/submit?step=5">
          <Button>Kirim ✓</Button>
        </Link>
      </div>
    </div>
  );
}
