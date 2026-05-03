import type { Metadata } from "next";
import {
  JetBrains_Mono,
  Playfair_Display,
  Plus_Jakarta_Sans,
} from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/providers/query-provider";
import { LocaleProvider } from "@/providers/locale-provider";
import { Toaster } from "@/components/ui/sonner";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Eventlio | The Business OS for Event Vendors",
  description:
    "Pakistan ka pehla premium vendor marketplace and business operating system for bridal salons, makeup artists, photographers, decorators, caterers, and event teams.",
  keywords: [
    "Eventlio",
    "Pakistan wedding vendors",
    "vendor CRM",
    "event marketplace",
    "bridal makeup software",
    "photographer booking platform",
  ],
  openGraph: {
    title: "Eventlio | The Business OS for Event Vendors",
    description:
      "Manage bookings, track payments, and grow your event business with Pakistan-first discovery and operations.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${playfair.variable} ${jakarta.variable} ${mono.variable} font-body text-[15px] text-[var(--dark)]`}
      >
        <LocaleProvider>
          <QueryProvider>
            {children}
            <Toaster richColors position="top-right" />
          </QueryProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
