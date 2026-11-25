"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { RealPhoneFrame, type RealScreenCapture } from "./RealPhoneFrame";

type ScreenId =
  | "onboarding"
  | "home"
  | "calendar"
  | "budget"
  | "bills"
  | "tasks"
  | "profile"
  | "reports"
  | "themes"
  | "widgets"
  | "signin";

interface ScreenNode {
  id: ScreenId;
  code: string;
  title: string;
  group: "Onboarding" | "Core 6 Tabs" | "Modals & Sub-Screens";
  summary: string;
  x: number;
  y: number;
  variants: RealScreenCapture[];
  darkCapture?: RealScreenCapture;
}

interface FlowWire {
  id: string;
  from: ScreenId;
  to: ScreenId;
  label: string;
  fromSide: "right" | "bottom";
  toSide: "left" | "top";
}

const CARD_W = 268;
const CARD_H = 582;

const SCREENS: ScreenNode[] = [
  {
    id: "onboarding",
    code: "01",
    title: "Welcome / Get Started",
    group: "Onboarding",
    summary:
      "Single-button offline-first entry straight into Manke Home — zero forced sign-up wall.",
    x: 40,
    y: 40,
    variants: [
      {
        src: "/playground/00-onboarding.webp",
        label: "Welcome",
        topBg: "#3B80DC",
        darkStatusBar: true,
      },
    ],
  },
  {
    id: "home",
    code: "02",
    title: "Home Dashboard",
    group: "Core 6 Tabs",
    summary:
      "Greeting header, Budget Remaining hero card, Today's Schedule, Upcoming Bills, and Pending Tasks.",
    x: 400,
    y: 40,
    variants: [
      {
        src: "/playground/01-home-light.webp",
        label: "Light",
        topBg: "#DCEBFF",
      },
    ],
    darkCapture: {
      src: "/playground/01-home-dark.webp",
      label: "Dark",
      topBg: "#13203A",
      darkStatusBar: true,
    },
  },
  {
    id: "calendar",
    code: "03",
    title: "Calendar & Schedule",
    group: "Core 6 Tabs",
    summary:
      "Week & Month toggle, color-coded event cards, date dots, and + Add Event FAB.",
    x: 760,
    y: 40,
    variants: [
      {
        src: "/playground/02-calendar-week.webp",
        label: "Week View",
        topBg: "#DCEBFF",
      },
      {
        src: "/playground/02-calendar-month.webp",
        label: "Month View",
        topBg: "#DCEBFF",
      },
    ],
    darkCapture: {
      src: "/playground/02-calendar-dark.webp",
      label: "Dark",
      topBg: "#13203A",
      darkStatusBar: true,
    },
  },
  {
    id: "budget",
    code: "04",
    title: "Budget Tracker",
    group: "Core 6 Tabs",
    summary:
      "Monthly budget progress ring, Income vs Expenses summary, Spending by Category, and quick Add Transaction sheet.",
    x: 1120,
    y: 40,
    variants: [
      {
        src: "/playground/03-budget-light.webp",
        label: "Overview",
        topBg: "#DCEBFF",
      },
      {
        src: "/playground/03-budget-add.webp",
        label: "Add Sheet",
        topBg: "#7E839B",
        darkStatusBar: true,
      },
    ],
    darkCapture: {
      src: "/playground/03-budget-dark.webp",
      label: "Dark",
      topBg: "#13203A",
      darkStatusBar: true,
    },
  },
  {
    id: "bills",
    code: "05",
    title: "Recurring Bills",
    group: "Core 6 Tabs",
    summary:
      "Track Tuition, Rent, Utilities, and recurring payments — mark bills paid in one tap and auto-sync to Budget.",
    x: 1480,
    y: 40,
    variants: [
      {
        src: "/playground/04-bills-light.webp",
        label: "Bills List",
        topBg: "#DCEBFF",
      },
      {
        src: "/playground/04-bills-detail.webp",
        label: "Bill Detail",
        topBg: "#FFFFFF",
      },
      {
        src: "/playground/04-bills-paid.webp",
        label: "Marked Paid",
        topBg: "#FFFFFF",
      },
    ],
    darkCapture: {
      src: "/playground/04-bills-dark.webp",
      label: "Dark",
      topBg: "#13203A",
      darkStatusBar: true,
    },
  },
  {
    id: "tasks",
    code: "06",
    title: "Tasks & Checklist",
    group: "Core 6 Tabs",
    summary:
      "Today's Productivity % progress card, Tasks / Completed segmented toggle, due-date priority badges, and animated checkboxes.",
    x: 1840,
    y: 40,
    variants: [
      {
        src: "/playground/05-tasks-light.webp",
        label: "Pending",
        topBg: "#DCEBFF",
      },
      {
        src: "/playground/05-tasks-progress.webp",
        label: "Checked Off",
        topBg: "#DCEBFF",
      },
    ],
    darkCapture: {
      src: "/playground/05-tasks-dark.webp",
      label: "Dark",
      topBg: "#13203A",
      darkStatusBar: true,
    },
  },
  {
    id: "profile",
    code: "07",
    title: "Profile & Settings",
    group: "Core 6 Tabs",
    summary:
      "Account & Cloud Sync, Custom Themes, Home Screen Widgets, Currency, Reminders, and JSON Export / Import.",
    x: 2200,
    y: 40,
    variants: [
      {
        src: "/playground/07-profile-light.webp",
        label: "Light",
        topBg: "#DCEBFF",
      },
    ],
    darkCapture: {
      src: "/playground/07-profile-dark.webp",
      label: "Dark",
      topBg: "#13203A",
      darkStatusBar: true,
    },
  },
  {
    id: "reports",
    code: "08",
    title: "Reports & Insights",
    group: "Modals & Sub-Screens",
    summary:
      "Opened from Budget → Reports & Insights. Monthly cash flow, savings rate, category breakdown, and task velocity.",
    x: 1120,
    y: 760,
    variants: [
      {
        src: "/playground/06-reports.webp",
        label: "Cash Flow",
        topBg: "#FFFFFF",
      },
      {
        src: "/playground/06-reports-bottom.webp",
        label: "Breakdown",
        topBg: "#FFFFFF",
      },
    ],
  },
  {
    id: "themes",
    code: "09",
    title: "Custom Themes & Dark",
    group: "Modals & Sub-Screens",
    summary:
      "Opened from Profile → Custom Theme. Switch System / Light / Dark appearance and 5 curated accent palettes.",
    x: 1840,
    y: 760,
    variants: [
      {
        src: "/playground/08-themes-light.webp",
        label: "Light Sheet",
        topBg: "#7E839B",
        darkStatusBar: true,
      },
      {
        src: "/playground/08-themes-dark.webp",
        label: "Dark · Blue",
        topBg: "#151934",
        darkStatusBar: true,
      },
      {
        src: "/playground/08-themes-accent.webp",
        label: "Dark · Teal",
        topBg: "#131D2A",
        darkStatusBar: true,
      },
    ],
    darkCapture: {
      src: "/playground/08-themes-dark.webp",
      label: "Dark · Blue",
      topBg: "#151934",
      darkStatusBar: true,
    },
  },
  {
    id: "widgets",
    code: "10",
    title: "Home Screen Widgets",
    group: "Modals & Sub-Screens",
    summary:
      "Opened from Profile → Home Screen Widgets. Live iOS WidgetKit & Android widget previews for Budget, Bills, and Tasks.",
    x: 2200,
    y: 760,
    variants: [
      {
        src: "/playground/09-widgets.webp",
        label: "Widgets Studio",
        topBg: "#FFFFFF",
      },
    ],
  },
  {
    id: "signin",
    code: "11",
    title: "Cloud Sync Sign In",
    group: "Modals & Sub-Screens",
    summary:
      "Optional authentication opened from Profile → Cloud Backup & Sync to back up and sync data across devices.",
    x: 2560,
    y: 760,
    variants: [
      {
        src: "/playground/10-signin.webp",
        label: "Sign In",
        topBg: "#B1D0FA",
      },
    ],
  },
];

