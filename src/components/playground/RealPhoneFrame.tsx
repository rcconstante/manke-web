"use client";

import Image from "next/image";

export interface RealScreenCapture {
  src: string;
  label: string;
  topBg: string;
  darkStatusBar?: boolean;
}

export interface PhoneHotspot {
  id?: string;
  left: number;
  top: number;
  width: number;
  height: number;
  label: string;
  onClick: () => void;
  subtle?: boolean;
}

export function RealPhoneFrame({
  capture,
  alt,
  size = "card",
  priority = false,
  hotspots,
  showHotspots = false,
}: {
  capture: RealScreenCapture;
  alt: string;
  size?: "card" | "focus" | "prototype";
  priority?: boolean;
  hotspots?: PhoneHotspot[];
  showHotspots?: boolean;
}) {
  const isLarge = size === "focus" || size === "prototype";
  const ink = capture.darkStatusBar ? "#FFFFFF" : "#0F172A";

  const frameSizeClass =
    size === "prototype"
      ? "w-[320px] rounded-[48px] border-[7px] border-[#1D1B24] p-[5px] shadow-[0_32px_75px_-18px_rgba(15,23,42,0.38)] sm:w-[354px]"
      : size === "focus"
        ? "w-[310px] rounded-[46px] border-[7px] border-[#1D1B24] p-[5px] shadow-[0_30px_70px_-15px_rgba(15,23,42,0.34)] sm:w-[332px]"
        : "w-[268px] rounded-[38px] border-[5px] border-[#1D1B24] p-[4px] shadow-[0_18px_40px_-14px_rgba(15,23,42,0.28)]";

  return (
    <div
      className={`relative flex flex-col overflow-hidden bg-[#111827] select-none ${frameSizeClass}`}
    >
      {/* Subtle hardware buttons */}
      <div className="pointer-events-none absolute top-24 -left-[8px] h-7 w-[3px] rounded-l bg-[#2D2A37]" />
      <div className="pointer-events-none absolute top-34 -left-[8px] h-11 w-[3px] rounded-l bg-[#2D2A37]" />
      <div className="pointer-events-none absolute top-30 -right-[8px] h-14 w-[3px] rounded-r bg-[#2D2A37]" />

      <div
        className={`relative overflow-hidden ${
          isLarge ? "rounded-[38px]" : "rounded-[30px]"
        }`}
        style={{ backgroundColor: capture.topBg }}
      >
        {/* Matched iOS Status Bar + Dynamic Island */}
        <div
          className="flex items-center justify-between px-4 pt-2 pb-1.5"
          style={{ backgroundColor: capture.topBg, color: ink }}
        >
          <span className="text-[10px] font-bold tracking-tight">9:41</span>
          <div className="h-[15px] w-[66px] rounded-full bg-[#090A10]" />
          <div className="flex items-center gap-1">
            <span
              className="inline-block h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: ink, opacity: 0.85 }}
            />
            <span
              className="inline-block h-2 w-3.5 rounded-[2px] border p-[1px]"
              style={{ borderColor: ink }}
            >
              <span
                className="block h-full w-full rounded-[1px]"
                style={{ backgroundColor: ink }}
              />
            </span>
          </div>
        </div>

        {/* Real Expo Web Screenshot (exact 393x798 aspect ratio) + Optional Interactive Hotspots */}
        <div className="relative">
          <Image
            src={capture.src}
            alt={alt}
            width={786}
            height={1596}
            priority={priority}
            draggable={false}
            className="block aspect-[786/1596] h-auto w-full object-cover"
          />

          {hotspots && hotspots.length > 0 ? (
            <div className="absolute inset-0 z-10">
              {hotspots.map((spot, index) => {
                const key = spot.id ?? `${spot.label}-${index}`;
                return (
                  <button
                    key={key}
                    type="button"
                    aria-label={spot.label}
                    title={spot.label}
                    onClick={spot.onClick}
                    style={{
                      left: `${spot.left}%`,
                      top: `${spot.top}%`,
                      width: `${spot.width}%`,
                      height: `${spot.height}%`,
                    }}
                    className={`group absolute cursor-pointer transition-all focus-visible:ring-2 focus-visible:ring-[#1D6BF3] focus-visible:outline-none ${
                      showHotspots
                        ? spot.subtle
                          ? "rounded-lg border border-dashed border-white/55 bg-white/5 hover:bg-white/15"
                          : "rounded-xl border-[1.5px] border-[#1D6BF3]/80 bg-[#1D6BF3]/12 shadow-[0_0_0_1px_rgba(255,255,255,0.45)_inset] hover:bg-[#1D6BF3]/22 active:scale-[0.98]"
                        : "rounded-lg bg-transparent hover:bg-[#1D6BF3]/8 active:bg-[#1D6BF3]/18"
                    }`}
                  >
                    {showHotspots && !spot.subtle ? (
                      <span
                        className="pointer-events-none absolute top-1 right-1 flex h-2.5 w-2.5 items-center justify-center"
                        aria-hidden="true"
                      >
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#2B8CF8] opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-[#1D6BF3] ring-1 ring-white" />
                      </span>
                    ) : null}

                    {showHotspots ? (
                      <span
                        className="pointer-events-none absolute bottom-full left-1/2 z-30 mb-1 hidden -translate-x-1/2 rounded-md bg-[#0F172A]/95 px-2 py-0.5 text-[10px] font-semibold whitespace-nowrap text-white shadow-md group-hover:block"
                        aria-hidden="true"
                      >
                        {spot.label}
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </div>
          ) : null}
        </div>

        {/* Subtle Home Indicator */}
        <div
          className="pointer-events-none absolute right-0 bottom-1.5 left-0 z-20 flex justify-center"
          aria-hidden="true"
        >
          <div
            className="h-[4px] w-[88px] rounded-full"
            style={{
              backgroundColor: capture.darkStatusBar
                ? "rgba(255,255,255,0.38)"
                : "rgba(15,23,42,0.22)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
