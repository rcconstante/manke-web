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
  metadataBase: new URL("https://get-manke.vercel.app"),
  title: {
    default: "Manke — Your all-in-one life & budget app",
    template: "%s | Manke",
  },
  description:
    "Track savings, plan your schedule, manage recurring bills, and stay on top of daily tasks in one calm mobile app — works offline first, with optional cloud sync.",
  icons: {
    icon: "/favicon.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Manke — Your all-in-one life & budget app",
    description:
      "Track savings, plan your schedule, manage recurring bills, and stay on top of daily tasks in one calm mobile app.",
    url: "https://get-manke.vercel.app",
    siteName: "Manke",
    images: [{ url: "/logo.png", width: 512, height: 512, alt: "Manke Logo" }],
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#FAFAFC] text-[#17112E]">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
