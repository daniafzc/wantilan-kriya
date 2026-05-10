"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitStepper } from "./SubmitStepper";
import { ReviewSummary } from "@/components/shared/ReviewSummary";
import { Button } from "@/components/ui/Button";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000";

// Map slug kategori → label UI
const CATEGORY_LABELS: Record<string, string> = {
  teknik: "Teknik & Bahan",
  tradisi: "Tradisi & Makna",
  pasar: "Pasar & Bisnis",
  kolaborasi: "Kolaborasi",
};

const TYPE_LABELS: Record<string, string> = {
  story: "Cerita / Pengalaman",
  question: "Pertanyaan untuk Komunitas",
};

export function SubmitStep4() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Baca data dari sessionStorage
  const [data, setData] = useState({
    type: "",
    name: "",
    location: "",
    title: "",
    content: "",
    category: "",
  });

  useEffect(() => {
    setData({
      type: sessionStorage.getItem("submit_type") ?? "",
      name: sessionStorage.getItem("submit_name") ?? "",
      location: sessionStorage.getItem("submit_location") ?? "",
      title: sessionStorage.getItem("submit_title") ?? "",
      content: sessionStorage.getItem("submit_content") ?? "",
      category: sessionStorage.getItem("submit_category") ?? "",
    });
  }, []);

  const reviewItems = [
    { label: "Tipe", value: TYPE_LABELS[data.type] ?? data.type },
    {
      label: "Kategori",
      value: CATEGORY_LABELS[data.category] ?? data.category,
    },
    { label: "Nama", value: data.name },
    { label: "Asal", value: data.location },
    { label: "Judul", value: data.title },
  ];

  const handleKirim = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/submit/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: data.type,
          name: data.name,
          location: data.location || null,
          title: data.title,
          content: data.content,
          category: data.category || null,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.detail ?? "Gagal mengirim, coba lagi.");
      }

      // Berhasil — bersihkan sessionStorage lalu lanjut ke halaman sukses
      [
        "submit_type",
        "submit_name",
        "submit_location",
        "submit_title",
        "submit_content",
        "submit_category",
      ].forEach((k) => sessionStorage.removeItem(k));

      router.push("/submit?step=5");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

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
        <strong className="text-gold">Catatan kurator</strong> — Kontribusi akan
        ditinjau tim dalam 1–2 hari sebelum tayang. Anda akan mendapat
        notifikasi via WhatsApp ke nomor yang nanti kami minta saat publikasi.
      </div>

      {error && <p className="text-sm text-red-500 mb-4">{error}</p>}

      <div className="flex justify-end gap-3">
        <Link href="/submit?step=3">
          <Button variant="secondary">‹ Edit</Button>
        </Link>
        <Button onClick={handleKirim} disabled={loading}>
          {loading ? "Mengirim..." : "Kirim ✓"}
        </Button>
      </div>
    </div>
  );
}
