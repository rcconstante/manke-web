"use client";

import { useMemo, useState } from "react";
import {
  RealPhoneFrame,
  type PhoneHotspot,
  type RealScreenCapture,
} from "./RealPhoneFrame";

export type PrototypeScreenId =
  | "onboarding"
  | "home"
  | "calendar"
  | "budget"
  | "tasks"
  | "settings"
  | "notifications"
  | "add-event"
  | "add-bill"
  | "add-transaction"
  | "bill-detail"
  | "add-task"
  | "reports"
  | "account"
  | "appearance"
  | "themes"
  | "widgets"
  | "data-backup"
  | "language"
  | "about"
  | "signin";

interface ScreenMeta {
  id: PrototypeScreenId;
  badge: string;
  title: string;
  note: string;
  isModal: boolean;
  defaultBack: PrototypeScreenId;
}

const SCREEN_META: Record<PrototypeScreenId, ScreenMeta> = {
  onboarding: {
    id: "onboarding",
    badge: "Onboarding",
    title: "Welcome to Manke",
    note: "Offline-first entry with zero forced account wall. Tap Get Started to enter the live dashboard.",
    isModal: false,
    defaultBack: "home",
  },
  home: {
    id: "home",
    badge: "Tab 1 · Home",
    title: "Home Dashboard",
    note: "Tap the top-left avatar for Settings, top-right bell for Notifications, Budget card, View Calendar, Upcoming Bills, or Pending Tasks.",
    isModal: false,
    defaultBack: "home",
  },
  calendar: {
    id: "calendar",
    badge: "Tab 2 · Calendar",
    title: "Calendar & Schedule",
    note: "Toggle between Month and Week views at the top, or tap the blue + button to open the New Event sheet.",
    isModal: false,
    defaultBack: "home",
  },
  budget: {
    id: "budget",
    badge: "Tab 3 · Budget",
    title: "Budget, Bills & Transactions",
    note: "Home-style gradient hero card with Bills and Transactions tabs (By Category lives inside Transactions). Tap any bill row for Bill Detail or tap Reports & Insights.",
    isModal: false,
    defaultBack: "home",
  },
  tasks: {
    id: "tasks",
    badge: "Tab 4 · Tasks",
    title: "Tasks & Productivity",
    note: "Tap the task rows to tick items off live (0% → 1st ticked → 25%+ progress), or tap + to open the New Task form.",
    isModal: false,
    defaultBack: "home",
  },
  settings: {
    id: "settings",
    badge: "Tab 5 · Settings",
    title: "Settings Menu",
    note: "Clean 7-row menu with crisp Hugeicons. Tap Account, Appearance & Themes, Preferences, Widget, Data & Backup, Language, or About Manke.",
    isModal: false,
    defaultBack: "home",
  },
  notifications: {
    id: "notifications",
    badge: "Home Modal",
    title: "Notifications",
    note: "Shows bill due reminders and today's classes. Tap an alert to jump straight to it, or tap ✕ to return.",
    isModal: true,
    defaultBack: "home",
  },
  "add-event": {
    id: "add-event",
    badge: "Calendar Sheet",
    title: "New Event Form",
    note: "Bottom sheet with title, date, start/end time, recurrence, reminder alerts, location, and category. Tap ✕ or backdrop to dismiss.",
    isModal: true,
    defaultBack: "calendar",
  },
  "add-bill": {
    id: "add-bill",
    badge: "Budget Sheet",
    title: "Add Recurring Bill Form",
    note: "Create or edit recurring bills with due dates, monthly/weekly/yearly cadence, and advance reminders. Tap ✕ or backdrop to close.",
    isModal: true,
    defaultBack: "budget",
  },
  "add-transaction": {
    id: "add-transaction",
    badge: "Budget Sheet",
    title: "Add Transaction Form",
    note: "Log Expense or Income in seconds with category chips, date picker, and optional notes. Tap ✕ or backdrop to close.",
    isModal: true,
    defaultBack: "budget",
  },
  "bill-detail": {
    id: "bill-detail",
    badge: "Budget Modal",
    title: "Bill Detail & Payment Sync",
    note: "Tap Mark Paid / Mark Unpaid to toggle payment state live (synced straight to Budget), edit with the pencil, or tap ✕ to return.",
    isModal: true,
    defaultBack: "budget",
  },
  "add-task": {
    id: "add-task",
    badge: "Tasks Sheet",
    title: "New Task Form",
    note: "Add a checklist item with optional due date/time, reminder alert, priority level, and notes. Tap ✕ or backdrop to close.",
    isModal: true,
    defaultBack: "tasks",
  },
  reports: {
    id: "reports",
    badge: "Budget Modal",
    title: "Reports & Insights",
    note: "6-month cash flow, savings rate, category breakdown, and bills summary. Tap the lower cards to scroll between top and bottom views.",
    isModal: true,
    defaultBack: "budget",
  },
  account: {
    id: "account",
    badge: "Settings Sub-Screen",
    title: "Account & Cloud Sync",
    note: "Manage profile, Manke VIP, promo code, and optional Cloud Backup & Sync. Tap Cloud Backup or Log In to open Sign In.",
    isModal: true,
    defaultBack: "settings",
  },
  appearance: {
    id: "appearance",
    badge: "Settings Sub-Screen",
    title: "Preferences",
    note: "Currency (32+ currencies), monthly budget limit, and local notification & reminder switches. Tap < to go back.",
    isModal: true,
    defaultBack: "settings",
  },
  themes: {
    id: "themes",
    badge: "Settings Sheet",
    title: "Appearance & Themes",
    note: "System / Light / Dark mode plus 5 accent color palettes all in one sheet. Tap Light, Dark, or Emerald Teal to preview live.",
    isModal: true,
    defaultBack: "settings",
  },
  widgets: {
    id: "widgets",
    badge: "Settings Modal",
    title: "Home Screen Widget Studio",
    note: "Live previews of Budget, Upcoming Bills, and Pending Tasks widgets synced from local data. Tap < to return to Settings.",
    isModal: true,
    defaultBack: "settings",
  },
  "data-backup": {
    id: "data-backup",
    badge: "Settings Sub-Screen",
    title: "Data & Backup",
    note: "Optional Cloud Backup & Sync, JSON export/import, reset demo data, and clear local workspace. Tap Cloud Backup to open Sign In.",
    isModal: true,
    defaultBack: "settings",
  },
  language: {
    id: "language",
    badge: "Settings Sheet",
    title: "Language Sheet",
    note: "Language selection sheet anchored cleanly over Settings. Tap ✕ or the dimmed backdrop to close.",
    isModal: true,
    defaultBack: "settings",
  },
  about: {
    id: "about",
    badge: "Settings Sub-Screen",
    title: "About Manke",
    note: "App version 1.0.0, website, Terms of Service, Privacy Policy, Open Source License, and store rating links. Tap < to go back.",
    isModal: true,
    defaultBack: "settings",
  },
  signin: {
    id: "signin",
    badge: "Cloud Sync Auth",
    title: "Sign In to Cloud Sync",
    note: "Optional email & password authentication for backing up and syncing Manke data across devices. Tap < to return.",
    isModal: true,
    defaultBack: "account",
  },
};

