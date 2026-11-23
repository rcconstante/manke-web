import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/LegalPageLayout";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service governing your use of the Ordly mobile app and website.",
};

export default function TermsPage() {
  return (
    <LegalPageLayout
      active="terms"
      title="Terms of Service"
      subtitle="Please read these terms carefully before creating an account or using the Ordly mobile application and website."
      lastUpdated="November 23, 2026"
    >
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-[#211340]">1. Acceptance of Terms</h2>
        <p>
          By accessing or using Ordly (the mobile application and the website at{" "}
          <span className="font-medium text-[#211340]">get-ordly.vercel.app</span>),
          you agree to be bound by these Terms of Service. If you do not agree to
          these terms, please do not use Ordly.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-[#211340]">2. Description of Service</h2>
        <p>
          Ordly provides personal organization tools including a home dashboard,
          calendar, budget tracker, bill reminders, checklists, and profile
          management. Ordly is intended for personal informational and planning
          purposes only and does not provide financial, tax, or legal advice.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-[#211340]">3. Accounts & Security</h2>
        <p>
          When you create an account, you are responsible for providing accurate
          information and keeping your login credentials confidential. You agree to
          notify us promptly if you suspect any unauthorized access to your
          account.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-[#211340]">4. Acceptable Use</h2>
        <p>You agree not to:</p>
        <ul className="list-disc space-y-1.5 pl-6">
          <li>Use Ordly for any unlawful, fraudulent, or harmful purpose.</li>
          <li>Attempt to reverse engineer, disrupt, or interfere with the app or its infrastructure.</li>
          <li>Upload malicious code, spam, or content that infringes the rights of others.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-[#211340]">5. Intellectual Property</h2>
        <p>
          The Ordly name, logo, design elements, and software are owned by Ordly
          and its contributors, subject to the open-source license terms detailed
          on our License page.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-[#211340]">6. Disclaimers & Limitation of Liability</h2>
        <p>
          Ordly is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo;
          without warranties of any kind. To the maximum extent permitted by law,
          Ordly shall not be liable for any indirect, incidental, or consequential
          damages arising from your use of the service, including missed bill
          payments or budgeting discrepancies.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-[#211340]">7. Changes to Terms</h2>
        <p>
          We may update these Terms of Service from time to time. Continued use of
          Ordly after updates take effect constitutes acceptance of the revised
          terms.
        </p>
      </section>
    </LegalPageLayout>
  );
}
