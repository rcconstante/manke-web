"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  MankePhoneScreen,
  PLAYGROUND_THEMES,
  type PlaygroundThemeId,
  type ScreenId,
} from "./MankePhoneScreens";

interface ScreenNode {
  id: ScreenId;
  code: string;
  title: string;
  group: "Onboarding" | "Core 5 Tabs" | "Sub-Screens";
  summary: string;
  x: number;
  y: number;
  interactive?: boolean;
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
const CARD_H = 560;

const SCREENS: ScreenNode[] = [
  {
    id: "onboarding",
    code: "01",
    title: "Welcome / Get Started",
    group: "Onboarding",
    summary:
      "Fast single-button guest entry directly into Home — no forced sign-up wall.",
    x: 40,
    y: 40,
  },
  {
    id: "home",
    code: "02",
    title: "Home Dashboard",
    group: "Core 5 Tabs",
    summary:
      "Good morning greeting, Savings hero card, 5-day week strip, Today's Schedule, and Upcoming Bills.",
    x: 410,
    y: 40,
  },
  {
    id: "calendar",
    code: "03",
    title: "Calendar",
    group: "Core 5 Tabs",
    summary:
      "Month/Week toggle, date strip, color-coded pastel event cards, and + Add Event FAB.",
    x: 780,
    y: 40,
  },
  {
    id: "savings",
    code: "04",
    title: "Savings & Budget",
    group: "Core 5 Tabs",
    summary:
      "Monthly Savings card, Income vs. Expenses summary, By Category / Transactions toggle, and + Add Transaction.",
    x: 1150,
    y: 40,
  },
  {
    id: "tasks",
    code: "05",
    title: "Tasks & Productivity",
    group: "Core 5 Tabs",
    summary:
      "Today's Productivity % progress bar, Task / Completed tabs, interactive checkboxes with due dates, and completion footer.",
    x: 1520,
    y: 40,
    interactive: true,
  },
  {
    id: "settings",
    code: "06",
    title: "Settings",
    group: "Core 5 Tabs",
    summary:
      "Clean settings list: Account, Appearance, Themes, Widget, Data & Backup, Language, and About Manke.",
    x: 1890,
    y: 40,
  },
  {
    id: "bills",
    code: "07",
    title: "Upcoming Bills",
    group: "Sub-Screens",
    summary:
      "Reached via Home → Upcoming Bills (View All >). Recurring & one-time bills with due-date reminders.",
    x: 410,
    y: 720,
  },
  {
    id: "account",
    code: "08",
    title: "Account & Cloud Sync",
    group: "Sub-Screens",
    summary:
      "Optional sign-in from Settings → Account to enable Cloud Backup & Sync, JSON export/import, or Account Deletion.",
    x: 1520,
    y: 720,
  },
  {
    id: "widgets",
    code: "09",
    title: "Home Screen Widgets",
    group: "Sub-Screens",
    summary:
      "Glanceable iOS WidgetKit & Android widgets for Budget Left, Upcoming Bills, and Pending Tasks.",
    x: 1890,
    y: 720,
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
    label: "Schedule · View All",
    fromSide: "right",
    toSide: "left",
  },
  {
    id: "w3",
    from: "home",
    to: "bills",
    label: "Bills · View All",
    fromSide: "bottom",
    toSide: "top",
  },
  {
    id: "w4",
    from: "calendar",
    to: "savings",
    label: "Savings Tab",
    fromSide: "right",
    toSide: "left",
  },
  {
    id: "w5",
    from: "savings",
    to: "tasks",
    label: "Tasks Tab",
    fromSide: "right",
    toSide: "left",
  },
  {
    id: "w6",
    from: "tasks",
    to: "settings",
    label: "Settings Tab",
    fromSide: "right",
    toSide: "left",
  },
  {
    id: "w7",
    from: "settings",
    to: "account",
    label: "Tap Account",
    fromSide: "bottom",
    toSide: "top",
  },
  {
    id: "w8",
    from: "settings",
    to: "widgets",
    label: "Tap Widget",
    fromSide: "bottom",
    toSide: "top",
  },
];

const CANVAS_W = 2240;
const CANVAS_H = 1380;

function anchorPoint(node: ScreenNode, side: "left" | "right" | "top" | "bottom") {
  // Artboard header label sits ~34px above phone shell
  const topY = node.y + 34;
  if (side === "right") return { x: node.x + CARD_W, y: topY + CARD_H / 2 };
  if (side === "left") return { x: node.x, y: topY + CARD_H / 2 };
  if (side === "bottom") return { x: node.x + CARD_W / 2, y: topY + CARD_H };
  return { x: node.x + CARD_W / 2, y: topY };
}

export function FigmaPlayground() {
  const [viewMode, setViewMode] = useState<"canvas" | "gallery">("canvas");
  const [themeId, setThemeId] = useState<PlaygroundThemeId>("blue");
  const [showWires, setShowWires] = useState(true);
  const [selectedId, setSelectedId] = useState<ScreenId>("tasks");
  const [zoom, setZoom] = useState(0.62);
  const [pan, setPan] = useState({ x: 24, y: 20 });
  const [focusedModal, setFocusedModal] = useState<ScreenId | null>(null);
  const [copied, setCopied] = useState(false);

  const draggingRef = useRef<{ startX: number; startY: number; origX: number; origY: number } | null>(
    null
  );

  const theme = PLAYGROUND_THEMES[themeId];
  const screenMap = useMemo(
    () => Object.fromEntries(SCREENS.map((s) => [s.id, s])) as Record<ScreenId, ScreenNode>,
    []
  );
  const selectedScreen = screenMap[selectedId];
  const relatedWires = useMemo(
    () => WIRES.filter((w) => w.from === selectedId || w.to === selectedId),
    [selectedId]
  );

  const focusScreenOnCanvas = (id: ScreenId) => {
    setSelectedId(id);
    if (viewMode === "canvas") {
      const node = screenMap[id];
      setPan({
        x: Math.round(-node.x * zoom + 120),
        y: Math.round(-node.y * zoom + 40),
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
        <div className="flex items-center gap-3">
          <span
            className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-bold text-white"
            style={{ background: theme.gradient }}
          >
            ◆ Manke Figma Playground
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

        {/* Center: Live Accent Theme Swatches */}
        <div className="flex items-center gap-2">
          <span className="hidden text-[11px] font-semibold text-slate-500 sm:inline">
            Theme:
          </span>
          {(Object.keys(PLAYGROUND_THEMES) as PlaygroundThemeId[]).map((id) => {
            const t = PLAYGROUND_THEMES[id];
            const active = id === themeId;
            return (
              <button
                key={id}
                type="button"
                title={t.label}
                onClick={() => setThemeId(id)}
                className={`h-6 w-6 rounded-full transition ${
                  active ? "scale-110 ring-2 ring-slate-900 ring-offset-2" : "opacity-80 hover:opacity-100"
                }`}
                style={{ backgroundColor: t.primary }}
              />
            );
          })}
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
                  onClick={() => setZoom((z) => Math.max(0.35, +(z - 0.1).toFixed(2)))}
                  className="px-2 py-1 hover:bg-slate-100"
                >
                  −
                </button>
                <span className="min-w-[44px] text-center text-[11px]">
                  {Math.round(zoom * 100)}%
                </span>
                <button
                  type="button"
                  onClick={() => setZoom((z) => Math.min(1.15, +(z + 0.1).toFixed(2)))}
                  className="px-2 py-1 hover:bg-slate-100"
                >
                  +
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setZoom(0.62);
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
        <aside className="hidden w-64 shrink-0 flex-col border-r border-slate-200 bg-white lg:flex">
          <div className="border-b border-slate-100 px-4 py-3">
            <p className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
              Screens ({SCREENS.length})
            </p>
            <p className="mt-0.5 text-[11px] text-slate-500">
              Click any screen to focus &amp; inspect flow wiring
            </p>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto p-3">
            {(["Onboarding", "Core 5 Tabs", "Sub-Screens"] as const).map((group) => (
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
                            ? "text-white shadow-sm"
                            : "text-slate-700 hover:bg-slate-100"
                        }`}
                        style={active ? { background: theme.gradient } : undefined}
                      >
                        <span className="flex items-center gap-2 truncate">
                          <span className="font-mono text-[10px] opacity-75">
                            {s.code}
                          </span>
                          <span className="truncate">{s.title}</span>
                        </span>
                        {s.interactive ? (
                          <span
                            className={`rounded px-1.5 py-0.5 text-[9px] font-bold ${
                              active
                                ? "bg-white/20 text-white"
                                : "bg-blue-50 text-blue-600"
                            }`}
                          >
                            Live
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
              Drag canvas to pan · Click checkboxes on <b>05 Tasks</b> to test live ·
              Click any artboard to trace flows
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
                      <path d="M 0 1 L 10 5 L 0 9 z" fill={theme.primary} />
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
                          stroke={isHighlighted ? theme.primary : "#94A3B8"}
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
                          x={labelX - 58}
                          y={labelY - 12}
                          width={116}
                          height={24}
                          rx={12}
                          fill={isHighlighted ? theme.primary : "#FFFFFF"}
                          stroke={isHighlighted ? theme.primary : "#CBD5E1"}
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
                        style={{ color: isSelected ? theme.primary : "#475569" }}
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
                      className="rounded-[38px] p-1 transition"
                      style={{
                        boxShadow: isSelected
                          ? `0 0 0 3px ${theme.primary}`
                          : "0 0 0 1px transparent",
                      }}
                    >
                      <MankePhoneScreen
                        screenId={node.id}
                        theme={theme}
                        onSelectScreen={(target) => setSelectedId(target)}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* Clean Gallery Grid View (Easy Client List + Individual Cropping) */
          <div className="flex-1 overflow-y-auto p-6 sm:p-10">
            <div className="mx-auto max-w-6xl">
              <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p
                    className="text-xs font-bold tracking-widest uppercase"
                    style={{ color: theme.primary }}
                  >
                    Manke Mobile UI · All {SCREENS.length} Screens
                  </p>
                  <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-[#0F172A] sm:text-3xl">
                    Screen Gallery &amp; Interactive Checklist Preview
                  </h1>
                  <p className="mt-1 text-sm text-slate-600">
                    Click any screen to open a clean crop/focus view, or test the
                    interactive Tasks checklist directly below.
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
                {SCREENS.map((node) => (
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
                        className="rounded-full px-3 py-1 text-xs font-bold text-white"
                        style={{ background: theme.gradient }}
                      >
                        Focus
                      </button>
                    </div>

                    <MankePhoneScreen
                      screenId={node.id}
                      theme={theme}
                      onSelectScreen={(target) => setFocusedModal(target)}
                    />

                    <p className="mt-4 text-center text-xs leading-relaxed text-slate-500">
                      {node.summary}
                    </p>
                  </div>
                ))}
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
            className="flex max-h-[92vh] w-full max-w-md flex-col items-center overflow-y-auto rounded-[32px] bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex w-full items-center justify-between">
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

            <div className="py-2">
              <MankePhoneScreen
                screenId={focusedModal}
                theme={theme}
                onSelectScreen={(target) => setFocusedModal(target)}
              />
            </div>

            <p className="mt-3 text-center text-xs leading-relaxed text-slate-500">
              {screenMap[focusedModal].summary}
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
