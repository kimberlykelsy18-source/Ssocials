import { useState, useRef, useEffect } from "react";
import { useContentStore } from "../store/contentStore";
import { DocumentHead } from "../components/DocumentHead";
import {
  Save, Upload, LogOut, RefreshCw, ChevronDown, ChevronUp,
  Trash2, Check, X, Star, ImageIcon, Video, Copy, Eye,
} from "lucide-react";
import { useNavigate } from "react-router";
import {
  getContactSubmissions,
  updateSubmissionStatus,
  updateSubmissionNotes,
  getAllReviews,
  updateReviewStatus,
  toggleReviewFeatured,
  deleteReview,
  getMediaItems,
  uploadMediaItem,
  deleteMediaItem,
  type ContactSubmission,
  type SubmissionStatus,
  type Review,
  type ReviewStatus,
  type MediaItem,
} from "@backend/db";

// ─── Constants ────────────────────────────────────────────────────────────────

const STATUS_LABELS: Record<SubmissionStatus, string> = {
  new: "New",
  read: "Read",
  replied: "Replied",
};

const STATUS_COLORS: Record<SubmissionStatus, string> = {
  new: "bg-blue-500/15 text-blue-600 border-blue-200",
  read: "bg-secondary text-primary/60 border-border",
  replied: "bg-green-500/15 text-green-700 border-green-200",
};

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

// ─── Shared field styles ──────────────────────────────────────────────────────

const INPUT_CLS = "w-full px-3 py-2 border border-border bg-input-background text-[14px] focus:outline-none focus:border-primary";
const TEXTAREA_CLS = "w-full px-3 py-2.5 border border-border bg-input-background text-[14px] focus:outline-none focus:border-primary resize-none";