const QUICK_JUMP_MAIN: { id: PrototypeScreenId; label: string }[] = [
  { id: "onboarding", label: "Onboarding" },
  { id: "home", label: "Home" },
  { id: "calendar", label: "Calendar" },
  { id: "budget", label: "Budget" },
  { id: "tasks", label: "Tasks" },
  { id: "settings", label: "Settings" },
];

const QUICK_JUMP_MODALS: { id: PrototypeScreenId; label: string }[] = [
  { id: "notifications", label: "Notifications" },
  { id: "add-event", label: "New Event Form" },
  { id: "add-bill", label: "Add Bill Form" },
  { id: "add-transaction", label: "Add Transaction Form" },
  { id: "add-task", label: "New Task Form" },
  { id: "bill-detail", label: "Bill Detail" },
  { id: "reports", label: "Reports & Insights" },
];

const QUICK_JUMP_SETTINGS: { id: PrototypeScreenId; label: string }[] = [
  { id: "account", label: "Account" },
  { id: "themes", label: "Appearance & Themes" },
  { id: "appearance", label: "Preferences" },
  { id: "widgets", label: "Widget Studio" },
  { id: "data-backup", label: "Data & Backup" },
  { id: "language", label: "Language" },
  { id: "about", label: "About Manke" },
  { id: "signin", label: "Sign In" },
];

