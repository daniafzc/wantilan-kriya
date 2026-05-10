"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { SubmitStepper } from "./SubmitStepper";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";

export function SubmitStep3() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const category = searchParams.get("category") ?? "";

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    title: "",
    content: "",
  });

  const isValid =
    formData.name.trim() !== "" &&
    formData.title.trim() !== "" &&
    formData.content.trim() !== "";

  const handleLanjut = () => {
    if (!isValid) return;
    // Simpan data form ke sessionStorage biar bisa dibaca Step 4
    sessionStorage.setItem("submit_name", formData.name.trim());
    sessionStorage.setItem("submit_location", formData.location.trim());
    sessionStorage.setItem("submit_title", formData.title.trim());
    sessionStorage.setItem("submit_content", formData.content.trim());
    sessionStorage.setItem("submit_category", category);
    router.push("/submit?step=4");
  };

  return (
    <div className="max-w-[640px] mx-auto px-5 md:px-10 py-10 md:py-[60px]">
      <Link
        href="/submit?step=2"
        className="inline-flex items-center gap-1.5 text-sm text-ink-soft hover:text-terracotta transition-colors mb-6"
      >
        ‹ Kembali
      </Link>

      <SubmitStepper currentStep={3} />

      <h2 className="font-serif text-2xl md:text-4xl mb-2.5 leading-tight">
        Tulis kontribusi Anda
      </h2>
      <p className="text-base text-ink-muted mb-6 md:mb-8">
        Empat kolom saja. Tidak perlu email atau akun.
      </p>

      <div className="grid md:grid-cols-2 gap-4">
        <Input
          label="Nama Anda"
          placeholder="Contoh: Ibu Ayu Kartini"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <Input
          label="Asal Daerah"
          placeholder="Contoh: Sidemen, Karangasem"
          value={formData.location}
          onChange={(e) =>
            setFormData({ ...formData, location: e.target.value })
          }
        />
      </div>
      <Input
        label="Judul"
        placeholder="Buat ringkas dan jelas"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
      />
      <Textarea
        label="Isi Cerita / Pertanyaan"
        placeholder="Tulis dengan bahasa sehari-hari. Tidak perlu sempurna — tim kurator akan membantu merapikan."
        value={formData.content}
        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
        helperText="Tim kurator akan meninjau dalam 1–2 hari sebelum tayang."
      />

      <div className="flex justify-end gap-3 mt-8">
        <Link href="/submit?step=2">
          <Button variant="secondary">‹ Kembali</Button>
        </Link>
        <Button onClick={handleLanjut} disabled={!isValid}>
          Tinjau →
        </Button>
      </div>
    </div>
  );
}
