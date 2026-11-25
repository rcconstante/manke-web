import Image from "next/image";
import Link from "next/link";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-[#17112E]/[0.06] bg-[#FAFAFC]/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/logo.png"
            alt="Ordly"
            width={34}
            height={34}
            className="rounded-xl shadow-sm"
            priority
          />
          <span className="text-xl font-extrabold tracking-tight text-[#17112E]">
            Ordly
          </span>
        </Link>

        <div className="flex items-center gap-7">
          <nav className="hidden items-center gap-7 text-sm font-medium text-[#5C5470] md:flex">
            <Link href="/#features" className="transition hover:text-[#17112E]">
              Features
            </Link>
            <Link
              href="/#screenshots"
              className="transition hover:text-[#17112E]"
            >
              Preview
            </Link>
            <Link href="/privacy" className="transition hover:text-[#17112E]">
              Privacy
            </Link>
            <Link href="/terms" className="transition hover:text-[#17112E]">
              Terms
            </Link>
          </nav>

          <Link
            href="/#download"
            className="rounded-full bg-[#17112E] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#7939DF]"
          >
            Download Ordly
          </Link>
        </div>
      </div>
    </header>
  );
}
