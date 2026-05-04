// src/app/layout.tsx
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";

// Memuat font Satoshi (untuk teks isi/body)
const satoshi = localFont({
  src: [
    {
      path: "../../public/fonts/Satoshi-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Satoshi-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-satoshi",
});

// Memuat font Sentient (untuk judul/heading)
const sentient = localFont({
  src: [
    {
      path: "../../public/fonts/Sentient-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-sentient",
});

export const metadata: Metadata = {
  title: "Wantilan Kriya",
  description: "Ruang Berbagi Pengrajin Bali",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${satoshi.variable} ${sentient.variable}`}>
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
