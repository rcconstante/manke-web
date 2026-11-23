import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
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
  metadataBase: new URL("https://get-ordly.vercel.app"),
  title: {
    default: "Ordly — Plan · Track · Spend",
    template: "%s | Ordly",
  },
  description:
    "Ordly brings your calendar, budget, bills, and daily checklists together in one calm, focused mobile app.",
  icons: {
    icon: "/favicon.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Ordly — Plan · Track · Spend",
    description:
      "Plan your days, track your budget and bills, and check off what matters most with Ordly.",
    url: "https://get-ordly.vercel.app",
    siteName: "Ordly",
    images: [{ url: "/logo.png", width: 512, height: 512, alt: "Ordly Logo" }],
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-[#211340]">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
