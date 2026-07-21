import type { Metadata } from "next";
import { Atkinson_Hyperlegible, Fraunces, Work_Sans } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SITE_NAME, SITE_DESCRIPTION } from "@/lib/constants";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
  display: "swap",
});

const atkinsonHyperlegible = Atkinson_Hyperlegible({
  subsets: ["latin"],
  variable: "--font-atkinson-hyperlegible",
  display: "swap",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "pengrajin",
    "Bali",
    "kriya",
    "tenun",
    "ukiran",
    "perak",
    "komunitas",
  ],
  authors: [{ name: "Control + Craft Bali" }],
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    type: "website",
    locale: "id_ID",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${fraunces.variable} ${atkinsonHyperlegible.variable}`}
    >
      <body className="font-sans antialiased min-h-screen flex flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
