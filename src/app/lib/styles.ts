// ─── Shared style constants ───────────────────────────────────────────────────
// Single source of truth for repeated Tailwind class strings.
// Import what you need: import { INPUT, LABEL } from "@/lib/styles"

// Page layout wrapper — max width + horizontal padding
export const CONTAINER = "max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16";

// Form inputs — two variants: page-level (responsive) vs admin (compact)
export const INPUT      = "w-full px-3 md:px-4 py-2.5 md:py-3 border border-border bg-input-background text-[14px] md:text-[15px] focus:outline-none focus:border-primary transition-colors";
export const SELECT     = `${INPUT} appearance-none`;
export const TEXTAREA   = `${INPUT} resize-none`;

// Admin-specific form inputs (tighter, non-responsive)
export const INPUT_ADMIN    = "w-full px-3 py-2 border border-border bg-input-background text-[14px] focus:outline-none focus:border-primary";
export const TEXTAREA_ADMIN = "w-full px-3 py-2.5 border border-border bg-input-background text-[14px] focus:outline-none focus:border-primary resize-none";

// Field labels
export const LABEL       = "block mb-1.5 text-[12px] tracking-[0.05em]";
export const LABEL_ADMIN = "block mb-1.5 text-[11px] tracking-[0.1em] opacity-50 uppercase";

// Eyebrow / section stamp — small allcaps label above headings
export const EYEBROW = "text-[10px] tracking-[0.18em] opacity-35";

// Section heading style shared across pages
export const SECTION_HEADING = "text-[18px] md:text-[20px] tracking-[-0.01em]";

// Admin content panel max-width wrapper
export const ADMIN_PANEL = "max-w-[700px] space-y-5";
