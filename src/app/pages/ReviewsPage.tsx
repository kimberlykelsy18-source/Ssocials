import { useState, useEffect } from "react";
import { Button } from "../components/Button";
import { DocumentHead } from "../components/DocumentHead";
import { motion } from "motion/react";
import { Star, Quote, Send, CheckCircle } from "lucide-react";
import { getApprovedReviews, submitReview, type Review } from "@backend/db";

// ─── Star display ─────────────────────────────────────────────────────────────

function StarDisplay({ rating, size = 13 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          style={{ width: size, height: size }}
          className={s <= rating ? "fill-current" : "opacity-15 fill-current"}
        />
      ))}
    </div>
  );
}

function StarPicker({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex items-center gap-1.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <button
          key={s}
          type="button"
          onClick={() => onChange(s)}
          onMouseEnter={() => setHovered(s)}
          onMouseLeave={() => setHovered(0)}
          className="transition-all duration-150"
          aria-label={`Rate ${s} star${s > 1 ? "s" : ""}`}
        >
          <Star
            className={`w-7 h-7 transition-all duration-150 ${
              s <= (hovered || value)
                ? "fill-current opacity-90"
                : "fill-transparent opacity-25"
            }`}
          />
        </button>
      ))}
      <span className="ml-2 text-[12px] tracking-[0.1em] opacity-40">
        {["", "Poor", "Fair", "Good", "Very Good", "Excellent"][hovered || value]}
      </span>
    </div>
  );
}

// ─── Review card ──────────────────────────────────────────────────────────────

function ReviewCard({ review, index }: { review: Review; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: index * 0.07, ease: "easeOut" }}
      className="relative flex flex-col p-6 md:p-7 border border-border bg-background group hover:bg-secondary/30 transition-colors duration-300"
    >
      {/* Quote mark */}
      <Quote
        aria-hidden
        className="absolute top-5 right-5 w-7 h-7 opacity-[0.06] group-hover:opacity-[0.09] transition-opacity"
      />

      {/* Stars */}
      <div className="mb-4">
        <StarDisplay rating={review.rating} size={13} />
      </div>

      {/* Review text */}
      <p className="flex-1 text-[14px] md:text-[15px] leading-relaxed opacity-65 mb-6 italic">
        "{review.review_text}"
      </p>

      {/* Divider */}
      <div className="h-px bg-current opacity-8 mb-4" />

      {/* Author */}
      <div>
        <p className="text-[14px] tracking-[-0.01em]">{review.name}</p>
        {(review.role || review.company) && (
          <p className="mt-0.5 text-[11px] tracking-[0.05em] opacity-40">
            {[review.role, review.company].filter(Boolean).join(" · ")}
          </p>
        )}
        <p className="mt-1 text-[10px] tracking-[0.12em] opacity-30 uppercase">
          {review.service_used.replace(/-/g, " ")}
        </p>
      </div>
    </motion.article>
  );
}

// ─── Featured card ────────────────────────────────────────────────────────────

function FeaturedReviewCard({ review, index }: { review: Review; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay: index * 0.12, ease: "easeOut" }}
      className="relative p-7 md:p-9 lg:p-10 bg-primary text-primary-foreground overflow-hidden"
    >
      {/* Ghost quote */}
      <span
        aria-hidden
        className="absolute -top-2 -left-2 text-[120px] font-light leading-none opacity-[0.05] select-none pointer-events-none"
      >
        "
      </span>

      <div className="relative z-10">
        <div className="mb-5">
          <StarDisplay rating={review.rating} size={14} />
        </div>

        <p className="text-[15px] md:text-[17px] lg:text-[18px] leading-relaxed opacity-85 mb-6 italic font-light">
          "{review.review_text}"
        </p>

        <div className="h-px bg-current opacity-20 mb-5" />

        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[15px] md:text-[16px]">{review.name}</p>
            {(review.role || review.company) && (
              <p className="mt-0.5 text-[11px] tracking-[0.05em] opacity-50">
                {[review.role, review.company].filter(Boolean).join(" · ")}
              </p>
            )}
          </div>
          <span className="text-[9px] tracking-[0.18em] opacity-35 shrink-0 uppercase">
            {review.service_used.replace(/-/g, " ")}
          </span>
        </div>
      </div>
    </motion.article>
  );
}

