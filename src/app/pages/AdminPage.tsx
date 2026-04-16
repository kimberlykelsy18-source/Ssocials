import { useState, useRef } from "react";
import { useContentStore } from "../store/contentStore";
import { DocumentHead } from "../components/DocumentHead";
import { Save, Upload, X, Plus, Trash2, LogOut } from "lucide-react";
import { useNavigate } from "react-router";
import { useEffect } from "react";

export function AdminPage() {
  const store = useContentStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("logo");
  const [saved, setSaved] = useState(false);
  const logoFileRef = useRef<HTMLInputElement>(null);

  // Check authentication
  useEffect(() => {
    if (!store.isAuthenticated) {
      navigate("/login");
    }
  }, [store.isAuthenticated, navigate]);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleLogout = () => {
    store.logout();
    navigate("/login");
  };

  const handleLogoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const url = event.target?.result as string;
        store.setLogoUrl(url);
      };
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
    { id: "process", label: "Process" },
    { id: "personal-branding", label: "Personal Branding" },
    { id: "contact", label: "Contact" },
    { id: "footer", label: "Footer" },
  ];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <DocumentHead title="Admin Panel — S.Socials" description="Edit all website content" />
      
      {/* Admin Header - Fixed Banner */}
      <div className="border-b border-destructive bg-destructive/10 sticky top-0 z-50">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 py-12 md:py-14">
          <div className="flex items-center justify-between gap-8">
            <div>
              <h1 className="text-[18px] md:text-[20px] lg:text-[24px] tracking-[-0.01em] text-destructive">
                Admin Panel
              </h1>
              <p className="mt-4 text-[10px] md:text-[11px] lg:text-[12px] opacity-60">
                Edit all content • Changes save instantly
              </p>
            </div>
            <button
              onClick={handleSave}
              className="flex items-center gap-6 md:gap-8 px-12 md:px-16 lg:px-20 py-8 md:py-10 bg-destructive text-white text-[11px] md:text-[12px] lg:text-[13px] tracking-[0.05em] transition-opacity duration-200 hover:opacity-90"
            >
              <Save className="w-12 h-12 md:w-14 md:h-14" />
              {saved ? "Saved!" : "Save"}
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-6 md:gap-8 px-12 md:px-16 lg:px-20 py-8 md:py-10 bg-destructive text-white text-[11px] md:text-[12px] lg:text-[13px] tracking-[0.05em] transition-opacity duration-200 hover:opacity-90"
            >
              <LogOut className="w-12 h-12 md:w-14 md:h-14" />
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 py-16 md:py-20 lg:py-24">
        {/* Tabs - Scrollable */}
        <div className="flex gap-6 md:gap-8 mb-20 md:mb-24 border-b border-border pb-8 md:pb-12 overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-10 md:px-12 py-6 md:py-8 text-[11px] md:text-[12px] lg:text-[13px] tracking-[0.05em] whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? "text-destructive border-b-2 border-destructive -mb-[1px]"
                  : "text-primary/60 hover:text-primary"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Logo Settings */}
        {activeTab === "logo" && (
          <div className="max-w-[700px] space-y-20">
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
                className="flex items-center gap-8 px-20 py-12 border-2 border-border hover:border-primary transition-colors text-[13px] tracking-[0.05em]"
              >
                <Upload className="w-16 h-16" />
                Upload Logo (PNG, JPG, SVG)
              </button>
              <p className="mt-8 text-[11px] opacity-50">Recommended: 200px height, transparent background</p>
            </div>

            {store.logoUrl && (
              <div className="p-20 border border-border bg-secondary/20">
                <p className="text-[12px] opacity-60 mb-12">Preview:</p>
                <img src={store.logoUrl} alt="Logo preview" className="h-40 w-auto object-contain" />
                <button
                  onClick={() => store.setLogoUrl('')}
                  className="mt-12 text-[12px] text-destructive hover:underline"
                >
                  Remove Logo
                </button>
              </div>
            )}
          </div>
        )}

        {/* Navigation */}
        {activeTab === "navbar" && (
          <div className="max-w-[700px] space-y-20">
            <h2 className="text-[18px] md:text-[20px] tracking-[-0.01em]">Navigation Menu</h2>
            
            {store.navItems.map((item, index) => (
              <div key={index} className="p-16 border border-border bg-card grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <label className="block mb-6 text-[12px] tracking-[0.05em]">Link Text</label>
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => {
                      const newItems = [...store.navItems];
                      newItems[index].name = e.target.value;
                      store.updateNavItems(newItems);
                    }}
                    className="w-full px-12 py-8 border border-border bg-input-background text-[14px] focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block mb-6 text-[12px] tracking-[0.05em]">Path</label>
                  <input
                    type="text"
                    value={item.path}
                    onChange={(e) => {
                      const newItems = [...store.navItems];
                      newItems[index].path = e.target.value;
                      store.updateNavItems(newItems);
                    }}
                    className="w-full px-12 py-8 border border-border bg-input-background text-[14px] focus:outline-none focus:border-primary"
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Home Page Content */}
        {activeTab === "home" && (
          <div className="max-w-[700px] space-y-20">
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
                <label className="block mb-6 text-[12px] tracking-[0.05em]">{label}</label>
                <textarea
                  value={store[field as keyof typeof store] as string}
                  onChange={(e) => store.updateHomeContent(field, e.target.value)}
                  rows={rows}
                  className="w-full px-12 py-10 border border-border bg-input-background text-[14px] focus:outline-none focus:border-primary resize-none"
                />
              </div>
            ))}
          </div>
        )}

        {/* Home Images */}
        {activeTab === "home-images" && (
          <div className="max-w-[700px] space-y-20">
            <h2 className="text-[18px] md:text-[20px] tracking-[-0.01em]">Home Page Images</h2>
            
            {[
              { label: "Hero Image", field: "hero" },
              { label: "About Section Image", field: "aboutSection" },
              { label: "Featured Work 1", field: "featuredWork1" },
              { label: "Featured Work 2", field: "featuredWork2" },
            ].map(({ label, field }) => (
              <div key={field}>
                <label className="block mb-6 text-[12px] tracking-[0.05em]">{label}</label>
                <input
                  type="url"
                  value={store.homeImages[field as keyof typeof store.homeImages]}
                  onChange={(e) => store.updateHomeImages({ [field]: e.target.value })}
                  className="w-full px-12 py-10 border border-border bg-input-background text-[14px] focus:outline-none focus:border-primary"
                  placeholder="https://example.com/image.jpg"
                />
                {store.homeImages[field as keyof typeof store.homeImages] && (
                  <div className="mt-12 aspect-[4/3] border border-border overflow-hidden">
                    <img
                      src={store.homeImages[field as keyof typeof store.homeImages]}
                      alt={label}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* About Page Content */}
        {activeTab === "about" && (
          <div className="max-w-[700px] space-y-20">
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
                <label className="block mb-6 text-[12px] tracking-[0.05em]">{label}</label>
                <textarea
                  value={store[field as keyof typeof store] as string}
                  onChange={(e) => store.updateAboutContent(field, e.target.value)}
                  rows={rows}
                  className="w-full px-12 py-10 border border-border bg-input-background text-[14px] focus:outline-none focus:border-primary resize-none"
                />
              </div>
            ))}
          </div>
        )}

        {/* About Images */}
        {activeTab === "about-images" && (
          <div className="max-w-[700px] space-y-20">
            <h2 className="text-[18px] md:text-[20px] tracking-[-0.01em]">About Page Images</h2>
            
            <div>
              <label className="block mb-6 text-[12px] tracking-[0.05em]">Hero Image</label>
              <input
                type="url"
                value={store.aboutImages.hero}
                onChange={(e) => store.updateAboutImages({ hero: e.target.value })}
                className="w-full px-12 py-10 border border-border bg-input-background text-[14px] focus:outline-none focus:border-primary"
                placeholder="https://example.com/image.jpg"
              />
              {store.aboutImages.hero && (
                <div className="mt-12 aspect-[16/9] border border-border overflow-hidden">
                  <img src={store.aboutImages.hero} alt="About hero" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          </div>
        )}

        {/* Services */}
        {activeTab === "services" && (
          <div className="max-w-[700px] space-y-20">
            <h2 className="text-[18px] md:text-[20px] tracking-[-0.01em]">Services Page Hero</h2>
            
            {[
              { label: "Hero Title", field: "servicesHeroTitle", rows: 1 },
              { label: "Hero Subtitle", field: "servicesHeroSubtitle", rows: 2 },
            ].map(({ label, field, rows }) => (
              <div key={field}>
                <label className="block mb-6 text-[12px] tracking-[0.05em]">{label}</label>
                <textarea
                  value={store[field as keyof typeof store] as string}
                  onChange={(e) => store.updateServicesContent(field, e.target.value)}
                  rows={rows}
                  className="w-full px-12 py-10 border border-border bg-input-background text-[14px] focus:outline-none focus:border-primary resize-none"
                />
              </div>
            ))}
          </div>
        )}

        {/* Packages */}
        {activeTab === "packages" && (
          <div className="max-w-[700px] space-y-20">
            <h2 className="text-[18px] md:text-[20px] tracking-[-0.01em]">Packages Page Hero</h2>
            
            {[
              { label: "Hero Title", field: "packagesHeroTitle", rows: 1 },
              { label: "Hero Subtitle", field: "packagesHeroSubtitle", rows: 2 },
            ].map(({ label, field, rows }) => (
              <div key={field}>
                <label className="block mb-6 text-[12px] tracking-[0.05em]">{label}</label>
                <textarea
                  value={store[field as keyof typeof store] as string}
                  onChange={(e) => store.updatePackagesContent(field, e.target.value)}
                  rows={rows}
                  className="w-full px-12 py-10 border border-border bg-input-background text-[14px] focus:outline-none focus:border-primary resize-none"
                />
              </div>
            ))}
          </div>
        )}

        {/* Portfolio */}
        {activeTab === "portfolio" && (
          <div className="max-w-[700px] space-y-20">
            <h2 className="text-[18px] md:text-[20px] tracking-[-0.01em]">Portfolio Page Hero</h2>
            
            {[
              { label: "Hero Title", field: "portfolioHeroTitle", rows: 1 },
              { label: "Hero Subtitle", field: "portfolioHeroSubtitle", rows: 2 },
            ].map(({ label, field, rows }) => (
              <div key={field}>
                <label className="block mb-6 text-[12px] tracking-[0.05em]">{label}</label>
                <textarea
                  value={store[field as keyof typeof store] as string}
                  onChange={(e) => store.updatePortfolioContent(field, e.target.value)}
                  rows={rows}
                  className="w-full px-12 py-10 border border-border bg-input-background text-[14px] focus:outline-none focus:border-primary resize-none"
                />
              </div>
            ))}
          </div>
        )}

        {/* Process */}
        {activeTab === "process" && (
          <div className="max-w-[700px] space-y-20">
            <h2 className="text-[18px] md:text-[20px] tracking-[-0.01em]">Process Page Hero</h2>
            
            {[
              { label: "Hero Title", field: "processHeroTitle", rows: 1 },
              { label: "Hero Subtitle", field: "processHeroSubtitle", rows: 2 },
            ].map(({ label, field, rows }) => (
              <div key={field}>
                <label className="block mb-6 text-[12px] tracking-[0.05em]">{label}</label>
                <textarea
                  value={store[field as keyof typeof store] as string}
                  onChange={(e) => store.updateProcessContent(field, e.target.value)}
                  rows={rows}
                  className="w-full px-12 py-10 border border-border bg-input-background text-[14px] focus:outline-none focus:border-primary resize-none"
                />
              </div>
            ))}
          </div>
        )}

        {/* Personal Branding */}
        {activeTab === "personal-branding" && (
          <div className="max-w-[700px] space-y-20">
            <h2 className="text-[18px] md:text-[20px] tracking-[-0.01em]">Personal Branding Page Hero</h2>
            
            {[
              { label: "Hero Title", field: "personalBrandingHeroTitle", rows: 1 },
              { label: "Hero Subtitle", field: "personalBrandingHeroSubtitle", rows: 2 },
            ].map(({ label, field, rows }) => (
              <div key={field}>
                <label className="block mb-6 text-[12px] tracking-[0.05em]">{label}</label>
                <textarea
                  value={store[field as keyof typeof store] as string}
                  onChange={(e) => store.updatePersonalBrandingContent(field, e.target.value)}
                  rows={rows}
                  className="w-full px-12 py-10 border border-border bg-input-background text-[14px] focus:outline-none focus:border-primary resize-none"
                />
              </div>
            ))}
          </div>
        )}

        {/* Contact */}
        {activeTab === "contact" && (
          <div className="max-w-[700px] space-y-20">
            <h2 className="text-[18px] md:text-[20px] tracking-[-0.01em]">Contact Page Content</h2>
            
            {[
              { label: "Hero Title", field: "contactHeroTitle", rows: 2 },
              { label: "Subtitle", field: "contactSubtitle", rows: 2 },
            ].map(({ label, field, rows }) => (
              <div key={field}>
                <label className="block mb-6 text-[12px] tracking-[0.05em]">{label}</label>
                <textarea
                  value={store[field as keyof typeof store] as string}
                  onChange={(e) => store.updateContactContent(field, e.target.value)}
                  rows={rows}
                  className="w-full px-12 py-10 border border-border bg-input-background text-[14px] focus:outline-none focus:border-primary resize-none"
                />
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        {activeTab === "footer" && (
          <div className="max-w-[700px] space-y-24">
            <div>
              <h2 className="text-[18px] md:text-[20px] tracking-[-0.01em] mb-16">Footer Links</h2>
              
              {store.footerLinks.map((link, index) => (
                <div key={index} className="p-16 border border-border bg-card mb-12 grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div>
                    <label className="block mb-6 text-[12px] tracking-[0.05em]">Link Text</label>
                    <input
                      type="text"
                      value={link.name}
                      onChange={(e) => {
                        const newLinks = [...store.footerLinks];
                        newLinks[index].name = e.target.value;
                        store.updateFooterLinks(newLinks);
                      }}
                      className="w-full px-12 py-8 border border-border bg-input-background text-[14px] focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block mb-6 text-[12px] tracking-[0.05em]">Path</label>
                    <input
                      type="text"
                      value={link.path}
                      onChange={(e) => {
                        const newLinks = [...store.footerLinks];
                        newLinks[index].path = e.target.value;
                        store.updateFooterLinks(newLinks);
                      }}
                      className="w-full px-12 py-8 border border-border bg-input-background text-[14px] focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div>
              <label className="block mb-6 text-[12px] tracking-[0.05em]">Footer Text</label>
              <input
                type="text"
                value={store.footerText}
                onChange={(e) => store.updateFooterText(e.target.value)}
                className="w-full px-12 py-10 border border-border bg-input-background text-[14px] focus:outline-none focus:border-primary"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}