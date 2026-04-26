import { useState, useRef, useEffect } from "react";
import { useContentStore } from "../store/contentStore";
import { DocumentHead } from "../components/DocumentHead";
import { CONTAINER, INPUT_ADMIN as INPUT_CLS, TEXTAREA_ADMIN as TEXTAREA_CLS, LABEL_ADMIN, SECTION_HEADING, ADMIN_PANEL } from "../lib/styles";
import { Save, Upload, LogOut, RefreshCw, Trash2, Eye } from "lucide-react";
import { useNavigate } from "react-router";
import { SubmissionsTab } from "./admin/SubmissionsTab";
import { ReviewsTab } from "./admin/ReviewsTab";
import { MediaTab } from "./admin/MediaTab";
import { ImageUrlField } from "./admin/ImageUrlField";

// ─── Main component ───────────────────────────────────────────────────────────

export function AdminPage() {
  const store = useContentStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("logo");
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [saveError, setSaveError] = useState("");
  const logoFileRef = useRef<HTMLInputElement>(null);

  // Badge counts bubbled up from child tabs on load / status changes
  const [newCount, setNewCount] = useState(0);
  const [pendingReviewCount, setPendingReviewCount] = useState(0);

  useEffect(() => {
    if (!store.isAuthenticated) navigate("/login");
  }, [store.isAuthenticated, navigate]);

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
    { id: "dev-projects", label: "Dev Projects" },
    { id: "process", label: "Process" },
    { id: "personal-branding", label: "Personal Branding" },
    { id: "contact", label: "Contact" },
    { id: "footer", label: "Footer" },
    { id: "media", label: "Media" },
    { id: "reviews", label: pendingReviewCount > 0 ? `Reviews (${pendingReviewCount})` : "Reviews" },
    { id: "submissions", label: newCount > 0 ? `Submissions (${newCount})` : "Submissions" },
  ];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <DocumentHead title="Admin Panel — S.Socials" description="Edit all website content" />

      {/* ── Admin Header ── */}
      <div className="border-b border-destructive bg-destructive/10 sticky top-0 z-50">
        <div className={`${CONTAINER} py-4 md:py-5`}>
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

      <div className={`${CONTAINER} py-6 md:py-8`}>
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
          <div className={ADMIN_PANEL}>
            <h2 className={SECTION_HEADING}>Logo Image Upload</h2>
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
          <div className={ADMIN_PANEL}>
            <h2 className={SECTION_HEADING}>Navigation Menu</h2>
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
          <div className={ADMIN_PANEL}>
            <h2 className={SECTION_HEADING}>Home Page Content</h2>
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
          <div className={ADMIN_PANEL}>
            <h2 className={SECTION_HEADING}>Home Page Images</h2>
            {[
              { label: "Hero Image", field: "hero" },
              { label: "About Section Image", field: "aboutSection" },
              { label: "Featured Work 1", field: "featuredWork1" },
              { label: "Featured Work 2", field: "featuredWork2" },
            ].map(({ label, field }) => (
              <div key={field}>
                <label className="block mb-1.5 text-[12px] tracking-[0.05em]">{label}</label>
                <ImageUrlField
                  value={store.homeImages[field as keyof typeof store.homeImages]}
                  onChange={(url) => store.updateHomeImages({ [field]: url })}
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
          <div className={ADMIN_PANEL}>
            <h2 className={SECTION_HEADING}>About Page Content</h2>
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
          <div className={ADMIN_PANEL}>
            <h2 className={SECTION_HEADING}>About Page Images</h2>
            <div>
              <label className="block mb-1.5 text-[12px] tracking-[0.05em]">Hero Image</label>
              <ImageUrlField
                value={store.aboutImages.hero}
                onChange={(url) => store.updateAboutImages({ hero: url })}
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
          <div className={ADMIN_PANEL}>
            <h2 className={SECTION_HEADING}>Services Page Hero</h2>
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
          <div className={ADMIN_PANEL}>
            <h2 className={SECTION_HEADING}>Packages Page Hero</h2>
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
          <div className={ADMIN_PANEL}>
            <h2 className={SECTION_HEADING}>Portfolio Page Hero</h2>
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

        {/* ── Dev Projects ── */}
        {activeTab === "dev-projects" && (
          <div className="max-w-[900px] space-y-6">
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div>
                <h2 className={SECTION_HEADING}>Dev Projects</h2>
                <p className="mt-1 text-[12px] opacity-50">These appear as the "Selected Work" showcase in the Software Development &amp; IT service row. Enter the live site URL — the screenshot is generated automatically.</p>
              </div>
              <button
                onClick={() => store.updateDevProjects([...store.devProjects, { name: "", tech: "", url: "" }])}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-[12px] tracking-[0.05em] hover:opacity-90 transition-opacity"
              >
                + Add Project
              </button>
            </div>

            {store.devProjects.length === 0 && (
              <div className="py-10 border border-dashed border-border text-center">
                <p className="text-[13px] opacity-40">No projects yet. Click "Add Project" to start.</p>
              </div>
            )}

            <div className="space-y-4">
              {store.devProjects.map((project, index) => (
                <div key={index} className="border border-border p-5 space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-[11px] tracking-[0.15em] opacity-40">PROJECT {String(index + 1).padStart(2, "0")}</span>
                    <button
                      onClick={() => store.updateDevProjects(store.devProjects.filter((_, i) => i !== index))}
                      className="flex items-center gap-1.5 text-[11px] text-destructive hover:opacity-70 transition-opacity"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Remove
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={LABEL_ADMIN}>Project Name</label>
                      <input
                        type="text"
                        value={project.name}
                        placeholder="e.g. S.Socials Agency Site"
                        onChange={(e) => {
                          const updated = [...store.devProjects];
                          updated[index] = { ...updated[index], name: e.target.value };
                          store.updateDevProjects(updated);
                        }}
                        className={INPUT_CLS}
                      />
                    </div>
                    <div>
                      <label className={LABEL_ADMIN}>Tech Stack</label>
                      <input
                        type="text"
                        value={project.tech}
                        placeholder="e.g. React · TypeScript · Supabase"
                        onChange={(e) => {
                          const updated = [...store.devProjects];
                          updated[index] = { ...updated[index], tech: e.target.value };
                          store.updateDevProjects(updated);
                        }}
                        className={INPUT_CLS}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={LABEL_ADMIN}>Live Site URL</label>
                    <input
                      type="url"
                      value={project.url}
                      placeholder="https://yoursite.com"
                      onChange={(e) => {
                        const updated = [...store.devProjects];
                        updated[index] = { ...updated[index], url: e.target.value };
                        store.updateDevProjects(updated);
                      }}
                      className={INPUT_CLS}
                    />
                    <p className="mt-1.5 text-[11px] opacity-40">Auto-screenshot is generated from this URL. First load may take a few seconds.</p>
                  </div>

                  <div>
                    <label className={LABEL_ADMIN}>Custom Image <span className="normal-case opacity-60">(optional — overrides auto-screenshot)</span></label>
                    <ImageUrlField
                      value={project.image ?? ""}
                      placeholder="Leave blank to use auto-screenshot"
                      onChange={(url) => {
                        const updated = [...store.devProjects];
                        updated[index] = { ...updated[index], image: url || undefined };
                        store.updateDevProjects(updated);
                      }}
                    />
                    <p className="mt-1.5 text-[11px] opacity-40">Browse the Media Library or paste a URL directly.</p>
                  </div>

                  {project.url && project.url.startsWith("http") && (
                    <div className="border border-border overflow-hidden">
                      <p className="px-3 py-2 text-[10px] tracking-[0.1em] opacity-40 border-b border-border uppercase">
                        Preview {project.image ? "— custom image" : "— auto-screenshot"}
                      </p>
                      <img
                        src={project.image || `https://s.wordpress.com/mshots/v1/${encodeURIComponent(project.url)}?w=1280&h=800`}
                        alt={project.name || "Site preview"}
                        className="w-full h-[180px] object-cover object-top bg-secondary/20"
                      />
                      <div className="px-3 py-2 flex items-center justify-between border-t border-border">
                        <span className="text-[11px] opacity-40 truncate">{project.url}</span>
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-[11px] tracking-[0.05em] opacity-50 hover:opacity-100 transition-opacity flex-shrink-0 ml-3"
                        >
                          <Eye className="w-3.5 h-3.5" /> Open
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Process ── */}
        {activeTab === "process" && (
          <div className={ADMIN_PANEL}>
            <h2 className={SECTION_HEADING}>Process Page Hero</h2>
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
          <div className={ADMIN_PANEL}>
            <h2 className={SECTION_HEADING}>Personal Branding Page Hero</h2>
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
          <div className={ADMIN_PANEL}>
            <h2 className={SECTION_HEADING}>Contact Page Content</h2>
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
          <div className={ADMIN_PANEL}>
            <div>
              <h2 className={`${SECTION_HEADING} mb-4`}>Footer Links</h2>
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

        {/* ── Media (extracted component) ── */}
        {activeTab === "media" && <MediaTab />}

        {/* ── Reviews (extracted component) ── */}
        {activeTab === "reviews" && <ReviewsTab onCountChange={setPendingReviewCount} />}

        {/* ── Submissions (extracted component) ── */}
        {activeTab === "submissions" && <SubmissionsTab onCountChange={setNewCount} />}
      </div>
    </div>
  );
}
