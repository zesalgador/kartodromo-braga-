import type { ScheduleTab } from "@/i18n/types";

/** Verão: 24 de julho – 23 de agosto */
export function isSummerHoursPeriod(date = new Date()): boolean {
  const month = date.getMonth();
  const day = date.getDate();
  return (month === 6 && day >= 24) || (month === 7 && day <= 23);
}

export function getPreferredHoursTab(date = new Date()): ScheduleTab {
  return isSummerHoursPeriod(date) ? "verao" : "aluguer";
}

export const HOURS_TAB_STORAGE_KEY = "kib-hours-tab";

export function presetHoursTab(tab: ScheduleTab) {
  sessionStorage.setItem(HOURS_TAB_STORAGE_KEY, tab);
  window.dispatchEvent(new CustomEvent("kib-hours-preset"));
}
