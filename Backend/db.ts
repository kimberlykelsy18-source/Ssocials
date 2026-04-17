import { getSupabaseClient } from "./supabase";

const CONTENT_ROW_ID = "a1b2c3d4-0000-0000-0000-000000000001";

// ─── Types ───────────────────────────────────────────────────────────────────

export type SubmissionStatus = "new" | "read" | "replied";

export interface ContactSubmission {
  id: string;
  name: string;
  business_name: string;
  industry: string;
  service_needed: string;
  budget_range?: string | null;
  email: string;
  phone?: string | null;
  status: SubmissionStatus;
  notes?: string | null;
  created_at: string;
}

export type NewContactSubmission = Omit<
  ContactSubmission,
  "id" | "status" | "notes" | "created_at"
>;

// ─── Site Content ─────────────────────────────────────────────────────────────

export async function loadSiteContent(): Promise<Record<string, unknown> | null> {
  const sb = await getSupabaseClient();
  if (!sb) return null;

  const { data, error } = await sb
    .from("site_content")
    .select("content")
    .eq("id", CONTENT_ROW_ID)
    .single();

  if (error) {
    console.error("[db] loadSiteContent:", error.message);
    return null;
  }
  return data?.content ?? null;
}

export async function saveSiteContent(
  content: Record<string, unknown>
): Promise<{ ok: boolean; error?: string }> {
  const sb = await getSupabaseClient();
  if (!sb) return { ok: false, error: "Supabase not configured" };

  const { error } = await sb
    .from("site_content")
    .upsert({ id: CONTENT_ROW_ID, content });

  if (error) {
    console.error("[db] saveSiteContent:", error.message);
    return { ok: false, error: error.message };
  }
  return { ok: true };
}

// ─── Contact Submissions ──────────────────────────────────────────────────────

export async function submitContactForm(
  data: NewContactSubmission
): Promise<{ ok: boolean; error?: string }> {
  const sb = await getSupabaseClient();
  if (!sb) return { ok: false, error: "Supabase not configured. Please contact us directly." };

  const { error } = await sb.from("contact_submissions").insert({
    name: data.name,
    business_name: data.business_name,
    industry: data.industry,
    service_needed: data.service_needed,
    budget_range: data.budget_range || null,
    email: data.email,
    phone: data.phone || null,
  });

  if (error) {
    console.error("[db] submitContactForm:", error.message);
    return { ok: false, error: error.message };
  }
  return { ok: true };
}

export async function getContactSubmissions(): Promise<ContactSubmission[]> {
  const sb = await getSupabaseClient();
  if (!sb) return [];

  const { data, error } = await sb
    .from("contact_submissions")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[db] getContactSubmissions:", error.message);
    return [];
  }
  return (data as ContactSubmission[]) ?? [];
}

export async function updateSubmissionStatus(
  id: string,
  status: SubmissionStatus
): Promise<{ ok: boolean; error?: string }> {
  const sb = await getSupabaseClient();
  if (!sb) return { ok: false, error: "Supabase not configured" };

  const { error } = await sb
    .from("contact_submissions")
    .update({ status })
    .eq("id", id);

  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

export async function updateSubmissionNotes(
  id: string,
  notes: string
): Promise<{ ok: boolean; error?: string }> {
  const sb = await getSupabaseClient();
  if (!sb) return { ok: false, error: "Supabase not configured" };

  const { error } = await sb
    .from("contact_submissions")
    .update({ notes })
    .eq("id", id);

  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

// ─── Reviews ─────────────────────────────────────────────────────────────────

export type ReviewStatus = "pending" | "approved" | "rejected";

export interface Review {
  id: string;
  name: string;
  company?: string | null;
  role?: string | null;
  service_used: string;
  rating: number;
  review_text: string;
  status: ReviewStatus;
  featured: boolean;
  created_at: string;
}

export type NewReview = Omit<Review, "id" | "status" | "featured" | "created_at">;

export async function submitReview(
  data: NewReview
): Promise<{ ok: boolean; error?: string }> {
  const sb = await getSupabaseClient();
  if (!sb) return { ok: false, error: "Supabase not configured." };

  const { error } = await sb.from("reviews").insert({
    name: data.name,
    company: data.company || null,
    role: data.role || null,
    service_used: data.service_used,
    rating: data.rating,
    review_text: data.review_text,
  });

  if (error) {
    console.error("[db] submitReview:", error.message);
    return { ok: false, error: error.message };
  }
  return { ok: true };
}

export async function getApprovedReviews(): Promise<Review[]> {
  const sb = await getSupabaseClient();
  if (!sb) return [];

  const { data, error } = await sb
    .from("reviews")
    .select("*")
    .eq("status", "approved")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[db] getApprovedReviews:", error.message);
    return [];
  }
  return (data as Review[]) ?? [];
}

export async function getAllReviews(): Promise<Review[]> {
  const sb = await getSupabaseClient();
  if (!sb) return [];

  const { data, error } = await sb
    .from("reviews")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[db] getAllReviews:", error.message);
    return [];
  }
  return (data as Review[]) ?? [];
}

