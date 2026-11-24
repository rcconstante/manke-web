import Link from "next/link";
import type { ReactNode } from "react";

type LegalSlug = "terms" | "privacy" | "cookies" | "license" | "delete-account";

const LEGAL_TABS: { slug: LegalSlug; label: string; href: string }[] = [
  { slug: "terms", label: "Terms of Service", href: "/terms" },
  { slug: "privacy", label: "Privacy Policy", href: "/privacy" },
  { slug: "cookies", label: "Cookie Notice", href: "/cookies" },
  { slug: "license", label: "License", href: "/license" },
  { slug: "delete-account", label: "Delete Account", href: "/delete-account" },
];

type LegalPageLayoutProps = {
  active: LegalSlug;
  title: string;
  subtitle: string;
  lastUpdated: string;
  children: ReactNode;
};

export function LegalPageLayout({
  active,
  title,
  subtitle,
  lastUpdated,
  children,
}: LegalPageLayoutProps) {
  return (
    <div>
      <section className="bg-gradient-to-br from-[#7940D4] via-[#7939DF] to-[#5B23B5] px-5 py-12 text-white sm:px-8 sm:py-16">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs font-semibold tracking-widest text-[#F7EEFF] uppercase">
            Ordly Legal
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            {title}
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#F7EEFF] sm:text-base">
            {subtitle}
          </p>
          <p className="mt-4 text-xs text-[#DAC1FA]">
            Last updated: {lastUpdated}
          </p>
        </div>
      </section>

      <div className="border-b border-[#E9DDFC] bg-[#FAF7FF]">
        <div className="mx-auto flex max-w-4xl flex-wrap gap-2 px-5 py-3 sm:px-8">
          {LEGAL_TABS.map((tab) => {
            const isActive = tab.slug === active;
            return (
              <Link
                key={tab.slug}
                href={tab.href}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition sm:text-sm ${
                  isActive
                    ? "bg-[#7940D4] text-white"
                    : "bg-white text-[#5C4E78] ring-1 ring-[#E9DDFC] hover:text-[#7940D4]"
                }`}
              >
                {tab.label}
              </Link>
            );
          })}
        </div>
      </div>

      <article className="mx-auto max-w-4xl space-y-8 px-5 py-10 text-sm leading-relaxed text-[#5C4E78] sm:px-8 sm:py-14 sm:text-base">
        {children}
      </article>
    </div>
  );
}