const WIRES: FlowWire[] = [
  {
    id: "w1",
    from: "onboarding",
    to: "home",
    label: "Get Started",
    fromSide: "right",
    toSide: "left",
  },
  {
    id: "w2",
    from: "home",
    to: "calendar",
    label: "View Calendar",
    fromSide: "right",
    toSide: "left",
  },
  {
    id: "w3",
    from: "calendar",
    to: "budget",
    label: "Budget Tab",
    fromSide: "right",
    toSide: "left",
  },
  {
    id: "w4",
    from: "budget",
    to: "reports",
    label: "Reports & Insights",
    fromSide: "bottom",
    toSide: "top",
  },
  {
    id: "w5",
    from: "budget",
    to: "bills",
    label: "Bills Tab",
    fromSide: "right",
    toSide: "left",
  },
  {
    id: "w6",
    from: "bills",
    to: "tasks",
    label: "Checklist Tab",
    fromSide: "right",
    toSide: "left",
  },
  {
    id: "w7",
    from: "tasks",
    to: "profile",
    label: "Profile Tab",
    fromSide: "right",
    toSide: "left",
  },
  {
    id: "w8",
    from: "profile",
    to: "themes",
    label: "Custom Theme",
    fromSide: "bottom",
    toSide: "top",
  },
  {
    id: "w9",
    from: "profile",
    to: "widgets",
    label: "Home Widgets",
    fromSide: "bottom",
    toSide: "top",
  },
  {
    id: "w10",
    from: "profile",
    to: "signin",
    label: "Cloud Sync",
    fromSide: "bottom",
    toSide: "top",
  },
];

