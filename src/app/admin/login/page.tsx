"use client";

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ButtonElement } from "@/components/ui/Button";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import { getSupabasePublicEnv } from "@/lib/supabase/env";
import { isSafeAuthRedirect } from "@/lib/vouchers/redirects";
import { Suspense } from "react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const configured = Boolean(getSupabasePublicEnv());

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    if (!configured) {
      setError("O Supabase ainda não está configurado neste ambiente.");
      return;
    }

    setLoading(true);
    try {
      const supabase = createBrowserSupabaseClient();
      const { error: signError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (signError) {
        setError("Email ou palavra-passe incorretos.");
        return;
      }

      const next = searchParams.get("next");
      router.replace(isSafeAuthRedirect(next) ? next : "/admin");
      router.refresh();
    } catch {
      setError("Não foi possível iniciar sessão. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-16">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md rounded-2xl border border-white/10 bg-kib-card p-8 shadow-xl shadow-black/30"
      >
        <p className="text-xs font-bold uppercase tracking-widest text-kib-red">
          Kartódromo Internacional de Braga
        </p>
        <h1 className="mt-2 text-2xl font-black uppercase">Área reservada</h1>
        <p className="mt-2 text-sm text-kib-muted">
          Acesso apenas a colaboradores. Não existe registo público.
        </p>

        <label className="mt-6 block text-xs font-bold uppercase tracking-wide text-kib-muted">
          Email
          <input
            type="email"
            required
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 w-full rounded-xl border border-white/10 bg-kib-black px-4 py-3 text-sm text-white outline-none focus:border-kib-red"
          />
        </label>
        <label className="mt-4 block text-xs font-bold uppercase tracking-wide text-kib-muted">
          Palavra-passe
          <input
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 w-full rounded-xl border border-white/10 bg-kib-black px-4 py-3 text-sm text-white outline-none focus:border-kib-red"
          />
        </label>

        {error ? (
          <p className="mt-4 rounded-xl border border-kib-red/40 bg-kib-red/10 px-4 py-3 text-sm text-white">
            {error}
          </p>
        ) : null}

        <ButtonElement type="submit" className="mt-6 w-full" disabled={loading}>
          {loading ? "A entrar..." : "Entrar"}
        </ButtonElement>
      </form>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