// ─── Star display ─────────────────────────────────────────────────────────────

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`w-3 h-3 ${s <= rating ? "fill-current" : "opacity-15 fill-current"}`}
        />
      ))}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function AdminPage() {
  const store = useContentStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("logo");
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [saveError, setSaveError] = useState("");
  const logoFileRef = useRef<HTMLInputElement>(null);

  // ── Submissions state ──────────────────────────────────────────────────────
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [submissionsLoading, setSubmissionsLoading] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [noteDrafts, setNoteDrafts] = useState<Record<string, string>>({});

  // ── Reviews state ──────────────────────────────────────────────────────────
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [reviewFilter, setReviewFilter] = useState<ReviewStatus | "all">("all");

  // ── Media state ────────────────────────────────────────────────────────────
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [mediaLoading, setMediaLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [mediaName, setMediaName] = useState("");
  const [mediaPurpose, setMediaPurpose] = useState("general");
  const mediaFileRef = useRef<HTMLInputElement>(null);
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    if (!store.isAuthenticated) navigate("/login");
  }, [store.isAuthenticated, navigate]);

  useEffect(() => {
    if (activeTab === "submissions") fetchSubmissions();
    if (activeTab === "reviews") fetchReviews();
    if (activeTab === "media") fetchMedia();
  }, [activeTab]);

  // ── Submissions ────────────────────────────────────────────────────────────
  const fetchSubmissions = async () => {
    setSubmissionsLoading(true);
    const data = await getContactSubmissions();
    setSubmissions(data);
    const drafts: Record<string, string> = {};
    data.forEach((s) => { drafts[s.id] = s.notes ?? ""; });
    setNoteDrafts(drafts);
    setSubmissionsLoading(false);
  };

  const handleStatusChange = async (id: string, status: SubmissionStatus) => {
    await updateSubmissionStatus(id, status);
    setSubmissions((prev) => prev.map((s) => s.id === id ? { ...s, status } : s));
  };

  const handleNoteSave = async (id: string) => {
    await updateSubmissionNotes(id, noteDrafts[id] ?? "");
    setSubmissions((prev) => prev.map((s) => s.id === id ? { ...s, notes: noteDrafts[id] ?? "" } : s));
  };

  // ── Reviews ────────────────────────────────────────────────────────────────
  const fetchReviews = async () => {
    setReviewsLoading(true);
    const data = await getAllReviews();
    setReviews(data);
    setReviewsLoading(false);
  };

  const handleReviewStatus = async (id: string, status: ReviewStatus) => {
    await updateReviewStatus(id, status);
    setReviews((prev) => prev.map((r) => r.id === id ? { ...r, status } : r));
  };

  const handleReviewFeatured = async (id: string, featured: boolean) => {
    await toggleReviewFeatured(id, featured);
    setReviews((prev) => prev.map((r) => r.id === id ? { ...r, featured } : r));
  };

  const handleReviewDelete = async (id: string) => {
    if (!confirm("Delete this review? This cannot be undone.")) return;
    await deleteReview(id);
    setReviews((prev) => prev.filter((r) => r.id !== id));
  };

  // ── Media ──────────────────────────────────────────────────────────────────
  const fetchMedia = async () => {
    setMediaLoading(true);
    const data = await getMediaItems();
    setMediaItems(data);
    setMediaLoading(false);
  };

  const handleMediaFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setMediaFile(file);
    if (file && !mediaName) setMediaName(file.name.replace(/\.[^.]+$/, ""));
  };

  const handleUpload = async () => {
    if (!mediaFile) { setUploadError("Please select a file."); return; }
    if (!mediaName.trim()) { setUploadError("Please enter a name."); return; }
    setUploading(true);
    setUploadError("");
    const result = await uploadMediaItem(mediaFile, mediaName.trim(), mediaPurpose);
    if (result.ok && result.item) {
      setMediaItems((prev) => [result.item!, ...prev]);
      setMediaFile(null);
      setMediaName("");
      setMediaPurpose("general");
      if (mediaFileRef.current) mediaFileRef.current.value = "";
    } else {
      setUploadError(result.error ?? "Upload failed.");
    }
    setUploading(false);
  };

  const handleMediaDelete = async (id: string, storagePath: string) => {
    if (!confirm("Delete this media item? It will be removed from storage.")) return;
    await deleteMediaItem(id, storagePath);
    setMediaItems((prev) => prev.filter((m) => m.id !== id));
  };

  const handleCopyUrl = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // ── Save / Logout ──────────────────────────────────────────────────────────
  const handleSave = async () => {
    setSaveState("saving");
    setSaveError("");
    const result = await store.saveToSupabase();
    if (result.ok) {
      setSaveState("saved");
      setTimeout(() => setSaveState("idle"), 2500);
    } else {
      setSaveState("error");
      setSaveError(result.error ?? "Save failed");
      setTimeout(() => setSaveState("idle"), 4000);
    }
  };

  const handleLogout = async () => {
    await store.logout();
    navigate("/login");
  };

  const handleLogoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => { store.setLogoUrl(event.target?.result as string); };
      reader.readAsDataURL(file);
    }
  };

  const newCount = submissions.filter((s) => s.status === "new").length;
  const pendingReviewCount = reviews.filter((r) => r.status === "pending").length;

  const tabs = [
    { id: "logo", label: "Logo" },
    { id: "navbar", label: "Navigation" },
    { id: "home", label: "Home" },
    { id: "home-images", label: "Home Images" },
    { id: "about", label: "About" },
    { id: "about-images", label: "About Images" },
    { id: "services", label: "Services" },
    { id: "packages", label: "Packages" },
    { id: "portfolio", label: "Portfolio" },
    { id: "process", label: "Process" },
    { id: "personal-branding", label: "Personal Branding" },
    { id: "contact", label: "Contact" },
    { id: "footer", label: "Footer" },
    { id: "media", label: "Media" },
    { id: "reviews", label: pendingReviewCount > 0 ? `Reviews (${pendingReviewCount})` : "Reviews" },
    { id: "submissions", label: newCount > 0 ? `Submissions (${newCount})` : "Submissions" },
  ];

  const filteredReviews = reviewFilter === "all"
    ? reviews
    : reviews.filter((r) => r.status === reviewFilter);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <DocumentHead title="Admin Panel — S.Socials" description="Edit all website content" />

      {/* ── Admin Header ── */}
      <div className="border-b border-destructive bg-destructive/10 sticky top-0 z-50">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 py-4 md:py-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-[18px] md:text-[20px] lg:text-[24px] tracking-[-0.01em] text-destructive">
                Admin Panel
              </h1>
              <p className="mt-1 text-[10px] md:text-[11px] opacity-60">
                Edit content • Click Save to publish changes
                {store.isSyncing && (
                  <span className="ml-2 inline-flex items-center gap-1 opacity-70">
                    <RefreshCw className="w-3 h-3 animate-spin" /> Syncing…
                  </span>
                )}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-end">
                <button
                  onClick={handleSave}
                  disabled={saveState === "saving"}
                  className="flex items-center gap-2 px-4 py-2 bg-destructive text-white text-[12px] md:text-[13px] tracking-[0.05em] transition-opacity hover:opacity-90 disabled:opacity-60"
                >
                  {saveState === "saving" ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  {saveState === "saving" ? "Saving…" : saveState === "saved" ? "Saved!" : "Save to DB"}
                </button>
                {saveState === "error" && (
                  <p className="mt-1 text-[11px] text-red-500">{saveError}</p>
                )}
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 border border-destructive text-destructive text-[12px] md:text-[13px] tracking-[0.05em] transition-opacity hover:bg-destructive/10"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 py-6 md:py-8">
        {/* Tabs */}
        <div className="flex gap-1 mb-8 border-b border-border pb-0 overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 md:px-4 py-3 text-[11px] md:text-[12px] lg:text-[13px] tracking-[0.05em] whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? "text-destructive border-b-2 border-destructive -mb-[1px]"
                  : "text-primary/60 hover:text-primary"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── Logo ── */}
        {activeTab === "logo" && (
          <div className="max-w-[700px] space-y-5">
            <h2 className="text-[18px] md:text-[20px] tracking-[-0.01em]">Logo Image Upload</h2>
            <div>
              <input
                ref={logoFileRef}
                type="file"
                accept="image/png, image/jpeg, image/jpg, image/svg+xml"
                onChange={handleLogoFileChange}
                className="hidden"
              />
              <button
                onClick={() => logoFileRef.current?.click()}
                className="flex items-center gap-3 px-5 py-3 border-2 border-border hover:border-primary transition-colors text-[13px] tracking-[0.05em]"
              >
                <Upload className="w-4 h-4" />
                Upload Logo (PNG, JPG, SVG)
              </button>
              <p className="mt-2 text-[11px] opacity-50">Recommended: 200px height, transparent background</p>
            </div>
            {store.logoUrl && (
              <div className="p-5 border border-border bg-secondary/20">
                <p className="text-[12px] opacity-60 mb-3">Preview:</p>
                <img src={store.logoUrl} alt="Logo preview" className="h-10 w-auto object-contain" />
                <button onClick={() => store.setLogoUrl("")} className="mt-3 text-[12px] text-destructive hover:underline">
                  Remove Logo
                </button>
              </div>
            )}
          </div>
        )}

        {/* ── Navigation ── */}
        {activeTab === "navbar" && (
          <div className="max-w-[700px] space-y-5">
            <h2 className="text-[18px] md:text-[20px] tracking-[-0.01em]">Navigation Menu</h2>
            {store.navItems.map((item, index) => (
              <div key={index} className="p-4 border border-border bg-card grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1.5 text-[12px] tracking-[0.05em]">Link Text</label>
                  <input type="text" value={item.name}
                    onChange={(e) => { const n = [...store.navItems]; n[index] = { ...n[index], name: e.target.value }; store.updateNavItems(n); }}
                    className={INPUT_CLS}
                  />
                </div>
                <div>
                  <label className="block mb-1.5 text-[12px] tracking-[0.05em]">Path</label>
                  <input type="text" value={item.path}
                    onChange={(e) => { const n = [...store.navItems]; n[index] = { ...n[index], path: e.target.value }; store.updateNavItems(n); }}
                    className={INPUT_CLS}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Home ── */}
        {activeTab === "home" && (
          <div className="max-w-[700px] space-y-5">
            <h2 className="text-[18px] md:text-[20px] tracking-[-0.01em]">Home Page Content</h2>
            {[
              { label: "Hero Title", field: "homeHeroTitle", rows: 3 },
              { label: "Hero Subtitle", field: "homeHeroSubtitle", rows: 2 },
              { label: "Credibility Text", field: "credibilityText", rows: 1 },
              { label: "About Section Title", field: "homeAboutTitle", rows: 1 },
              { label: "About Paragraph 1", field: "homeAboutText1", rows: 2 },
              { label: "About Paragraph 2", field: "homeAboutText2", rows: 2 },
            ].map(({ label, field, rows }) => (
              <div key={field}>
                <label className="block mb-1.5 text-[12px] tracking-[0.05em]">{label}</label>
                <textarea value={store[field as keyof typeof store] as string}
                  onChange={(e) => store.updateHomeContent(field, e.target.value)}
                  rows={rows} className={TEXTAREA_CLS}
                />
              </div>
            ))}
          </div>
        )}

        {/* ── Home Images ── */}
        {activeTab === "home-images" && (
          <div className="max-w-[700px] space-y-5">
            <h2 className="text-[18px] md:text-[20px] tracking-[-0.01em]">Home Page Images</h2>
            {[
              { label: "Hero Image", field: "hero" },
              { label: "About Section Image", field: "aboutSection" },
              { label: "Featured Work 1", field: "featuredWork1" },
              { label: "Featured Work 2", field: "featuredWork2" },
            ].map(({ label, field }) => (
              <div key={field}>
                <label className="block mb-1.5 text-[12px] tracking-[0.05em]">{label}</label>
                <input type="url" value={store.homeImages[field as keyof typeof store.homeImages]}
                  onChange={(e) => store.updateHomeImages({ [field]: e.target.value })}
                  className={INPUT_CLS} placeholder="https://example.com/image.jpg"
                />
                {store.homeImages[field as keyof typeof store.homeImages] && (
                  <div className="mt-2 aspect-[4/3] border border-border overflow-hidden max-w-[320px]">
                    <img src={store.homeImages[field as keyof typeof store.homeImages]} alt={label} className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ── About ── */}
        {activeTab === "about" && (
          <div className="max-w-[700px] space-y-5">
            <h2 className="text-[18px] md:text-[20px] tracking-[-0.01em]">About Page Content</h2>
            {[
              { label: "Hero Title", field: "aboutHeroTitle", rows: 1 },
              { label: "Paragraph 1", field: "aboutText1", rows: 2 },
              { label: "Paragraph 2", field: "aboutText2", rows: 2 },
              { label: "Paragraph 3", field: "aboutText3", rows: 2 },
              { label: "Mission", field: "aboutMission", rows: 1 },
              { label: "Vision", field: "aboutVision", rows: 1 },
            ].map(({ label, field, rows }) => (
              <div key={field}>
                <label className="block mb-1.5 text-[12px] tracking-[0.05em]">{label}</label>
                <textarea value={store[field as keyof typeof store] as string}
                  onChange={(e) => store.updateAboutContent(field, e.target.value)}
                  rows={rows} className={TEXTAREA_CLS}
                />
              </div>
            ))}
          </div>
        )}

        {/* ── About Images ── */}
        {activeTab === "about-images" && (
          <div className="max-w-[700px] space-y-5">
            <h2 className="text-[18px] md:text-[20px] tracking-[-0.01em]">About Page Images</h2>
            <div>
              <label className="block mb-1.5 text-[12px] tracking-[0.05em]">Hero Image</label>
              <input type="url" value={store.aboutImages.hero}
                onChange={(e) => store.updateAboutImages({ hero: e.target.value })}
                className={INPUT_CLS} placeholder="https://example.com/image.jpg"
              />
              {store.aboutImages.hero && (
                <div className="mt-2 aspect-[16/9] border border-border overflow-hidden max-w-[480px]">
                  <img src={store.aboutImages.hero} alt="About hero" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── Services ── */}
        {activeTab === "services" && (
          <div className="max-w-[700px] space-y-5">
            <h2 className="text-[18px] md:text-[20px] tracking-[-0.01em]">Services Page Hero</h2>
            {[
              { label: "Hero Title", field: "servicesHeroTitle", rows: 1 },
              { label: "Hero Subtitle", field: "servicesHeroSubtitle", rows: 2 },
            ].map(({ label, field, rows }) => (
              <div key={field}>
                <label className="block mb-1.5 text-[12px] tracking-[0.05em]">{label}</label>
                <textarea value={store[field as keyof typeof store] as string}
                  onChange={(e) => store.updateServicesContent(field, e.target.value)}
                  rows={rows} className={TEXTAREA_CLS}
                />
              </div>
            ))}
          </div>
        )}

        {/* ── Packages ── */}
        {activeTab === "packages" && (
          <div className="max-w-[700px] space-y-5">
            <h2 className="text-[18px] md:text-[20px] tracking-[-0.01em]">Packages Page Hero</h2>
            {[
              { label: "Hero Title", field: "packagesHeroTitle", rows: 1 },
              { label: "Hero Subtitle", field: "packagesHeroSubtitle", rows: 2 },
            ].map(({ label, field, rows }) => (
              <div key={field}>
                <label className="block mb-1.5 text-[12px] tracking-[0.05em]">{label}</label>
                <textarea value={store[field as keyof typeof store] as string}
                  onChange={(e) => store.updatePackagesContent(field, e.target.value)}
                  rows={rows} className={TEXTAREA_CLS}
                />
              </div>
            ))}
          </div>
        )}

        {/* ── Portfolio ── */}
        {activeTab === "portfolio" && (
          <div className="max-w-[700px] space-y-5">
            <h2 className="text-[18px] md:text-[20px] tracking-[-0.01em]">Portfolio Page Hero</h2>
            {[
              { label: "Hero Title", field: "portfolioHeroTitle", rows: 1 },
              { label: "Hero Subtitle", field: "portfolioHeroSubtitle", rows: 2 },
            ].map(({ label, field, rows }) => (
              <div key={field}>
                <label className="block mb-1.5 text-[12px] tracking-[0.05em]">{label}</label>
                <textarea value={store[field as keyof typeof store] as string}
                  onChange={(e) => store.updatePortfolioContent(field, e.target.value)}
                  rows={rows} className={TEXTAREA_CLS}
                />
              </div>
            ))}
          </div>
        )}

        {/* ── Process ── */}
        {activeTab === "process" && (
          <div className="max-w-[700px] space-y-5">
            <h2 className="text-[18px] md:text-[20px] tracking-[-0.01em]">Process Page Hero</h2>
            {[
              { label: "Hero Title", field: "processHeroTitle", rows: 1 },
              { label: "Hero Subtitle", field: "processHeroSubtitle", rows: 2 },
            ].map(({ label, field, rows }) => (
              <div key={field}>
                <label className="block mb-1.5 text-[12px] tracking-[0.05em]">{label}</label>
                <textarea value={store[field as keyof typeof store] as string}
                  onChange={(e) => store.updateProcessContent(field, e.target.value)}
                  rows={rows} className={TEXTAREA_CLS}
                />
              </div>
            ))}
          </div>
        )}

        {/* ── Personal Branding ── */}
        {activeTab === "personal-branding" && (
          <div className="max-w-[700px] space-y-5">
            <h2 className="text-[18px] md:text-[20px] tracking-[-0.01em]">Personal Branding Page Hero</h2>
            {[
              { label: "Hero Title", field: "personalBrandingHeroTitle", rows: 1 },
              { label: "Hero Subtitle", field: "personalBrandingHeroSubtitle", rows: 2 },
            ].map(({ label, field, rows }) => (
              <div key={field}>
                <label className="block mb-1.5 text-[12px] tracking-[0.05em]">{label}</label>
                <textarea value={store[field as keyof typeof store] as string}
                  onChange={(e) => store.updatePersonalBrandingContent(field, e.target.value)}
                  rows={rows} className={TEXTAREA_CLS}
                />
              </div>
            ))}
          </div>
        )}

        {/* ── Contact ── */}
        {activeTab === "contact" && (
          <div className="max-w-[700px] space-y-5">
            <h2 className="text-[18px] md:text-[20px] tracking-[-0.01em]">Contact Page Content</h2>
            {[
              { label: "Hero Title", field: "contactHeroTitle", rows: 2 },
              { label: "Subtitle", field: "contactSubtitle", rows: 2 },
            ].map(({ label, field, rows }) => (
              <div key={field}>
                <label className="block mb-1.5 text-[12px] tracking-[0.05em]">{label}</label>
                <textarea value={store[field as keyof typeof store] as string}
                  onChange={(e) => store.updateContactContent(field, e.target.value)}
                  rows={rows} className={TEXTAREA_CLS}
                />
              </div>
            ))}
          </div>
        )}

        {/* ── Footer ── */}
        {activeTab === "footer" && (
          <div className="max-w-[700px] space-y-6">
            <div>
              <h2 className="text-[18px] md:text-[20px] tracking-[-0.01em] mb-4">Footer Links</h2>
              {store.footerLinks.map((link, index) => (
                <div key={index} className="p-4 border border-border bg-card mb-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-1.5 text-[12px] tracking-[0.05em]">Link Text</label>
                    <input type="text" value={link.name}
                      onChange={(e) => { const n = [...store.footerLinks]; n[index] = { ...n[index], name: e.target.value }; store.updateFooterLinks(n); }}
                      className={INPUT_CLS}
                    />
                  </div>
                  <div>
                    <label className="block mb-1.5 text-[12px] tracking-[0.05em]">Path</label>
                    <input type="text" value={link.path}
                      onChange={(e) => { const n = [...store.footerLinks]; n[index] = { ...n[index], path: e.target.value }; store.updateFooterLinks(n); }}
                      className={INPUT_CLS}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div>
              <label className="block mb-1.5 text-[12px] tracking-[0.05em]">Footer Text</label>
              <input type="text" value={store.footerText}
                onChange={(e) => store.updateFooterText(e.target.value)}
                className={INPUT_CLS}
              />
            </div>
          </div>
        )}

        {/* ── Media ── */}
        {activeTab === "media" && (
          <div className="space-y-8">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <h2 className="text-[18px] md:text-[20px] tracking-[-0.01em]">Media Library</h2>
                <p className="mt-1 text-[12px] opacity-50">Upload images and videos to Supabase Storage. Use URLs in CMS fields.</p>
              </div>
              <button onClick={fetchMedia} className="flex items-center gap-2 px-3 py-2 border border-border text-[12px] tracking-[0.05em] hover:border-primary transition-colors">
                <RefreshCw className="w-3.5 h-3.5" /> Refresh
              </button>
            </div>

            {/* Upload card */}
            <div className="border border-border p-5 md:p-6 space-y-4 max-w-[700px]">
              <p className="text-[13px] tracking-[0.05em] opacity-60 uppercase text-[11px]">Upload New File</p>

              <div>
                <input ref={mediaFileRef} type="file"
                  accept="image/png,image/jpeg,image/jpg,image/webp,image/svg+xml,video/mp4,video/webm"
                  onChange={handleMediaFileChange} className="hidden"
                />
                <button onClick={() => mediaFileRef.current?.click()}
                  className="flex items-center gap-3 px-5 py-3 border-2 border-dashed border-border hover:border-primary transition-colors text-[13px] tracking-[0.05em] w-full justify-center"
                >
                  <Upload className="w-4 h-4 opacity-50" />
                  {mediaFile ? (
                    <span>{mediaFile.name} <span className="opacity-40">({(mediaFile.size / 1024).toFixed(0)} KB)</span></span>
                  ) : (
                    <span className="opacity-50">Click to select image or video</span>
                  )}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1.5 text-[11px] tracking-[0.1em] opacity-50 uppercase">Name / Label</label>
                  <input type="text" value={mediaName} onChange={(e) => setMediaName(e.target.value)}
                    placeholder="e.g. Hero Image Jan 2025"
                    className={INPUT_CLS}
                  />
                </div>
                <div>
                  <label className="block mb-1.5 text-[11px] tracking-[0.1em] opacity-50 uppercase">Purpose</label>
                  <select value={mediaPurpose} onChange={(e) => setMediaPurpose(e.target.value)}
                    className={`${INPUT_CLS} appearance-none`}
                  >
                    <option value="general">General</option>
                    <option value="hero">Hero</option>
                    <option value="portfolio">Portfolio</option>
                    <option value="about">About</option>
                    <option value="team">Team</option>
                  </select>
                </div>
              </div>

              {uploadError && <p className="text-[12px] text-red-500">{uploadError}</p>}

              <button onClick={handleUpload} disabled={uploading || !mediaFile}
                className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground text-[12px] tracking-[0.08em] uppercase hover:opacity-90 transition-opacity disabled:opacity-40"
              >
                {uploading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                {uploading ? "Uploading…" : "Upload to Supabase"}
              </button>
            </div>

            {/* Media grid */}
            {mediaLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="aspect-square border border-border bg-secondary/30 animate-pulse" />
                ))}
              </div>
            ) : mediaItems.length === 0 ? (
              <div className="py-12 text-center border border-border">
                <p className="opacity-40 text-[13px]">No media uploaded yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {mediaItems.map((item) => (
                  <div key={item.id} className="group relative border border-border overflow-hidden bg-secondary/20">
                    {/* Preview */}
                    <div className="aspect-square relative overflow-hidden bg-secondary/40">
                      {item.type === "image" ? (
                        <img src={item.url} alt={item.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                          <Video className="w-8 h-8 opacity-30" />
                          <span className="text-[10px] opacity-40 tracking-[0.08em]">VIDEO</span>
                        </div>
                      )}
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <a href={item.url} target="_blank" rel="noreferrer"
                          className="p-2 bg-white/20 hover:bg-white/30 transition-colors"
                          title="Open in new tab"
                        >
                          <Eye className="w-4 h-4 text-white" />
                        </a>
                        <button onClick={() => handleCopyUrl(item.id, item.url)}
                          className="p-2 bg-white/20 hover:bg-white/30 transition-colors"
                          title="Copy URL"
                        >
                          {copiedId === item.id
                            ? <Check className="w-4 h-4 text-green-400" />
                            : <Copy className="w-4 h-4 text-white" />
                          }
                        </button>
                        <button onClick={() => handleMediaDelete(item.id, item.storage_path)}
                          className="p-2 bg-red-500/40 hover:bg-red-500/60 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-2.5">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        {item.type === "video"
                          ? <Video className="w-3 h-3 opacity-40 shrink-0" />
                          : <ImageIcon className="w-3 h-3 opacity-40 shrink-0" />
                        }
                        <p className="text-[11px] truncate opacity-70">{item.name}</p>
                      </div>
                      <p className="text-[10px] opacity-35 tracking-[0.07em]">{item.purpose}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Reviews ── */}
        {activeTab === "reviews" && (
          <div className="space-y-5">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <h2 className="text-[18px] md:text-[20px] tracking-[-0.01em]">
                  Reviews
                  {pendingReviewCount > 0 && (
                    <span className="ml-3 text-[12px] px-2 py-0.5 bg-yellow-500/15 text-yellow-700 border border-yellow-200">
                      {pendingReviewCount} pending
                    </span>
                  )}
                </h2>
                <p className="mt-1 text-[12px] opacity-50">Approve, reject, or feature client reviews.</p>
              </div>
              <button onClick={fetchReviews} className="flex items-center gap-2 px-3 py-2 border border-border text-[12px] tracking-[0.05em] hover:border-primary transition-colors">
                <RefreshCw className="w-3.5 h-3.5" /> Refresh
              </button>
            </div>

            {/* Filter bar */}
            <div className="flex items-center gap-2 flex-wrap">
              {(["all", "pending", "approved", "rejected"] as const).map((f) => (
                <button key={f} onClick={() => setReviewFilter(f)}
                  className={`px-3 py-1.5 text-[11px] tracking-[0.08em] border transition-colors capitalize ${
                    reviewFilter === f ? "border-primary text-primary bg-primary/5" : "border-border text-primary/50 hover:text-primary"
                  }`}
                >
                  {f === "all"
                    ? `All (${reviews.length})`
                    : `${f} (${reviews.filter(r => r.status === f).length})`
                  }
                </button>
              ))}
            </div>

            {reviewsLoading ? (
              <div className="py-12 text-center opacity-40 text-[13px]">Loading reviews…</div>
            ) : filteredReviews.length === 0 ? (
              <div className="py-12 text-center border border-border">
                <p className="opacity-40 text-[13px]">No reviews in this category.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredReviews.map((review) => (
                  <div key={review.id} className="border border-border bg-card p-4 md:p-5">
                    <div className="flex items-start gap-4 flex-wrap">
                      {/* Left: content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1 flex-wrap">
                          <p className="text-[14px]">{review.name}</p>
                          {(review.role || review.company) && (
                            <p className="text-[11px] opacity-40">
                              {[review.role, review.company].filter(Boolean).join(" · ")}
                            </p>
                          )}
                          <StarRow rating={review.rating} />
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

                      {/* Right: actions */}
                      <div className="flex flex-col gap-2 shrink-0">
                        {/* Status badge */}
                        <span className={`inline-flex items-center px-2 py-0.5 text-[10px] tracking-[0.1em] border ${REVIEW_STATUS_COLORS[review.status]}`}>
                          {REVIEW_STATUS_LABELS[review.status]}
                        </span>

                        {/* Action buttons */}
                        <div className="flex gap-1.5 flex-wrap">
                          {review.status !== "approved" && (
                            <button onClick={() => handleReviewStatus(review.id, "approved")}
                              className="flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] tracking-[0.07em] border border-green-300 text-green-700 hover:bg-green-50 transition-colors"
                            >
                              <Check className="w-3 h-3" /> Approve
                            </button>
                          )}
                          {review.status !== "rejected" && (
                            <button onClick={() => handleReviewStatus(review.id, "rejected")}
                              className="flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] tracking-[0.07em] border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
                            >
                              <X className="w-3 h-3" /> Reject
                            </button>
                          )}
                          {review.status === "pending" && (
                            <button onClick={() => handleReviewStatus(review.id, "pending")}
                              className="px-2.5 py-1.5 text-[11px] tracking-[0.07em] border border-border opacity-50 hover:opacity-100 transition-opacity"
                            >
                              Keep Pending
                            </button>
                          )}
                        </div>

                        {/* Feature toggle */}
                        {review.status === "approved" && (
                          <button
                            onClick={() => handleReviewFeatured(review.id, !review.featured)}
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

                        {/* Delete */}
                        <button onClick={() => handleReviewDelete(review.id)}
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
        )}

        {/* ── Submissions ── */}
        {activeTab === "submissions" && (
          <div className="space-y-5">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <h2 className="text-[18px] md:text-[20px] tracking-[-0.01em]">
                Contact Submissions
                {newCount > 0 && (
                  <span className="ml-3 text-[12px] px-2 py-0.5 bg-blue-500/15 text-blue-600 border border-blue-200">
                    {newCount} new
                  </span>
                )}
              </h2>
              <button onClick={fetchSubmissions} className="flex items-center gap-2 px-3 py-2 border border-border text-[12px] tracking-[0.05em] hover:border-primary transition-colors">
                <RefreshCw className="w-3.5 h-3.5" /> Refresh
              </button>
            </div>

            {submissionsLoading ? (
              <div className="py-12 text-center opacity-40 text-[13px]">Loading submissions…</div>
            ) : submissions.length === 0 ? (
              <div className="py-12 text-center border border-border">
                <p className="opacity-40 text-[13px]">No submissions yet.</p>
                <p className="mt-1 opacity-25 text-[12px]">They'll appear here when someone fills out the contact form.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {submissions.map((sub) => {
                  const isExpanded = expandedId === sub.id;
                  return (
                    <div key={sub.id} className="border border-border bg-card">
                      {/* Row header */}
                      <button
                        onClick={() => setExpandedId(isExpanded ? null : sub.id)}
                        className="w-full text-left px-4 py-4 grid grid-cols-1 sm:grid-cols-[1fr_1fr_auto_auto] gap-3 sm:gap-4 items-center hover:bg-secondary/30 transition-colors"
                      >
                        <div>
                          <p className="text-[14px] font-normal">{sub.name}</p>
                          <p className="text-[12px] opacity-50">{sub.email}</p>
                        </div>
                        <div>
                          <p className="text-[13px] opacity-70">{sub.business_name}</p>
                          <p className="text-[11px] opacity-40 capitalize">{sub.industry.replace(/-/g, " ")}</p>
                        </div>
                        <span className={`inline-flex items-center px-2 py-0.5 text-[10px] tracking-[0.1em] border ${STATUS_COLORS[sub.status]}`}>
                          {STATUS_LABELS[sub.status]}
                        </span>
                        <div className="flex items-center gap-2 text-[11px] opacity-40">
                          <span>{new Date(sub.created_at).toLocaleDateString()}</span>
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </div>
                      </button>

                      {/* Expanded details */}
                      {isExpanded && (
                        <div className="border-t border-border px-4 pb-5 pt-4 space-y-4">
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                              { label: "Service Needed", value: sub.service_needed.replace(/-/g, " ") },
                              { label: "Budget", value: sub.budget_range?.replace(/-/g, " ") ?? "Not specified" },
                              { label: "Phone", value: sub.phone ?? "Not provided" },
                              { label: "Submitted", value: new Date(sub.created_at).toLocaleString() },
                            ].map(({ label, value }) => (
                              <div key={label}>
                                <p className="text-[10px] tracking-[0.12em] opacity-40 mb-1">{label.toUpperCase()}</p>
                                <p className="text-[13px] opacity-70 capitalize">{value}</p>
                              </div>
                            ))}
                          </div>

                          {/* Reply shortcut */}
                          <div>
                            <a
                              href={`mailto:${sub.email}?subject=Re: Your consultation request — S.Socials&body=Dear ${sub.name},%0A%0AThank you for reaching out to S.Socials.%0A%0A`}
                              className="inline-flex items-center gap-2 px-4 py-2 border border-border text-[12px] tracking-[0.05em] hover:border-primary transition-colors"
                            >
                              Reply via email
                            </a>
                          </div>

                          {/* Status change */}
                          <div className="flex items-center gap-3 flex-wrap">
                            <span className="text-[11px] tracking-[0.08em] opacity-50">STATUS:</span>
                            {(["new", "read", "replied"] as SubmissionStatus[]).map((s) => (
                              <button key={s} onClick={() => handleStatusChange(sub.id, s)}
                                className={`px-3 py-1.5 text-[11px] tracking-[0.08em] border transition-colors ${
                                  sub.status === s ? STATUS_COLORS[s] : "border-border opacity-50 hover:opacity-100"
                                }`}
                              >
                                {STATUS_LABELS[s]}
                              </button>
                            ))}
                          </div>

                          {/* Notes */}
                          <div>
                            <label className="block mb-1.5 text-[11px] tracking-[0.08em] opacity-50">INTERNAL NOTES</label>
                            <textarea
                              value={noteDrafts[sub.id] ?? ""}
                              onChange={(e) => setNoteDrafts((prev) => ({ ...prev, [sub.id]: e.target.value }))}
                              rows={2}
                              placeholder="Add internal notes…"
                              className={TEXTAREA_CLS}
                            />
                            <button onClick={() => handleNoteSave(sub.id)}
                              className="mt-2 px-4 py-1.5 text-[11px] tracking-[0.08em] border border-border hover:border-primary transition-colors"
                            >
                              Save Note
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
