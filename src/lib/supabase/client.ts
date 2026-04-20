import { createBrowserClient } from "@supabase/ssr";

// Patch a broken global `localStorage` (e.g. Node.js --localstorage-file
// without a valid path) so Supabase's internal code never throws during SSR.
(function patchLocalStorage() {
  try {
    if (typeof globalThis.localStorage !== "undefined" && typeof globalThis.localStorage.getItem !== "function") {
      Object.defineProperty(globalThis, "localStorage", {
        value: { getItem: () => null, setItem: () => {}, removeItem: () => {} },
        writable: true,
        configurable: true,
      });
    }
  } catch {
    // ignore — read-only property or other constraint
  }
})();

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://placeholder.supabase.co",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "placeholder-key"
  );
}
