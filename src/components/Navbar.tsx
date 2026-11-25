import Image from "next/image";
import Link from "next/link";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-[#0F172A]/[0.06] bg-[#FAFAFC]/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/logo.png"
            alt="Manke"
            width={34}
            height={34}
            className="rounded-xl shadow-sm"
            priority
          />
          <span className="text-xl font-extrabold tracking-tight text-[#0F172A]">
            Manke
          </span>
        </Link>

        <div className="flex items-center gap-6">
          <nav className="hidden items-center gap-6 text-sm font-medium text-[#475569] md:flex">
            <Link href="/#features" className="transition hover:text-[#0F172A]">
              Features
            </Link>
            <Link
              href="/playground"
              className="inline-flex items-center gap-1.5 font-semibold text-[#1D6BF3] transition hover:text-[#1554D1]"
            >
              <span>◆</span>
              Playground
            </Link>
            <Link href="/privacy" className="transition hover:text-[#0F172A]">
              Privacy
            </Link>
            <Link href="/terms" className="transition hover:text-[#0F172A]">
              Terms
            </Link>
          </nav>

          <Link
            href="/#download"
            className="rounded-full bg-[#0F172A] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1D6BF3]"
          >
            Download Manke
          </Link>
        </div>
      </div>
    </header>
  );
}
