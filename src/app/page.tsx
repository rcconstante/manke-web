import Image from "next/image";
import Link from "next/link";
import { StoreBadges } from "@/components/StoreBadges";
import { APP_STORE_URL, PLAY_STORE_URL } from "@/lib/site";

const FEATURE_CARDS = [
  {
    title: "See where your money goes",
    description:
      "Log daily income and expenses quickly, track your monthly budget, and see clear category breakdowns.",
    image: "/features/feature-budget.webp",
    alt: "Budget and wallet illustration",
  },
  {
    title: "Stay ahead of bills & plans",
    description:
      "Keep recurring bills, due-date reminders, and your weekly calendar organized together in one calm view.",
    image: "/features/feature-bills.webp",
    alt: "Calendar and recurring bills illustration",
  },
  {
    title: "Check off what matters most",
    description:
      "Manage daily checklists, personalize themes and home screen widgets, and sync securely whenever you want.",
    image: "/features/feature-tasks.webp",
    alt: "Checklist and widgets illustration",
  },
];

const APP_SCREENSHOTS = [
  {
    src: "/screenshots/01-manke-home-dashboard.webp",
    alt: "Manke Home Dashboard — Your day and budget in one place",
  },
  {
    src: "/screenshots/02-manke-budget-tracker.webp",
    alt: "Manke Budget Tracker — Track your spending with clarity",
  },
  {
    src: "/screenshots/03-manke-recurring-bills.webp",
    alt: "Manke Recurring Bills — Never miss a recurring bill",
  },
  {
    src: "/screenshots/04-manke-calendar-schedule.webp",
    alt: "Manke Calendar — Stay on top of every schedule",
  },
  {
    src: "/screenshots/05-manke-themes-widgets.webp",
    alt: "Manke Profile & Themes — Make Manke truly yours",
  },
  {
    src: "/screenshots/06-manke-home-widgets.webp",
    alt: "Manke Home Screen Widgets — Your budget, right on your home screen",
  },
];

const HERO_AVATARS = [
  "/avatars/avatar-1.webp",
  "/avatars/avatar-2.webp",
  "/avatars/avatar-3.webp",
  "/avatars/avatar-4.webp",
  "/avatars/avatar-5.webp",
];

