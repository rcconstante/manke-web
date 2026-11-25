"use client";

import Image from "next/image";

export interface RealScreenCapture {
  src: string;
  label: string;
  topBg: string;
  darkStatusBar?: boolean;
}

export function RealPhoneFrame({
  capture,
  alt,
  size = "card",
  priority = false,
}: {
  capture: RealScreenCapture;
  alt: string;
  size?: "card" | "focus";
  priority?: boolean;
}) {
  const isFocus = size === "focus";
  const ink = capture.darkStatusBar ? "#FFFFFF" : "#0F172A";

  return (
    <div
      className={`relative flex flex-col overflow-hidden bg-[#111827] select-none ${
        isFocus
          ? "w-[310px] rounded-[46px] border-[7px] border-[#1D1B24] p-[5px] shadow-[0_30px_70px_-15px_rgba(15,23,42,0.34)] sm:w-[332px]"
          : "w-[268px] rounded-[38px] border-[5px] border-[#1D1B24] p-[4px] shadow-[0_18px_40px_-14px_rgba(15,23,42,0.28)]"
      }`}
    >
      {/* Subtle hardware buttons */}
      <div className="pointer-events-none absolute top-24 -left-[8px] h-7 w-[3px] rounded-l bg-[#2D2A37]" />
      <div className="pointer-events-none absolute top-34 -left-[8px] h-11 w-[3px] rounded-l bg-[#2D2A37]" />
      <div className="pointer-events-none absolute top-30 -right-[8px] h-14 w-[3px] rounded-r bg-[#2D2A37]" />

      <div
        className={`relative overflow-hidden ${
          isFocus ? "rounded-[36px]" : "rounded-[30px]"
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

        {/* Real Expo Web Screenshot (exact 393x798 aspect ratio) */}
        <Image
          src={capture.src}
          alt={alt}
          width={786}
          height={1596}
          priority={priority}
          draggable={false}
          className="block aspect-[786/1596] h-auto w-full object-cover"
        />

        {/* Subtle Home Indicator */}
        <div
          className="pointer-events-none absolute right-0 bottom-1.5 left-0 flex justify-center"
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
