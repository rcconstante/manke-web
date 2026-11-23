import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[#E9DDFC] bg-[#FAF7FF]">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-start">
          <div className="max-w-xs">
            <Link href="/" className="flex items-center gap-2.5">
              <Image
                src="/logo.png"
                alt="Ordly Logo"
                width={32}
                height={32}
                className="rounded-xl"
              />
              <span className="text-lg font-bold tracking-tight text-[#211340]">
                Ordly
              </span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-[#5C4E78]">
              Plan · Track · Spend. One calm workspace for your schedule,
              budget, bills, and daily checklists.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:gap-14">
            <div>
              <h3 className="text-xs font-bold tracking-wider text-[#211340] uppercase">
                Product
              </h3>
              <ul className="mt-3 space-y-2.5 text-sm text-[#5C4E78]">
                <li>
                  <Link href="/" className="transition hover:text-[#7940D4]">
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#features"
                    className="transition hover:text-[#7940D4]"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#get-started"
                    className="transition hover:text-[#7940D4]"
                  >
                    Download
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-bold tracking-wider text-[#211340] uppercase">
                Legal
              </h3>
              <ul className="mt-3 space-y-2.5 text-sm text-[#5C4E78]">
                <li>
                  <Link
                    href="/terms"
                    className="transition hover:text-[#7940D4]"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="transition hover:text-[#7940D4]"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cookies"
                    className="transition hover:text-[#7940D4]"
                  >
                    Cookie Notice
                  </Link>
                </li>
                <li>
                  <Link
                    href="/license"
                    className="transition hover:text-[#7940D4]"
                  >
                    License
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-[#E9DDFC] pt-6 text-xs text-[#5C4E78] sm:flex-row">
          <p>© 2026 Ordly. All rights reserved.</p>
          <p>get-ordly.vercel.app</p>
        </div>
      </div>
    </footer>
  );
}
