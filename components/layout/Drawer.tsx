"use client";

import Link from "next/link";
import { NAV_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

interface DrawerProps {
  open: boolean;
  onClose: () => void;
}

export function Drawer({ open, onClose }: DrawerProps) {
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

  return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-ink/40 z-[60] transition-opacity duration-250",
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        )}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-[280px] bg-paper z-[61] shadow-[-8px_0_24px_rgba(0,0,0,0.15)]",
          "flex flex-col transition-transform duration-280 ease-out",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="p-5 flex items-center justify-between border-b border-line-soft">
          <strong className="font-serif text-[15px]">Wantilan Kriya</strong>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-line-soft flex items-center justify-center text-lg hover:bg-line transition-colors"
          >
            ×
          </button>
        </div>

        <nav className="flex-1 py-3">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              onClick={onClose}
              className="flex items-center gap-3.5 px-5 py-3.5 text-[15px] font-medium text-ink hover:bg-sand-soft transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/submit"
            onClick={onClose}
            className="mx-4 mt-3 bg-terracotta text-white rounded-[10px] py-3 px-4 text-center font-semibold text-[15px] block"
          >
            + Bagikan Cerita
          </Link>
        </nav>

        <div className="p-5 border-t border-line-soft text-xs text-ink-muted leading-relaxed">
          Tanpa login. Tanpa akun.
          <br />
          Cukup nama dan daerah asal.
        </div>
      </div>
    </>
  );
}
