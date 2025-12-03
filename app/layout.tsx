"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { I18nextProvider } from "react-i18next";
import i18n from "@/app/i18n";
import { useLanguageDetector } from "@/lib/hooks/uselanguageDetector";
import Header from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Change language base on browser's language
  useLanguageDetector();

  return (
    <html lang={i18n?.resolvedLanguage || "vi"}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <I18nextProvider i18n={i18n}>
          <Header />
          {children}
          <Toaster />
        </I18nextProvider>
      </body>
    </html>
  );
}
