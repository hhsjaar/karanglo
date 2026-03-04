import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

const geistSans = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Roboto_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

let baseUrlStr = process.env.NEXT_PUBLIC_APP_URL || process.env.VERCEL_URL || 'http://localhost:3000';
if (!baseUrlStr.startsWith('http')) {
  baseUrlStr = `https://${baseUrlStr}`;
}
const baseUrl = new URL(baseUrlStr);

export const metadata: Metadata = {
  metadataBase: baseUrl,
  title: {
    default: "Desa Karanglo | Website Resmi Pemerintah Desa",
    template: "%s | Desa Karanglo"
  },
  description: "Website Resmi Pemerintah Desa Karanglo, Kecamatan Polanharjo, Kabupaten Klaten. Informasi terkini, layanan publik, dan potensi desa wisata.",
  keywords: ["Desa Karanglo", "Karanglo Polanharjo", "Klaten", "Desa Wisata Klaten", "Pemerintah Desa Karanglo", "Klaten Tengah", "Wisata Karanglo"],
  authors: [{ name: "Pemerintah Desa Karanglo" }],
  creator: "Pemerintah Desa Karanglo",
  publisher: "Pemerintah Desa Karanglo",
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Desa Karanglo | Website Resmi Pemerintah Desa",
    description: "Website Resmi Pemerintah Desa Karanglo, Kecamatan Polanharjo, Kabupaten Klaten. Informasi terkini, layanan publik, dan potensi desa wisata.",
    url: baseUrl,
    siteName: "Desa Karanglo",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Desa Karanglo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Desa Karanglo | Website Resmi Pemerintah Desa",
    description: "Website Resmi Pemerintah Desa Karanglo, Kecamatan Polanharjo, Kabupaten Klaten. Informasi terkini, layanan publik, dan potensi desa wisata.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'government',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col font-sans`}
      >
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