export async function updateReviewStatus(
  id: string,
  status: ReviewStatus
): Promise<{ ok: boolean; error?: string }> {
  const sb = await getSupabaseClient();
  if (!sb) return { ok: false, error: "Supabase not configured" };

  const { error } = await sb.from("reviews").update({ status }).eq("id", id);
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

export async function toggleReviewFeatured(
  id: string,
  featured: boolean
): Promise<{ ok: boolean; error?: string }> {
  const sb = await getSupabaseClient();
  if (!sb) return { ok: false, error: "Supabase not configured" };

  const { error } = await sb.from("reviews").update({ featured }).eq("id", id);
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

export async function deleteReview(
  id: string
): Promise<{ ok: boolean; error?: string }> {
  const sb = await getSupabaseClient();
  if (!sb) return { ok: false, error: "Supabase not configured" };

  const { error } = await sb.from("reviews").delete().eq("id", id);
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

// ─── Media ────────────────────────────────────────────────────────────────────

export interface MediaItem {
  id: string;
  name: string;
  url: string;
  storage_path: string;
  type: "image" | "video";
  purpose: string;
  created_at: string;
}

export async function uploadMediaItem(
  file: File,
  name: string,
  purpose: string
): Promise<{ ok: boolean; item?: MediaItem; error?: string }> {
  const sb = await getSupabaseClient();
  if (!sb) return { ok: false, error: "Supabase not configured" };

  const ext = file.name.split(".").pop();
  const storagePath = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const type: "image" | "video" = file.type.startsWith("video") ? "video" : "image";

  const { error: uploadError } = await sb.storage
    .from("site-media")
    .upload(storagePath, file, { contentType: file.type, upsert: false });

  if (uploadError) {
    console.error("[db] uploadMediaItem storage:", uploadError.message);
    return { ok: false, error: uploadError.message };
  }

  const { data: urlData } = sb.storage.from("site-media").getPublicUrl(storagePath);
  const url = urlData.publicUrl;

  const { data, error: insertError } = await sb
    .from("media_items")
    .insert({ name, url, storage_path: storagePath, type, purpose })
    .select()
    .single();

  if (insertError) {
    console.error("[db] uploadMediaItem insert:", insertError.message);
    return { ok: false, error: insertError.message };
  }
  return { ok: true, item: data as MediaItem };
}

export async function getMediaItems(): Promise<MediaItem[]> {
  const sb = await getSupabaseClient();
  if (!sb) return [];

  const { data, error } = await sb
    .from("media_items")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[db] getMediaItems:", error.message);
    return [];
  }
  return (data as MediaItem[]) ?? [];
}

export async function deleteMediaItem(
  id: string,
  storagePath: string
): Promise<{ ok: boolean; error?: string }> {
  const sb = await getSupabaseClient();
  if (!sb) return { ok: false, error: "Supabase not configured" };

  await sb.storage.from("site-media").remove([storagePath]);

  const { error } = await sb.from("media_items").delete().eq("id", id);
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

// ─── Auth ─────────────────────────────────────────────────────────────────────

export async function signIn(
  email: string,
  password: string
): Promise<{ ok: boolean; error?: string }> {
  const sb = await getSupabaseClient();
  if (!sb) return { ok: false, error: "Supabase not configured. Add keys to .env first." };

  const { error } = await sb.auth.signInWithPassword({ email, password });
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

export async function signOut(): Promise<void> {
  const sb = await getSupabaseClient();
  if (sb) await sb.auth.signOut();
}

export async function getSession() {
  const sb = await getSupabaseClient();
  if (!sb) return null;

  const { data } = await sb.auth.getSession();
  return data.session;
}
