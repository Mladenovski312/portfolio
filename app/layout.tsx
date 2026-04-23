import type { Metadata } from "next";
import { Geist, Geist_Mono, Archivo } from "next/font/google";
import "./globals.css";

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

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Filip Mladenovski · AI Engineer & Full-Stack Builder",
  description:
    "I build AI-powered web apps and automation systems. Full-stack products, AI agents, and data pipelines, shipped fast with Claude Code.",
  openGraph: {
    title: "Filip Mladenovski · AI Engineer & Full-Stack Builder",
    description:
      "Full-stack products, AI agents, and data pipelines, shipped fast.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Filip Mladenovski · AI Engineer & Full-Stack Builder",
    description:
      "Full-stack products, AI agents, and data pipelines, shipped fast.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${archivo.variable} antialiased`}
    >
      <body className="min-h-screen bg-bg text-text">{children}</body>
    </html>
  );
}
