import { useState, useEffect } from "react";
import { RefreshCw, Check, X, Star, Trash2 } from "lucide-react";
import { StarRating } from "../../components/StarRating";
import { SECTION_HEADING } from "../../lib/styles";
import {
  getAllReviews,
  updateReviewStatus,
  toggleReviewFeatured,
  deleteReview,
  type Review,
  type ReviewStatus,
} from "@backend/db";

const REVIEW_STATUS_LABELS: Record<ReviewStatus, string> = {
  pending: "Pending",
  approved: "Approved",
  rejected: "Rejected",
};

const REVIEW_STATUS_COLORS: Record<ReviewStatus, string> = {
  pending: "bg-yellow-500/15 text-yellow-700 border-yellow-200",
  approved: "bg-green-500/15 text-green-700 border-green-200",
  rejected: "bg-red-500/15 text-red-600 border-red-200",
};

interface Props {
  onCountChange: (count: number) => void;
}

export function ReviewsTab({ onCountChange }: Props) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<ReviewStatus | "all">("all");

  useEffect(() => { fetchReviews(); }, []);

  const fetchReviews = async () => {
    setLoading(true);
    const data = await getAllReviews();
    setReviews(data);
    setLoading(false);
    onCountChange(data.filter((r) => r.status === "pending").length);
  };

  const handleStatus = async (id: string, status: ReviewStatus) => {
    await updateReviewStatus(id, status);
    setReviews((prev) => {
      const next = prev.map((r) => r.id === id ? { ...r, status } : r);
      onCountChange(next.filter((r) => r.status === "pending").length);
      return next;
    });
  };

  const handleFeatured = async (id: string, featured: boolean) => {
    await toggleReviewFeatured(id, featured);
    setReviews((prev) => prev.map((r) => r.id === id ? { ...r, featured } : r));
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this review? This cannot be undone.")) return;
    await deleteReview(id);
    setReviews((prev) => {
      const next = prev.filter((r) => r.id !== id);
      onCountChange(next.filter((r) => r.status === "pending").length);
      return next;
    });
  };

  const pendingCount = reviews.filter((r) => r.status === "pending").length;
  const filtered = filter === "all" ? reviews : reviews.filter((r) => r.status === filter);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className={SECTION_HEADING}>
            Reviews
            {pendingCount > 0 && (
              <span className="ml-3 text-[12px] px-2 py-0.5 bg-yellow-500/15 text-yellow-700 border border-yellow-200">
                {pendingCount} pending
              </span>
            )}
          </h2>
          <p className="mt-1 text-[12px] opacity-50">Approve, reject, or feature client reviews.</p>
        </div>
        <button onClick={fetchReviews} className="flex items-center gap-2 px-3 py-2 border border-border text-[12px] tracking-[0.05em] hover:border-primary transition-colors">
          <RefreshCw className="w-3.5 h-3.5" /> Refresh
        </button>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        {(["all", "pending", "approved", "rejected"] as const).map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-3 py-1.5 text-[11px] tracking-[0.08em] border transition-colors capitalize ${
              filter === f ? "border-primary text-primary bg-primary/5" : "border-border text-primary/50 hover:text-primary"
            }`}
          >
            {f === "all"
              ? `All (${reviews.length})`
              : `${f} (${reviews.filter((r) => r.status === f).length})`
            }
          </button>
        ))}
      </div>

      {loading ? (
        <div className="py-12 text-center opacity-40 text-[13px]">Loading reviews…</div>
      ) : filtered.length === 0 ? (
        <div className="py-12 text-center border border-border">
          <p className="opacity-40 text-[13px]">No reviews in this category.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((review) => (
            <div key={review.id} className="border border-border bg-card p-4 md:p-5">
              <div className="flex items-start gap-4 flex-wrap">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1 flex-wrap">
                    <p className="text-[14px]">{review.name}</p>
                    {(review.role || review.company) && (
                      <p className="text-[11px] opacity-40">
                        {[review.role, review.company].filter(Boolean).join(" · ")}
                      </p>
                    )}
                    <StarRating rating={review.rating} size={12} />
                  </div>
                  <p className="text-[10px] tracking-[0.1em] opacity-35 mb-2 uppercase">
                    {review.service_used.replace(/-/g, " ")}
                  </p>
                  <p className="text-[13px] leading-relaxed opacity-65 italic">
                    "{review.review_text}"
                  </p>
                  <p className="mt-2 text-[10px] opacity-30">
                    {new Date(review.created_at).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                  </p>
                </div>

                <div className="flex flex-col gap-2 shrink-0">
                  <span className={`inline-flex items-center px-2 py-0.5 text-[10px] tracking-[0.1em] border ${REVIEW_STATUS_COLORS[review.status]}`}>
                    {REVIEW_STATUS_LABELS[review.status]}
                  </span>

                  <div className="flex gap-1.5 flex-wrap">
                    {review.status !== "approved" && (
                      <button onClick={() => handleStatus(review.id, "approved")}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] tracking-[0.07em] border border-green-300 text-green-700 hover:bg-green-50 transition-colors"
                      >
                        <Check className="w-3 h-3" /> Approve
                      </button>
                    )}
                    {review.status !== "rejected" && (
                      <button onClick={() => handleStatus(review.id, "rejected")}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] tracking-[0.07em] border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <X className="w-3 h-3" /> Reject
                      </button>
                    )}
                    {review.status === "pending" && (
                      <button onClick={() => handleStatus(review.id, "pending")}
                        className="px-2.5 py-1.5 text-[11px] tracking-[0.07em] border border-border opacity-50 hover:opacity-100 transition-opacity"
                      >
                        Keep Pending
                      </button>
                    )}
                  </div>

                  {review.status === "approved" && (
                    <button
                      onClick={() => handleFeatured(review.id, !review.featured)}
                      className={`flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] tracking-[0.07em] border transition-colors ${
                        review.featured
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-border opacity-60 hover:opacity-100"
                      }`}
                    >
                      <Star className={`w-3 h-3 ${review.featured ? "fill-current" : ""}`} />
                      {review.featured ? "Featured" : "Feature"}
                    </button>
                  )}

                  <button onClick={() => handleDelete(review.id)}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] tracking-[0.07em] border border-border opacity-40 hover:opacity-80 hover:border-red-300 hover:text-red-600 transition-all"
                  >
                    <Trash2 className="w-3 h-3" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
