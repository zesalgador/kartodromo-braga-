"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { ButtonElement } from "@/components/ui/Button";
import { parseVoucherLookupInput } from "@/lib/vouchers/codes";

export function ConsultarVoucherForm() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    const parsed = parseVoucherLookupInput(code);
    if (!parsed) {
      setError("Código inválido. Utilize o formato KIB-XXXXXXXX.");
      return;
    }
    setError(null);
    router.push(`/v/${parsed}`);
  }

  return (
    <form onSubmit={onSubmit} className="mt-8 rounded-2xl border border-white/10 bg-kib-card p-6">
      <label className="block text-xs font-bold uppercase tracking-wide text-kib-muted">
        Código do voucher
        <input
          type="text"
          inputMode="text"
          autoCapitalize="characters"
          autoCorrect="off"
          spellCheck={false}
          autoComplete="off"
          value={code}
          onChange={(event) => {
            setCode(event.target.value.toUpperCase());
            setError(null);
          }}
          placeholder="KIB-XXXXXXXX"
          className="mt-2 w-full rounded-xl border border-white/10 bg-kib-black px-4 py-3 font-mono text-sm tracking-wide text-white outline-none focus:border-kib-red"
        />
      </label>

      {error ? (
        <p className="mt-4 rounded-xl border border-kib-red/40 bg-kib-red/10 px-4 py-3 text-sm">{error}</p>
      ) : null}

      <ButtonElement type="submit" className="mt-6 w-full">
        Consultar validade
      </ButtonElement>
    </form>
  );
}
