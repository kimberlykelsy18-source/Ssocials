// Email sending via Resend — runs through a Supabase Edge Function
// so the RESEND_API_KEY never touches the browser.
//
// Setup: see instructions in README or ask Claude for the deploy steps.

import { getSupabaseClient } from "./supabase";

export interface ContactEmailParams {
  client_name:    string;
  client_email:   string;
  business_name:  string;
  industry:       string;
  service_needed: string;
  budget_range:   string;
  phone:          string;
}

/**
 * Invokes the `send-contact-email` Supabase Edge Function.
 * Sends admin notification + customer auto-reply via Resend.
 * Fails silently — never blocks the form submission.
 */
export async function sendContactEmails(params: ContactEmailParams): Promise<void> {
  const sb = await getSupabaseClient();
  if (!sb) {
    console.info("[email] Supabase not configured — skipping emails.");
    return;
  }

  try {
    const { error } = await sb.functions.invoke("send-contact-email", {
      body: params,
    });

    if (error) {
      console.warn("[email] Edge function error:", error.message);
    }
  } catch (err) {
    console.warn("[email] Failed to invoke send-contact-email:", err);
  }
}
