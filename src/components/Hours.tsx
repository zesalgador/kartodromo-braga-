"use client";

import { useState } from "react";
import { Calendar, Clock, Sun, AlertCircle } from "lucide-react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Card } from "@/components/ui/SectionTitle";
import { useContent } from "@/i18n/useContent";
import { useTranslations } from "@/i18n/LanguageProvider";
import type { ScheduleTab } from "@/i18n/types";

export function Hours() {
  const [activeTab, setActiveTab] = useState<ScheduleTab>("aluguer");
  const { scheduleTabs, scheduleContent, scheduleClosedDays } = useContent();
  const t = useTranslations();
  const content = scheduleContent[activeTab];

  return (
    <section id="horarios" className="relative bg-kib-dark py-20 sm:py-28">
      <div className="absolute inset-0 racing-grid opacity-20" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle title={t.hours.title} subtitle={t.hours.subtitle} />

        <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
          {scheduleTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-xl px-5 py-3 text-left text-sm font-semibold transition-all duration-300 sm:text-center ${
                activeTab === tab.id
                  ? "bg-kib-red text-white shadow-lg shadow-kib-red/20"
                  : "border border-white/10 bg-kib-card text-kib-muted hover:border-kib-red/30 hover:text-white"
              }`}
            >
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden">{tab.shortLabel}</span>
            </button>
          ))}
        </div>

        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start">
          <Card hover={false}>
            <div className="mb-6 flex items-center gap-3">
              {activeTab === "eventos" && (
                <Calendar className="h-6 w-6 text-kib-red" />
              )}
              {activeTab === "aluguer" && (
                <Clock className="h-6 w-6 text-kib-red" />
              )}
              {activeTab === "verao" && (
                <Sun className="h-6 w-6 text-kib-red" />
              )}
              <h3 className="text-lg font-bold text-white">{content.title}</h3>
            </div>

            {content.period && (
              <div className="mb-6 rounded-lg border border-kib-red/20 bg-kib-red/5 px-4 py-3">
                <p className="text-xs font-bold uppercase tracking-wide text-kib-red">
                  {t.hours.period}
                </p>
                <p className="mt-1 font-semibold text-white">{content.period}</p>
              </div>
            )}

            <ul className="space-y-3">
              {content.schedule.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 rounded-lg border border-white/5 bg-kib-black/50 px-4 py-3"
                >
                  <span className="h-2 w-2 shrink-0 rounded-full bg-kib-red" />
                  <span className="text-sm font-medium text-white sm:text-base">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            {content.notes && (
              <div className="mt-6 space-y-2">
                <p className="text-xs font-bold uppercase tracking-wide text-kib-red">
                  {t.hours.notes}
                </p>
                {content.notes.map((note) => (
                  <p
                    key={note}
                    className="flex items-start gap-2 text-sm text-kib-muted"
                  >
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-kib-red" />
                    {note}
                  </p>
                ))}
              </div>
            )}
          </Card>

          <aside className="rounded-2xl border border-kib-red/25 bg-kib-card p-5 shadow-lg shadow-black/20 lg:sticky lg:top-28">
            <div className="mb-4 flex items-center gap-2">
              <AlertCircle className="h-5 w-5 shrink-0 text-kib-red" />
              <p className="text-xs font-bold uppercase tracking-wide text-kib-red">
                {t.hours.exceptionsTitle}
              </p>
            </div>
            <p className="mb-4 text-xs leading-relaxed text-kib-muted">
              {t.hours.exceptionsNote}
            </p>
            <ul className="space-y-2.5">
              {scheduleClosedDays.map((day) => (
                <li
                  key={day}
                  className="flex items-start gap-2 text-sm font-medium text-white"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-kib-red" />
                  {day}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}
