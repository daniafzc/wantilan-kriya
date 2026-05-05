"use client";

import Link from "next/link";
import { COMMUNITIES } from "@/lib/constants";
import { FullCommunityCard } from "@/components/shared/FullCommunityCard";
import { CommunityModal } from "@/components/shared/CommunityModal";
import { useCommunityModal } from "@/hooks/useCommunityModal";

export default function KomunitasPage() {
  const { community, open, showRules, closeModal } = useCommunityModal();

  return (
    <>
      {/* Page Header */}
      <section className="bg-gradient-to-b from-[#f7e8d8] to-paper pt-12 md:pt-[60px] pb-10 md:pb-[50px] border-b border-line-soft">
        <div className="max-w-[1280px] mx-auto px-5 md:px-10">
          <div className="text-[13px] text-ink-muted mb-3.5">
            <Link href="/" className="text-terracotta hover:underline">Beranda</Link> · Komunitas
          </div>
          <h1 className="font-serif text-3xl md:text-[48px] leading-tight mb-3">Komunitas WhatsApp</h1>
          <p className="text-base md:text-[17px] text-ink-soft max-w-[720px]">
            Diskusi nyata terjadi di WhatsApp. Pilih grup yang sesuai dengan keahlian Anda — setiap grup memiliki moderator pengrajin senior atau aktivis komunitas.
          </p>
        </div>
      </section>

      {/* Community Grid */}
      <section className="py-10 md:py-16">
        <div className="max-w-[1280px] mx-auto px-5 md:px-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-[22px]">
            {COMMUNITIES.map((community) => (
              <FullCommunityCard
                key={community.id}
                community={community}
                onClick={() => showRules(community.id)}
              />
            ))}
          </div>
        </div>
      </section>

      <CommunityModal community={community} open={open} onClose={closeModal} />
    </>
  );
}
