"use client";

import { createBrowserClient } from "@supabase/ssr";
import { requireSupabasePublicEnv } from "./env";

export function createBrowserSupabaseClient() {
  const { url, publicKey } = requireSupabasePublicEnv();
  return createBrowserClient(url, publicKey);
}
