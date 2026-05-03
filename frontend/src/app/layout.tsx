import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/providers/query-provider";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Eventlio — The Operating System for Event Businesses",
  description:
    "Eventlio is the modern marketplace to discover, book, and manage event service providers. Built for salons, photographers, decorators, caterers, and more.",
  keywords: [
    "events",
    "vendor marketplace",
    "event management",
    "eventlio",
    "wedding vendors",
    "event services",
  ],
  openGraph: {
    title: "Eventlio — The Operating System for Event Businesses",
    description:
      "Discover, book, and manage event service providers — all in one platform.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>
          {children}
          <Toaster richColors position="top-right" />
        </QueryProvider>
      </body>
    </html>
  );
}
