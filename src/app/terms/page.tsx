import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/LegalPageLayout";
import { SUPPORT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Simple terms for using Ordly.",
};

export default function TermsPage() {
  return (
    <LegalPageLayout
      active="terms"
      title="Terms of Use"
      subtitle="Simple terms for using Ordly."
      lastUpdated="November 25, 2026"
    >
      <p className="font-semibold text-[#17112E]">
        Ordly is a personal planning and budgeting app for everyday individual
        use. You are responsible for how you use the app and for keeping your
        device, account credentials, and backups secure.
      </p>

      <p>
        Ordly is free to download and works offline on your device without an
        account. Core budgeting, calendar, bill reminders, and checklist tools
        are available right away. Optional Ordly VIP plans unlock extra features
        such as cloud sync, custom themes, home screen widgets, and extended
        insights.
      </p>

      <p>
        Purchases and subscriptions are billed through the Apple App Store or
        Google Play, and renewals, cancellations, and refunds are handled by
        Apple or Google under their own terms. Subscriptions renew automatically
        unless canceled in your App Store or Google Play account settings at
        least 24 hours before the end of the current period.
      </p>

      <p>
        Optional cloud sync depends on an internet connection and third-party
        hosting services. We may update, improve, or change optional cloud
        features if needed for technical, security, or product reasons.
      </p>

      <p>
        Ordly is intended for personal organization only and does not provide
        financial, tax, or legal advice. The app is provided &ldquo;as is&rdquo;
        without warranties, and we are not liable for missed payments,
        budgeting discrepancies, or indirect damages from using the app.
      </p>

      <p>
        We may update these terms from time to time. Continued use of Ordly
        after changes are posted means you accept the updated terms.
        {SUPPORT_EMAIL ? (
          <>
            {" "}
            Questions? Contact us at{" "}
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
