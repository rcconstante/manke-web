import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/LegalPageLayout";
import { SUPPORT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Delete Your Account",
  description: "How to delete your Ordly account and synced data.",
};

export default function DeleteAccountPage() {
  return (
    <LegalPageLayout
      active="delete-account"
      title="Delete Your Account"
      subtitle="Permanently remove your Ordly account and cloud data anytime."
      lastUpdated="November 25, 2026"
    >
      <p className="font-semibold text-[#17112E]">
        You can delete your Ordly account directly inside the app in just a few
        taps — deletion takes effect immediately.
      </p>

      <p>
        Open Ordly, sign in to your account, and go to{" "}
        <strong className="font-semibold text-[#17112E]">
          Profile → Delete Account
        </strong>
        . Choose{" "}
        <strong className="font-semibold text-[#17112E]">
          Delete Account Only
        </strong>{" "}
        to keep your local data on your phone, or{" "}
        <strong className="font-semibold text-[#17112E]">
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
            href={`mailto:${SUPPORT_EMAIL}?subject=Delete%20my%20Ordly%20account`}
            className="font-medium text-[#7939DF] underline"
          >
            {SUPPORT_EMAIL}
          </a>{" "}
          from your Ordly account email with the subject &ldquo;Delete my Ordly
          account&rdquo; and we will delete it within 7 days.
        </p>
      ) : null}
    </LegalPageLayout>
  );
}
