"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { RealPhoneFrame, type RealScreenCapture } from "./RealPhoneFrame";
import {
  InteractivePhonePrototype,
  type PrototypeScreenId,
} from "./InteractivePhonePrototype";

type ScreenId = PrototypeScreenId;

type ScreenGroup =
  | "Onboarding"
  | "Core 5 Tabs"
  | "Forms & Modals"
  | "Settings Sub-Screens";

interface ScreenNode {
  id: ScreenId;
  code: string;
  title: string;
  group: ScreenGroup;
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
  fromSide: "right" | "bottom" | "left";
  toSide: "left" | "top" | "right";
}

const CARD_W = 268;
const CARD_H = 582;

const SCREEN_GROUPS: ScreenGroup[] = [
  "Onboarding",
  "Core 5 Tabs",
  "Forms & Modals",
  "Settings Sub-Screens",
];

const SCREENS: ScreenNode[] = [
  // Row 1: Onboarding & Core 5 Tabs
  {
    id: "onboarding",
    code: "01",
    title: "Onboarding",
    group: "Onboarding",
    summary:
      "Single-button offline-first welcome screen straight into Manke Home — zero forced sign-up wall.",
    x: 40,
    y: 60,
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
    title: "Home",
    group: "Core 5 Tabs",
    summary:
      "Greeting header, Notifications bell, Budget Remaining hero card, Today's Schedule, Upcoming Bills, and Pending Tasks.",
    x: 390,
    y: 60,
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
    title: "Calendar",
    group: "Core 5 Tabs",
    summary:
      "Week & Month toggle, color-coded schedule cards, event dots, and + Add Event FAB.",
    x: 740,
    y: 60,
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
    title: "Budget",
    group: "Core 5 Tabs",
    summary:
      "Unified Budget hub with Remaining ring, Income vs Expenses, Reports & Insights pill, and Bills / Transactions / Categories tabs.",
    x: 1440,
    y: 60,
    variants: [
      {
        src: "/playground/03-budget-bills.webp",
        label: "Bills",
        topBg: "#DCEBFF",
      },
      {
        src: "/playground/03-budget-transactions.webp",
        label: "Transactions",
        topBg: "#DCEBFF",
      },
      {
        src: "/playground/03-budget-categories.webp",
        label: "Categories",
        topBg: "#DCEBFF",
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
    id: "tasks",
    code: "05",
    title: "Tasks",
    group: "Core 5 Tabs",
    summary:
      "Today's Productivity % card, Tasks / Completed toggle, live animated checkbox progress, and + New Task FAB.",
    x: 2140,
    y: 60,
    variants: [
      {
        src: "/playground/05-tasks-light.webp",
        label: "0% Pending",
        topBg: "#DCEBFF",
      },
      {
        src: "/playground/05-tasks-tick1.webp",
        label: "1st Ticked",
        topBg: "#DCEBFF",
      },
      {
        src: "/playground/05-tasks-progress.webp",
        label: "25%+ Progress",
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
    id: "settings",
    code: "06",
    title: "Settings",
    group: "Core 5 Tabs",
    summary:
      "Clean 7-row Settings menu: Account, Appearance, Themes, Widget, Data & Backup, Language, and About Manke.",
    x: 2840,
    y: 60,
    variants: [
      {
        src: "/playground/07-settings-light.webp",
        label: "Light",
        topBg: "#DCEBFF",
      },
    ],
    darkCapture: {
      src: "/playground/07-settings-dark.webp",
      label: "Dark",
      topBg: "#13203A",
      darkStatusBar: true,
    },
  },

  // Row 2: Forms & Modals
  {
    id: "notifications",
    code: "07",
    title: "Notifications",
    group: "Forms & Modals",
    summary:
      "Opened from Home's bell icon. Shows upcoming bill alerts and today's scheduled events with Mark all read.",
    x: 390,
    y: 800,
    variants: [
      {
        src: "/playground/14-notifications.webp",
        label: "Notifications",
        topBg: "#FFFFFF",
      },
    ],
  },
  {
    id: "add-event",
    code: "08",
    title: "New Event Form",
    group: "Forms & Modals",
    summary:
      "Opened from Calendar + FAB. Title, date, start/end time, repeat cadence, reminders, location, and category.",
    x: 740,
    y: 800,
    variants: [
      {
        src: "/playground/15-add-event.webp",
        label: "New Event",
        topBg: "#7E839B",
        darkStatusBar: true,
      },
    ],
  },
  {
    id: "reports",
    code: "09",
    title: "Reports & Insights",
    group: "Forms & Modals",
    summary:
      "Opened from Budget → Reports & Insights. 6-month cash flow chart, savings rate, category breakdown, and bills summary.",
    x: 1090,
    y: 800,
    variants: [
      {
        src: "/playground/06-reports.webp",
        label: "Cash Flow Top",
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
    id: "add-transaction",
    code: "10",
    title: "Add Transaction Form",
    group: "Forms & Modals",
    summary:
      "Opened from Budget + FAB on Transactions/Categories. Quick Expense or Income sheet with category chips and date.",
    x: 1440,
    y: 800,
    variants: [
      {
        src: "/playground/03-budget-add.webp",
        label: "Add Transaction",
        topBg: "#7E839B",
        darkStatusBar: true,
      },
    ],
  },
  {
    id: "bill-detail",
    code: "11",
    title: "Bill Detail",
    group: "Forms & Modals",
    summary:
      "Opened by tapping any bill in Budget → Bills. Mark bills Paid in one tap and auto-sync payments into Budget.",
    x: 1790,
    y: 800,
    variants: [
      {
        src: "/playground/04-bills-detail.webp",
        label: "Unpaid",
        topBg: "#FFFFFF",
      },
      {
        src: "/playground/04-bills-paid.webp",
        label: "Marked Paid",
        topBg: "#FFFFFF",
      },
    ],
  },
  {
    id: "add-bill",
    code: "12",
    title: "Add Bill Form",
    group: "Forms & Modals",
    summary:
      "Recurring Bill creation/edit form sheet with amount, first due date, monthly/weekly/yearly recurrence, and reminder alerts.",
    x: 1790,
    y: 1540,
    variants: [
      {
        src: "/playground/16-add-bill.webp",
        label: "Add Recurring Bill",
        topBg: "#86879B",
        darkStatusBar: true,
      },
    ],
  },
  {
    id: "add-task",
    code: "13",
    title: "New Task Form",
    group: "Forms & Modals",
    summary:
      "Opened from Tasks + FAB. Add checklist items with optional due date/time, reminder, priority level, and description.",
    x: 2140,
    y: 800,
    variants: [
      {
        src: "/playground/17-add-task.webp",
        label: "New Task",
        topBg: "#7E839B",
        darkStatusBar: true,
      },
    ],
  },

  // Settings Sub-Screens (Rows 2 & 3 on right side)
  {
    id: "account",
    code: "14",
    title: "Account",
    group: "Settings Sub-Screens",
    summary:
      "Settings → Account. Profile avatar, VIP badge, Cloud Backup & Sync status, Redeem Code, and Log In / Create Account.",
    x: 2490,
    y: 800,
    variants: [
      {
        src: "/playground/08-account.webp",
        label: "Account",
        topBg: "#FFFFFF",
      },
    ],
  },
  {
    id: "appearance",
    code: "15",
    title: "Appearance",
    group: "Settings Sub-Screens",
    summary:
      "Settings → Appearance. System/Light/Dark mode, Currency selector, Monthly Budget cap, and Notification reminder switches.",
    x: 2840,
    y: 800,
    variants: [
      {
        src: "/playground/09-appearance.webp",
        label: "Appearance",
        topBg: "#FFFFFF",
      },
    ],
  },
  {
    id: "themes",
    code: "16",
    title: "Themes",
    group: "Settings Sub-Screens",
    summary:
      "Settings → Themes sheet. Live appearance switcher and 5 curated accent palettes including Manke Blue and Emerald Teal.",
    x: 3190,
    y: 800,
    variants: [
      {
        src: "/playground/10-themes-light.webp",
        label: "Light Sheet",
        topBg: "#7E839B",
        darkStatusBar: true,
      },
      {
        src: "/playground/10-themes-dark.webp",
        label: "Dark · Blue",
        topBg: "#151934",
        darkStatusBar: true,
      },
      {
        src: "/playground/10-themes-accent.webp",
        label: "Dark · Teal",
        topBg: "#131D2A",
        darkStatusBar: true,
      },
    ],
    darkCapture: {
      src: "/playground/10-themes-dark.webp",
      label: "Dark · Blue",
      topBg: "#151934",
      darkStatusBar: true,
    },
  },
  {
    id: "widgets",
    code: "17",
    title: "Widget Studio",
    group: "Settings Sub-Screens",
    summary:
      "Settings → Widget. Live iOS WidgetKit & Android Home Screen widget previews for Budget, Upcoming Bills, and Pending Tasks.",
    x: 3540,
    y: 800,
    variants: [
      {
        src: "/playground/11-widgets.webp",
        label: "Widget Studio",
        topBg: "#FFFFFF",
      },
    ],
  },
  {
    id: "signin",
    code: "18",
    title: "Sign In",
    group: "Settings Sub-Screens",
    summary:
      "Optional Cloud Sync Sign In opened from Account or Data & Backup to securely sync workspace data across devices.",
    x: 2490,
    y: 1540,
    variants: [
      {
        src: "/playground/13-signin.webp",
        label: "Sign In",
        topBg: "#B1D0FA",
      },
    ],
  },
  {
    id: "data-backup",
    code: "19",
    title: "Data & Backup",
    group: "Settings Sub-Screens",
    summary:
      "Settings → Data & Backup. Cloud Backup & Sync, JSON export/import, reset demo records, and clear local workspace.",
    x: 2840,
    y: 1540,
    variants: [
      {
        src: "/playground/12-data-backup.webp",
        label: "Data & Backup",
        topBg: "#FFFFFF",
      },
    ],
  },
  {
    id: "language",
    code: "20",
    title: "Language",
    group: "Settings Sub-Screens",
    summary:
      "Settings → Language bottom sheet with default app language selection and future localization support.",
    x: 3190,
    y: 1540,
    variants: [
      {
        src: "/playground/18-language.webp",
        label: "Language",
        topBg: "#7E839B",
        darkStatusBar: true,
      },
    ],
  },
  {
    id: "about",
    code: "21",
    title: "About Manke",
    group: "Settings Sub-Screens",
    summary:
      "Settings → About Manke. Version 1.0.0, website, Terms of Service, Privacy Policy, Open Source License, and Rate Manke.",
    x: 3540,
    y: 1540,
    variants: [
      {
        src: "/playground/19-about.webp",
        label: "About Manke",
        topBg: "#FFFFFF",
      },
    ],
  },
];

const WIRES: FlowWire[] = [
  // Top row 5-tab core flow
  {
    id: "w-onboard-home",
    from: "onboarding",
    to: "home",
    label: "Get Started",
    fromSide: "right",
    toSide: "left",
  },
  {
    id: "w-home-cal",
    from: "home",
    to: "calendar",
    label: "Calendar Tab",
    fromSide: "right",
    toSide: "left",
  },
  {
    id: "w-cal-budget",
    from: "calendar",
    to: "budget",
    label: "Budget Tab",
    fromSide: "right",
    toSide: "left",
  },
  {
    id: "w-budget-tasks",
    from: "budget",
    to: "tasks",
    label: "Tasks Tab",
    fromSide: "right",
    toSide: "left",
  },
  {
    id: "w-tasks-settings",
    from: "tasks",
    to: "settings",
    label: "Settings Tab",
    fromSide: "right",
    toSide: "left",
  },

  // Tab -> Modals & Forms
  {
    id: "w-home-notif",
    from: "home",
    to: "notifications",
    label: "Bell Icon",
    fromSide: "bottom",
    toSide: "top",
  },
  {
    id: "w-cal-addevent",
    from: "calendar",
    to: "add-event",
    label: "+ New Event",
    fromSide: "bottom",
    toSide: "top",
  },
  {
    id: "w-budget-reports",
    from: "budget",
    to: "reports",
    label: "Reports Pill",
    fromSide: "bottom",
    toSide: "top",
  },
  {
    id: "w-budget-addtx",
    from: "budget",
    to: "add-transaction",
    label: "+ Transaction",
    fromSide: "bottom",
    toSide: "top",
  },
  {
    id: "w-budget-billdetail",
    from: "budget",
    to: "bill-detail",
    label: "Tap Bill Row",
    fromSide: "bottom",
    toSide: "top",
  },
  {
    id: "w-billdetail-addbill",
    from: "bill-detail",
    to: "add-bill",
    label: "Edit / Add Bill",
    fromSide: "bottom",
    toSide: "top",
  },
  {
    id: "w-tasks-addtask",
    from: "tasks",
    to: "add-task",
    label: "+ New Task",
    fromSide: "bottom",
    toSide: "top",
  },

  // Settings -> Sub-screens
  {
    id: "w-settings-account",
    from: "settings",
    to: "account",
    label: "Account",
    fromSide: "bottom",
    toSide: "top",
  },
  {
    id: "w-settings-appearance",
    from: "settings",
    to: "appearance",
    label: "Appearance",
    fromSide: "bottom",
    toSide: "top",
  },
  {
    id: "w-settings-themes",
    from: "settings",
    to: "themes",
    label: "Themes",
    fromSide: "bottom",
    toSide: "top",
  },
  {
    id: "w-settings-widgets",
    from: "settings",
    to: "widgets",
    label: "Widget Studio",
    fromSide: "bottom",
    toSide: "top",
  },
  {
    id: "w-account-signin",
    from: "account",
    to: "signin",
    label: "Cloud Sync",
    fromSide: "bottom",
    toSide: "top",
  },
  {
    id: "w-backup-signin",
    from: "data-backup",
    to: "signin",
    label: "Sign In",
    fromSide: "left",
    toSide: "right",
  },
  {
    id: "w-appearance-backup",
    from: "settings",
    to: "data-backup",
    label: "Data & Backup",
    fromSide: "bottom",
    toSide: "top",
  },
  {
    id: "w-settings-language",
    from: "settings",
    to: "language",
    label: "Language",
    fromSide: "bottom",
    toSide: "top",
  },
  {
    id: "w-settings-about",
    from: "settings",
    to: "about",
    label: "About Manke",
    fromSide: "bottom",
    toSide: "top",
  },
];

const CANVAS_W = 3920;
const CANVAS_H = 2280;

function anchorPoint(
  node: ScreenNode,
  side: "left" | "right" | "top" | "bottom"
) {
  const topY = node.y + 34;
  if (side === "right") return { x: node.x + CARD_W, y: topY + CARD_H / 2 };
  if (side === "left") return { x: node.x, y: topY + CARD_H / 2 };
  if (side === "bottom") return { x: node.x + CARD_W / 2, y: topY + CARD_H };
  return { x: node.x + CARD_W / 2, y: topY };
}

export function FigmaPlayground() {
  const [viewMode, setViewMode] = useState<
    "interactive" | "canvas" | "gallery"
  >("interactive");
  const [appearance, setAppearance] = useState<"light" | "dark">("light");
  const [showWires, setShowWires] = useState(true);
  const [selectedId, setSelectedId] = useState<ScreenId>("home");
  const [interactiveKey, setInteractiveKey] = useState(0);
  const [interactiveStart, setInteractiveStart] = useState<ScreenId>("home");
  const [variantIndex, setVariantIndex] = useState<
    Partial<Record<ScreenId, number>>
  >({});
  const [zoom, setZoom] = useState(0.46);
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
    () =>
      Object.fromEntries(SCREENS.map((s) => [s.id, s])) as Record<
        ScreenId,
        ScreenNode
      >,
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

  const openInInteractive = (id: ScreenId) => {
    setInteractiveStart(id);
    setInteractiveKey((k) => k + 1);
    setViewMode("interactive");
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
            35 Real Expo Captures
          </span>

          {/* 3-Mode View Switcher */}
          <div className="inline-flex rounded-lg bg-slate-100 p-0.5 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setViewMode("interactive")}
              className={`rounded-md px-3 py-1 transition ${
                viewMode === "interactive"
                  ? "bg-white text-[#1554D1] shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Interactive App
            </button>
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
                  onClick={() =>
                    setZoom((z) => Math.max(0.28, +(z - 0.08).toFixed(2)))
                  }
                  className="px-2 py-1 hover:bg-slate-100"
                >
                  −
                </button>
                <span className="min-w-[44px] text-center text-[11px]">
                  {Math.round(zoom * 100)}%
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setZoom((z) => Math.min(1.15, +(z + 0.08).toFixed(2)))
                  }
                  className="px-2 py-1 hover:bg-slate-100"
                >
                  +
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setZoom(0.46);
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
        {/* Left Figma Layers Sidebar (Canvas & Gallery modes) */}
        {viewMode !== "interactive" && (
          <aside className="hidden w-68 shrink-0 flex-col border-r border-slate-200 bg-white lg:flex">
            <div className="border-b border-slate-100 px-4 py-3">
              <p className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                Live App Screens ({SCREENS.length})
              </p>
              <p className="mt-0.5 text-[11px] text-slate-500">
                35 real Expo Web captures · 5-tab layout
              </p>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto p-3">
              {SCREEN_GROUPS.map((group) => (
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
              ))}
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
                      const active =
                        (variantIndex[selectedScreen.id] ?? 0) === idx;
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
                  {relatedWires.slice(0, 4).map((w) => (
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

              <div className="mt-3 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => openInInteractive(selectedId)}
                  className="rounded-xl bg-[#1D6BF3] py-2 text-xs font-bold text-white shadow-xs transition hover:bg-[#1554D1]"
                >
                  Try Live
                </button>
                <button
                  type="button"
                  onClick={() => setFocusedModal(selectedId)}
                  className="rounded-xl border border-slate-200 bg-white py-2 text-xs font-bold text-[#0F172A] shadow-xs transition hover:border-blue-300 hover:text-blue-700"
                >
                  Focus Crop
                </button>
              </div>
            </div>
          </aside>
        )}

        {/* Main Content: Interactive App | Canvas & Wiring | All Screens Gallery */}
        {viewMode === "interactive" ? (
          <InteractivePhonePrototype
            key={interactiveKey}
            appearance={appearance}
            onAppearanceChange={setAppearance}
            initialScreen={interactiveStart}
          />
        ) : viewMode === "canvas" ? (
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
              Drag canvas to pan · Toggle <b>Light / Dark Captures</b> above ·
              Click any artboard to inspect real Expo Web states
            </div>

            <div
              className="relative origin-top-left"
              style={{
                width: CANVAS_W,
                height: CANVAS_H,
                transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
              }}
            >
              {/* Subtle Section Labels on Canvas */}
              <div className="pointer-events-none absolute top-2 left-10 text-xs font-extrabold tracking-widest text-slate-400 uppercase">
                Row 1 · Onboarding &amp; Core 5 Tabs
              </div>
              <div className="pointer-events-none absolute top-[760px] left-[390px] text-xs font-extrabold tracking-widest text-slate-400 uppercase">
                Row 2 · Forms, Modals &amp; Primary Settings
              </div>
              <div className="pointer-events-none absolute top-[1500px] left-[1790px] text-xs font-extrabold tracking-widest text-slate-400 uppercase">
                Row 3 · Secondary Sheets &amp; Settings Sub-Screens
              </div>

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
                    if (
                      (wire.fromSide === "right" && wire.toSide === "left") ||
                      (wire.fromSide === "left" && wire.toSide === "right")
                    ) {
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
                          opacity={isHighlighted ? 0.95 : 0.4}
                          markerEnd={
                            isHighlighted
                              ? "url(#arrow-active)"
                              : "url(#arrow-muted)"
                          }
                        />
                        <rect
                          x={labelX - 58}
                          y={labelY - 12}
                          width={116}
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
                      <div className="mt-2.5 flex flex-wrap justify-center gap-1.5">
                        {node.variants.map((v, idx) => {
                          const active =
                            (variantIndex[node.id] ?? 0) === idx &&
                            !(
                              appearance === "dark" &&
                              node.darkCapture &&
                              idx === 0
                            );
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
          /* Clean Gallery Grid View grouped neatly */
          <div className="flex-1 overflow-y-auto p-6 sm:p-10">
            <div className="mx-auto max-w-6xl">
              <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-bold tracking-widest text-[#1D6BF3] uppercase">
                    Real Expo React Native Captures · {SCREENS.length} Screens ·
                    35 States
                  </p>
                  <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-[#0F172A] sm:text-3xl">
                    Manke Complete Screen Gallery
                  </h1>
                  <p className="mt-1 text-sm text-slate-600">
                    Every screen below is captured directly from the live Manke
                    app. Switch Light / Dark captures, inspect state variants,
                    or jump straight into Interactive App mode.
                  </p>
                </div>
                <Link
                  href="/"
                  className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50"
                >
                  ← Back to Landing Page
                </Link>
              </div>

              <div className="space-y-12">
                {SCREEN_GROUPS.map((group) => {
                  const items = SCREENS.filter((s) => s.group === group);
                  return (
                    <section key={group}>
                      <div className="mb-4 flex items-center justify-between border-b border-slate-200 pb-2">
                        <h2 className="text-sm font-extrabold tracking-wider text-slate-700 uppercase">
                          {group}
                        </h2>
                        <span className="text-xs font-semibold text-slate-400">
                          {items.length}{" "}
                          {items.length === 1 ? "screen" : "screens"}
                        </span>
                      </div>

                      <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
                        {items.map((node) => {
                          const capture = resolveCapture(node);
                          return (
                            <div
                              key={node.id}
                              className="flex flex-col items-center rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-sm transition hover:shadow-md"
                            >
                              <div className="mb-4 flex w-full items-center justify-between gap-2">
                                <div className="min-w-0">
                                  <span className="font-mono text-[11px] font-bold text-slate-400">
                                    {node.code} · {node.group}
                                  </span>
                                  <h3 className="truncate text-base font-extrabold text-[#0F172A]">
                                    {node.title}
                                  </h3>
                                </div>
                                <div className="flex shrink-0 items-center gap-1.5">
                                  <button
                                    type="button"
                                    onClick={() => openInInteractive(node.id)}
                                    className="rounded-full border border-[#CBE0FF] bg-[#EBF3FF] px-2.5 py-1 text-[11px] font-bold text-[#1554D1] hover:bg-[#DCEBFF]"
                                  >
                                    Try
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setFocusedModal(node.id)}
                                    className="rounded-full bg-gradient-to-r from-[#2B8CF8] to-[#1D6BF3] px-3 py-1 text-[11px] font-bold text-white"
                                  >
                                    Focus
                                  </button>
                                </div>
                              </div>

                              <RealPhoneFrame
                                capture={capture}
                                alt={`Manke ${node.title} (${capture.label})`}
                              />

                              {node.variants.length > 1 ? (
                                <div className="mt-3 flex flex-wrap justify-center gap-1.5">
                                  {node.variants.map((v, idx) => {
                                    const active =
                                      (variantIndex[node.id] ?? 0) === idx &&
                                      !(
                                        appearance === "dark" &&
                                        node.darkCapture &&
                                        idx === 0
                                      );
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
                    </section>
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
                  {screenMap[focusedModal].code} ·{" "}
                  {screenMap[focusedModal].group}
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

            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => {
                  const target = focusedModal;
                  setFocusedModal(null);
                  openInInteractive(target);
                }}
                className="inline-flex items-center gap-2 rounded-full bg-[#1D6BF3] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#1554D1]"
              >
                Open in Interactive App
              </button>
              <a
                href={resolveCapture(screenMap[focusedModal]).src}
                download={`manke-${focusedModal}.webp`}
                className="inline-flex items-center gap-2 rounded-full bg-[#0F172A] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#1D6BF3]"
              >
                Download Raw Capture
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
