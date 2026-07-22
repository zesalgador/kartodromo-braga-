import type { ScheduleTab } from "@/i18n/types";

export const HOURS_TAB_STORAGE_KEY = "kib-hours-tab";

export function presetHoursTab(tab: ScheduleTab) {
  sessionStorage.setItem(HOURS_TAB_STORAGE_KEY, tab);
  window.dispatchEvent(new CustomEvent("kib-hours-preset"));
}
