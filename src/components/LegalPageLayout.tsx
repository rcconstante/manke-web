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
    <div className="bg-[#FAFAFC]">
      <article className="mx-auto max-w-2xl px-5 py-16 sm:px-8 sm:py-24">
        <header className="text-center">
          <p className="text-xs font-bold tracking-[0.14em] text-[#7939DF] uppercase">
            Legal
          </p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-[#17112E] sm:text-5xl">
            {title}
          </h1>
          <p className="mt-3 text-base text-[#6B6480]">{subtitle}</p>
        </header>

        <div className="mt-12 space-y-5 text-[15px] leading-[1.8] text-[#4E4663] sm:text-base">
          {children}
        </div>

        <footer className="mt-14 border-t border-[#E9E4F5] pt-8">
          <p className="text-xs text-[#857D9B]">Last updated: {lastUpdated}</p>
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
                      ? "font-semibold text-[#7939DF]"
                      : "text-[#6B6480] transition hover:text-[#17112E]"
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
