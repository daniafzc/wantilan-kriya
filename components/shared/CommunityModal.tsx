"use client";

import { cn } from "@/lib/utils";
import { Community } from "@/types";
import { Button } from "@/components/ui/Button";
import { useEffect } from "react";

interface CommunityModalProps {
  community: Community | null;
  open: boolean;
  onClose: () => void;
}

export function CommunityModal({ community, open, onClose }: CommunityModalProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!community) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 bg-ink/55 z-[100] flex items-center justify-center p-5 transition-opacity duration-200",
        open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className={cn(
          "bg-white w-full max-w-[540px] rounded-2xl p-8 md:p-9 max-h-[88vh] overflow-y-auto",
          "shadow-[0_30px_80px_rgba(0,0,0,0.3)] transition-transform duration-250",
          open ? "scale-100" : "scale-95"
        )}
      >
        <div className="flex justify-between items-start mb-1">
          <h2 className="font-serif text-[26px] leading-tight">{community.name}</h2>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-line-soft flex items-center justify-center text-xl hover:bg-line transition-colors shrink-0 ml-2"
          >
            ×
          </button>
        </div>
        <div className="text-[13px] text-teal font-semibold mb-5">
          {community.members} anggota · Dimoderasi oleh {community.moderator}
        </div>

        <div className="mb-5">
          <h4 className="text-[11.5px] uppercase tracking-wider text-ink-muted font-bold mb-2.5">
            Tentang Komunitas
          </h4>
          <p className="text-sm md:text-[14.5px] text-ink-soft leading-relaxed">{community.description}</p>
        </div>

        <div className="mb-6">
          <h4 className="text-[11.5px] uppercase tracking-wider text-ink-muted font-bold mb-2.5">
            Aturan Komunitas
          </h4>
          <ul className="list-disc pl-5 space-y-1.5">
            {community.rules.map((rule, i) => (
              <li key={i} className="text-sm md:text-[14.5px] text-ink-soft leading-relaxed">
                {rule}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex gap-2.5">
          <Button variant="cancel" className="flex-1" onClick={onClose}>
            Batal
          </Button>
          <Button variant="wa" className="flex-[2]" onClick={() => alert("Membuka WhatsApp... (prototipe)")}>
            <span className="text-lg">💬</span> Buka WhatsApp
          </Button>
        </div>
      </div>
    </div>
  );
}
