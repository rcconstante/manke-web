import type { Metadata } from "next";
import Link from "next/link";
import { LegalPageLayout } from "@/components/LegalPageLayout";
import { SUPPORT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Simple overview of how Ordly handles your data.",
};

export default function PrivacyPage() {
  return (
    <LegalPageLayout
      active="privacy"
      title="Privacy Policy"
      subtitle="Simple, clear privacy practices for Ordly."
      lastUpdated="November 25, 2026"
    >
      <p className="font-semibold text-[#17112E]">
        Ordly is offline first. Without an account, everything you enter stays
        strictly on your device and is never sent to our servers.
      </p>

      <p>
        If you choose to create an account for Cloud Backup &amp; Sync, we store
        your name, email address, securely hashed password, and the app data you
        sync (budgets, transactions, bills, calendar events, tasks, and
        preferences) using Supabase so it stays backed up across your devices.
        Profile photos and local reminders stay on your device.
      </p>

      <p>
        Subscriptions are processed by Apple App Store or Google Play and
        verified via RevenueCat using an anonymous app user ID. We never see or
        store your credit card or bank details. If an unexpected error occurs,
        Ordly may send a minimal technical diagnostic report (error code,
        platform, and OS version) without any of your financial entries.
      </p>

      <p>
        We never show ads, never track you across other apps or websites, and
        never sell or rent your personal information. Your synced data is
        encrypted in transit and isolated to your account.
      </p>

      <p>
        You stay in control of your data. You can export your data anytime in
        the app, or permanently delete your account and cloud data under{" "}
        <strong className="font-semibold text-[#17112E]">
          Profile → Delete Account
        </strong>{" "}
        (or read our{" "}
        <Link
          href="/delete-account"
          className="font-medium text-[#7939DF] underline"
        >
          account deletion guide
        </Link>
        ). Diagnostic logs are kept for up to 90 days and unlinked from deleted
        accounts.
      </p>

      <p>
        Ordly is not directed to children under 13. We will update this page if
        our privacy practices change.
        {SUPPORT_EMAIL ? (
          <>
            {" "}
            Questions about your privacy? Email{" "}
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="font-medium text-[#7939DF] underline"
            >
              {SUPPORT_EMAIL}
            </a>
            .
          </>
        ) : null}
      </p>
    </LegalPageLayout>
  );
}
