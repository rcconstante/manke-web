import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/LegalPageLayout";

export const metadata: Metadata = {
  title: "Cookie Notice",
  description: "Simple cookie notice for the Manke website.",
};

export default function CookiesPage() {
  return (
    <LegalPageLayout
      active="cookies"
      title="Cookie Notice"
      subtitle="How the Manke website uses cookies."
      lastUpdated="November 26, 2026"
    >
      <p className="font-semibold text-[#0F172A]">
        The Manke website uses only basic, strictly necessary browser storage
        needed to load pages reliably. We do not use advertising cookies or
        cross-site trackers.
      </p>

      <p>
        You can clear or block cookies anytime in your browser settings. Because
        we do not run ad networks or behavioral tracking scripts on this site,
        browsing Manke stays simple and private.
      </p>
    </LegalPageLayout>
  );
}
