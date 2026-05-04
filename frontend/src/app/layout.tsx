import type { Metadata } from "next";
import "@fontsource/playfair-display/400.css";
import "@fontsource/playfair-display/500.css";
import "@fontsource/playfair-display/600.css";
import "@fontsource/playfair-display/700.css";
import "@fontsource/plus-jakarta-sans/300.css";
import "@fontsource/plus-jakarta-sans/400.css";
import "@fontsource/plus-jakarta-sans/500.css";
import "@fontsource/plus-jakarta-sans/600.css";
import "@fontsource/plus-jakarta-sans/700.css";
import "@fontsource/plus-jakarta-sans/800.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "./globals.css";
import { QueryProvider } from "@/providers/query-provider";
import { LocaleProvider } from "@/providers/locale-provider";
import { Toaster } from "@/components/ui/sonner";

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
      <body className="font-body text-[15px] text-[var(--dark)]">
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
