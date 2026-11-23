import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/LegalPageLayout";

export const metadata: Metadata = {
  title: "Cookie Notice",
  description: "Information about how Ordly uses cookies and similar technologies.",
};

export default function CookiesPage() {
  return (
    <LegalPageLayout
      active="cookies"
      title="Cookie Notice"
      subtitle="Learn how the Ordly website uses cookies and local storage to deliver a fast, reliable experience."
      lastUpdated="November 23, 2026"
    >
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-[#211340]">1. What Are Cookies?</h2>
        <p>
          Cookies are small text files stored on your device when you visit a
          website. They help websites remember preferences, keep sessions secure,
          and ensure pages load properly.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-[#211340]">2. Cookies We Use</h2>
        <ul className="list-disc space-y-1.5 pl-6">
          <li>
            <strong className="text-[#211340]">Strictly Necessary Cookies:</strong>{" "}
            Required for core site functionality, routing, and security. These
            cannot be disabled in our systems.
          </li>
          <li>
            <strong className="text-[#211340]">Preference Storage:</strong> Used
            to remember basic display settings where applicable.
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-[#211340]">3. No Third-Party Ad Trackers</h2>
        <p>
          Ordly does not use third-party advertising cookies or cross-site ad
          tracking on{" "}
          <span className="font-medium text-[#211340]">get-ordly.vercel.app</span>.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-[#211340]">4. Managing Cookies</h2>
        <p>
          You can control or clear cookies at any time through your browser
          settings. Disabling strictly necessary cookies may affect how parts of
          the website function.
        </p>
      </section>
    </LegalPageLayout>
  );
}
