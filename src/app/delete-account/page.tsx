import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/LegalPageLayout";
import { SUPPORT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Delete Your Account",
  description: "How to delete your Manke account and synced data.",
};

export default function DeleteAccountPage() {
  return (
    <LegalPageLayout
      active="delete-account"
      title="Delete Your Account"
      subtitle="Permanently remove your Manke account and cloud data anytime."
      lastUpdated="November 26, 2026"
    >
      <p className="font-semibold text-[#0F172A]">
        You can delete your Manke account directly inside the app in just a few
        taps — deletion takes effect immediately.
      </p>

      <p>
        Open Manke, sign in to your account, and go to{" "}
        <strong className="font-semibold text-[#0F172A]">
          Settings → Delete Account
        </strong>
        . Choose{" "}
        <strong className="font-semibold text-[#0F172A]">
          Delete Account Only
        </strong>{" "}
        to keep your local data on your phone, or{" "}
        <strong className="font-semibold text-[#0F172A]">
          Delete Everything
        </strong>{" "}
        to erase both your cloud account and local entries.
      </p>

      <p>
        Deleting your account permanently removes your email login and all
        cloud-synced budgets, transactions, bills, calendar events, and tasks.
        If you have an active subscription, remember to cancel it separately in
        your Apple App Store or Google Play subscription settings.
      </p>

      {SUPPORT_EMAIL ? (
        <p>
          No longer have the app installed? Email{" "}
          <a
            href={`mailto:${SUPPORT_EMAIL}?subject=Delete%20my%20Manke%20account`}
            className="font-medium text-[#1D6BF3] underline"
          >
            {SUPPORT_EMAIL}
          </a>{" "}
          from your Manke account email with the subject &ldquo;Delete my Manke
          account&rdquo; and we will delete it within 7 days.
        </p>
      ) : null}
    </LegalPageLayout>
  );
}
