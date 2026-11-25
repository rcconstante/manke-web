import Link from "next/link";
import type { ReactNode } from "react";

type LegalSlug = "terms" | "privacy" | "cookies" | "license" | "delete-account";

const LEGAL_LINKS: { slug: LegalSlug; label: string; href: string }[] = [
  { slug: "terms", label: "Terms of Use", href: "/terms" },
  { slug: "privacy", label: "Privacy Policy", href: "/privacy" },
  { slug: "delete-account", label: "Delete Account", href: "/delete-account" },
  { slug: "cookies", label: "Cookies", href: "/cookies" },
  { slug: "license", label: "License", href: "/license" },
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
    <div className="bg-[#F8FAFF]">
      <article className="mx-auto max-w-2xl px-5 py-16 sm:px-8 sm:py-24">
        <header className="text-center">
          <p className="text-xs font-bold tracking-[0.14em] text-[#1D6BF3] uppercase">
            Legal
          </p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-[#0F172A] sm:text-5xl">
            {title}
          </h1>
          <p className="mt-3 text-base text-[#64748B]">{subtitle}</p>
        </header>

        <div className="mt-12 space-y-5 text-[15px] leading-[1.8] text-[#475569] sm:text-base">
          {children}
        </div>

        <footer className="mt-14 border-t border-[#E2E8F0] pt-8">
          <p className="text-xs text-[#64748B]">Last updated: {lastUpdated}</p>
          <nav
            aria-label="Legal pages"
            className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm"
          >
            {LEGAL_LINKS.map((item) => {
              const isActive = item.slug === active;
              return (
                <Link
                  key={item.slug}
                  href={item.href}
                  className={
                    isActive
                      ? "font-semibold text-[#1D6BF3]"
                      : "text-[#64748B] transition hover:text-[#0F172A]"
                  }
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </footer>
      </article>
    </div>
  );
}
