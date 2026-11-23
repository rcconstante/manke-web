import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/LegalPageLayout";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Ordly collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <LegalPageLayout
      active="privacy"
      title="Privacy Policy"
      subtitle="Your trust matters. This Privacy Policy explains what information Ordly collects, how it is used, and the choices you have."
      lastUpdated="November 23, 2026"
    >
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-[#211340]">1. Information We Collect</h2>
        <p>Depending on how you use Ordly, we may collect:</p>
        <ul className="list-disc space-y-1.5 pl-6">
          <li>
            <strong className="text-[#211340]">Account Information:</strong> Your
            name, email address, and encrypted authentication credentials when you
            create an account.
          </li>
          <li>
            <strong className="text-[#211340]">App Content:</strong> Calendar
            events, budgets, bill entries, and checklist items you voluntarily add
            to Ordly.
          </li>
          <li>
            <strong className="text-[#211340]">Technical Data:</strong> Basic
            device and diagnostic information needed to keep the app stable and
            secure.
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-[#211340]">2. How We Use Your Information</h2>
        <p>We use your information strictly to:</p>
        <ul className="list-disc space-y-1.5 pl-6">
          <li>Provide, personalize, and sync your Ordly dashboard and tools.</li>
          <li>Send reminders or account notifications you opt into.</li>
          <li>Maintain app security, troubleshoot bugs, and improve performance.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-[#211340]">3. Data Sharing</h2>
        <p>
          We do <strong className="text-[#211340]">not</strong> sell your
          personal data. We only share data with trusted infrastructure providers
          (such as hosting or database services) strictly necessary to operate
          Ordly, or when required by law.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-[#211340]">4. Data Retention & Deletion</h2>
        <p>
          We retain your account and planning data for as long as your account is
          active. You may request export or deletion of your account data at any
          time.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-[#211340]">5. Security</h2>
        <p>
          We use industry-standard safeguards, including encrypted transport
          (HTTPS/TLS), to protect your information against unauthorized access or
          disclosure.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-[#211340]">6. Children&apos;s Privacy</h2>
        <p>
          Ordly is not directed to children under 13, and we do not knowingly
          collect personal information from children under 13.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-[#211340]">7. Contact Us</h2>
        <p>
          If you have questions about this Privacy Policy or your data rights,
          please reach out via our GitHub repository at{" "}
          <span className="font-medium text-[#211340]">
            github.com/rcconstante/ordly
          </span>
          .
        </p>
      </section>
    </LegalPageLayout>
  );
}
