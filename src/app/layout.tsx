import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/next";
import { Geist, Geist_Mono } from "next/font/google";
import { profile } from "@/content/profile";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Ashen's World | Game-Engine Inspired Portfolio",
    template: "%s | Ashen's World",
  },
  description:
    "Interactive 3D developer portfolio for Ashen Imalsha — explore projects, technical stack, education, achievements, and experience inside a lightweight web-based world.",
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Ashen's World",
    title: "Ashen's World | Game-Engine Inspired Portfolio",
    description:
      "Explore full-stack projects, engineering case studies, and technical stack inside an interactive 3D campus or Classic View.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ashen's World | Game-Engine Inspired Portfolio",
    description:
      "Interactive 3D developer portfolio for Ashen Imalsha with standalone engineering case studies.",
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  alternateName: profile.handle,
  jobTitle: profile.role,
  url: SITE_URL,
  sameAs: [profile.socials.github, profile.socials.linkedin].filter(Boolean),
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col bg-[#060A12] text-[#E6F0FF] selection:bg-cyan-400/30 selection:text-cyan-100"
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
        {process.env.GITHUB_PAGES !== "true" && <Analytics />}
      </body>
    </html>
  );
}