export function InteractivePhonePrototype({
  appearance,
  onAppearanceChange,
  initialScreen = "home",
}: {
  appearance: "light" | "dark";
  onAppearanceChange: (next: "light" | "dark") => void;
  initialScreen?: PrototypeScreenId;
}) {
  const [screen, setScreen] = useState<PrototypeScreenId>(initialScreen);
  const [history, setHistory] = useState<PrototypeScreenId[]>([]);
  const [showHotspots, setShowHotspots] = useState(false);

  // Interactive per-screen real capture states
  const [calendarView, setCalendarView] = useState<"week" | "month">("week");
  const [budgetTab, setBudgetTab] = useState<
    "bills" | "transactions" | "categories"
  >("bills");
  const [billPaid, setBillPaid] = useState(false);
  const [taskStep, setTaskStep] = useState<0 | 1 | 2>(0);
  const [reportsBottom, setReportsBottom] = useState(false);
  const [themeAccent, setThemeAccent] = useState<"blue" | "teal">("blue");
  const [lastFeedback, setLastFeedback] = useState<string>(
    "Tap directly inside the phone screen or use Quick Jump."
  );

  const meta = SCREEN_META[screen];

  const navigateTab = (target: PrototypeScreenId, feedback?: string) => {
    setHistory([]);
    setScreen(target);
    if (feedback) setLastFeedback(feedback);
  };

  const openModal = (target: PrototypeScreenId, feedback?: string) => {
    setHistory((prev) => [...prev, screen]);
    setScreen(target);
    if (feedback) setLastFeedback(feedback);
  };

  const goBack = (feedback?: string) => {
    if (history.length > 0) {
      const previous = history[history.length - 1];
      setHistory((prev) => prev.slice(0, -1));
      setScreen(previous);
      setLastFeedback(feedback ?? `Returned to ${SCREEN_META[previous].title}`);
      return;
    }
    const fallback = meta.defaultBack;
    setScreen(fallback);
    setLastFeedback(feedback ?? `Returned to ${SCREEN_META[fallback].title}`);
  };

  const quickJump = (target: PrototypeScreenId) => {
    const targetMeta = SCREEN_META[target];
    if (targetMeta.isModal) {
      setHistory([targetMeta.defaultBack]);
    } else {
      setHistory([]);
    }
    setScreen(target);
    setLastFeedback(`Jumped to ${targetMeta.title}`);
  };

  // Resolve exact real WebP capture + topBg for current state (zero mocked UI!)
  const capture: RealScreenCapture = useMemo(() => {
    const isDark = appearance === "dark";

    switch (screen) {
      case "onboarding":
        return {
          src: "/playground/00-onboarding.webp",
          label: "Welcome",
          topBg: "#3B80DC",
          darkStatusBar: true,
        };
      case "home":
        return isDark
          ? {
              src: "/playground/01-home-dark.webp",
              label: "Home · Dark",
              topBg: "#13203A",
              darkStatusBar: true,
            }
          : {
              src: "/playground/01-home-light.webp",
              label: "Home · Light",
              topBg: "#DCEBFF",
            };
      case "calendar":
        if (calendarView === "month") {
          return {
            src: "/playground/02-calendar-month.webp",
            label: "Calendar · Month",
            topBg: "#DCEBFF",
          };
        }
        return isDark
          ? {
              src: "/playground/02-calendar-dark.webp",
              label: "Calendar · Dark",
              topBg: "#13203A",
              darkStatusBar: true,
            }
          : {
              src: "/playground/02-calendar-week.webp",
              label: "Calendar · Week",
              topBg: "#DCEBFF",
            };
      case "budget":
        if (budgetTab === "transactions") {
          return {
            src: "/playground/03-budget-transactions.webp",
            label: "Budget · Transactions",
            topBg: "#DCEBFF",
          };
        }
        if (budgetTab === "categories") {
          return {
            src: "/playground/03-budget-categories.webp",
            label: "Budget · Categories",
            topBg: "#DCEBFF",
          };
        }
        return isDark
          ? {
              src: "/playground/03-budget-dark.webp",
              label: "Budget · Dark",
              topBg: "#13203A",
              darkStatusBar: true,
            }
          : {
              src: "/playground/03-budget-bills.webp",
              label: "Budget · Bills",
              topBg: "#DCEBFF",
            };
      case "tasks":
        if (taskStep === 1) {
          return {
            src: "/playground/05-tasks-tick1.webp",
            label: "Tasks · 1st Ticked",
            topBg: "#DCEBFF",
          };
        }
        if (taskStep === 2) {
          return {
            src: "/playground/05-tasks-progress.webp",
            label: "Tasks · 25%+ Progress",
            topBg: "#DCEBFF",
          };
        }
        return isDark
          ? {
              src: "/playground/05-tasks-dark.webp",
              label: "Tasks · Dark",
              topBg: "#13203A",
              darkStatusBar: true,
            }
          : {
              src: "/playground/05-tasks-light.webp",
              label: "Tasks · 0%",
              topBg: "#DCEBFF",
            };
      case "settings":
        return isDark
          ? {
              src: "/playground/07-settings-dark.webp",
              label: "Settings · Dark",
              topBg: "#13203A",
              darkStatusBar: true,
            }
          : {
              src: "/playground/07-settings-light.webp",
              label: "Settings · Light",
              topBg: "#DCEBFF",
            };
      case "notifications":
        return {
          src: "/playground/14-notifications.webp",
          label: "Notifications",
          topBg: "#FFFFFF",
        };
      case "add-event":
        return {
          src: "/playground/15-add-event.webp",
          label: "New Event Form",
          topBg: "#7E839B",
          darkStatusBar: true,
        };
      case "add-bill":
        return {
          src: "/playground/16-add-bill.webp",
          label: "Add Recurring Bill",
          topBg: "#86879B",
          darkStatusBar: true,
        };
      case "add-transaction":
        return {
          src: "/playground/03-budget-add.webp",
          label: "Add Transaction",
          topBg: "#7E839B",
          darkStatusBar: true,
        };
      case "bill-detail":
        return billPaid
          ? {
              src: "/playground/04-bills-paid.webp",
              label: "Bill · Marked Paid",
              topBg: "#FFFFFF",
            }
          : {
              src: "/playground/04-bills-detail.webp",
              label: "Bill · Unpaid",
              topBg: "#FFFFFF",
            };
      case "add-task":
        return {
          src: "/playground/17-add-task.webp",
          label: "New Task Form",
          topBg: "#7E839B",
          darkStatusBar: true,
        };
      case "reports":
        return reportsBottom
          ? {
              src: "/playground/06-reports-bottom.webp",
              label: "Reports · Breakdown",
              topBg: "#FFFFFF",
            }
          : {
              src: "/playground/06-reports.webp",
              label: "Reports · Cash Flow",
              topBg: "#FFFFFF",
            };
      case "account":
        return {
          src: "/playground/08-account.webp",
          label: "Account",
          topBg: "#FFFFFF",
        };
      case "appearance":
        return {
          src: "/playground/09-appearance.webp",
          label: "Appearance",
          topBg: "#FFFFFF",
        };
      case "themes":
        if (!isDark) {
          return {
            src: "/playground/10-themes-light.webp",
            label: "Themes · Light",
            topBg: "#7E839B",
            darkStatusBar: true,
          };
        }
        return themeAccent === "teal"
          ? {
              src: "/playground/10-themes-accent.webp",
              label: "Themes · Dark Emerald Teal",
              topBg: "#131D2A",
              darkStatusBar: true,
            }
          : {
              src: "/playground/10-themes-dark.webp",
              label: "Themes · Dark Blue",
              topBg: "#151934",
              darkStatusBar: true,
            };
      case "widgets":
        return {
          src: "/playground/11-widgets.webp",
          label: "Widget Studio",
          topBg: "#FFFFFF",
        };
      case "data-backup":
        return {
          src: "/playground/12-data-backup.webp",
          label: "Data & Backup",
          topBg: "#FFFFFF",
        };
      case "language":
        return {
          src: "/playground/18-language.webp",
          label: "Language",
          topBg: "#7E839B",
          darkStatusBar: true,
        };
      case "about":
        return {
          src: "/playground/19-about.webp",
          label: "About Manke",
          topBg: "#FFFFFF",
        };
      case "signin":
        return {
          src: "/playground/13-signin.webp",
          label: "Cloud Sync Sign In",
          topBg: "#B1D0FA",
        };
    }
  }, [
    appearance,
    billPaid,
    budgetTab,
    calendarView,
    reportsBottom,
    screen,
    taskStep,
    themeAccent,
  ]);

  // Build exact clickable touch hotspots for the active real screen
  const hotspots: PhoneHotspot[] = useMemo(() => {
    const bottomNavTabs: PhoneHotspot[] = [
      {
        id: "tab-home",
        left: 0,
        top: 91.5,
        width: 20,
        height: 8.5,
        label: "Home Tab",
        onClick: () => navigateTab("home", "Switched to Home tab"),
      },
      {
        id: "tab-calendar",
        left: 20,
        top: 91.5,
        width: 20,
        height: 8.5,
        label: "Calendar Tab",
        onClick: () => navigateTab("calendar", "Switched to Calendar tab"),
      },
      {
        id: "tab-budget",
        left: 40,
        top: 91.5,
        width: 20,
        height: 8.5,
        label: "Budget Tab",
        onClick: () => navigateTab("budget", "Switched to Budget tab"),
      },
      {
        id: "tab-tasks",
        left: 60,
        top: 91.5,
        width: 20,
        height: 8.5,
        label: "Tasks Tab",
        onClick: () => navigateTab("tasks", "Switched to Tasks tab"),
      },
      {
        id: "tab-settings",
        left: 80,
        top: 91.5,
        width: 20,
        height: 8.5,
        label: "Settings Tab",
        onClick: () => navigateTab("settings", "Switched to Settings tab"),
      },
    ];

    switch (screen) {
      case "onboarding":
        return [
          {
            id: "get-started",
            left: 8,
            top: 86,
            width: 84,
            height: 9,
            label: "Get Started → Home",
            onClick: () =>
              navigateTab("home", "Entered Home Dashboard from Onboarding"),
          },
        ];

      case "home":
        return [
          {
            id: "home-avatar",
            left: 3,
            top: 1,
            width: 35,
            height: 8,
            label: "Profile Avatar → Settings",
            onClick: () =>
              navigateTab("settings", "Opened Settings from header avatar"),
          },
          {
            id: "home-bell",
            left: 82,
            top: 1,
            width: 15,
            height: 8,
            label: "Notifications",
            onClick: () =>
              openModal("notifications", "Opened Notifications modal"),
          },
          {
            id: "home-budget-card",
            left: 4,
            top: 9.5,
            width: 92,
            height: 19,
            label: "Budget Card → Budget Tab",
            onClick: () =>
              navigateTab("budget", "Opened Budget from Home hero card"),
          },
          {
            id: "home-view-calendar",
            left: 64,
            top: 29.5,
            width: 33,
            height: 4.5,
            label: "View Calendar →",
            onClick: () =>
              navigateTab("calendar", "Opened Calendar from Today's Schedule"),
          },
          {
            id: "home-bills-see-all",
            left: 78,
            top: 58.5,
            width: 18,
            height: 4.5,
            label: "Upcoming Bills → See All",
            onClick: () => {
              setBudgetTab("bills");
              navigateTab("budget", "Opened Budget → Bills");
            },
          },
          {
            id: "home-tasks-link",
            left: 80,
            top: 83.5,
            width: 16,
            height: 4.5,
            label: "Pending Tasks →",
            onClick: () =>
              navigateTab("tasks", "Opened Tasks from Pending Tasks"),
          },
          ...bottomNavTabs,
        ];

      case "calendar":
        return [
          {
            id: "cal-month",
            left: 5,
            top: 7.5,
            width: 45,
            height: 6,
            label: "Month View",
            onClick: () => {
              setCalendarView("month");
              setLastFeedback("Switched Calendar to Month view");
            },
          },
          {
            id: "cal-week",
            left: 50,
            top: 7.5,
            width: 45,
            height: 6,
            label: "Week View",
            onClick: () => {
              setCalendarView("week");
              setLastFeedback("Switched Calendar to Week view");
            },
          },
          {
            id: "cal-add-fab",
            left: 79,
            top: 80,
            width: 16,
            height: 9,
            label: "+ New Event",
            onClick: () =>
              openModal("add-event", "Opened New Event form sheet"),
          },
          ...bottomNavTabs,
        ];

      case "budget": {
        const budgetSpots: PhoneHotspot[] = [
          {
            id: "budget-reports",
            left: 48,
            top: 6.5,
            width: 40,
            height: 5.5,
            label: "Reports & Insights",
            onClick: () =>
              openModal("reports", "Opened Reports & Insights modal"),
          },
          {
            id: "budget-seg-bills",
            left: 5,
            top: 43,
            width: 45,
            height: 6,
            label: "Bills",
            onClick: () => {
              setBudgetTab("bills");
              setLastFeedback("Switched Budget to Bills");
            },
          },
          {
            id: "budget-seg-tx",
            left: 50,
            top: 43,
            width: 45,
            height: 6,
            label: "Transactions",
            onClick: () => {
              setBudgetTab("transactions");
              setLastFeedback("Switched Budget to Transactions");
            },
          },
        ];

        if (budgetTab === "bills") {
          budgetSpots.push({
            id: "budget-bill-rows",
            left: 4,
            top: 56,
            width: 92,
            height: 33,
            label: "Open Bill Detail",
            onClick: () => openModal("bill-detail", "Opened Bill Detail modal"),
          });
        } else {
          budgetSpots.push(
            {
              id: "budget-tx-all",
              left: 5,
              top: 50.5,
              width: 55,
              height: 4.5,
              label: "All / Income / Expenses",
              onClick: () => {
                setBudgetTab("transactions");
                setLastFeedback("Showing Transactions list");
              },
            },
            {
              id: "budget-tx-cat",
              left: 62,
              top: 50.5,
              width: 33,
              height: 4.5,
              label: "By Category",
              onClick: () => {
                setBudgetTab("categories");
                setLastFeedback("Showing Spending by Category");
              },
            },
            {
              id: "budget-add-fab",
              left: 79,
              top: 80,
              width: 16,
              height: 9,
              label: "+ Add Transaction",
              onClick: () =>
                openModal("add-transaction", "Opened Add Transaction sheet"),
            }
          );
        }

        return [...budgetSpots, ...bottomNavTabs];
      }

      case "bill-detail":
        return [
          {
            id: "bill-edit",
            left: 64,
            top: 1.5,
            width: 10,
            height: 6,
            label: "Edit Recurring Bill",
            onClick: () =>
              openModal("add-bill", "Opened Recurring Bill form sheet"),
          },
          {
            id: "bill-close",
            left: 85,
            top: 1.5,
            width: 12,
            height: 6,
            label: "Close → Budget (Bills)",
            onClick: () => {
              setBudgetTab("bills");
              navigateTab("budget", "Closed Bill Detail → Budget (Bills)");
            },
          },
          {
            id: "bill-toggle-paid",
            left: billPaid ? 64 : 68,
            top: 29,
            width: billPaid ? 29 : 26,
            height: 6.5,
            label: billPaid ? "Mark Unpaid" : "Mark Paid (syncs to Budget)",
            onClick: () => {
              setBillPaid((prev) => {
                const next = !prev;
                setLastFeedback(
                  next
                    ? "Marked bill Paid — synced to Budget"
                    : "Reverted bill to Upcoming (Unpaid)"
                );
                return next;
              });
            },
          },
        ];

      case "tasks":
        return [
          {
            id: "tasks-checkboxes",
            left: 4,
            top: 36,
            width: 92,
            height: 36,
            label:
              taskStep === 0
                ? "Tick 1st Task"
                : taskStep === 1
                  ? "Tick Next Task (25%+)"
                  : "Reset Checklist (0%)",
            onClick: () => {
              setTaskStep((prev) => {
                const next = ((prev + 1) % 3) as 0 | 1 | 2;
                setLastFeedback(
                  next === 1
                    ? "Ticked 1st task — progress updated live"
                    : next === 2
                      ? "Ticked more tasks — 25%+ productivity!"
                      : "Reset Tasks checklist to 0%"
                );
                return next;
              });
            },
          },
          {
            id: "tasks-add-fab",
            left: 79,
            top: 80,
            width: 16,
            height: 9,
            label: "+ New Task",
            onClick: () => openModal("add-task", "Opened New Task form sheet"),
          },
          ...bottomNavTabs,
        ];

      case "settings": {
        const rows: { id: PrototypeScreenId; label: string }[] = [
          { id: "account", label: "Account" },
          { id: "themes", label: "Appearance & Themes" },
          { id: "appearance", label: "Preferences" },
          { id: "widgets", label: "Widget Studio" },
          { id: "data-backup", label: "Data & Backup" },
          { id: "language", label: "Language" },
          { id: "about", label: "About Manke" },
        ];
        return [
          ...rows.map((row, idx) => ({
            id: `settings-row-${row.id}`,
            left: 5,
            top: Number((7.5 + idx * 9.4).toFixed(1)),
            width: 90,
            height: 9.2,
            label: `Settings → ${row.label}`,
            onClick: () =>
              openModal(row.id, `Opened Settings → ${row.label}`),
          })),
          ...bottomNavTabs,
        ];
      }

      case "account":
        return [
          {
            id: "account-back",
            left: 4,
            top: 1.5,
            width: 13,
            height: 6.5,
            label: "Back to Settings",
            onClick: () => goBack("Returned to Settings"),
          },
          {
            id: "account-cloud-sync",
            left: 4,
            top: 30.5,
            width: 92,
            height: 10,
            label: "Cloud Backup & Sync → Sign In",
            onClick: () => openModal("signin", "Opened Cloud Sync Sign In"),
          },
          {
            id: "account-login-btn",
            left: 4,
            top: 52.5,
            width: 92,
            height: 7,
            label: "Log In or Create Account",
            onClick: () => openModal("signin", "Opened Cloud Sync Sign In"),
          },
        ];

      case "appearance":
        return [
          {
            id: "appearance-back",
            left: 4,
            top: 1.5,
            width: 13,
            height: 6.5,
            label: "Back to Settings",
            onClick: () => goBack("Returned to Settings"),
          },
          {
            id: "appearance-light",
            left: 36,
            top: 14.5,
            width: 28,
            height: 6,
            label: "Set Light Mode",
            onClick: () => {
              onAppearanceChange("light");
              setLastFeedback("Switched app theme to Light mode");
            },
          },
          {
            id: "appearance-dark",
            left: 65,
            top: 14.5,
            width: 27,
            height: 6,
            label: "Set Dark Mode",
            onClick: () => {
              onAppearanceChange("dark");
              setLastFeedback("Switched app theme to Dark mode");
            },
          },
        ];

      case "data-backup":
        return [
          {
            id: "backup-back",
            left: 4,
            top: 1.5,
            width: 13,
            height: 6.5,
            label: "Back to Settings",
            onClick: () => goBack("Returned to Settings"),
          },
          {
            id: "backup-cloud-sync",
            left: 4,
            top: 13,
            width: 92,
            height: 10,
            label: "Cloud Backup & Sync → Sign In",
            onClick: () => openModal("signin", "Opened Cloud Sync Sign In"),
          },
        ];

      case "about":
        return [
          {
            id: "about-back",
            left: 4,
            top: 1.5,
            width: 13,
            height: 6.5,
            label: "Back to Settings",
            onClick: () => goBack("Returned to Settings"),
          },
        ];

      case "widgets":
        return [
          {
            id: "widgets-back",
            left: 4,
            top: 1.5,
            width: 13,
            height: 6.5,
            label: "Close Widget Studio",
            onClick: () => goBack("Closed Widget Studio"),
          },
        ];

      case "reports":
        return [
          {
            id: "reports-back",
            left: 4,
            top: 1.5,
            width: 13,
            height: 6.5,
            label: "Close Reports & Insights",
            onClick: () => goBack("Closed Reports & Insights"),
          },
          {
            id: "reports-scroll",
            left: 4,
            top: 58,
            width: 92,
            height: 38,
            label: reportsBottom
              ? "Scroll Back to Cash Flow Top"
              : "Scroll to Category & Bills Breakdown",
            onClick: () => {
              setReportsBottom((prev) => {
                const next = !prev;
                setLastFeedback(
                  next
                    ? "Scrolled Reports to lower breakdown"
                    : "Scrolled Reports back to Cash Flow top"
                );
                return next;
              });
            },
          },
        ];

      case "notifications":
        return [
          {
            id: "notif-close",
            left: 85,
            top: 1.5,
            width: 12,
            height: 6,
            label: "Close Notifications",
            onClick: () => goBack("Closed Notifications"),
          },
          {
            id: "notif-tuition",
            left: 4,
            top: 11,
            width: 92,
            height: 9,
            label: "Open Tuition Bill Detail",
            onClick: () =>
              openModal("bill-detail", "Opened Tuition Bill from Notification"),
          },
          {
            id: "notif-class",
            left: 4,
            top: 21,
            width: 92,
            height: 9,
            label: "Open Accounting Class in Calendar",
            onClick: () =>
              navigateTab("calendar", "Opened Calendar from Notification"),
          },
        ];

      case "signin":
        return [
          {
            id: "signin-back",
            left: 5,
            top: 3.5,
            width: 13,
            height: 6,
            label: "Back from Sign In",
            onClick: () => goBack("Closed Cloud Sync Sign In"),
          },
        ];

      case "themes":
        return [
          {
            id: "themes-backdrop",
            left: 0,
            top: 0,
            width: 100,
            height: 35,
            label: "Dismiss Themes Sheet",
            subtle: true,
            onClick: () => goBack("Dismissed Themes sheet"),
          },
          {
            id: "themes-close",
            left: 84,
            top: 39,
            width: 13,
            height: 6,
            label: "Close Themes Sheet",
            onClick: () => goBack("Closed Themes sheet"),
          },
          {
            id: "themes-light",
            left: 36,
            top: 51,
            width: 28,
            height: 6.5,
            label: "Light Appearance",
            onClick: () => {
              setThemeAccent("blue");
              onAppearanceChange("light");
              setLastFeedback("Applied Light Mode + Manke Blue");
            },
          },
          {
            id: "themes-dark",
            left: 66,
            top: 51,
            width: 29,
            height: 6.5,
            label: "Dark Appearance (Manke Blue)",
            onClick: () => {
              setThemeAccent("blue");
              onAppearanceChange("dark");
              setLastFeedback("Applied Dark Mode + Manke Blue");
            },
          },
          {
            id: "themes-manke-blue",
            left: 5,
            top: 62,
            width: 90,
            height: 7,
            label: "Accent: Manke Blue",
            onClick: () => {
              setThemeAccent("blue");
              setLastFeedback("Selected Manke Blue accent");
            },
          },
          {
            id: "themes-emerald-teal",
            left: 5,
            top: 75,
            width: 90,
            height: 7.5,
            label: "Accent: Dark Emerald Teal",
            onClick: () => {
              setThemeAccent("teal");
              onAppearanceChange("dark");
              setLastFeedback("Applied Dark Mode + Emerald Teal accent");
            },
          },
        ];

      case "language":
        return [
          {
            id: "lang-backdrop",
            left: 0,
            top: 0,
            width: 100,
            height: 71,
            label: "Dismiss Language Sheet",
            subtle: true,
            onClick: () => goBack("Dismissed Language sheet"),
          },
          {
            id: "lang-close",
            left: 84,
            top: 74.5,
            width: 13,
            height: 6,
            label: "Close Language Sheet",
            onClick: () => goBack("Closed Language sheet"),
          },
        ];

      case "add-event":
      case "add-bill":
      case "add-transaction":
      case "add-task":
        return [
          {
            id: `${screen}-backdrop`,
            left: 0,
            top: 0,
            width: 100,
            height: 12,
            label: "Dismiss Form Sheet",
            subtle: true,
            onClick: () => goBack(`Dismissed ${meta.title}`),
          },
          {
            id: `${screen}-close`,
            left: 84,
            top: 14,
            width: 13,
            height: 6,
            label: `Close ${meta.title}`,
            onClick: () => goBack(`Closed ${meta.title}`),
          },
        ];
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screen, budgetTab, billPaid, taskStep, reportsBottom, meta.title]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center overflow-y-auto px-4 py-8 sm:px-8 lg:py-10">
      <div className="mx-auto grid w-full max-w-6xl items-start gap-8 lg:grid-cols-12 lg:gap-10">
        {/* Left / Center: Live Interactive Phone Simulator */}
        <div className="flex flex-col items-center lg:col-span-5">
          <div className="relative">
            <div className="pointer-events-none absolute -inset-6 rounded-[64px] bg-gradient-to-tr from-[#2B8CF8]/18 via-[#1D6BF3]/10 to-transparent blur-2xl" />
            <div className="relative">
              <RealPhoneFrame
                capture={capture}
                alt={`Interactive Manke ${meta.title} (${capture.label})`}
                size="prototype"
                priority
                hotspots={hotspots}
                showHotspots={showHotspots}
              />
            </div>
          </div>

          {/* Live feedback caption underneath phone */}
          <div className="mt-4 flex max-w-[350px] items-center gap-2 rounded-full border border-[#CBE0FF] bg-white px-3.5 py-1.5 text-[11.5px] font-medium text-slate-600 shadow-xs">
            <span className="h-2 w-2 shrink-0 rounded-full bg-[#1D6BF3]" />
            <span className="truncate">{lastFeedback}</span>
          </div>
        </div>

        {/* Right: Interactive Controls & Quick Jump Panel */}
        <div className="flex flex-col gap-5 lg:col-span-7">
          {/* Active Screen Card + Core Controls */}
          <div className="rounded-[28px] border border-slate-200/90 bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center rounded-full bg-[#EBF3FF] px-2.5 py-0.5 text-[11px] font-bold text-[#1554D1]">
                    {meta.badge}
                  </span>
                  <span className="rounded-full bg-slate-100 px-2.5 py-0.5 font-mono text-[10.5px] font-semibold text-slate-500">
                    {capture.label}
                  </span>
                </div>
                <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-[#0F172A]">
                  {meta.title}
                </h1>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                  {meta.note}
                </p>
              </div>

              {(meta.isModal || history.length > 0) && (
                <button
                  type="button"
                  onClick={() => goBack()}
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-bold text-[#0F172A] transition hover:border-[#1D6BF3] hover:bg-[#EBF3FF] hover:text-[#1554D1]"
                >
                  ← Back
                </button>
              )}
            </div>

            {/* Simulator Toggle Controls */}
            <div className="mt-5 flex flex-wrap items-center gap-2.5 border-t border-slate-100 pt-4">
              <button
                type="button"
                onClick={() => setShowHotspots((v) => !v)}
                className={`inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-bold transition ${
                  showHotspots
                    ? "border-[#1D6BF3] bg-[#EBF3FF] text-[#1554D1]"
                    : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                }`}
              >
                <span
                  className={`h-2 w-2 rounded-full ${
                    showHotspots ? "bg-[#1D6BF3]" : "bg-slate-300"
                  }`}
                />
                Show Touch Hotspots: {showHotspots ? "ON" : "OFF"}
              </button>

              <div className="inline-flex rounded-xl border border-slate-200 bg-slate-100 p-0.5 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => {
                    onAppearanceChange("light");
                    setThemeAccent("blue");
                    setLastFeedback("Switched to Light appearance");
                  }}
                  className={`rounded-lg px-3 py-1.5 transition ${
                    appearance === "light"
                      ? "bg-white text-[#0F172A] shadow-xs"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  ☀ Light
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onAppearanceChange("dark");
                    setLastFeedback("Switched to Dark appearance");
                  }}
                  className={`rounded-lg px-3 py-1.5 transition ${
                    appearance === "dark"
                      ? "bg-[#0F172A] text-white shadow-xs"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  ☾ Dark
                </button>
              </div>
            </div>

            {/* Contextual Live State Switcher for Multi-Capture Screens */}
            {screen === "calendar" && (
              <div className="mt-4 flex flex-wrap items-center gap-2 rounded-2xl bg-slate-50 px-3.5 py-2.5">
                <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                  Calendar View:
                </span>
                {(["week", "month"] as const).map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => {
                      setCalendarView(v);
                      setLastFeedback(`Switched Calendar to ${v} view`);
                    }}
                    className={`rounded-full px-3 py-1 text-xs font-bold capitalize transition ${
                      calendarView === v
                        ? "bg-[#1D6BF3] text-white"
                        : "bg-white text-slate-600 ring-1 ring-slate-200 hover:text-[#1D6BF3]"
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            )}

            {screen === "budget" && (
              <div className="mt-4 flex flex-wrap items-center gap-2 rounded-2xl bg-slate-50 px-3.5 py-2.5">
                <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                  Budget Segment:
                </span>
                {(["bills", "transactions", "categories"] as const).map(
                  (seg) => (
                    <button
                      key={seg}
                      type="button"
                      onClick={() => {
                        setBudgetTab(seg);
                        setLastFeedback(`Switched Budget to ${seg}`);
                      }}
                      className={`rounded-full px-3 py-1 text-xs font-bold capitalize transition ${
                        budgetTab === seg
                          ? "bg-[#1D6BF3] text-white"
                          : "bg-white text-slate-600 ring-1 ring-slate-200 hover:text-[#1D6BF3]"
                      }`}
                    >
                      {seg}
                    </button>
                  )
                )}
              </div>
            )}

            {screen === "bill-detail" && (
              <div className="mt-4 flex flex-wrap items-center gap-2 rounded-2xl bg-slate-50 px-3.5 py-2.5">
                <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                  Payment State:
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setBillPaid(false);
                    setLastFeedback("Viewing Unpaid Bill Detail");
                  }}
                  className={`rounded-full px-3 py-1 text-xs font-bold transition ${
                    !billPaid
                      ? "bg-[#1D6BF3] text-white"
                      : "bg-white text-slate-600 ring-1 ring-slate-200"
                  }`}
                >
                  Unpaid (Mark Paid)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setBillPaid(true);
                    setLastFeedback("Marked Paid (synced to Budget)");
                  }}
                  className={`rounded-full px-3 py-1 text-xs font-bold transition ${
                    billPaid
                      ? "bg-[#1D6BF3] text-white"
                      : "bg-white text-slate-600 ring-1 ring-slate-200"
                  }`}
                >
                  Marked Paid
                </button>
              </div>
            )}

            {screen === "tasks" && (
              <div className="mt-4 flex flex-wrap items-center gap-2 rounded-2xl bg-slate-50 px-3.5 py-2.5">
                <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                  Checklist Progress:
                </span>
                {[
                  { step: 0 as const, label: "0% Pending" },
                  { step: 1 as const, label: "1st Ticked" },
                  { step: 2 as const, label: "25%+ Progress" },
                ].map((item) => (
                  <button
                    key={item.step}
                    type="button"
                    onClick={() => {
                      setTaskStep(item.step);
                      setLastFeedback(`Tasks state: ${item.label}`);
                    }}
                    className={`rounded-full px-3 py-1 text-xs font-bold transition ${
                      taskStep === item.step
                        ? "bg-[#1D6BF3] text-white"
                        : "bg-white text-slate-600 ring-1 ring-slate-200"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}

            {screen === "reports" && (
              <div className="mt-4 flex flex-wrap items-center gap-2 rounded-2xl bg-slate-50 px-3.5 py-2.5">
                <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                  Scroll Position:
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setReportsBottom(false);
                    setLastFeedback("Reports top: Cash Flow");
                  }}
                  className={`rounded-full px-3 py-1 text-xs font-bold transition ${
                    !reportsBottom
                      ? "bg-[#1D6BF3] text-white"
                      : "bg-white text-slate-600 ring-1 ring-slate-200"
                  }`}
                >
                  Top · Cash Flow
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setReportsBottom(true);
                    setLastFeedback("Reports bottom: Breakdown");
                  }}
                  className={`rounded-full px-3 py-1 text-xs font-bold transition ${
                    reportsBottom
                      ? "bg-[#1D6BF3] text-white"
                      : "bg-white text-slate-600 ring-1 ring-slate-200"
                  }`}
                >
                  Bottom · Breakdown
                </button>
              </div>
            )}

            {screen === "themes" && (
              <div className="mt-4 flex flex-wrap items-center gap-2 rounded-2xl bg-slate-50 px-3.5 py-2.5">
                <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                  Theme Preview:
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setThemeAccent("blue");
                    onAppearanceChange("light");
                    setLastFeedback("Theme: Light (Manke Blue)");
                  }}
                  className={`rounded-full px-3 py-1 text-xs font-bold transition ${
                    appearance === "light"
                      ? "bg-[#1D6BF3] text-white"
                      : "bg-white text-slate-600 ring-1 ring-slate-200"
                  }`}
                >
                  Light
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setThemeAccent("blue");
                    onAppearanceChange("dark");
                    setLastFeedback("Theme: Dark · Manke Blue");
                  }}
                  className={`rounded-full px-3 py-1 text-xs font-bold transition ${
                    appearance === "dark" && themeAccent === "blue"
                      ? "bg-[#1D6BF3] text-white"
                      : "bg-white text-slate-600 ring-1 ring-slate-200"
                  }`}
                >
                  Dark · Blue
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setThemeAccent("teal");
                    onAppearanceChange("dark");
                    setLastFeedback("Theme: Dark · Emerald Teal");
                  }}
                  className={`rounded-full px-3 py-1 text-xs font-bold transition ${
                    appearance === "dark" && themeAccent === "teal"
                      ? "bg-[#0D9488] text-white"
                      : "bg-white text-slate-600 ring-1 ring-slate-200"
                  }`}
                >
                  Dark · Emerald Teal
                </button>
              </div>
            )}
          </div>

          {/* 1-Click Quick Jump Panel */}
          <div className="rounded-[28px] border border-slate-200/90 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold tracking-wider text-slate-400 uppercase">
                Quick Jump · All 35 Real App Captures
              </p>
              <span className="text-[11px] font-semibold text-slate-400">
                1-click screen preview
              </span>
            </div>

            <div className="mt-4 space-y-4">
              {/* Group 1: 5 Main Tabs (+ Onboarding) */}
              <div>
                <p className="mb-2 text-[11px] font-bold tracking-wider text-slate-500 uppercase">
                  5 Main Tabs &amp; Entry
                </p>
                <div className="flex flex-wrap gap-2">
                  {QUICK_JUMP_MAIN.map((item) => {
                    const active = screen === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => quickJump(item.id)}
                        className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition ${
                          active
                            ? "bg-gradient-to-r from-[#2B8CF8] via-[#1D6BF3] to-[#1554D1] text-white shadow-xs"
                            : "border border-slate-200 bg-slate-50 text-slate-700 hover:border-[#93C5FD] hover:bg-[#EBF3FF] hover:text-[#1554D1]"
                        }`}
                      >
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Group 2: Modals & Forms */}
              <div>
                <p className="mb-2 text-[11px] font-bold tracking-wider text-slate-500 uppercase">
                  Modals &amp; Forms
                </p>
                <div className="flex flex-wrap gap-2">
                  {QUICK_JUMP_MODALS.map((item) => {
                    const active = screen === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => quickJump(item.id)}
                        className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition ${
                          active
                            ? "bg-gradient-to-r from-[#2B8CF8] via-[#1D6BF3] to-[#1554D1] text-white shadow-xs"
                            : "border border-slate-200 bg-slate-50 text-slate-700 hover:border-[#93C5FD] hover:bg-[#EBF3FF] hover:text-[#1554D1]"
                        }`}
                      >
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Group 3: Settings Sub-Screens */}
              <div>
                <p className="mb-2 text-[11px] font-bold tracking-wider text-slate-500 uppercase">
                  Settings Sub-Screens
                </p>
                <div className="flex flex-wrap gap-2">
                  {QUICK_JUMP_SETTINGS.map((item) => {
                    const active = screen === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => quickJump(item.id)}
                        className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition ${
                          active
                            ? "bg-gradient-to-r from-[#2B8CF8] via-[#1D6BF3] to-[#1554D1] text-white shadow-xs"
                            : "border border-slate-200 bg-slate-50 text-slate-700 hover:border-[#93C5FD] hover:bg-[#EBF3FF] hover:text-[#1554D1]"
                        }`}
                      >
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
