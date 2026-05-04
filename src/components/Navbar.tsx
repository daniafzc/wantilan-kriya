"use client";
import { useState } from "react";
import { NavLinks } from "@/constant/constant";
import Link from "next/link";
import { HiBars3BottomRight } from "react-icons/hi2";
import { CgClose } from "react-icons/cg";

const Navbar = () => {
  const [showNav, setShowNav] = useState(false);

  return (
    <>
      <header
        className="sticky top-0 z-50 border-b"
        style={{ background: "var(--paper)", borderColor: "var(--line)" }}
      >
        <div className="max-w-[1280px] mx-auto px-5 md:px-10 py-4 flex items-center gap-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <div
              className="w-9 h-9 rounded-full relative"
              style={{ background: "var(--terracotta)" }}
            >
              <div
                className="absolute inset-[7px] rounded-full"
                style={{ background: "var(--paper)" }}
              />
              <div
                className="absolute inset-[13px] rounded-full"
                style={{ background: "var(--terracotta)" }}
              />
            </div>
            <div className="leading-none">
              <span
                className="font-serif text-lg font-bold block"
                style={{ color: "var(--ink)" }}
              >
                Wantilan Kriya
              </span>
              <span
                className="text-[10.5px] font-medium uppercase tracking-wider"
                style={{ color: "var(--ink-muted)" }}
              >
                Kerajinan Bali
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1 flex-1">
            {NavLinks.map((nav) => (
              <Link
                key={nav.id}
                href={nav.url}
                className="px-3.5 py-2 rounded-md text-sm font-medium transition-colors hover:bg-[var(--line-soft)]"
                style={{ color: "var(--ink-soft)" }}
              >
                {nav.label}
              </Link>
            ))}
          </nav>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-3 ml-auto">
            <Link
              href="#community"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-semibold text-white transition-colors hover:opacity-90"
              style={{ background: "var(--terracotta)" }}
            >
              + Bagikan Cerita
            </Link>
            <button
              onClick={() => setShowNav(true)}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg transition-colors hover:bg-[var(--line-soft)]"
              aria-label="Open Menu"
            >
              <HiBars3BottomRight
                className="w-5 h-5"
                style={{ color: "var(--ink)" }}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Overlay */}
      <div
        onClick={() => setShowNav(false)}
        className={`fixed inset-0 z-[100002] transition-all duration-300 ${
          showNav
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        style={{ backgroundColor: "rgba(26, 20, 14, 0.55)" }}
      />

      {/* Drawer Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-72 z-[100003] transition-all duration-300 shadow-2xl flex flex-col ${
          showNav ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ background: "var(--paper)" }}
      >
        {/* Drawer Header */}
        <div
          className="flex items-center justify-between px-6 py-5 border-b"
          style={{ borderColor: "var(--line)" }}
        >
          <div className="flex items-center gap-2.5">
            <div
              className="w-7 h-7 rounded-full relative"
              style={{ background: "var(--terracotta)" }}
            >
              <div
                className="absolute inset-[5px] rounded-full"
                style={{ background: "var(--paper)" }}
              />
              <div
                className="absolute inset-[10px] rounded-full"
                style={{ background: "var(--terracotta)" }}
              />
            </div>
            <span
              className="font-serif text-base font-bold"
              style={{ color: "var(--ink)" }}
            >
              Wantilan Kriya
            </span>
          </div>
          <button
            onClick={() => setShowNav(false)}
            className="w-8 h-8 flex items-center justify-center rounded-md transition-colors hover:bg-[var(--line-soft)]"
            aria-label="Close Menu"
          >
            <CgClose className="w-4 h-4" style={{ color: "var(--ink-soft)" }} />
          </button>
        </div>

        {/* Drawer Nav Links */}
        <nav className="flex-1 px-4 py-4 flex flex-col gap-1">
          {NavLinks.map((nav) => (
            <Link
              key={nav.id}
              href={nav.url}
              onClick={() => setShowNav(false)}
              className="flex items-center px-3 py-3 rounded-lg text-sm font-medium transition-colors hover:bg-[var(--line-soft)]"
              style={{ color: "var(--ink-soft)" }}
            >
              {nav.label}
            </Link>
          ))}
        </nav>

        {/* Drawer Footer CTA */}
        <div
          className="px-4 pb-8 pt-4 border-t"
          style={{ borderColor: "var(--line)" }}
        >
          <Link
            href="#community"
            onClick={() => setShowNav(false)}
            className="flex items-center justify-center gap-1.5 w-full px-4 py-3 rounded-lg text-sm font-semibold text-white transition-colors hover:opacity-90"
            style={{ background: "var(--terracotta)" }}
          >
            + Bagikan Cerita
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
