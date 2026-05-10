"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FullCommunityCard } from "@/components/shared/FullCommunityCard";
import { CommunityModal } from "@/components/shared/CommunityModal";
import { useCommunityModal } from "@/hooks/useCommunityModal";
import { Community } from "@/types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000";

/* ═══════════════════════════════════════════════════════════════════════
   Raw backend shape — GET /komunitas/
   ═══════════════════════════════════════════════════════════════════════ */
interface BackendCommunity {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  /** Backend uses Indonesian field name for member count */
  moderator: string | null;
  jumlah_anggota: number;
  whatsapp_link: string | null;
  color: string | null;
  rules: string[];
}

/** Map backend response into the strict Community type your UI expects */
function toCommunity(b: BackendCommunity): Community {
  return {
    id: b.id,
    slug: b.slug,
    name: b.name,
    members: b.jumlah_anggota,
    description: b.description ?? "",
    /** SPECULATIVE: backend does not yet return a moderator field.
        When it does, replace this fallback with b.moderator. */
    moderator: b.moderator ?? "Moderator Komunitas",  // now uses backend value
    color: b.color ?? "#C9623F",
    rules: b.rules,
  };
}

export default function KomunitasPage() {
  const { community, open, showRules, closeModal } = useCommunityModal();
  const [communities, setCommunities] = useState<Community[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      try {
        const res = await fetch(`${API_BASE}/komunitas/`, {
          signal: controller.signal,
          cache: "no-store",
          headers: { Accept: "application/json" },
        });
        if (!res.ok) throw new Error("Gagal mengambil komunitas");
        const data: BackendCommunity[] = await res.json();
        setCommunities(data.map(toCommunity));
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          console.error(err);
          setCommunities([]);
        }
      } finally {
        setLoading(false);
      }
    })();

    return () => controller.abort();
  }, []);

  return (
    <>
      {/* Page Header */}
      <section className="bg-gradient-to-b from-[#f7e8d8] to-paper pt-12 md:pt-[60px] pb-10 md:pb-[50px] border-b border-line-soft">
        <div className="max-w-[1280px] mx-auto px-5 md:px-10">
          <div className="text-[13px] text-ink-muted mb-3.5">
            <Link href="/" className="text-terracotta hover:underline">
              Beranda
            </Link>{" "}
            · Komunitas
          </div>
          <h1 className="font-serif text-3xl md:text-[48px] leading-tight mb-3">
            Komunitas WhatsApp
          </h1>
          <p className="text-base md:text-[17px] text-ink-soft max-w-[720px]">
            Diskusi nyata terjadi di WhatsApp. Pilih grup yang sesuai dengan
            keahlian Anda — setiap grup memiliki moderator pengrajin senior atau
            aktivis komunitas.
          </p>
        </div>
      </section>

      {/* Community Grid */}
      <section className="py-10 md:py-16">
        <div className="max-w-[1280px] mx-auto px-5 md:px-10">
          {loading ? (
            <p className="text-ink-muted">Memuat komunitas…</p>
          ) : communities.length === 0 ? (
            <p className="text-ink-muted">Belum ada komunitas.</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-[22px]">
              {communities.map((c) => (
                <FullCommunityCard
                  key={c.id}
                  community={c}
                  /** Pass the full normalized object so the modal renders
                      live backend data instead of looking up a static ID */
                  onClick={() => showRules(c)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <CommunityModal community={community} open={open} onClose={closeModal} />
    </>
  );
}