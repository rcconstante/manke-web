import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/LegalPageLayout";
import { SUPPORT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Delete Your Account",
  description: "How to delete your Ordly account and the data stored with it.",
};


export default function DeleteAccountPage() {
  return (
    <LegalPageLayout
      active="delete-account"
      title="Delete Your Ordly Account"
      subtitle="You can permanently delete your Ordly account and its cloud data at any time."
      lastUpdated="November 25, 2026"
    >
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-[#211340]">Delete in the app</h2>
        <ol className="list-decimal space-y-1.5 pl-6">
          <li>Open Ordly and log in to the account you want to delete.</li>
          <li>Go to <strong className="text-[#211340]">Profile → Delete Account</strong>.</li>
          <li>
            Choose <strong className="text-[#211340]">Delete Account Only</strong> (keeps your
            data on this device) or <strong className="text-[#211340]">Delete Everything</strong>,
            then confirm.
          </li>
        </ol>
        <p>Deletion happens immediately. Logging in again will not restore the account.</p>
      </section>

      {SUPPORT_EMAIL ? (
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-[#211340]">No longer have the app?</h2>
          <p>
            Email{" "}
            <a className="font-medium text-[#7939DF] underline" href={`mailto:${SUPPORT_EMAIL}?subject=Delete%20my%20Ordly%20account`}>
              {SUPPORT_EMAIL}
            </a>{" "}
            from the email address of your Ordly account with the subject &quot;Delete my Ordly
            account&quot;. We will delete it within 7 days and confirm by email.
          </p>
        </section>
      ) : null}

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-[#211340]">What is deleted</h2>
        <ul className="list-disc space-y-1.5 pl-6">
          <li>Your login (email and password).</li>
          <li>All cloud-synced data: profile, budgets, transactions, bills, events, and tasks.</li>
          <li>Diagnostic error reports are kept for up to 90 days without any link to you.</li>
        </ul>
        <p>
          Subscriptions are billed by Apple or Google. Deleting your account does not cancel
          them; cancel in your App Store or Google Play subscription settings.
        </p>
      </section>
    </LegalPageLayout>
  );
}
