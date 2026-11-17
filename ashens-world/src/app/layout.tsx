import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: {
    default: "Ashen's World | Game-Engine Inspired Portfolio",
    template: "%s | Ashen's World",
  },
  description:
    "Interactive 3D developer portfolio for Ashen — explore projects, technical stack, education, achievements, and experience inside a lightweight web-based world.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#060A12] text-[#E6F0FF] selection:bg-cyan-400/30 selection:text-cyan-100">
        {children}
      </body>
    </html>
  );
}
