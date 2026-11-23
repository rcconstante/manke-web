import Image from "next/image";
import Link from "next/link";

const FEATURES = [
  {
    name: "Home",
    badge: "Daily Overview",
    description:
      "See today's schedule, upcoming bills, budget snapshot, and priority tasks in one calm glance.",
  },
  {
    name: "Calendar",
    badge: "Plan Ahead",
    description:
      "Map out appointments, bill due dates, and routines on a unified timeline so nothing slips through.",
  },
  {
    name: "Budget",
    badge: "Smart Spending",
    description:
      "Set monthly limits by category and track where your money goes without complicated spreadsheets.",
  },
  {
    name: "Bills",
    badge: "Never Miss Due Dates",
    description:
      "Keep recurring utilities, subscriptions, and invoices organized with clear due-date reminders.",
  },
  {
    name: "Checklist",
    badge: "Get Things Done",
    description:
      "Turn errands, shopping lists, and daily habits into simple checkable items you can finish fast.",
  },
  {
    name: "Profile",
    badge: "Your Preferences",
    description:
      "Manage your account, notification preferences, currency settings, and privacy controls in one place.",
  },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#7940D4] via-[#7939DF] to-[#5B23B5] text-white">
        <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-[#A56EFF]/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-[#4A1799]/40 blur-3xl" />

        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-2">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#DAC1FA]/40 bg-white/10 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-[#F7EEFF]">
              <span>Plan · Track · Spend</span>
            </div>

            <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Your day, budget, and bills — in one calm app.
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-[#F7EEFF]/90 sm:text-lg">
              Ordly combines your calendar, monthly budget, recurring bills, and
              checklists into a single mobile workspace designed for clarity.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <a
                href="#get-started"
                className="rounded-full bg-white px-7 py-3.5 text-sm font-bold text-[#211340] shadow-sm transition hover:bg-[#F7EEFF]"
              >
                Get Started Free
              </a>
              <a
                href="#features"
                className="rounded-full border border-[#DAC1FA] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Explore Features
              </a>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4 text-xs text-[#DAC1FA]">
              <Link href="/privacy" className="underline hover:text-white">
                Privacy Policy
              </Link>
              <span>·</span>
              <Link href="/terms" className="underline hover:text-white">
                Terms of Service
              </Link>
              <span>·</span>
              <Link href="/cookies" className="underline hover:text-white">
                Cookie Notice
              </Link>
            </div>
          </div>

          {/* Stylized Phone Mockup */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-[300px] rounded-[40px] border-4 border-[#DAC1FA]/40 bg-white p-5 text-[#211340] shadow-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Image
                    src="/logo.png"
                    alt="Ordly"
                    width={36}
                    height={36}
                    className="rounded-xl"
                  />
                  <div>
                    <p className="text-sm font-bold text-[#211340]">Ordly</p>
                    <p className="text-[11px] text-[#5C4E78]">
                      Plan · Track · Spend
                    </p>
                  </div>
                </div>
                <span className="rounded-full bg-[#F7EEFF] px-2.5 py-1 text-[11px] font-semibold text-[#7940D4]">
                  Today
                </span>
              </div>

              <div className="mt-5 rounded-2xl bg-gradient-to-br from-[#7940D4] to-[#5B23B5] p-4 text-white">
                <p className="text-[11px] text-[#F7EEFF]">Monthly Budget</p>
                <p className="mt-1 text-2xl font-bold tracking-tight">
                  On Track
                </p>
                <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/20">
                  <div className="h-full w-3/5 rounded-full bg-white" />
                </div>
              </div>

              <div className="mt-4 space-y-2.5">
                {[
                  { title: "Upcoming Bills", meta: "2 due this week" },
                  { title: "Today's Calendar", meta: "3 events planned" },
                  { title: "Daily Checklist", meta: "4 of 6 completed" },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="flex items-center justify-between rounded-2xl border border-[#E9DDFC] bg-[#FAF7FF] px-3.5 py-3"
                  >
                    <span className="text-xs font-semibold text-[#211340]">
                      {item.title}
                    </span>
                    <span className="text-[11px] font-medium text-[#7940D4]">
                      {item.meta}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-5 grid grid-cols-6 gap-1 border-t border-[#E9DDFC] pt-3 text-center text-[9px] font-semibold text-[#5C4E78]">
                <span className="text-[#7940D4]">Home</span>
                <span>Cal</span>
                <span>Budget</span>
                <span>Bills</span>
                <span>List</span>
                <span>Profile</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section id="features" className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="max-w-2xl">
          <p className="text-xs font-bold tracking-widest text-[#7940D4] uppercase">
            Everything in One Place
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#211340] sm:text-4xl">
            Six focused tools built for everyday life
          </h2>
          <p className="mt-3 text-base text-[#5C4E78]">
            No clutter, no switching between five separate apps. Every tab in
            Ordly works together around your schedule and spending.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <div
              key={feature.name}
              className="rounded-3xl border border-[#E9DDFC] bg-[#FAF7FF] p-6 transition hover:border-[#DAC1FA] hover:shadow-sm"
            >
              <span className="inline-block rounded-full bg-[#F7EEFF] px-3 py-1 text-xs font-semibold text-[#7940D4]">
                {feature.badge}
              </span>
              <h3 className="mt-4 text-xl font-bold text-[#211340]">
                {feature.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#5C4E78]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Privacy & Trust Banner */}
      <section className="border-y border-[#E9DDFC] bg-[#FAF7FF]">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-5 py-14 sm:px-8 md:flex-row md:items-center">
          <div className="max-w-2xl">
            <p className="text-xs font-bold tracking-widest text-[#7940D4] uppercase">
              Privacy & Transparency
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#211340] sm:text-3xl">
              Clear terms and privacy you can read right inside the app
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[#5C4E78] sm:text-base">
              We believe personal finance and planning tools should respect your
              data. Review our policies anytime.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/privacy"
              className="rounded-full bg-[#7940D4] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#5B23B5]"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="rounded-full border border-[#DAC1FA] bg-white px-5 py-2.5 text-sm font-semibold text-[#211340] transition hover:bg-[#F7EEFF]"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="get-started" className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="rounded-[32px] bg-gradient-to-br from-[#7940D4] via-[#7939DF] to-[#5B23B5] px-6 py-12 text-center text-white sm:px-12 sm:py-16">
          <Image
            src="/logo.png"
            alt="Ordly Logo"
            width={64}
            height={64}
            className="mx-auto rounded-2xl shadow-lg"
          />
          <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to bring order to your routine?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-[#F7EEFF] sm:text-base">
            Ordly is being crafted for Android and iOS. Follow our progress or
            review our legal documentation below.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
            <a
              href="https://github.com/rcconstante/ordly"
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-white px-7 py-3 text-sm font-bold text-[#211340] transition hover:bg-[#F7EEFF]"
            >
              Mobile App Repository
            </a>
            <Link
              href="/license"
              className="rounded-full border border-[#DAC1FA] px-7 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              View License
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
