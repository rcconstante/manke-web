import type { Metadata } from "next";
import Link from "next/link";
import { LegalPageLayout } from "@/components/LegalPageLayout";
import { SUPPORT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Ordly collects, uses, and protects your personal information.",
};

const h2 = "text-xl font-bold text-[#211340]";
const strong = "text-[#211340]";

export default function PrivacyPage() {
  return (
    <LegalPageLayout
      active="privacy"
      title="Privacy Policy"
      subtitle="Your trust matters. This Privacy Policy explains what information Ordly collects, how it is used, and the choices you have."
      lastUpdated="November 25, 2026"
    >
      <section className="space-y-3">
        <h2 className={h2}>1. Information We Collect</h2>
        <p>
          Ordly works offline first. Without an account, everything you enter stays on your
          device and is never sent to us. Depending on how you use Ordly, we may collect:
        </p>
        <ul className="list-disc space-y-1.5 pl-6">
          <li>
            <strong className={strong}>Account Information:</strong> your name, email address,
            and password (stored only as a secure hash) when you create an account.
          </li>
          <li>
            <strong className={strong}>App Content (only if you have an account):</strong>{" "}
            budgets, transactions, bills, calendar events, checklist tasks, categories, and app
            preferences, so they can be backed up and synced across your devices.
          </li>
          <li>
            <strong className={strong}>Purchase Information:</strong> whether you have an active
            Ordly VIP subscription and which plan. Payments are processed by Apple or Google; we
            never receive your card or bank details.
          </li>
          <li>
            <strong className={strong}>Diagnostics:</strong> when something goes wrong, an error
            code, a reference number, a short technical description, and your device platform and
            OS version. Diagnostics never include your financial entries.
          </li>
        </ul>
        <p>
          A profile photo you choose stays on your device. Reminders are scheduled locally on your
          device. Ordly shows no ads and does not track you across other apps or websites.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className={h2}>2. How We Use Your Information</h2>
        <ul className="list-disc space-y-1.5 pl-6">
          <li>To create your account, sign you in, and reset your password.</li>
          <li>To back up and sync your Ordly data across your devices.</li>
          <li>To unlock Ordly VIP features you have subscribed to.</li>
          <li>To find and fix errors and keep the app stable and secure.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className={h2}>3. Service Providers</h2>
        <p>
          We do <strong className={strong}>not</strong> sell or rent your personal data. We share
          it only with providers that operate Ordly on our behalf:
        </p>
        <ul className="list-disc space-y-1.5 pl-6">
          <li>
            <strong className={strong}>Supabase</strong>: account sign-in, encrypted database
            hosting for synced data, and diagnostics.
          </li>
          <li>
            <strong className={strong}>RevenueCat</strong>: manages subscription status using an
            anonymous app user ID and your store purchase receipts.
          </li>
          <li>
            <strong className={strong}>Apple App Store / Google Play</strong>: process
            subscription payments under their own privacy policies.
          </li>
        </ul>
        <p>We may also disclose information when required by law.</p>
      </section>

      <section className="space-y-3">
        <h2 className={h2}>4. Data Retention &amp; Deletion</h2>
        <p>
          We keep your account and synced data while your account exists. You can delete your
          account at any time in the app under{" "}
          <strong className={strong}>Profile → Delete Account</strong>, or see{" "}
          <Link className="font-medium text-[#7939DF] underline" href="/delete-account">
            how to delete your account
          </Link>
          . Deletion removes your login and all synced data immediately. Diagnostic reports are
          kept for up to 90 days and are unlinked from your account when it is deleted. You can
          also export your data at any time under Profile → Export Data.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className={h2}>5. Security</h2>
        <p>
          Data is encrypted in transit (HTTPS/TLS). Each account can only access its own records
          (database row-level security). Sign-in tokens are kept in your device&apos;s secure
          storage (iOS Keychain / Android Keystore), and on Android local data is excluded from
          device backups.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className={h2}>6. Your Rights</h2>
        <p>
          Under the Philippine Data Privacy Act of 2012 (RA 10173) and similar laws, you may
          access, correct, export, or delete your personal data, and object to its processing.
          Use the in-app tools above or contact us.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className={h2}>7. Children&apos;s Privacy</h2>
        <p>
          Ordly is not directed to children under 13, and we do not knowingly collect personal
          information from children under 13.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className={h2}>8. Changes</h2>
        <p>
          We will update this page when our practices change and revise the date above.
        </p>
      </section>

      {SUPPORT_EMAIL ? (
        <section className="space-y-3">
          <h2 className={h2}>9. Contact Us</h2>
          <p>
            Questions about this policy or your data:{" "}
            <a className="font-medium text-[#7939DF] underline" href={`mailto:${SUPPORT_EMAIL}`}>
              {SUPPORT_EMAIL}
            </a>
            .
          </p>
        </section>
      ) : null}
    </LegalPageLayout>
  );
}
