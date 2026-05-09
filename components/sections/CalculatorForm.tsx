"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Select } from "@/components/ui/Select";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { CALCULATOR_OPTIONS } from "@/lib/constants";

export function CalculatorForm() {
  const router = useRouter();
  // Di dalam CalculatorForm.tsx
  const [formData, setFormData] = useState({
    jenisKriya: CALCULATOR_OPTIONS.jenisKriya[0] as string,
    bahanUtama: CALCULATOR_OPTIONS.bahanUtama[0] as string,
    targetPasar: CALCULATOR_OPTIONS.targetPasar[0] as string,
    tingkatKerumitan: CALCULATOR_OPTIONS.tingkatKerumitan[0] as string,
    dimensi: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/kalkulator/hasil");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-line rounded-2xl p-6 md:p-9"
    >
      <div className="grid md:grid-cols-2 gap-4">
        <Select
          label="Jenis Kriya"
          options={[...CALCULATOR_OPTIONS.jenisKriya]}
          value={formData.jenisKriya}
          onChange={(e) =>
            setFormData({ ...formData, jenisKriya: e.target.value })
          }
        />
        <Select
          label="Bahan Utama"
          options={[...CALCULATOR_OPTIONS.bahanUtama]}
          value={formData.bahanUtama}
          onChange={(e) =>
            setFormData({ ...formData, bahanUtama: e.target.value })
          }
        />
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <Select
          label="Target Pasar"
          options={[...CALCULATOR_OPTIONS.targetPasar]}
          value={formData.targetPasar}
          onChange={(e) =>
            setFormData({ ...formData, targetPasar: e.target.value })
          }
        />
        <Select
          label="Tingkat Kerumitan"
          options={[...CALCULATOR_OPTIONS.tingkatKerumitan]}
          value={formData.tingkatKerumitan}
          onChange={(e) =>
            setFormData({ ...formData, tingkatKerumitan: e.target.value })
          }
        />
      </div>
      <Input
        label="Dimensi Produk (opsional)"
        placeholder="contoh: 10cm × 5cm × 2cm"
        value={formData.dimensi}
        onChange={(e) => setFormData({ ...formData, dimensi: e.target.value })}
        helperText="Membantu estimasi lebih akurat berdasarkan listing dengan ukuran serupa."
      />
      <Button type="submit" fullWidth size="lg" className="mt-2">
        Hitung Estimasi Harga →
      </Button>
    </form>
  );
}
