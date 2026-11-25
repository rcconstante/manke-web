import { APP_STORE_URL, PLAY_STORE_URL } from "@/lib/site";

type StoreBadgesProps = {
  size?: "md" | "sm";
  align?: "left" | "center";
  tone?: "dark" | "footer";
};

function AppleIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.33c.64-.78 1.08-1.86.96-2.94-.93.04-2.06.62-2.72 1.4-.58.68-1.1 1.79-.96 2.84 1.04.08 2.09-.52 2.72-1.3Z" />
    </svg>
  );
}

function GooglePlayIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        fill="#4285F4"
        d="M3.61 1.814L13.793 12 3.61 22.186a1.77 1.77 0 0 1-.61-1.344V3.158c0-.525.23-.997.61-1.344Z"
      />
      <path
        fill="#34A853"
        d="M17.27 8.523 5.15 1.635a1.81 1.81 0 0 0-1.54.179L13.793 12l3.477-3.477Z"
      />
      <path
        fill="#FBBC05"
        d="M20.38 10.29l-3.11-1.767L13.793 12l3.477 3.477 3.11-1.768c.83-.471.83-1.948 0-2.419Z"
      />
      <path
        fill="#EA4335"
        d="M13.793 12 3.61 22.186c.45.34 1.06.415 1.54.179l12.12-6.888L13.793 12Z"
      />
    </svg>
  );
}

export function StoreBadges({
  size = "md",
  align = "left",
  tone = "dark",
}: StoreBadgesProps) {
  const isSm = size === "sm";
  const badgeClasses =
    tone === "footer"
      ? "border border-white/15 bg-black/80 text-white hover:border-white/30 hover:bg-black"
      : "border border-black/10 bg-[#110D1C] text-white shadow-sm hover:-translate-y-0.5 hover:bg-[#1E1633] hover:shadow-md";

  const padClasses = isSm ? "px-3.5 py-2 gap-2" : "px-4 py-2.5 gap-2.5";
  const iconClasses = isSm ? "h-5 w-5" : "h-6 w-6";
  const subClasses = isSm ? "text-[9px] leading-none" : "text-[10px] leading-none";
  const titleClasses = isSm
    ? "text-[13px] font-semibold leading-tight"
    : "text-[15px] font-semibold leading-tight";

  const appHref = APP_STORE_URL || "#download";
  const playHref = PLAY_STORE_URL || "#download";
  const isExternalApp = Boolean(APP_STORE_URL);
  const isExternalPlay = Boolean(PLAY_STORE_URL);

  return (
    <div
      className={`flex flex-wrap items-center gap-3 ${
        align === "center" ? "justify-center" : "justify-start"
      }`}
    >
      <a
        href={appHref}
        target={isExternalApp ? "_blank" : undefined}
        rel={isExternalApp ? "noreferrer" : undefined}
        className={`inline-flex items-center rounded-xl transition duration-200 ${badgeClasses} ${padClasses}`}
      >
        <AppleIcon className={iconClasses} />
        <span className="text-left">
          <span className={`block text-white/75 ${subClasses}`}>
            Download on the
          </span>
          <span className={`block tracking-tight ${titleClasses}`}>
            App Store
          </span>
        </span>
      </a>

      <a
        href={playHref}
        target={isExternalPlay ? "_blank" : undefined}
        rel={isExternalPlay ? "noreferrer" : undefined}
        className={`inline-flex items-center rounded-xl transition duration-200 ${badgeClasses} ${padClasses}`}
      >
        <GooglePlayIcon className={iconClasses} />
        <span className="text-left">
          <span className={`block uppercase text-white/75 ${subClasses}`}>
            Get it on
          </span>
          <span className={`block tracking-tight ${titleClasses}`}>
            Google Play
          </span>
        </span>
      </a>
    </div>
  );
}
