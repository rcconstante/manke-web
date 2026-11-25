import Image from "next/image";
import Link from "next/link";
import { StoreBadges } from "./StoreBadges";

export function Footer() {
  return (
    <footer className="bg-[#0E0B16] text-white">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-16">
        <div className="flex flex-col justify-between gap-12 md:flex-row md:items-start">
          <div className="max-w-sm">
            <Link href="/" className="flex items-center gap-2.5">
              <Image
                src="/logo.png"
                alt="Ordly"
                width={32}
                height={32}
                className="rounded-xl"
              />
              <span className="text-lg font-extrabold tracking-tight text-white">
                Ordly
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-[#A39BB8]">
              Your all-in-one life &amp; budget app. Track spending, plan your
              schedule, manage recurring bills, and stay organized — offline
              first, with optional cloud sync.
            </p>
            <div className="mt-6">
              <StoreBadges size="sm" tone="footer" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:gap-16">
            <div>
              <h3 className="text-xs font-semibold tracking-[0.12em] text-[#7D7496] uppercase">
                Product
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-[#C7C0DA]">
                <li>
                  <Link href="/#features" className="transition hover:text-white">
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#screenshots"
                    className="transition hover:text-white"
                  >
                    App Preview
                  </Link>
                </li>
                <li>
                  <Link href="/#download" className="transition hover:text-white">
                    Download
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-semibold tracking-[0.12em] text-[#7D7496] uppercase">
                Legal
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-[#C7C0DA]">
                <li>
                  <Link href="/terms" className="transition hover:text-white">
                    Terms of Use
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="transition hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/delete-account"
                    className="transition hover:text-white"
                  >
                    Delete your account
                  </Link>
                </li>
                <li>
                  <Link href="/cookies" className="transition hover:text-white">
                    Cookie Notice
                  </Link>
                </li>
                <li>
                  <Link href="/license" className="transition hover:text-white">
                    License
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-[#7D7496] sm:flex-row">
          <p>© 2026 Ordly. All rights reserved.</p>
          <p>Plan · Track · Spend</p>
        </div>
      </div>
    </footer>
  );
}
