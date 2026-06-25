"use client";

import { useState, useEffect } from "react";
import {
  Building2,
  Flag,
  Map,
  Send,
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import Image from "next/image";
import { siteConfig } from "@/data/content";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ButtonElement } from "@/components/ui/Button";
import { useTranslations } from "@/i18n/LanguageProvider";

type SpaceType = "kartodromo" | "autodromo" | "espaco-geral";

export function QuoteSection() {
  const t = useTranslations();
  const [space, setSpace] = useState<SpaceType>("kartodromo");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );

  useEffect(() => {
    const applyPreset = () => {
      if (sessionStorage.getItem("kib-quote-space") === "autodromo") {
        setSpace("autodromo");
        sessionStorage.removeItem("kib-quote-space");
      }
    };

    applyPreset();
    window.addEventListener("kib-quote-preset", applyPreset);
    return () => window.removeEventListener("kib-quote-preset", applyPreset);
  }, []);

  const spaceOptions = [
    {
      id: "kartodromo" as const,
      label: t.quote.spaces.kartodromo.label,
      description: t.quote.spaces.kartodromo.description,
      image: "/images/pista-kart-aerea.jpg",
      icon: Flag,
    },
    {
      id: "autodromo" as const,
      label: t.quote.spaces.autodromo.label,
      description: t.quote.spaces.autodromo.description,
      image: "/images/circuito-vasco-sameiro-aereo.png",
      icon: Map,
    },
    {
      id: "espaco-geral" as const,
      label: t.quote.spaces.espacoGeral.label,
      description: t.quote.spaces.espacoGeral.description,
      image: "/images/complexo-aereo.jpg",
      icon: Building2,
    },
  ];

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    duration: t.quote.durations[0],
    message: "",
  });

  const selectedSpace = spaceOptions.find((s) => s.id === space)!;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    const spaceLabel = selectedSpace.label;
    const body = {
      Nome: form.name,
      Email: form.email,
      Telefone: form.phone,
      Data: form.date,
      Espaço: spaceLabel,
      Duração: form.duration,
      Mensagem: form.message,
      _subject: `${t.quote.subjectPrefix} — ${spaceLabel} — KIB`,
      _cc: siteConfig.quoteCcEmail,
      _template: "table",
      _captcha: "false",
    };

    try {
      const response = await fetch(
        `https://formsubmit.co/ajax/${siteConfig.quoteEmail}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(body),
        },
      );

      if (!response.ok) throw new Error("Falha no envio");
      setStatus("success");
      setForm({
        name: "",
        email: "",
        phone: "",
        date: "",
        duration: t.quote.durations[0],
        message: "",
      });
    } catch {
      const mailtoBody = encodeURIComponent(
        `${t.quote.subjectPrefix} — ${spaceLabel}\n\n` +
          `${t.quote.name}: ${form.name}\n` +
          `${t.quote.email}: ${form.email}\n` +
          `${t.quote.phone}: ${form.phone}\n` +
          `${t.quote.date}: ${form.date}\n` +
          `${selectedSpace.label}: ${spaceLabel}\n` +
          `${t.quote.duration}: ${form.duration}\n\n` +
          `${t.quote.message}:\n${form.message}`,
      );
      window.location.href =
        `mailto:${siteConfig.quoteEmail},${siteConfig.quoteCcEmail}?subject=${encodeURIComponent(`${t.quote.subjectPrefix} — ${spaceLabel}`)}&body=${mailtoBody}`;
      setStatus("idle");
    }
  };

  return (
    <section id="orcamentos" className="relative bg-kib-dark py-20 sm:py-28">
      <div className="absolute inset-0 racing-grid opacity-20" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle title={t.quote.title} subtitle={t.quote.subtitle} />

        <div className="grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <p className="mb-4 text-sm font-bold uppercase tracking-widest text-kib-red">
              {t.quote.selectSpace}
            </p>
            <div className="space-y-3">
              {spaceOptions.map((option) => {
                const Icon = option.icon;
                const isActive = space === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setSpace(option.id)}
                    className={`w-full rounded-xl border p-4 text-left transition-all duration-300 ${
                      isActive
                        ? "border-kib-red bg-kib-red/10 shadow-lg shadow-kib-red/10"
                        : "border-white/10 bg-kib-card hover:border-kib-red/30"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                          isActive ? "bg-kib-red text-white" : "bg-white/10 text-kib-red"
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-bold text-white">{option.label}</p>
                        <p className="mt-1 text-xs leading-relaxed text-kib-muted">
                          {option.description}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="relative mt-6 hidden aspect-[4/3] overflow-hidden rounded-xl border border-white/10 lg:block">
              <Image
                src={selectedSpace.image}
                alt={selectedSpace.label}
                fill
                sizes="400px"
                className="object-cover transition-opacity duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-kib-black/80 to-transparent" />
              <p className="absolute right-0 bottom-0 left-0 p-4 text-sm font-semibold text-white">
                {selectedSpace.label}
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-kib-card p-6 sm:p-8 lg:col-span-3">
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <CheckCircle2 className="mb-4 h-16 w-16 text-kib-red" />
                <h3 className="text-2xl font-black text-white">
                  {t.quote.successTitle}
                </h3>
                <p className="mt-3 max-w-md text-sm text-kib-muted">
                  {t.quote.successMessage}
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-8 text-sm font-semibold text-kib-red hover:underline"
                >
                  {t.quote.newRequest}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <p className="text-sm text-kib-muted">
                  {t.quote.selectedSpace}{" "}
                  <span className="font-semibold text-white">
                    {selectedSpace.label}
                  </span>
                </p>

                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-kib-muted">
                      <User className="h-3.5 w-3.5" /> {t.quote.name}
                    </span>
                    <input
                      required
                      type="text"
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      className="w-full rounded-xl border border-white/10 bg-kib-black px-4 py-3 text-sm text-white outline-none transition-colors focus:border-kib-red"
                      placeholder={t.quote.namePlaceholder}
                    />
                  </label>
                  <label className="block">
                    <span className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-kib-muted">
                      <Mail className="h-3.5 w-3.5" /> {t.quote.email}
                    </span>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      className="w-full rounded-xl border border-white/10 bg-kib-black px-4 py-3 text-sm text-white outline-none transition-colors focus:border-kib-red"
                      placeholder={t.quote.emailPlaceholder}
                    />
                  </label>
                  <label className="block">
                    <span className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-kib-muted">
                      <Phone className="h-3.5 w-3.5" /> {t.quote.phone}
                    </span>
                    <input
                      required
                      type="tel"
                      value={form.phone}
                      onChange={(e) =>
                        setForm({ ...form, phone: e.target.value })
                      }
                      className="w-full rounded-xl border border-white/10 bg-kib-black px-4 py-3 text-sm text-white outline-none transition-colors focus:border-kib-red"
                      placeholder={t.quote.phonePlaceholder}
                    />
                  </label>
                  <label className="block">
                    <span className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-kib-muted">
                      <Calendar className="h-3.5 w-3.5" /> {t.quote.date}
                    </span>
                    <input
                      required
                      type="date"
                      value={form.date}
                      onChange={(e) =>
                        setForm({ ...form, date: e.target.value })
                      }
                      className="w-full rounded-xl border border-white/10 bg-kib-black px-4 py-3 text-sm text-white outline-none transition-colors focus:border-kib-red"
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-kib-muted">
                    <Clock className="h-3.5 w-3.5" /> {t.quote.duration}
                  </span>
                  <select
                    required
                    value={form.duration}
                    onChange={(e) =>
                      setForm({ ...form, duration: e.target.value })
                    }
                    className="w-full rounded-xl border border-white/10 bg-kib-black px-4 py-3 text-sm text-white outline-none transition-colors focus:border-kib-red"
                  >
                    {t.quote.durations.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="mb-2 text-xs font-bold uppercase tracking-wide text-kib-muted">
                    {t.quote.message}
                  </span>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    className="w-full resize-none rounded-xl border border-white/10 bg-kib-black px-4 py-3 text-sm text-white outline-none transition-colors focus:border-kib-red"
                    placeholder={t.quote.messagePlaceholder}
                  />
                </label>

                <ButtonElement
                  type="submit"
                  variant="primary"
                  className="w-full sm:w-auto"
                  disabled={status === "loading"}
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      {t.quote.sending}
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      {t.quote.submit}
                    </>
                  )}
                </ButtonElement>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
