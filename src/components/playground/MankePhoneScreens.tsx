"use client";

import { useState } from "react";

export type PlaygroundThemeId = "blue" | "purple" | "teal" | "rose" | "amber";

export interface PlaygroundTheme {
  id: PlaygroundThemeId;
  label: string;
  primary: string;
  primaryDeep: string;
  primaryLight: string;
  soft: string;
  border: string;
  gradient: string;
  backdrop: string;
}

export const PLAYGROUND_THEMES: Record<PlaygroundThemeId, PlaygroundTheme> = {
  blue: {
    id: "blue",
    label: "Manke Blue",
    primary: "#1D6BF3",
    primaryDeep: "#1554D1",
    primaryLight: "#3B8CF8",
    soft: "#EBF3FF",
    border: "#CBE0FF",
    gradient: "linear-gradient(135deg, #2B8CF8 0%, #1D6BF3 55%, #1554D1 100%)",
    backdrop: "linear-gradient(180deg, #EBF3FF 0%, #F8FAFF 28%, #FFFFFF 100%)",
  },
  purple: {
    id: "purple",
    label: "Royal Purple",
    primary: "#8B3FE8",
    primaryDeep: "#6D28D9",
    primaryLight: "#A855F7",
    soft: "#F3E8FF",
    border: "#E4D4FB",
    gradient: "linear-gradient(135deg, #9B51E0 0%, #8438E6 55%, #6D28D9 100%)",
    backdrop: "linear-gradient(180deg, #F3E8FF 0%, #FAF7FF 28%, #FFFFFF 100%)",
  },
  teal: {
    id: "teal",
    label: "Emerald Teal",
    primary: "#0D9488",
    primaryDeep: "#0F766E",
    primaryLight: "#14B8A6",
    soft: "#E6FAF7",
    border: "#BCEEE7",
    gradient: "linear-gradient(135deg, #2DD4BF 0%, #0D9488 55%, #0F766E 100%)",
    backdrop: "linear-gradient(180deg, #E6FAF7 0%, #F4FCFB 28%, #FFFFFF 100%)",
  },
  rose: {
    id: "rose",
    label: "Berry Rose",
    primary: "#E11D48",
    primaryDeep: "#BE123C",
    primaryLight: "#F43F5E",
    soft: "#FFEBF0",
    border: "#FCCAD7",
    gradient: "linear-gradient(135deg, #FB7185 0%, #E11D48 55%, #BE123C 100%)",
    backdrop: "linear-gradient(180deg, #FFEBF0 0%, #FFF7F9 28%, #FFFFFF 100%)",
  },
  amber: {
    id: "amber",
    label: "Warm Amber",
    primary: "#D97706",
    primaryDeep: "#B45309",
    primaryLight: "#F59E0B",
    soft: "#FEF4E2",
    border: "#FDE0B0",
    gradient: "linear-gradient(135deg, #FBBF24 0%, #D97706 55%, #B45309 100%)",
    backdrop: "linear-gradient(180deg, #FEF4E2 0%, #FFFBF2 28%, #FFFFFF 100%)",
  },
};

export type ScreenId =
  | "onboarding"
  | "home"
  | "calendar"
  | "savings"
  | "tasks"
  | "settings"
  | "bills"
  | "account"
  | "widgets";

type TabId = "home" | "calendar" | "savings" | "tasks" | "settings";

