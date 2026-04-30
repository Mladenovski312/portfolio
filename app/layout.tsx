import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { PersonJsonLd } from "@/components/seo/PersonJsonLd";
import { MotionRoot } from "@/components/ui/MotionRoot";
import { site } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Filip Mladenovski · AI Engineer & Full-Stack Builder",
    template: "%s · Filip Mladenovski",
  },
  description:
    "I build AI-powered web apps and automation systems. Full-stack products, AI agents, and data pipelines, shipped fast.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Filip Mladenovski · AI Engineer & Full-Stack Builder",
    description:
      "Full-stack products, AI agents, and data pipelines, shipped fast.",
    type: "website",
    url: site.url,
    siteName: site.name,
  },
  twitter: {
    card: "summary_large_image",
    title: "Filip Mladenovski · AI Engineer & Full-Stack Builder",
    description:
      "Full-stack products, AI agents, and data pipelines, shipped fast.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen bg-bg text-text">
        <PersonJsonLd />
        <MotionRoot>{children}</MotionRoot>
      </body>
    </html>
  );
}