const CANVAS_W = 2940;
const CANVAS_H = 1480;

function anchorPoint(node: ScreenNode, side: "left" | "right" | "top" | "bottom") {
  const topY = node.y + 34;
  if (side === "right") return { x: node.x + CARD_W, y: topY + CARD_H / 2 };
  if (side === "left") return { x: node.x, y: topY + CARD_H / 2 };
  if (side === "bottom") return { x: node.x + CARD_W / 2, y: topY + CARD_H };
  return { x: node.x + CARD_W / 2, y: topY };
}

export function FigmaPlayground() {
  const [viewMode, setViewMode] = useState<"canvas" | "gallery">("canvas");
  const [appearance, setAppearance] = useState<"light" | "dark">("light");
  const [showWires, setShowWires] = useState(true);
  const [selectedId, setSelectedId] = useState<ScreenId>("home");
  const [variantIndex, setVariantIndex] = useState<Partial<Record<ScreenId, number>>>({});
  const [zoom, setZoom] = useState(0.56);
  const [pan, setPan] = useState({ x: 24, y: 20 });
  const [focusedModal, setFocusedModal] = useState<ScreenId | null>(null);
  const [copied, setCopied] = useState(false);

  const draggingRef = useRef<{
    startX: number;
    startY: number;
    origX: number;
    origY: number;
  } | null>(null);

  const screenMap = useMemo(
    () => Object.fromEntries(SCREENS.map((s) => [s.id, s])) as Record<ScreenId, ScreenNode>,
    []
  );
  const selectedScreen = screenMap[selectedId];
  const relatedWires = useMemo(
    () => WIRES.filter((w) => w.from === selectedId || w.to === selectedId),
    [selectedId]
  );

  const resolveCapture = (node: ScreenNode): RealScreenCapture => {
    const idx = variantIndex[node.id] ?? 0;
    if (appearance === "dark" && node.darkCapture && idx === 0) {
      return node.darkCapture;
    }
    return node.variants[idx] ?? node.variants[0];
  };

  const focusScreenOnCanvas = (id: ScreenId) => {
    setSelectedId(id);
    if (viewMode === "canvas") {
      const node = screenMap[id];
      setPan({
        x: Math.round(-node.x * zoom + 120),
        y: Math.round(-node.y * zoom + 36),
      });
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-69px)] flex-col bg-[#F1F5FB] text-[#0F172A]">
      {/* Figma-Style Top Toolbar */}
      <div className="sticky top-[68px] z-30 flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-white/95 px-4 py-2.5 backdrop-blur-md">
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-[#2B8CF8] via-[#1D6BF3] to-[#1554D1] px-2.5 py-1 text-xs font-bold text-white shadow-xs">
            ◆ Manke Screen Playground
          </span>
          <span className="hidden rounded-full border border-[#CBE0FF] bg-[#EBF3FF] px-2.5 py-0.5 text-[11px] font-semibold text-[#1554D1] xl:inline-flex">
            Real Expo React Native Captures
          </span>

          {/* View Mode Switcher */}
          <div className="inline-flex rounded-lg bg-slate-100 p-0.5 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setViewMode("canvas")}
              className={`rounded-md px-3 py-1 transition ${
                viewMode === "canvas"
                  ? "bg-white text-[#0F172A] shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Canvas &amp; Wiring
            </button>
            <button
              type="button"
              onClick={() => setViewMode("gallery")}
              className={`rounded-md px-3 py-1 transition ${
                viewMode === "gallery"
                  ? "bg-white text-[#0F172A] shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              All Screens ({SCREENS.length})
            </button>
          </div>
        </div>

        {/* Center: Real Light / Dark Capture Switcher */}
        <div className="inline-flex items-center rounded-lg border border-slate-200 bg-slate-100 p-0.5 text-xs font-semibold">
          <button
            type="button"
            onClick={() => {
              setAppearance("light");
              setVariantIndex({});
            }}
            className={`rounded-md px-3 py-1 transition ${
              appearance === "light"
                ? "bg-white text-[#0F172A] shadow-sm"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            ☀ Light Captures
          </button>
          <button
            type="button"
            onClick={() => {
              setAppearance("dark");
              setVariantIndex({});
            }}
            className={`rounded-md px-3 py-1 transition ${
              appearance === "dark"
                ? "bg-[#0F172A] text-white shadow-sm"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            ☾ Dark Captures
          </button>
        </div>

        {/* Right: Wiring Toggle, Zoom, Share */}
        <div className="flex items-center gap-2">
          {viewMode === "canvas" && (
            <>
              <button
                type="button"
                onClick={() => setShowWires((v) => !v)}
                className={`rounded-lg border px-2.5 py-1 text-xs font-semibold transition ${
                  showWires
                    ? "border-blue-200 bg-blue-50 text-blue-700"
                    : "border-slate-200 bg-white text-slate-600"
                }`}
              >
                {showWires ? "Wiring: ON" : "Wiring: OFF"}
              </button>

              <div className="hidden items-center rounded-lg border border-slate-200 bg-white text-xs font-semibold sm:flex">
                <button
                  type="button"
                  onClick={() => setZoom((z) => Math.max(0.32, +(z - 0.08).toFixed(2)))}
                  className="px-2 py-1 hover:bg-slate-100"
                >
                  −
                </button>
                <span className="min-w-[44px] text-center text-[11px]">
                  {Math.round(zoom * 100)}%
                </span>
                <button
                  type="button"
                  onClick={() => setZoom((z) => Math.min(1.15, +(z + 0.08).toFixed(2)))}
                  className="px-2 py-1 hover:bg-slate-100"
                >
                  +
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setZoom(0.56);
                    setPan({ x: 24, y: 20 });
                  }}
                  className="border-l border-slate-200 px-2 py-1 text-[11px] hover:bg-slate-100"
                >
                  Fit
                </button>
              </div>
            </>
          )}

          <button
            type="button"
            onClick={handleCopyLink}
            className="rounded-lg bg-[#0F172A] px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-[#1D6BF3]"
          >
            {copied ? "Link Copied ✓" : "Share Link"}
          </button>
        </div>
      </div>

      {/* Workspace Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Figma Layers Sidebar */}
        <aside className="hidden w-68 shrink-0 flex-col border-r border-slate-200 bg-white lg:flex">
          <div className="border-b border-slate-100 px-4 py-3">
            <p className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
              Live App Screens ({SCREENS.length})
            </p>
            <p className="mt-0.5 text-[11px] text-slate-500">
              Captured directly from Manke on Expo Web
            </p>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto p-3">
            {(["Onboarding", "Core 6 Tabs", "Modals & Sub-Screens"] as const).map(
              (group) => (
                <div key={group}>
                  <p className="mb-1.5 px-2 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                    {group}
                  </p>
                  <div className="space-y-1">
                    {SCREENS.filter((s) => s.group === group).map((s) => {
                      const active = s.id === selectedId;
                      return (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => focusScreenOnCanvas(s.id)}
                          className={`flex w-full items-center justify-between rounded-xl px-2.5 py-2 text-left text-xs font-semibold transition ${
                            active
                              ? "bg-gradient-to-r from-[#2B8CF8] via-[#1D6BF3] to-[#1554D1] text-white shadow-sm"
                              : "text-slate-700 hover:bg-slate-100"
                          }`}
                        >
                          <span className="flex items-center gap-2 truncate">
                            <span className="font-mono text-[10px] opacity-75">
                              {s.code}
                            </span>
                            <span className="truncate">{s.title}</span>
                          </span>
                          {s.variants.length > 1 ? (
                            <span
                              className={`rounded px-1.5 py-0.5 text-[9px] font-bold ${
                                active
                                  ? "bg-white/20 text-white"
                                  : "bg-blue-50 text-blue-600"
                              }`}
                            >
                              {s.variants.length} states
                            </span>
                          ) : null}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )
            )}
          </div>

          {/* Selected Screen Inspector */}
          <div className="border-t border-slate-200 bg-slate-50 p-4">
            <p className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
              Selected · {selectedScreen.code}
            </p>
            <p className="mt-0.5 text-sm font-extrabold text-[#0F172A]">
              {selectedScreen.title}
            </p>
            <p className="mt-1 text-xs leading-relaxed text-slate-600">
              {selectedScreen.summary}
            </p>

            {selectedScreen.variants.length > 1 ? (
              <div className="mt-3">
                <p className="mb-1.5 text-[10px] font-bold text-slate-400 uppercase">
                  Captured States
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {selectedScreen.variants.map((v, idx) => {
                    const active = (variantIndex[selectedScreen.id] ?? 0) === idx;
                    return (
                      <button
                        key={v.label}
                        type="button"
                        onClick={() =>
                          setVariantIndex((prev) => ({
                            ...prev,
                            [selectedScreen.id]: idx,
                          }))
                        }
                        className={`rounded-full px-2.5 py-1 text-[10.5px] font-bold transition ${
                          active
                            ? "bg-[#1D6BF3] text-white"
                            : "border border-slate-200 bg-white text-slate-600 hover:border-blue-300"
                        }`}
                      >
                        {v.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : null}

            {relatedWires.length > 0 ? (
              <div className="mt-3 space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase">
                  Connected Flows
                </p>
                {relatedWires.map((w) => (
                  <p key={w.id} className="text-[11px] text-slate-600">
                    <span className="font-semibold text-[#0F172A]">
                      {screenMap[w.from].title}
                    </span>{" "}
                    →{" "}
                    <span className="font-semibold text-[#0F172A]">
                      {screenMap[w.to].title}
                    </span>{" "}
                    <span className="text-slate-400">({w.label})</span>
                  </p>
                ))}
              </div>
            ) : null}

            <button
              type="button"
              onClick={() => setFocusedModal(selectedId)}
              className="mt-3 w-full rounded-xl border border-slate-200 bg-white py-2 text-xs font-bold text-[#0F172A] shadow-xs transition hover:border-blue-300 hover:text-blue-700"
            >
              Open Full-Size Crop View
            </button>
          </div>
        </aside>

        {/* Main Canvas or Gallery Area */}
        {viewMode === "canvas" ? (
          <div
            className="relative flex-1 cursor-grab overflow-hidden active:cursor-grabbing"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(15,23,42,0.12) 1px, transparent 1px)",
              backgroundSize: "22px 22px",
            }}
            onMouseDown={(e) => {
              if ((e.target as HTMLElement).closest("button")) return;
              draggingRef.current = {
                startX: e.clientX,
                startY: e.clientY,
                origX: pan.x,
                origY: pan.y,
              };
            }}
            onMouseMove={(e) => {
              if (!draggingRef.current) return;
              const dx = e.clientX - draggingRef.current.startX;
              const dy = e.clientY - draggingRef.current.startY;
              setPan({
                x: draggingRef.current.origX + dx,
                y: draggingRef.current.origY + dy,
              });
            }}
            onMouseUp={() => {
              draggingRef.current = null;
            }}
            onMouseLeave={() => {
              draggingRef.current = null;
            }}
          >
            {/* Helper hint pill */}
            <div className="pointer-events-none absolute bottom-4 left-4 z-20 rounded-full border border-slate-200 bg-white/90 px-3.5 py-1.5 text-[11px] font-medium text-slate-600 shadow-sm backdrop-blur">
              Drag canvas to pan · Toggle <b>Light / Dark Captures</b> above · Click any artboard to inspect real Expo Web states
            </div>

            <div
              className="relative origin-top-left"
              style={{
                width: CANVAS_W,
                height: CANVAS_H,
                transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
              }}
            >
              {/* SVG Prototype Wiring Layer */}
              {showWires && (
                <svg
                  width={CANVAS_W}
                  height={CANVAS_H}
                  className="pointer-events-none absolute inset-0 overflow-visible"
                >
                  <defs>
                    <marker
                      id="arrow-active"
                      viewBox="0 0 10 10"
                      refX="8"
                      refY="5"
                      markerWidth="7"
                      markerHeight="7"
                      orient="auto-start-reverse"
                    >
                      <path d="M 0 1 L 10 5 L 0 9 z" fill="#1D6BF3" />
                    </marker>
                    <marker
                      id="arrow-muted"
                      viewBox="0 0 10 10"
                      refX="8"
                      refY="5"
                      markerWidth="7"
                      markerHeight="7"
                      orient="auto-start-reverse"
                    >
                      <path d="M 0 1 L 10 5 L 0 9 z" fill="#94A3B8" />
                    </marker>
                  </defs>

                  {WIRES.map((wire) => {
                    const p1 = anchorPoint(screenMap[wire.from], wire.fromSide);
                    const p2 = anchorPoint(screenMap[wire.to], wire.toSide);
                    const isHighlighted =
                      wire.from === selectedId || wire.to === selectedId;

                    let d = "";
                    if (wire.fromSide === "right" && wire.toSide === "left") {
                      const midX = (p1.x + p2.x) / 2;
                      d = `M ${p1.x} ${p1.y} C ${midX} ${p1.y}, ${midX} ${p2.y}, ${p2.x} ${p2.y}`;
                    } else {
                      const midY = (p1.y + p2.y) / 2;
                      d = `M ${p1.x} ${p1.y} C ${p1.x} ${midY}, ${p2.x} ${midY}, ${p2.x} ${p2.y}`;
                    }

                    const labelX = (p1.x + p2.x) / 2;
                    const labelY = (p1.y + p2.y) / 2;

                    return (
                      <g key={wire.id}>
                        <path
                          d={d}
                          fill="none"
                          stroke={isHighlighted ? "#1D6BF3" : "#94A3B8"}
                          strokeWidth={isHighlighted ? 3 : 2}
                          strokeDasharray={isHighlighted ? undefined : "6 6"}
                          opacity={isHighlighted ? 0.95 : 0.45}
                          markerEnd={
                            isHighlighted
                              ? "url(#arrow-active)"
                              : "url(#arrow-muted)"
                          }
                        />
                        <rect
                          x={labelX - 62}
                          y={labelY - 12}
                          width={124}
                          height={24}
                          rx={12}
                          fill={isHighlighted ? "#1D6BF3" : "#FFFFFF"}
                          stroke={isHighlighted ? "#1D6BF3" : "#CBD5E1"}
                          strokeWidth={1.2}
                        />
                        <text
                          x={labelX}
                          y={labelY + 4}
                          textAnchor="middle"
                          fontSize="10.5"
                          fontWeight="700"
                          fill={isHighlighted ? "#FFFFFF" : "#475569"}
                        >
                          {wire.label}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              )}

              {/* Artboards */}
              {SCREENS.map((node) => {
                const isSelected = node.id === selectedId;
                const capture = resolveCapture(node);
                return (
                  <div
                    key={node.id}
                    onClick={() => setSelectedId(node.id)}
                    className="absolute"
                    style={{ left: node.x, top: node.y }}
                  >
                    {/* Figma Frame Title Bar */}
                    <div className="mb-2 flex items-center justify-between px-1">
                      <span
                        className="flex items-center gap-1.5 text-xs font-bold"
                        style={{ color: isSelected ? "#1D6BF3" : "#475569" }}
                      >
                        <span className="font-mono text-[11px] opacity-75">
                          {node.code}
                        </span>
                        {node.title}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setFocusedModal(node.id);
                        }}
                        className="rounded-md bg-white px-2 py-0.5 text-[10px] font-bold text-slate-600 shadow-xs ring-1 ring-slate-200 hover:text-blue-600"
                      >
                        Crop / Focus
                      </button>
                    </div>

                    <div
                      className="rounded-[42px] p-1 transition"
                      style={{
                        boxShadow: isSelected
                          ? "0 0 0 3px #1D6BF3"
                          : "0 0 0 1px transparent",
                      }}
                    >
                      <RealPhoneFrame
                        capture={capture}
                        alt={`Manke ${node.title} (${capture.label})`}
                        priority={node.code === "01" || node.code === "02"}
                      />
                    </div>

                    {/* Real State Variant Pills */}
                    {node.variants.length > 1 ? (
                      <div className="mt-2.5 flex justify-center gap-1.5">
                        {node.variants.map((v, idx) => {
                          const active =
                            (variantIndex[node.id] ?? 0) === idx &&
                            !(appearance === "dark" && node.darkCapture && idx === 0);
                          return (
                            <button
                              key={v.label}
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedId(node.id);
                                setVariantIndex((prev) => ({
                                  ...prev,
                                  [node.id]: idx,
                                }));
                              }}
                              className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold transition ${
                                active
                                  ? "bg-[#1D6BF3] text-white shadow-xs"
                                  : "bg-white/95 text-slate-600 ring-1 ring-slate-200 hover:text-blue-600"
                              }`}
                            >
                              {v.label}
                            </button>
                          );
                        })}
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* Clean Gallery Grid View */
          <div className="flex-1 overflow-y-auto p-6 sm:p-10">
            <div className="mx-auto max-w-6xl">
              <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-bold tracking-widest text-[#1D6BF3] uppercase">
                    Real Expo React Native Captures · {SCREENS.length} Screens
                  </p>
                  <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-[#0F172A] sm:text-3xl">
                    Manke Screen Gallery
                  </h1>
                  <p className="mt-1 text-sm text-slate-600">
                    Every screen below is captured directly from the live Manke app.
                    Switch Light / Dark captures or click any screen to inspect full-size.
                  </p>
                </div>
                <Link
                  href="/"
                  className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50"
                >
                  ← Back to Landing Page
                </Link>
              </div>

              <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
                {SCREENS.map((node) => {
                  const capture = resolveCapture(node);
                  return (
                    <div
                      key={node.id}
                      className="flex flex-col items-center rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-sm transition hover:shadow-md"
                    >
                      <div className="mb-4 flex w-full items-center justify-between">
                        <div>
                          <span className="font-mono text-[11px] font-bold text-slate-400">
                            {node.code} · {node.group}
                          </span>
                          <h2 className="text-base font-extrabold text-[#0F172A]">
                            {node.title}
                          </h2>
                        </div>
                        <button
                          type="button"
                          onClick={() => setFocusedModal(node.id)}
                          className="rounded-full bg-gradient-to-r from-[#2B8CF8] to-[#1D6BF3] px-3 py-1 text-xs font-bold text-white"
                        >
                          Focus
                        </button>
                      </div>

                      <RealPhoneFrame
                        capture={capture}
                        alt={`Manke ${node.title} (${capture.label})`}
                      />

                      {node.variants.length > 1 ? (
                        <div className="mt-3 flex flex-wrap justify-center gap-1.5">
                          {node.variants.map((v, idx) => {
                            const active = (variantIndex[node.id] ?? 0) === idx;
                            return (
                              <button
                                key={v.label}
                                type="button"
                                onClick={() =>
                                  setVariantIndex((prev) => ({
                                    ...prev,
                                    [node.id]: idx,
                                  }))
                                }
                                className={`rounded-full px-2.5 py-0.5 text-[10.5px] font-bold transition ${
                                  active
                                    ? "bg-[#1D6BF3] text-white"
                                    : "border border-slate-200 bg-slate-50 text-slate-600 hover:border-blue-300"
                                }`}
                              >
                                {v.label}
                              </button>
                            );
                          })}
                        </div>
                      ) : null}

                      <p className="mt-4 text-center text-xs leading-relaxed text-slate-500">
                        {node.summary}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Full-Size Single-Screen Focus / Crop Modal */}
      {focusedModal ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/65 p-4 backdrop-blur-sm"
          onClick={() => setFocusedModal(null)}
        >
          <div
            className="flex max-h-[94vh] w-full max-w-md flex-col items-center overflow-y-auto rounded-[32px] bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-3 flex w-full items-center justify-between">
              <div>
                <p className="font-mono text-[11px] font-bold text-slate-400">
                  {screenMap[focusedModal].code} · {screenMap[focusedModal].group}
                </p>
                <h3 className="text-lg font-extrabold text-[#0F172A]">
                  {screenMap[focusedModal].title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setFocusedModal(null)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-sm font-bold text-slate-600 hover:bg-slate-200"
              >
                ✕
              </button>
            </div>

            {screenMap[focusedModal].variants.length > 1 ? (
              <div className="mb-3 flex flex-wrap justify-center gap-1.5">
                {screenMap[focusedModal].variants.map((v, idx) => {
                  const active = (variantIndex[focusedModal] ?? 0) === idx;
                  return (
                    <button
                      key={v.label}
                      type="button"
                      onClick={() =>
                        setVariantIndex((prev) => ({
                          ...prev,
                          [focusedModal]: idx,
                        }))
                      }
                      className={`rounded-full px-3 py-1 text-xs font-bold transition ${
                        active
                          ? "bg-[#1D6BF3] text-white"
                          : "border border-slate-200 bg-slate-50 text-slate-600 hover:border-blue-300"
                      }`}
                    >
                      {v.label}
                    </button>
                  );
                })}
              </div>
            ) : null}

            <div className="py-1">
              <RealPhoneFrame
                capture={resolveCapture(screenMap[focusedModal])}
                alt={`Manke ${screenMap[focusedModal].title}`}
                size="focus"
                priority
              />
            </div>

            <p className="mt-3 text-center text-xs leading-relaxed text-slate-500">
              {screenMap[focusedModal].summary}
            </p>

            <a
              href={resolveCapture(screenMap[focusedModal]).src}
              download={`manke-${focusedModal}.webp`}
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#0F172A] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#1D6BF3]"
            >
              Download Raw Screen Capture
            </a>
          </div>
        </div>
      ) : null}
    </div>
  );
}