function PhoneShell({
  theme,
  activeTab,
  onSelectScreen,
  showBottomBar = true,
  children,
}: {
  theme: PlaygroundTheme;
  activeTab?: TabId;
  onSelectScreen?: (id: ScreenId) => void;
  showBottomBar?: boolean;
  children: React.ReactNode;
}) {
  const tabs: { id: TabId; label: string; icon: string }[] = [
    { id: "home", label: "Home", icon: "⌂" },
    { id: "calendar", label: "Calendar", icon: "📅" },
    { id: "savings", label: "Savings", icon: "👛" },
    { id: "tasks", label: "Tasks", icon: "☑" },
    { id: "settings", label: "Settings", icon: "⚙" },
  ];

  return (
    <div
      className="relative flex h-[560px] w-[268px] flex-col overflow-hidden rounded-[34px] border-[5px] border-[#111827] bg-white shadow-[0_18px_40px_-14px_rgba(15,23,42,0.28)] select-none"
      style={{ background: theme.backdrop }}
    >
      {/* iOS Status Bar */}
      <div className="flex items-center justify-between px-4 pt-2.5 pb-1.5 text-[10px] font-bold text-[#0F172A]">
        <span>9:41</span>
        <div className="h-[14px] w-[62px] rounded-full bg-[#0F172A]" />
        <div className="flex items-center gap-1">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#0F172A]" />
          <span className="inline-block h-2 w-3.5 rounded-[2px] border border-[#0F172A] p-[1px]">
            <span className="block h-full w-full bg-[#0F172A]" />
          </span>
        </div>
      </div>

      {/* Screen Content */}
      <div className="relative flex-1 overflow-hidden px-3.5 pb-2">{children}</div>

      {/* 5-Tab Bottom Bar */}
      {showBottomBar && (
        <div className="grid grid-cols-5 border-t border-slate-200/80 bg-white/95 px-1 pt-1.5 pb-2.5 text-center backdrop-blur">
          {tabs.map((tab) => {
            const isActive = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectScreen?.(tab.id);
                }}
                className="flex flex-col items-center gap-0.5 rounded-md py-0.5 transition hover:bg-slate-100"
              >
                <span
                  className="text-[12px] leading-none"
                  style={{ color: isActive ? theme.primary : "#64748B" }}
                >
                  {tab.icon}
                </span>
                <span
                  className="text-[8.5px] font-semibold tracking-tight"
                  style={{ color: isActive ? theme.primary : "#64748B" }}
                >
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function MankePhoneScreen({
  screenId,
  theme,
  onSelectScreen,
}: {
  screenId: ScreenId;
  theme: PlaygroundTheme;
  onSelectScreen?: (id: ScreenId) => void;
}) {
  const [tasks, setTasks] = useState([
    { id: "1", title: "Clean rooms", due: "", done: true },
    { id: "2", title: "Buy grocery", due: "", done: true },
    { id: "3", title: "Prepare presentation", due: "Nov 18", done: false },
    { id: "4", title: "Submit assignment", due: "Nov 20", done: false },
  ]);
  const [taskFilter, setTaskFilter] = useState<"all" | "completed">("all");

  if (screenId === "onboarding") {
    return (
      <PhoneShell theme={theme} showBottomBar={false}>
        <div className="flex h-full flex-col items-center justify-between py-10 text-center">
          <div className="mt-12 flex flex-col items-center">
            <div
              className="flex h-20 w-20 items-center justify-center rounded-[24px] text-3xl text-white shadow-lg"
              style={{ background: theme.gradient }}
            >
              ✓
            </div>
            <h3 className="mt-5 text-2xl font-extrabold tracking-tight text-[#0F172A]">
              Manke
            </h3>
            <p className="mt-1.5 text-[11px] font-semibold tracking-wide text-slate-500">
              Plan · Track · Spend
            </p>
            <p className="mt-4 max-w-[200px] text-[11px] leading-relaxed text-slate-500">
              Your schedule, monthly savings, recurring bills, and daily tasks —
              offline first, zero sign-up friction.
            </p>
          </div>

          <div className="w-full space-y-2.5">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onSelectScreen?.("home");
              }}
              className="w-full rounded-full py-3 text-xs font-bold text-white shadow-md transition hover:opacity-95"
              style={{ background: theme.gradient }}
            >
              Get Started
            </button>
            <p className="text-[9.5px] text-slate-400">
              Sign in anytime later under Settings → Account
            </p>
          </div>
        </div>
      </PhoneShell>
    );
  }

  if (screenId === "home") {
    return (
      <PhoneShell theme={theme} activeTab="home" onSelectScreen={onSelectScreen}>
        <div className="space-y-3 pt-1">
          <div className="flex items-center justify-between">
            <h3 className="text-[17px] font-extrabold tracking-tight text-[#0F172A]">
              Good morning
            </h3>
            <span className="relative flex h-7 w-7 items-center justify-center rounded-full bg-white text-xs shadow-sm ring-1 ring-slate-200/80">
              🔔
              <span className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full bg-rose-500" />
            </span>
          </div>

          {/* Savings Card */}
          <div
            className="rounded-2xl p-3.5 text-white shadow-md"
            style={{ background: theme.gradient }}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 text-lg">
                👛
              </div>
              <div>
                <p className="text-[10px] font-medium text-white/85">Savings</p>
                <p className="text-[20px] font-extrabold leading-tight tracking-tight">
                  ₱12,350
                </p>
                <p className="text-[9.5px] text-white/80">This Month</p>
              </div>
            </div>
          </div>

          {/* 5-day Week Strip */}
          <div className="grid grid-cols-5 gap-1.5 text-center">
            {[
              { d: "Mon", n: "17", active: true },
              { d: "Tue", n: "18", active: false },
              { d: "Wed", n: "19", active: false },
              { d: "Thu", n: "20", active: false },
              { d: "Fri", n: "21", active: false },
            ].map((item) => (
              <div
                key={item.d}
                className="rounded-xl py-1.5"
                style={
                  item.active
                    ? { background: theme.gradient, color: "#FFFFFF" }
                    : { color: "#334155" }
                }
              >
                <p className="text-[9px] font-medium opacity-80">{item.d}</p>
                <p className="text-[12px] font-extrabold">{item.n}</p>
              </div>
            ))}
          </div>

          {/* Today's Schedule */}
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <p className="text-[11.5px] font-bold text-[#0F172A]">
                Today&apos;s Schedule
              </p>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectScreen?.("calendar");
                }}
                className="text-[9.5px] font-semibold"
                style={{ color: theme.primary }}
              >
                View All &gt;
              </button>
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2.5 rounded-xl border-l-[3px] border-violet-500 bg-violet-50 px-2.5 py-2">
                <span className="text-xs">🏋️</span>
                <div>
                  <p className="text-[11px] font-bold text-[#0F172A]">Pilates</p>
                  <p className="text-[9px] text-slate-500">6:00 PM – 7:00 PM</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5 rounded-xl border-l-[3px] border-amber-500 bg-amber-50 px-2.5 py-2">
                <span className="text-xs">🍽️</span>
                <div>
                  <p className="text-[11px] font-bold text-[#0F172A]">Dinner Date</p>
                  <p className="text-[9px] text-slate-500">8:00 PM – 10:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Bills */}
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <p className="text-[11.5px] font-bold text-[#0F172A]">
                Upcoming Bills
              </p>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectScreen?.("bills");
                }}
                className="text-[9.5px] font-semibold"
                style={{ color: theme.primary }}
              >
                View All &gt;
              </button>
            </div>
            <div className="space-y-1.5">
              {[
                { icon: "🏠", name: "Rent", due: "Nov 20", amount: "₱60,000" },
                { icon: "⚡", name: "Electricity", due: "Nov 22", amount: "₱4,500" },
                { icon: "💧", name: "Water", due: "Nov 25", amount: "₱1,200" },
              ].map((b) => (
                <div
                  key={b.name}
                  className="flex items-center justify-between rounded-xl bg-white px-2.5 py-1.5 ring-1 ring-slate-100"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xs">{b.icon}</span>
                    <div>
                      <p className="text-[10.5px] font-bold text-[#0F172A]">
                        {b.name}
                      </p>
                      <p className="text-[8.5px] text-slate-400">{b.due}</p>
                    </div>
                  </div>
                  <span className="text-[10.5px] font-bold text-[#0F172A]">
                    {b.amount}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </PhoneShell>
    );
  }

  if (screenId === "calendar") {
    return (
      <PhoneShell theme={theme} activeTab="calendar" onSelectScreen={onSelectScreen}>
        <div className="space-y-3 pt-1">
          <h3 className="text-center text-[16px] font-extrabold text-[#0F172A]">
            Calendar
          </h3>

          <div className="grid grid-cols-2 rounded-full bg-slate-100 p-1 text-[10.5px] font-bold">
            <div className="py-1.5 text-center text-slate-500">Month</div>
            <div
              className="rounded-full py-1.5 text-center text-white shadow-sm"
              style={{ background: theme.gradient }}
            >
              Week
            </div>
          </div>

          <div className="flex items-center justify-between px-1 text-[11px] font-bold text-[#0F172A]">
            <span>‹</span>
            <span>Nov 17 – Nov 23</span>
            <span>›</span>
          </div>

          <div className="grid grid-cols-5 gap-1.5 text-center">
            {[
              { d: "Mon", n: "17", active: true },
              { d: "Tue", n: "18", active: false },
              { d: "Wed", n: "19", active: false },
              { d: "Thu", n: "20", active: false },
              { d: "Fri", n: "21", active: false },
            ].map((item) => (
              <div
                key={item.d}
                className="rounded-xl py-1.5"
                style={
                  item.active
                    ? { background: theme.gradient, color: "#FFFFFF" }
                    : { color: "#334155" }
                }
              >
                <p className="text-[9px] opacity-80">{item.d}</p>
                <p className="text-[12px] font-extrabold">{item.n}</p>
              </div>
            ))}
          </div>

          <div className="space-y-2.5 pt-1">
            {[
              {
                time: "10:00 AM – 11:30 AM",
                title: "Accounting Class",
                bg: "#EBF3FF",
                bar: "#1D6BF3",
              },
              {
                time: "2:00 PM – 3:00 PM",
                title: "Team Meeting",
                bg: "#FEF3E2",
                bar: "#F59E0B",
              },
              {
                time: "6:00 PM – 7:00 PM",
                title: "Pilates",
                bg: "#E9F9EE",
                bar: "#16A34A",
              },
            ].map((ev) => (
              <div
                key={ev.title}
                className="rounded-2xl px-3 py-2.5"
                style={{
                  backgroundColor: ev.bg,
                  borderLeft: `4px solid ${ev.bar}`,
                }}
              >
                <p className="text-[9.5px] font-semibold text-slate-600">
                  {ev.time}
                </p>
                <p className="mt-0.5 text-[12px] font-extrabold text-[#0F172A]">
                  {ev.title}
                </p>
              </div>
            ))}
          </div>

          <div
            className="absolute right-4 bottom-4 flex h-10 w-10 items-center justify-center rounded-full text-xl font-bold text-white shadow-lg"
            style={{ background: theme.gradient }}
          >
            +
          </div>
        </div>
      </PhoneShell>
    );
  }

  if (screenId === "savings") {
    return (
      <PhoneShell theme={theme} activeTab="savings" onSelectScreen={onSelectScreen}>
        <div className="space-y-2.5 pt-1">
          <div className="text-center">
            <h3 className="text-[16px] font-extrabold text-[#0F172A]">Savings</h3>
            <p className="text-[10px] font-semibold text-slate-500">
              This Month ⌄
            </p>
          </div>

          <div
            className="rounded-2xl p-3 text-white shadow-md"
            style={{ background: theme.gradient }}
          >
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/20 text-base">
                👛
              </div>
              <div>
                <p className="text-[9.5px] text-white/85">Savings</p>
                <p className="text-[19px] font-extrabold leading-tight">₱12,350</p>
                <p className="text-[9px] text-white/80">This Month</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-xl bg-[#EAF9EF] px-2.5 py-2">
              <p className="text-[9px] font-semibold text-slate-600">↑ Income</p>
              <p className="text-[12.5px] font-extrabold text-emerald-600">
                ₱32,000
              </p>
            </div>
            <div className="rounded-xl bg-[#FEECEC] px-2.5 py-2">
              <p className="text-[9px] font-semibold text-slate-600">↓ Expenses</p>
              <p className="text-[12.5px] font-extrabold text-rose-600">
                ₱19,650
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 rounded-full bg-slate-100 p-0.5 text-[10px] font-bold">
            <div
              className="rounded-full py-1 text-center text-white"
              style={{ background: theme.gradient }}
            >
              By Category
            </div>
            <div className="py-1 text-center text-slate-500">Transactions</div>
          </div>

          <div>
            <div className="mb-1 flex items-center justify-between">
              <p className="text-[11px] font-bold text-[#0F172A]">
                Spending by Category
              </p>
              <span
                className="text-[9.5px] font-semibold"
                style={{ color: theme.primary }}
              >
                See All
              </span>
            </div>
            <div className="space-y-1 text-[10.5px]">
              {[
                { icon: "🍽️", name: "Food & Drinks", amt: "₱6,800" },
                { icon: "🚗", name: "Transportation", amt: "₱2,400" },
                { icon: "🏠", name: "Bills & Utilities", amt: "₱4,500" },
                { icon: "🛍️", name: "Shopping", amt: "₱2,200" },
                { icon: "📚", name: "Education", amt: "₱1,600" },
              ].map((c) => (
                <div
                  key={c.name}
                  className="flex items-center justify-between rounded-lg px-1 py-0.5"
                >
                  <span className="flex items-center gap-1.5 font-medium text-slate-700">
                    <span>{c.icon}</span>
                    {c.name}
                  </span>
                  <span className="font-bold text-[#0F172A]">{c.amt}</span>
                </div>
              ))}
            </div>
          </div>

          <div
            className="w-full rounded-full py-2 text-center text-[11px] font-bold text-white shadow-sm"
            style={{ background: theme.gradient }}
          >
            + Add Transaction
          </div>
        </div>
      </PhoneShell>
    );
  }

  if (screenId === "tasks") {
    const completedCount = tasks.filter((t) => t.done).length;
    const totalCount = tasks.length;
    const pct = Math.round((completedCount / totalCount) * 100);
    const shown =
      taskFilter === "completed" ? tasks.filter((t) => t.done) : tasks;

    return (
      <PhoneShell theme={theme} activeTab="tasks" onSelectScreen={onSelectScreen}>
        <div className="space-y-2.5 pt-1">
          <div className="flex items-center justify-between">
            <span className="w-5" />
            <h3 className="text-[16px] font-extrabold text-[#0F172A]">Tasks</h3>
            <span className="text-xs font-bold" style={{ color: theme.primary }}>
              📊
            </span>
          </div>

          {/* Today's Productivity Card */}
          <div
            className="rounded-2xl border bg-white/90 p-3 shadow-sm"
            style={{ borderColor: theme.border }}
          >
            <p className="text-[11px] font-bold text-[#0F172A]">
              Today&apos;s Productivity
            </p>
            <div className="mt-1 flex items-baseline justify-between">
              <span className="text-[24px] font-extrabold leading-none text-[#0F172A]">
                {pct}%
              </span>
              <span className="text-[10px] font-semibold text-slate-500">
                {completedCount} of {totalCount} completed
              </span>
            </div>
            <div
              className="mt-2 h-2 w-full overflow-hidden rounded-full"
              style={{ backgroundColor: theme.soft }}
            >
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{ width: `${pct}%`, background: theme.gradient }}
              />
            </div>
            <p className="mt-1.5 text-[10px] font-medium text-slate-500">
              {pct === 100
                ? "All done for today! 🎉"
                : pct >= 50
                  ? "You're making progress! ✨"
                  : "Keep going — you got this! ✨"}
            </p>
          </div>

          {/* Task / Completed Toggle */}
          <div className="grid grid-cols-2 rounded-full bg-slate-100 p-0.5 text-[10px] font-bold">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setTaskFilter("all");
              }}
              className="rounded-full py-1.5 transition"
              style={
                taskFilter === "all"
                  ? { background: theme.gradient, color: "#FFFFFF" }
                  : { color: "#64748B" }
              }
            >
              Task ({totalCount})
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setTaskFilter("completed");
              }}
              className="rounded-full py-1.5 transition"
              style={
                taskFilter === "completed"
                  ? { background: theme.gradient, color: "#FFFFFF" }
                  : { color: "#64748B" }
              }
            >
              Completed ({completedCount})
            </button>
          </div>

          {/* Interactive Task Rows */}
          <div className="space-y-1.5">
            {shown.map((task) => (
              <button
                key={task.id}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setTasks((prev) =>
                    prev.map((item) =>
                      item.id === task.id ? { ...item, done: !item.done } : item
                    )
                  );
                }}
                className="flex w-full items-center gap-2.5 rounded-xl bg-white px-2.5 py-2 text-left ring-1 ring-slate-100 transition hover:bg-slate-50"
              >
                <span
                  className="flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-md border text-[10px] font-bold"
                  style={
                    task.done
                      ? {
                          background: theme.primary,
                          borderColor: theme.primary,
                          color: "#FFFFFF",
                        }
                      : {
                          borderColor: "#94A3B8",
                          color: "transparent",
                        }
                  }
                >
                  ✓
                </span>
                <div className="min-w-0 flex-1">
                  <p
                    className={`truncate text-[11px] font-semibold ${
                      task.done
                        ? "text-slate-400 line-through"
                        : "text-[#0F172A]"
                    }`}
                  >
                    {task.title}
                  </p>
                  {task.due ? (
                    <p className="text-[9px] text-slate-400">📅 {task.due}</p>
                  ) : null}
                </div>
              </button>
            ))}
          </div>

          {/* Bottom Summary */}
          <div className="pt-1 text-center text-[9.5px] font-semibold text-slate-500">
            <span style={{ color: theme.primary }}>✓</span> {completedCount} of{" "}
            {totalCount} tasks completed · {pct}%
          </div>

          <div
            className="absolute right-4 bottom-8 flex h-9 w-9 items-center justify-center rounded-full text-lg font-bold text-white shadow-lg"
            style={{ background: theme.gradient }}
          >
            +
          </div>
        </div>
      </PhoneShell>
    );
  }

  if (screenId === "settings") {
    const items: { icon: string; label: string; target?: ScreenId }[] = [
      { icon: "👤", label: "Account", target: "account" },
      { icon: "🎨", label: "Appearance" },
      { icon: "💎", label: "Themes" },
      { icon: "⊞", label: "Widget", target: "widgets" },
      { icon: "☁️", label: "Data & Backup", target: "account" },
      { icon: "🌐", label: "Language" },
      { icon: "ℹ️", label: "About Manke" },
    ];
    return (
      <PhoneShell theme={theme} activeTab="settings" onSelectScreen={onSelectScreen}>
        <div className="space-y-3 pt-1">
          <h3 className="text-center text-[16px] font-extrabold text-[#0F172A]">
            Settings
          </h3>
          <div className="divide-y divide-slate-100 rounded-2xl bg-white/95 px-3 shadow-sm ring-1 ring-slate-100">
            {items.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  if (item.target) onSelectScreen?.(item.target);
                }}
                className="flex w-full items-center justify-between py-3 text-left transition hover:opacity-80"
              >
                <span className="flex items-center gap-3 text-[12px] font-semibold text-[#0F172A]">
                  <span
                    className="flex h-6 w-6 items-center justify-center rounded-lg text-xs"
                    style={{ backgroundColor: theme.soft, color: theme.primary }}
                  >
                    {item.icon}
                  </span>
                  {item.label}
                </span>
                <span className="text-sm text-slate-400">›</span>
              </button>
            ))}
          </div>
        </div>
      </PhoneShell>
    );
  }

  if (screenId === "bills") {
    return (
      <PhoneShell theme={theme} activeTab="home" onSelectScreen={onSelectScreen}>
        <div className="space-y-3 pt-1">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onSelectScreen?.("home");
              }}
              className="text-xs font-bold"
              style={{ color: theme.primary }}
            >
              ‹ Back
            </button>
            <h3 className="text-[15px] font-extrabold text-[#0F172A]">Bills</h3>
            <span className="w-8" />
          </div>

          <div className="grid grid-cols-2 rounded-full bg-slate-100 p-0.5 text-[10px] font-bold">
            <div
              className="rounded-full py-1 text-center text-white"
              style={{ background: theme.gradient }}
            >
              Recurring
            </div>
            <div className="py-1 text-center text-slate-500">All</div>
          </div>

          <div className="space-y-2">
            {[
              { icon: "🏠", name: "Rent", tag: "Monthly", due: "Nov 20", amt: "₱60,000" },
              { icon: "⚡", name: "Electricity", tag: "Monthly", due: "Nov 22", amt: "₱4,500" },
              { icon: "💧", name: "Water", tag: "Monthly", due: "Nov 25", amt: "₱1,200" },
              { icon: "🌐", name: "Fiber Internet", tag: "Monthly", due: "Nov 28", amt: "₱2,500" },
            ].map((b) => (
              <div
                key={b.name}
                className="flex items-center justify-between rounded-2xl bg-white p-2.5 shadow-sm ring-1 ring-slate-100"
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className="flex h-8 w-8 items-center justify-center rounded-xl text-sm"
                    style={{ backgroundColor: theme.soft }}
                  >
                    {b.icon}
                  </span>
                  <div>
                    <p className="text-[11px] font-bold text-[#0F172A]">
                      {b.name}
                    </p>
                    <p className="text-[9px] text-slate-400">
                      {b.tag} · Due {b.due}
                    </p>
                  </div>
                </div>
                <span className="text-[11px] font-extrabold text-[#0F172A]">
                  {b.amt}
                </span>
              </div>
            ))}
          </div>

          <div
            className="w-full rounded-full py-2.5 text-center text-[11px] font-bold text-white shadow-sm"
            style={{ background: theme.gradient }}
          >
            + Add Recurring Bill
          </div>
        </div>
      </PhoneShell>
    );
  }

  if (screenId === "account") {
    return (
      <PhoneShell theme={theme} activeTab="settings" onSelectScreen={onSelectScreen}>
        <div className="space-y-3 pt-1">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onSelectScreen?.("settings");
              }}
              className="text-xs font-bold"
              style={{ color: theme.primary }}
            >
              ‹ Back
            </button>
            <h3 className="text-[15px] font-extrabold text-[#0F172A]">
              Account &amp; Sync
            </h3>
            <span className="w-8" />
          </div>

          <div className="rounded-2xl bg-white p-3.5 text-center shadow-sm ring-1 ring-slate-100">
            <div
              className="mx-auto flex h-12 w-12 items-center justify-center rounded-full text-xl text-white"
              style={{ background: theme.gradient }}
            >
              ☁️
            </div>
            <p className="mt-2.5 text-xs font-extrabold text-[#0F172A]">
              Optional Cloud Backup
            </p>
            <p className="mt-1 text-[10px] leading-relaxed text-slate-500">
              You&apos;re using Manke offline as a guest. Sign in anytime to
              sync across devices.
            </p>
            <div
              className="mt-3 w-full rounded-full py-2 text-[11px] font-bold text-white"
              style={{ background: theme.gradient }}
            >
              Log In or Create Account
            </div>
          </div>

          <div className="space-y-1.5 rounded-2xl bg-white p-3 shadow-sm ring-1 ring-slate-100 text-[11px]">
            <div className="flex items-center justify-between py-1">
              <span className="font-semibold text-[#0F172A]">Export JSON Backup</span>
              <span className="text-slate-400">›</span>
            </div>
            <div className="flex items-center justify-between border-t border-slate-100 py-1.5">
              <span className="font-semibold text-[#0F172A]">Import Backup File</span>
              <span className="text-slate-400">›</span>
            </div>
            <div className="flex items-center justify-between border-t border-slate-100 pt-1.5">
              <span className="font-semibold text-rose-600">Delete Account</span>
              <span className="text-slate-400">›</span>
            </div>
          </div>
        </div>
      </PhoneShell>
    );
  }

  // widgets
  return (
    <PhoneShell theme={theme} showBottomBar={false}>
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelectScreen?.("settings");
            }}
            className="text-xs font-bold"
            style={{ color: theme.primary }}
          >
            ‹ Back
          </button>
          <p className="text-[12px] font-extrabold text-[#0F172A]">
            Home Screen Widgets
          </p>
          <span className="w-8" />
        </div>

        {/* Small Budget Widget */}
        <div
          className="rounded-2xl p-3.5 text-white shadow-md"
          style={{ background: theme.gradient }}
        >
          <p className="text-[9.5px] font-semibold text-white/85">Budget Left</p>
          <p className="mt-0.5 text-[20px] font-extrabold">₱12,350</p>
          <p className="text-[9px] text-white/80">of ₱20,000 this month</p>
          <div className="mt-2 h-1.5 w-full rounded-full bg-white/25">
            <div className="h-full w-3/5 rounded-full bg-white" />
          </div>
        </div>

        {/* Upcoming Bills Widget */}
        <div className="rounded-2xl bg-white p-3 shadow-sm ring-1 ring-slate-200/80">
          <div className="mb-2 flex items-center justify-between">
            <span
              className="rounded-md px-2 py-0.5 text-[9.5px] font-bold"
              style={{ backgroundColor: theme.soft, color: theme.primary }}
            >
              Upcoming Bills
            </span>
            <span className="text-[9px] font-semibold text-slate-400">2 Due</span>
          </div>
          <div className="space-y-1.5 text-[10.5px]">
            <div className="flex justify-between">
              <span className="font-bold text-[#0F172A]">Rent · Nov 20</span>
              <span className="font-extrabold text-[#0F172A]">₱60,000</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold text-[#0F172A]">Electricity · Nov 22</span>
              <span className="font-extrabold text-[#0F172A]">₱4,500</span>
            </div>
          </div>
        </div>

        {/* Pending Tasks Widget */}
        <div className="rounded-2xl bg-white p-3 shadow-sm ring-1 ring-slate-200/80">
          <div
            className="mb-2 rounded-lg px-2.5 py-1 text-[9.5px] font-bold text-white"
            style={{ background: theme.gradient }}
          >
            Pending Tasks (2)
          </div>
          <div className="space-y-1 text-[10.5px] text-slate-700">
            <p>☐ Prepare presentation</p>
            <p>☐ Submit assignment</p>
          </div>
        </div>
      </div>
    </PhoneShell>
  );
}
