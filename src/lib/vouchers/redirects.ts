export function isSafeAuthRedirect(next: string | null | undefined): next is string {
  if (!next || next.includes("://") || next.includes("\\") || next.includes("\n")) {
    return false;
  }
  if (!next.startsWith("/") || next.startsWith("//")) {
    return false;
  }
  return next.startsWith("/v/") || next === "/admin" || next.startsWith("/admin/");
}
