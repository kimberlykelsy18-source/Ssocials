// Supabase client — lazy so the app works before the package is installed
// or before .env is configured. Falls back silently to localStorage.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let _client: any = null;

export async function getSupabaseClient() {
  if (_client) return _client;

  const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

  if (!url || !key || url.includes("your-project")) return null;

  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore — package may not be installed yet; handled by catch
    const { createClient } = await import("@supabase/supabase-js");
    _client = createClient(url, key);
    return _client;
  } catch {
    console.warn("[Supabase] Run: npm install @supabase/supabase-js");
    return null;
  }
}