// ─── Submit form ──────────────────────────────────────────────────────────────

const SERVICES = [
  { value: "brand-identity", label: "Brand & Identity" },
  { value: "marketing", label: "Marketing & Growth" },
  { value: "digital-presence", label: "Digital Presence" },
  { value: "personal-branding", label: "Personal Branding" },
  { value: "full-package", label: "Full Package" },
  { value: "consulting", label: "Consulting" },
];

function SubmitReviewForm() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    role: "",
    service_used: "",
    rating: 5,
    review_text: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.rating === 0) {
      setFormError("Please select a star rating.");
      return;
    }
    setSubmitting(true);
    setFormError("");

    const result = await submitReview({
      name: formData.name,
      company: formData.company || null,
      role: formData.role || null,
      service_used: formData.service_used,
      rating: formData.rating,
      review_text: formData.review_text,
    });

    if (result.ok) {
      setSubmitted(true);
    } else {
      setFormError("Something went wrong. Please try again.");
    }
    setSubmitting(false);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col items-center text-center py-10 gap-5"
      >
        <CheckCircle className="w-10 h-10 opacity-60" />
        <div>
          <h3 className="text-[18px] md:text-[20px] tracking-[-0.01em] mb-2">
            Thank you for your review
          </h3>
          <p className="text-[13px] md:text-[14px] opacity-50 leading-relaxed max-w-[380px]">
            Your review has been submitted and is under review. It will appear on this page once approved.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
      {/* Name + Company row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block mb-1.5 text-[11px] tracking-[0.12em] opacity-50 uppercase">
            Your Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Dr. Jane Smith"
            className="w-full px-4 py-3 border border-border bg-input-background text-[14px] focus:outline-none focus:border-primary transition-colors"
          />
        </div>
        <div>
          <label className="block mb-1.5 text-[11px] tracking-[0.12em] opacity-50 uppercase">
            Company / Practice
          </label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Smith Aesthetics"
            className="w-full px-4 py-3 border border-border bg-input-background text-[14px] focus:outline-none focus:border-primary transition-colors"
          />
        </div>
      </div>

      {/* Role + Service row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block mb-1.5 text-[11px] tracking-[0.12em] opacity-50 uppercase">
            Your Role
          </label>
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            placeholder="Founder & Medical Director"
            className="w-full px-4 py-3 border border-border bg-input-background text-[14px] focus:outline-none focus:border-primary transition-colors"
          />
        </div>
        <div>
          <label className="block mb-1.5 text-[11px] tracking-[0.12em] opacity-50 uppercase">
            Service Used *
          </label>
          <select
            name="service_used"
            value={formData.service_used}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-border bg-input-background text-[14px] focus:outline-none focus:border-primary transition-colors appearance-none"
          >
            <option value="">Select a service</option>
            {SERVICES.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Star rating */}
      <div>
        <label className="block mb-2.5 text-[11px] tracking-[0.12em] opacity-50 uppercase">
          Your Rating *
        </label>
        <StarPicker
          value={formData.rating}
          onChange={(v) => setFormData((prev) => ({ ...prev, rating: v }))}
        />
      </div>

      {/* Review text */}
      <div>
        <label className="block mb-1.5 text-[11px] tracking-[0.12em] opacity-50 uppercase">
          Your Review *
        </label>
        <textarea
          name="review_text"
          value={formData.review_text}
          onChange={handleChange}
          required
          rows={4}
          placeholder="Share your experience working with S.Socials…"
          className="w-full px-4 py-3 border border-border bg-input-background text-[14px] focus:outline-none focus:border-primary transition-colors resize-none leading-relaxed"
        />
      </div>

      {formError && (
        <p className="text-[13px] text-red-500">{formError}</p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="flex items-center gap-3 px-7 py-3.5 bg-primary text-primary-foreground text-[11px] tracking-[0.18em] uppercase hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50"
      >
        {submitting ? (
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : (
          <Send className="w-4 h-4" />
        )}
        {submitting ? "Submitting…" : "Submit Review"}
      </button>

      <p className="text-[11px] opacity-30 leading-relaxed">
        Reviews are moderated before appearing publicly. We will not edit your words.
      </p>
    </form>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getApprovedReviews().then((data) => {
      setReviews(data);
      setLoading(false);
    });
  }, []);

  const featured = reviews.filter((r) => r.featured);
  const regular = reviews.filter((r) => !r.featured);

  return (
    <div className="overflow-x-hidden">
      <DocumentHead
        title="Client Reviews — S.Socials"
        description="Real results, real brands. Hear from clients we've helped transform in health, beauty, and wellness."
      />

      {/* ── Hero ── */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 pt-8 md:pt-10 lg:pt-12 pb-10 md:pb-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-[680px]"
        >
          <div className="flex items-center gap-3 mb-5">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="h-px w-10 bg-current opacity-25 origin-left"
            />
            <span className="text-[10px] tracking-[0.18em] opacity-35">CLIENT REVIEWS</span>
          </div>
          <h1 className="mb-5 text-[24px] md:text-[38px] lg:text-[50px] leading-[1.1] tracking-[-0.02em]">
            Real Results.<br className="hidden md:block" /> Real Brands.
          </h1>
          <p className="text-[14px] md:text-[15px] lg:text-[16px] leading-relaxed opacity-55 max-w-[520px]">
            We let our clients speak for themselves. Every review below is from a real brand we've had the privilege of working with.
          </p>
        </motion.div>
      </section>

      {/* ── Featured Reviews ── */}
      {featured.length > 0 && (
        <section className="bg-secondary border-y border-border">
          <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 py-10 md:py-12 lg:py-14">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="h-px w-10 bg-current opacity-25" />
              <span className="text-[10px] tracking-[0.18em] opacity-35">FEATURED</span>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
              {featured.map((review, i) => (
                <FeaturedReviewCard key={review.id} review={review} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── All Reviews Grid ── */}
      {(loading || regular.length > 0) && (
        <section className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 py-10 md:py-12 lg:py-14">
          {regular.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="h-px w-10 bg-current opacity-25" />
              <span className="text-[10px] tracking-[0.18em] opacity-35">
                {featured.length > 0 ? "MORE REVIEWS" : "ALL REVIEWS"}
              </span>
            </motion.div>
          )}

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-52 border border-border bg-secondary/30 animate-pulse"
                />
              ))}
            </div>
          ) : regular.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {regular.map((review, i) => (
                <ReviewCard key={review.id} review={review} index={i} />
              ))}
            </div>
          ) : null}
        </section>
      )}

      {/* ── Empty state ── */}
      {!loading && reviews.length === 0 && (
        <section className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 py-10 md:py-16">
          <div className="max-w-[480px] mx-auto text-center py-16 border border-border">
            <Quote className="w-8 h-8 mx-auto mb-4 opacity-20" />
            <p className="text-[14px] opacity-40">
              Be the first to share your experience.
            </p>
          </div>
        </section>
      )}

      {/* ── Submit Review ── */}
      <section className="border-t border-border">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 py-12 md:py-16 lg:py-20">
          <div className="max-w-[680px]">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mb-8 md:mb-10"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-10 bg-current opacity-25" />
                <span className="text-[10px] tracking-[0.18em] opacity-35">SHARE YOUR EXPERIENCE</span>
              </div>
              <h2 className="mb-3 text-[22px] md:text-[28px] lg:text-[34px] tracking-[-0.02em] leading-[1.2]">
                Worked with us?
              </h2>
              <p className="text-[13px] md:text-[14px] leading-relaxed opacity-50">
                Your review helps other brands make informed decisions. We'd love to hear about your experience.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            >
              <SubmitReviewForm />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-primary text-primary-foreground">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 py-14 md:py-18 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-[680px] mx-auto text-center"
          >
            <p className="text-[10px] tracking-[0.2em] opacity-40 mb-4">READY TO JOIN THEM?</p>
            <h2 className="mb-6 text-[24px] md:text-[32px] lg:text-[42px] leading-[1.15] tracking-[-0.02em]">
              Let's build your brand.
            </h2>
            <Button to="/contact" variant="secondary">Book a Consultation</Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
