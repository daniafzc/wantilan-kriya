"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { NAV_ITEMS, SITE_NAME, SITE_TAGLINE } from "@/lib/constants";
import Image from "next/image";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Drawer } from "./Drawer";

export function SiteHeader() {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-paper border-b border-line">
        <div className="max-w-[1280px] mx-auto px-5 md:px-10 py-4 flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <Image
              src="/logo.webp"
              alt="Wantilan Kriya"
              width={36}
              height={36}
              className="rounded-full object-cover"
            />
            <div className="leading-none">
              <span className="font-serif text-lg font-bold text-ink block">
                {SITE_NAME}
              </span>
              <span className="text-[10.5px] font-medium text-ink-muted uppercase tracking-wider">
                {SITE_TAGLINE}
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1 flex-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className={cn(
                  "px-3.5 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive(item.href)
                    ? "text-terracotta bg-terracotta-soft"
                    : "text-ink-soft hover:text-ink hover:bg-sand-soft",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA + Mobile Menu */}
          <div className="flex items-center gap-3 ml-auto">
            <Link
              href="/submit"
              className="hidden sm:inline-flex items-center gap-2 bg-terracotta text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-terracotta-deep transition-colors"
            >
              + Bagikan Cerita
            </Link>
            <button
              onClick={() => setDrawerOpen(true)}
              className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-[5px] rounded-lg hover:bg-line-soft transition-colors"
              aria-label="menu"
            >
              <span className="w-[18px] h-0.5 bg-ink rounded-full" />
              <span className="w-[18px] h-0.5 bg-ink rounded-full" />
              <span className="w-[18px] h-0.5 bg-ink rounded-full" />
            </button>
          </div>
        </div>
      </header>

      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
