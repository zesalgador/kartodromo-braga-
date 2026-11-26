import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { requireSupabasePublicEnv } from "./env";
import type { Profile } from "@/lib/vouchers/types";

export async function createServerSupabaseClient() {
  const { url, publicKey } = requireSupabasePublicEnv();
  const cookieStore = await cookies();

  return createServerClient(url, publicKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Server Components cannot set cookies; middleware refreshes the session.
        }
      },
    },
  });
}

export function createAnonSupabaseClient() {
  const { url, publicKey } = requireSupabasePublicEnv();
  return createClient(url, publicKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export async function getAuthProfile(): Promise<Profile | null> {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data } = await supabase
    .from("profiles")
    .select("id, email, full_name, role")
    .eq("id", user.id)
    .maybeSingle();

  return (data as Profile | null) ?? null;
}