function PillIcon({ kind }: { kind: "spending" | "budgets" | "bills" | "offline" }) {
  if (kind === "spending") {
    return (
      <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="h-3.5 w-3.5 shrink-0">
        <rect x="2" y="3.5" width="12" height="9" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10.5 8h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }
  if (kind === "budgets") {
    return (
      <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="h-3.5 w-3.5 shrink-0">
        <circle cx="8" cy="8" r="5.75" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="8" cy="8" r="2.25" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    );
  }
  if (kind === "bills") {
    return (
      <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="h-3.5 w-3.5 shrink-0">
        <rect x="2.5" y="3" width="11" height="10.5" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M5.5 1.8v2.4M10.5 1.8v2.4M2.5 6.2h11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="h-3.5 w-3.5 shrink-0">
      <rect x="4.25" y="1.75" width="7.5" height="12.5" rx="1.75" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7 11.75h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export default function HomePage() {
  const isComingSoon = !APP_STORE_URL && !PLAY_STORE_URL;

  return (
    <div className="bg-[#F8FAFF]">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute top-0 right-0 h-[520px] w-[520px] rounded-full bg-[#DCEBFF]/75 blur-3xl" />

        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 pt-12 pb-20 sm:px-8 sm:pt-16 sm:pb-24 lg:grid-cols-12 lg:gap-8">
          {/* Left Copy */}
          <div className="lg:col-span-7">
            <h1 className="text-4xl font-extrabold leading-[1.12] tracking-[-0.03em] text-[#0F172A] sm:text-5xl lg:text-[56px]">
              Your{" "}
              <span className="inline-block rounded-full bg-[#0F172A] px-5 py-1 text-white shadow-sm">
                all-in-one
              </span>{" "}
              <span className="block sm:inline">life &amp; budget app.</span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-[1.9] text-[#475569] sm:text-[18px]">
              Log{" "}
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#EBF3FF] px-2.5 py-0.5 text-[0.92em] font-semibold text-[#1D6BF3]">
                <PillIcon kind="spending" />
                spending
              </span>{" "}
              in seconds, set{" "}
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#E0EEFF] px-2.5 py-0.5 text-[0.92em] font-semibold text-[#1554D1]">
                <PillIcon kind="budgets" />
                budgets
              </span>{" "}
              you actually keep, and stay ahead of{" "}
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#FEF3C7] px-2.5 py-0.5 text-[0.92em] font-semibold text-[#B45309]">
                <PillIcon kind="bills" />
                bills &amp; plans
              </span>
              . Manke works{" "}
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#EBF3FF] px-2.5 py-0.5 text-[0.92em] font-semibold text-[#1D6BF3]">
                <PillIcon kind="offline" />
                offline
              </span>{" "}
              on your phone, with no account needed.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <StoreBadges />
              <Link
                href="/playground"
                className="inline-flex items-center gap-2 rounded-xl border border-[#CBE0FF] bg-[#EBF3FF] px-4 py-3 text-sm font-bold text-[#1D6BF3] transition hover:bg-[#DCEBFF]"
              >
                <span>◆</span>
                Open Screen Playground
              </Link>
            </div>

            {/* Avatar Strip */}
            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <div className="flex -space-x-2.5">
                {HERO_AVATARS.map((src, idx) => (
                  <Image
                    key={src}
                    src={src}
                    alt={`Manke user avatar ${idx + 1}`}
                    width={36}
                    height={36}
                    className="h-9 w-9 rounded-full border-2 border-white bg-[#EBF3FF] object-cover shadow-sm"
                  />
                ))}
              </div>
              <p className="text-sm text-[#475569]">
                <strong className="font-semibold text-[#0F172A]">
                  Offline-first &amp; private
                </strong>{" "}
                — with optional cloud backup &amp; widgets.
              </p>
            </div>
          </div>

          {/* Right Angled Realistic iPhone Mockup */}
          <div className="relative flex justify-center lg:col-span-5 lg:justify-end">
            <div className="relative">
              {/* Soft Manke Blue backdrop aura */}
              <div className="pointer-events-none absolute -inset-6 rounded-full bg-gradient-to-tr from-[#2B8CF8]/20 via-[#1D6BF3]/15 to-transparent blur-2xl" />

              {/* Sleek iPhone 16 Pro frame */}
              <div className="relative w-[278px] rotate-[3deg] rounded-[46px] border-[7px] border-[#1D1B24] bg-[#110F18] p-[6px] shadow-[0_30px_70px_-15px_rgba(15,23,42,0.28)] ring-1 ring-black/15 transition duration-500 hover:rotate-[1deg] sm:w-[304px]">
                {/* Side buttons */}
                <div className="pointer-events-none absolute top-24 -left-[10px] h-8 w-[3px] rounded-l bg-[#2D2A37]" />
                <div className="pointer-events-none absolute top-36 -left-[10px] h-12 w-[3px] rounded-l bg-[#2D2A37]" />
                <div className="pointer-events-none absolute top-32 -right-[10px] h-16 w-[3px] rounded-r bg-[#2D2A37]" />

                <div className="relative overflow-hidden rounded-[36px] bg-white">
                  {/* iOS Status Bar + Dynamic Island */}
                  <div className="flex items-center justify-between bg-[#EDF4FF] px-5 pt-2.5 pb-1.5">
                    <span className="text-[11px] font-bold tracking-tight text-[#0F172A]">
                      9:41
                    </span>
                    <div className="h-[18px] w-[76px] rounded-full bg-[#110F18]" />
                    <div className="flex items-center gap-1 text-[#0F172A]">
                      <span className="h-2 w-2 rounded-full bg-[#0F172A]/80" />
                      <span className="h-2.5 w-4 rounded-[3px] border border-[#0F172A]/80 p-[1px]">
                        <span className="block h-full w-full rounded-[1px] bg-[#0F172A]" />
                      </span>
                    </div>
                  </div>

                  {/* Actual Manke Home Dashboard Screenshot */}
                  <Image
                    src="/screens/home-hero.webp"
                    alt="Manke Home Dashboard running on iPhone"
                    width={720}
                    height={1560}
                    priority
                    className="block h-auto w-full"
                  />
                </div>
              </div>

              {/* Floating Manke Icon Badge */}
              <div className="absolute -bottom-3 -left-6 flex items-center gap-2.5 rounded-2xl border border-[#CBE0FF] bg-white/95 px-3.5 py-2.5 shadow-[0_14px_30px_rgba(15,23,42,0.12)] backdrop-blur-sm">
                <Image
                  src="/logo.png"
                  alt="Manke App Icon"
                  width={34}
                  height={34}
                  className="rounded-xl shadow-sm"
                />
                <div className="text-left">
                  <p className="text-xs font-bold text-[#0F172A]">Manke App</p>
                  <p className="text-[11px] font-medium text-[#1D6BF3]">
                    Plan · Track · Spend
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Three Feature Cards */}
      <section id="features" className="mx-auto max-w-5xl px-5 py-10 sm:px-8 sm:py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {FEATURE_CARDS.map((card) => (
            <div
              key={card.title}
              className="flex flex-col rounded-[28px] border border-[#E2E8F0] bg-white p-8 shadow-[0_1px_2px_rgba(15,23,42,0.03),0_12px_32px_rgba(29,107,243,0.05)] transition duration-200 hover:-translate-y-0.5 hover:border-[#BFDBFE] hover:shadow-[0_16px_38px_rgba(29,107,243,0.1)]"
            >
              <div className="mx-auto flex h-36 w-36 items-center justify-center">
                <Image
                  src={card.image}
                  alt={card.alt}
                  width={160}
                  height={160}
                  className="h-36 w-36 object-contain"
                />
              </div>
              <h2 className="mt-5 text-lg font-bold tracking-tight text-[#0F172A]">
                {card.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[#64748B]">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Full-Width App Store Screenshot Showcase */}
      <section id="screenshots" className="py-10 sm:py-16">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-8">
          <div className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 lg:grid lg:grid-cols-6 lg:gap-5 lg:overflow-visible lg:pb-0">
            {APP_SCREENSHOTS.map((shot) => (
              <div
                key={shot.src}
                className="w-[245px] shrink-0 snap-center overflow-hidden rounded-[26px] border border-[#CBE0FF] bg-[#EBF3FF] shadow-[0_14px_34px_-12px_rgba(15,23,42,0.16)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_22px_44px_-12px_rgba(29,107,243,0.25)] sm:w-[270px] lg:w-auto"
              >
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  width={720}
                  height={1560}
                  className="block aspect-[1290/2796] h-auto w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promo Video */}
      <section id="video" className="mx-auto max-w-5xl px-5 py-10 sm:px-8 sm:py-16">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-[#0F172A] sm:text-4xl">
            See Manke in action
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-[#64748B]">
            Budgets, bills, schedules, tasks and widgets — all in one place.
          </p>
        </div>
        <div className="mx-auto mt-8 w-full max-w-[340px] overflow-hidden rounded-[32px] border border-[#CBE0FF] bg-[#EBF3FF] shadow-[0_22px_44px_-12px_rgba(29,107,243,0.22)]">
          <video
            className="block aspect-[9/16] h-auto w-full"
            src="/video/ordly-promo.mp4"
            poster="/video/ordly-promo-poster.webp"
            controls
            playsInline
            preload="none"
          >
            <track kind="captions" src="/video/ordly-promo.vtt" srcLang="en" label="English" />
          </video>
        </div>
      </section>

      {/* Bottom Download / Community Card */}
      <section id="download" className="mx-auto max-w-4xl px-5 pt-8 pb-20 sm:px-8 sm:pt-12 sm:pb-28">
        <div className="relative overflow-hidden rounded-[32px] border border-[#CBE0FF] bg-[#EBF3FF] px-6 py-16 text-center sm:px-12 sm:py-20">
          {/* Decorative Floating Manke 3D Avatars */}
          <Image
            src="/avatars/avatar-1.webp"
            alt=""
            aria-hidden="true"
            width={58}
            height={58}
            className="pointer-events-none absolute top-8 left-10 hidden h-14 w-14 rounded-full border-4 border-white/90 bg-[#DBEAFE] object-cover shadow-md md:block"
          />
          <Image
            src="/avatars/avatar-3.webp"
            alt=""
            aria-hidden="true"
            width={44}
            height={44}
            className="pointer-events-none absolute top-14 left-36 hidden h-10 w-10 rounded-full border-[3px] border-white/90 bg-[#DCFCE7] object-cover shadow-sm lg:block"
          />
          <Image
            src="/avatars/avatar-5.webp"
            alt=""
            aria-hidden="true"
            width={48}
            height={48}
            className="pointer-events-none absolute bottom-10 left-20 hidden h-12 w-12 rounded-full border-[3px] border-white/90 bg-[#E0F2FE] object-cover shadow-md md:block"
          />
          <Image
            src="/avatars/avatar-2.webp"
            alt=""
            aria-hidden="true"
            width={52}
            height={52}
            className="pointer-events-none absolute top-10 right-24 hidden h-12 w-12 rounded-full border-[3px] border-white/90 bg-[#FEE2E2] object-cover shadow-md md:block"
          />
          <Image
            src="/avatars/avatar-4.webp"
            alt=""
            aria-hidden="true"
            width={42}
            height={42}
            className="pointer-events-none absolute bottom-12 right-36 hidden h-10 w-10 rounded-full border-[3px] border-white/90 bg-[#FEF3C7] object-cover shadow-sm lg:block"
          />
          <Image
            src="/avatars/avatar-6.webp"
            alt=""
            aria-hidden="true"
            width={58}
            height={58}
            className="pointer-events-none absolute bottom-8 right-10 hidden h-14 w-14 rounded-full border-4 border-white/90 bg-[#E0E7FF] object-cover shadow-md md:block"
          />

          <div className="relative mx-auto max-w-lg">
            <h2 className="text-3xl font-extrabold tracking-tight text-[#0F172A] sm:text-4xl">
              Bring calm to your routine
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[#475569]">
              Plan your days, track your savings, and stay ahead of bills — all
              in one clean app built for iOS and Android.
            </p>

            <div className="mt-8">
              <StoreBadges align="center" />
            </div>

            {isComingSoon ? (
              <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/85 px-4 py-1.5 text-xs font-semibold text-[#1D6BF3] ring-1 ring-[#CBE0FF]">
                <span className="h-2 w-2 rounded-full bg-[#1D6BF3]" />
                Launching soon on the App Store &amp; Google Play
              </p>
            ) : null}
          </div>
        </div>
      </section>
    </div>
  );
}
