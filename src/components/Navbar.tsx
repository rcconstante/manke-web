import Image from "next/image";
import Link from "next/link";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-[#E9DDFC] bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5 sm:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/logo.png"
            alt="Ordly Logo"
            width={34}
            height={34}
            className="rounded-xl"
            priority
          />
          <span className="text-xl font-bold tracking-tight text-[#211340]">
            Ordly
          </span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-medium text-[#5C4E78] md:flex">
          <Link href="/#features" className="transition hover:text-[#7940D4]">
            Features
          </Link>
          <Link href="/privacy" className="transition hover:text-[#7940D4]">
            Privacy
          </Link>
          <Link href="/terms" className="transition hover:text-[#7940D4]">
            Terms
          </Link>
          <Link href="/cookies" className="transition hover:text-[#7940D4]">
            Cookies
          </Link>
          <Link href="/license" className="transition hover:text-[#7940D4]">
            License
          </Link>
        </nav>

        <Link
          href="/#get-started"
          className="rounded-full bg-[#7940D4] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#5B23B5]"
        >
          Get Ordly
        </Link>
      </div>
    </header>
  );
}
