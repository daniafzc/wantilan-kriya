"use client";

import Link from "next/link";
import { FullCommunityCard } from "@/components/shared/FullCommunityCard";
import { COMMUNITIES } from "@/lib/constants";
import { Button } from "@/components/ui/Button";

interface SubmitConfirmationProps {
  onCommunityClick: (id: string) => void;
}

export function SubmitConfirmation({ onCommunityClick }: SubmitConfirmationProps) {
  const exportCommunity = COMMUNITIES.find((c) => c.id === "export")!;

  return (
    <div className="max-w-[640px] mx-auto px-5 md:px-10 py-10 md:py-[60px]">
      <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-5 md:mb-6 rounded-full bg-green-soft flex items-center justify-center text-[38px] md:text-[46px] text-green">
        ✓
      </div>
      <div className="text-center mb-8 md:mb-9">
        <h2 className="font-serif text-2xl md:text-4xl mb-3">Terima kasih!</h2>
        <p className="text-sm md:text-base text-ink-soft max-w-[480px] mx-auto leading-relaxed">
          Kontribusi Anda telah masuk ke antrian kurator. Kami akan menghubungi Anda via WhatsApp dalam 1–2 hari untuk konfirmasi sebelum tayang.
        </p>
      </div>

      <h3 className="font-serif text-lg md:text-[22px] text-center mb-4">
        Sambil menunggu, gabung komunitas?
      </h3>

      <FullCommunityCard
        community={exportCommunity}
        onClick={() => onCommunityClick(exportCommunity.id)}
        className="mb-4"
      />

      <div className="flex justify-center mt-6">
        <Link href="/">
          <Button variant="secondary">Kembali ke Beranda</Button>
        </Link>
      </div>
    </div>
  );
}
