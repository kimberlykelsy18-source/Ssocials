import { create } from "zustand";
import { persist } from "zustand/middleware";
import { loadSiteContent, saveSiteContent, signIn, signOut } from "@backend/db";
export type { NavItem, FooterLink, PageImage, ContentStore } from "./contentStore.types";
import type { ContentStore } from "./contentStore.types";

// Extracts only the serializable content fields (no functions, no auth state)
function getContentSnapshot(state: ContentStore): Record<string, unknown> {
  return {
    logoUrl: state.logoUrl,
    navItems: state.navItems,
    footerLinks: state.footerLinks,
    footerText: state.footerText,
    homeHeroTitle: state.homeHeroTitle,
    homeHeroSubtitle: state.homeHeroSubtitle,
    homeAboutTitle: state.homeAboutTitle,
    homeAboutText1: state.homeAboutText1,
    homeAboutText2: state.homeAboutText2,
    credibilityText: state.credibilityText,
    homeImages: state.homeImages,
    aboutHeroTitle: state.aboutHeroTitle,
    aboutText1: state.aboutText1,
    aboutText2: state.aboutText2,
    aboutText3: state.aboutText3,
    aboutMission: state.aboutMission,
    aboutVision: state.aboutVision,
    aboutImages: state.aboutImages,
    servicesHeroTitle: state.servicesHeroTitle,
    servicesHeroSubtitle: state.servicesHeroSubtitle,
    servicesIntro: state.servicesIntro,
    portfolioHeroTitle: state.portfolioHeroTitle,
    portfolioHeroSubtitle: state.portfolioHeroSubtitle,
    portfolioIntro: state.portfolioIntro,
    processHeroTitle: state.processHeroTitle,
    processHeroSubtitle: state.processHeroSubtitle,
    processIntro: state.processIntro,
    personalBrandingHeroTitle: state.personalBrandingHeroTitle,
    personalBrandingHeroSubtitle: state.personalBrandingHeroSubtitle,
    personalBrandingIntro: state.personalBrandingIntro,
    packagesHeroTitle: state.packagesHeroTitle,
    packagesHeroSubtitle: state.packagesHeroSubtitle,
    packagesIntro: state.packagesIntro,
    services: state.services,
    contactHeroTitle: state.contactHeroTitle,
    contactSubtitle: state.contactSubtitle,
    processSteps: state.processSteps,
    caseStudies: state.caseStudies,
    devProjects: state.devProjects,
    packages: state.packages,
    personalBrandingOfferings: state.personalBrandingOfferings,
    personalBrandingAudiences: state.personalBrandingAudiences,
  };
}

export const useContentStore = create<ContentStore>()(
  persist(
    (set, get) => ({
      // ── Auth ──────────────────────────────────────────────
      isAuthenticated: false,
      isSyncing: false,

      loginWithEmail: async (email, password) => {
        const result = await signIn(email, password);
        if (result.ok) {
          set({ isAuthenticated: true });
        }
        return result;
      },

      logout: async () => {
        await signOut();
        set({ isAuthenticated: false });
      },

      // ── Supabase Sync ─────────────────────────────────────
      loadFromSupabase: async () => {
        set({ isSyncing: true });
        const content = await loadSiteContent();
        if (content && Object.keys(content).length > 0) {
          set(content as Partial<ContentStore>);
        }
        set({ isSyncing: false });
      },

      saveToSupabase: async () => {
        set({ isSyncing: true });
        const snapshot = getContentSnapshot(get());
        const result = await saveSiteContent(snapshot);
        set({ isSyncing: false });
        return result;
      },

      // ── Logo ──────────────────────────────────────────────
      logoUrl: "",
      setLogoUrl: (url) => set({ logoUrl: url }),

      // ── Navigation ────────────────────────────────────────
      navItems: [
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
        { name: "Services", path: "/services" },
        { name: "Packages", path: "/packages" },
        { name: "Portfolio", path: "/portfolio" },
        { name: "Personal Branding", path: "/personal-branding" },
        { name: "Process", path: "/process" },
        { name: "Reviews", path: "/reviews" },
        { name: "Contact", path: "/contact" },
      ],
      updateNavItems: (items) => set({ navItems: items }),

      // ── Footer ────────────────────────────────────────────
      footerLinks: [
        { name: "About", path: "/about" },
        { name: "Services", path: "/services" },
        { name: "Packages", path: "/packages" },
        { name: "Portfolio", path: "/portfolio" },
        { name: "Personal Branding", path: "/personal-branding" },
        { name: "Process", path: "/process" },
        { name: "Contact", path: "/contact" },
      ],
      footerText: "© 2026 S.Socials. All rights reserved.",
      updateFooterLinks: (links) => set({ footerLinks: links }),
      updateFooterText: (text) => set({ footerText: text }),

      // ── Home ──────────────────────────────────────────────
      homeHeroTitle:
        "At S.Socials, we envision a world where health, beauty, and wellness brands and the institutions behind them don't just exist, they lead, influence, and transform lives.",
      homeHeroSubtitle:
        "We build high-converting, premium brand experiences for clinics, wellness brands, and private healthcare providers through strategic marketing, refined visual storytelling, and digital systems.",
      homeAboutTitle: "About S.Socials",
      homeAboutText1:
        "S.Socials is a marketing and branding agency focused on building and scaling brands in the health, beauty, wellness, and private healthcare space.",
      homeAboutText2:
        "We combine strategy, branding, marketing, and digital systems to create brands that are not only seen but trusted, chosen, and remembered.",
      credibilityText:
        "Trusted by growing health, beauty, wellness, and private healthcare brands.",
      homeImages: {
        hero: "https://images.unsplash.com/photo-1760647422523-f532034a49ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzcGElMjB0cmVhdG1lbnQlMjB3ZWxsbmVzc3xlbnwxfHx8fDE3NzU3MTY5MDd8MA&ixlib=rb-4.1.0&q=80&w=1080",
        aboutSection:
          "https://images.unsplash.com/photo-1762625570087-6d98fca29531?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhZXN0aGV0aWMlMjBjbGluaWMlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NzU3NTE5NDF8MA&ixlib=rb-4.1.0&q=80&w=1080",
        featuredWork1:
          "https://images.unsplash.com/photo-1774128718008-0c1b53143601?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwYnJhbmRpbmclMjBkZXNpZ258ZW58MXx8fHwxNzc1NzAyMTgxfDA&ixlib=rb-4.1.0&q=80&w=1080",
        featuredWork2:
          "https://images.unsplash.com/photo-1740138160889-29d711607d71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWxsbmVzcyUyMGJyYW5kJTIwYWVzdGhldGljfGVufDF8fHx8MTc3NTc1MDM5NXww&ixlib=rb-4.1.0&q=80&w=1080",
      },

      // ── About ─────────────────────────────────────────────
      aboutHeroTitle: "Who We Are",
      aboutText1:
        "At S.Socials, we specialize in building and scaling brands in the health, beauty, wellness, and private healthcare space through strategic marketing and premium visual storytelling.",
      aboutText2:
        "In an industry driven by trust and perception, we combine strategic marketing with refined visual storytelling to position our clients as credible, premium leaders in their space.",
      aboutText3:
        "Our focus is simple, help you attract the right audience, communicate your value with clarity, and build a brand that drives consistent growth, loyalty, and long-term success.",
      aboutMission: "To transform brands into trusted industry leaders.",
      aboutVision:
        "To create a world where brands don't just exist they influence, lead, and transform lives.",
      aboutImages: {
        hero: "https://images.unsplash.com/photo-1640909386733-e5260a325c26?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwcHJvZmVzc2lvbmFsJTIwYnJhbmRpbmd8ZW58MXx8fHwxNzc1NzUxOTQyfDA&ixlib=rb-4.1.0&q=80&w=1080",
      },

      // ── Other pages ───────────────────────────────────────
      servicesHeroTitle: "Our Services",
      servicesHeroSubtitle:
        "Tailored solutions for health, beauty, wellness, and private healthcare brands.",
      servicesIntro:
        "We offer comprehensive solutions for health, beauty, wellness, and private healthcare brands.",

      portfolioHeroTitle: "Our Work",
      portfolioHeroSubtitle:
        "See how we've helped brands transform their presence.",
      portfolioIntro: "See how we've helped brands transform their presence.",

      processHeroTitle: "Our Process",
      processHeroSubtitle:
        "A strategic, proven approach to building premium brands.",
      processIntro: "A strategic, proven approach to building premium brands.",

      personalBrandingHeroTitle: "Personal Branding",
      personalBrandingHeroSubtitle:
        "Position yourself as a trusted authority in your field.",
      personalBrandingIntro:
        "Position yourself as a trusted authority in your field.",

      packagesHeroTitle: "Our Packages",
      packagesHeroSubtitle:
        "Tailored solutions for every stage of your brand journey.",
      packagesIntro:
        "Tailored solutions for every stage of your brand journey.",

      // ── Services list ─────────────────────────────────────
      services: [
        {
          title: "Brand & Identity",
          description:
            "We build distinctive brand identities that reflect credibility, professionalism, and premium positioning.",
        },
        {
          title: "Marketing & Growth",
          description:
            "We develop and execute strategies that attract, convert, and retain the right audience.",
        },
        {
          title: "Creative & Content",
          description:
            "We craft visually compelling content that elevates your brand perception.",
        },
        {
          title: "Digital Presence",
          description:
            "We design websites and platforms structured to convert visitors into clients.",
        },
        {
          title: "Digital Systems & Automation",
          description:
            "We implement booking systems, CRM integrations, and automation to streamline operations and improve experience.",
        },
        {
          title: "Healthcare Branding & Patient Experience",
          description:
            "We help hospitals and healthcare providers build trust, improve perception, and enhance patient journeys.",
        },
        {
          title: "Personal Branding & Image Consultancy",
          description:
            "We position doctors and founders as trusted authorities in their space.",
        },
        {
          title: "Consulting",
          description:
            "We provide clarity, direction, and actionable strategies for growth.",
        },
      ],

      // ── Contact ───────────────────────────────────────────
      contactHeroTitle: "Let's build something that sets you apart.",
      contactSubtitle:
        "Book a consultation to discuss how we can help elevate your brand.",

      // ── Process Steps ─────────────────────────────────────
      processSteps: [
        { number: "01", title: "Strategy", description: "We define your positioning, audience, and direction.", details: "Through in-depth discovery sessions, we understand your business goals, target audience, competitive landscape, and brand aspirations. We develop a comprehensive strategy that guides all subsequent work." },
        { number: "02", title: "Build", description: "We develop your brand identity and systems.", details: "With strategy in place, we craft your visual identity, messaging framework, and brand guidelines. Every element is designed to reflect your positioning and resonate with your target audience." },
        { number: "03", title: "Execute", description: "We launch across platforms with precision.", details: "We implement your brand across all touchpoints—website, social media, marketing materials, and digital systems. Every execution is carefully crafted to maintain consistency and drive results." },
        { number: "04", title: "Scale", description: "We optimize and grow your brand sustainably.", details: "Post-launch, we monitor performance, gather insights, and continuously optimize. We help you scale strategically, ensuring your brand maintains its premium positioning as you grow." },
      ],

      // ── Dev Projects ──────────────────────────────────────
      devProjects: [
        { name: "KasaPay", tech: "CBK-licensed PSP — full payment gateway built from the ground up, supporting cards, mobile money, bank transfers & multi-currency payouts", url: "https://www.kasapay.com" },
        { name: "KasaPay — Mobile App", tech: "Android application · Mobile payment management for the KasaPay platform", url: "https://play.google.com/store/apps/details?id=com.biz.kasapay&hl=en&pli=1" },
        { name: "RemitCore", tech: "Cross-border remittance platform built from the ground up — single API integration for international transfers, bill payments & multi-corridor settlement", url: "https://www.remitcore.co" },
        { name: "RemitCore — Complaints Portal", tech: "Internal customer support portal — complaint intake, tracking & resolution system for RemitCore users", url: "https://complaints.remitcore.co/login" },
        { name: "Magena Pilates", tech: "E-commerce & booking platform for a premium pilates equipment manufacturer", url: "https://www.magenapilates.com" },
        { name: "Magena Pilates — Admin", tech: "Custom admin dashboard · Content, inventory & order management", url: "https://www.magenapilates.com/admin" },
        { name: "Premier Beauty Clinic", tech: "Full website & booking platform for a beauty & cosmetic clinic", url: "https://premierbeautyclinic.vercel.app" },
        { name: "Premier Beauty Clinic — Staff Portal", tech: "Internal staff management & admin dashboard", url: "https://premierbeautyclinic.vercel.app/staff/login" },
        { name: "S.Socials", tech: "Agency portfolio & CMS · React, TypeScript, Supabase", url: "https://ssocials.co" },
      ],

      // ── Case Studies ──────────────────────────────────────
      caseStudies: [
        { title: "Aesthetic Clinic", problem: "Weak branding and low perceived value", solution: "Full rebrand + marketing strategy", result: "Increased bookings and higher-value clients", image: "https://images.unsplash.com/photo-1759262151080-e05ba1c6294f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBhZXN0aGV0aWMlMjBjbGluaWMlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NzU3NTAzNjd8MA&ixlib=rb-4.1.0&q=80&w=1080" },
        { title: "Private Hospital", problem: "Outdated perception and poor digital experience", solution: "Website redesign + system integration", result: "Improved trust and patient experience", image: "https://images.unsplash.com/photo-1670665352618-49ae2ae914ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3NwaXRhbCUyMGludGVyaW9yJTIwZGVzaWdufGVufDF8fHx8MTc3NTcxMTE4NXww&ixlib=rb-4.1.0&q=80&w=1080" },
        { title: "Beauty Brand", problem: "No clear identity in a saturated market", solution: "Branding + launch strategy", result: "Strong recognition and engagement", image: "https://images.unsplash.com/photo-1760614034530-a0d34463e03d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBiZWF1dHklMjBza2luY2FyZSUyMHByb2R1Y3RzfGVufDF8fHx8MTc3NTc1MDM2OHww&ixlib=rb-4.1.0&q=80&w=1080" },
        { title: "Wellness Brand", problem: "Low conversions", solution: "Website + funnel optimization", result: "Increased bookings and engagement", image: "https://images.unsplash.com/photo-1773924093206-9a433a14bb44?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWxsbmVzcyUyMHNwYSUyMGludGVyaW9yfGVufDF8fHx8MTc3NTc0NzMwN3ww&ixlib=rb-4.1.0&q=80&w=1080" },
      ],

      // ── Packages ──────────────────────────────────────────
      packages: [
        { name: "The Foundation", subtitle: "For new or rebranding businesses", includes: ["Brand strategy", "Logo design", "Brand guidelines"], result: "A strong, professional brand foundation.", tier: 1 },
        { name: "The Growth", subtitle: "For scaling brands", includes: ["Content creation", "Social media management", "Marketing strategy"], result: "Consistent visibility and client acquisition.", tier: 2 },
        { name: "The Authority", subtitle: "For brands ready to dominate", includes: ["Full brand management", "Marketing execution", "Digital systems integration"], result: "Market leadership and premium positioning.", tier: 3, featured: true },
        { name: "The Healthcare Elevation", subtitle: "For private hospitals and healthcare providers", includes: ["Brand audit & repositioning", "Website redesign", "Booking systems & CRM", "Patient journey optimization"], result: "Improved patient trust, efficiency, and overall experience.", tier: 3 },
        { name: "The Authority Presence", subtitle: "For doctors and founders", includes: ["Personal brand strategy", "Image consultancy", "Content direction", "Profile optimization"], result: "Authority, trust, and premium personal positioning.", tier: 2 },
      ],

      // ── Personal Branding data ─────────────────────────────
      personalBrandingOfferings: [
        { number: "01", title: "Personal Brand Strategy", desc: "Define your unique positioning, voice, and value proposition in your industry." },
        { number: "02", title: "Image Consultancy", desc: "Refine how you present yourself online and offline to align with your brand goals." },
        { number: "03", title: "Content Strategy", desc: "Develop content that positions you as a thought leader and builds credibility." },
        { number: "04", title: "Profile Optimization", desc: "Audit and enhance your digital presence across platforms for impact and trust." },
      ],
      personalBrandingAudiences: [
        { title: "Doctors", statement: "Your expertise is your brand. We make sure the world sees it.", desc: "Build trust and authority beyond your clinic walls." },
        { title: "Clinic Founders", statement: "Your story is your strongest asset.", desc: "Become the face that defines your brand's identity." },
        { title: "Wellness Leaders", statement: "Lead with presence. Grow with purpose.", desc: "Position yourself as the authority in your field." },
      ],

      // ── Update functions ──────────────────────────────────
      updateHomeContent: (field, value) => set(() => ({ [field]: value })),
      updateHomeImages: (images) =>
        set((state) => ({ homeImages: { ...state.homeImages, ...images } })),
      updateAboutContent: (field, value) => set(() => ({ [field]: value })),
      updateAboutImages: (images) =>
        set((state) => ({ aboutImages: { ...state.aboutImages, ...images } })),
      updateServicesContent: (field, value) => set(() => ({ [field]: value })),
      updatePortfolioContent: (field, value) => set(() => ({ [field]: value })),
      updateProcessContent: (field, value) => set(() => ({ [field]: value })),
      updatePersonalBrandingContent: (field, value) =>
        set(() => ({ [field]: value })),
      updatePackagesContent: (field, value) => set(() => ({ [field]: value })),
      updateContactContent: (field, value) => set(() => ({ [field]: value })),
      updateServices: (services) => set({ services }),
      updateProcessSteps: (processSteps) => set({ processSteps }),
      updateCaseStudies: (caseStudies) => set({ caseStudies }),
      updateDevProjects: (devProjects) => set({ devProjects }),
      updatePackages: (packages) => set({ packages }),
      updatePersonalBrandingOfferings: (personalBrandingOfferings) => set({ personalBrandingOfferings }),
      updatePersonalBrandingAudiences: (personalBrandingAudiences) => set({ personalBrandingAudiences }),
    }),
    {
      name: "ssocials-content-storage",
      version: 6,
      migrate: (persistedState: unknown, version: number) => {
        const state = persistedState as Record<string, unknown>;
        if (version < 2) {
          const navItems = (state.navItems as Array<{ name: string; path: string }>) ?? [];
          const hasReviews = navItems.some((item) => item.path === "/reviews");
          if (!hasReviews) {
            const contactIdx = navItems.findIndex((item) => item.path === "/contact");
            if (contactIdx !== -1) {
              navItems.splice(contactIdx, 0, { name: "Reviews", path: "/reviews" });
            } else {
              navItems.push({ name: "Reviews", path: "/reviews" });
            }
            state.navItems = [...navItems];
          }
        }
        if (version < 3) {
          const existing = (state.devProjects as Array<unknown>) ?? [];
          if (existing.length === 0) {
            state.devProjects = [
              { name: "KasaPay", tech: "CBK-licensed PSP — full payment gateway built from the ground up, supporting cards, mobile money, bank transfers & multi-currency payouts", url: "https://www.kasapay.com" },
              { name: "KasaPay — Mobile App", tech: "Android application · Mobile payment management for the KasaPay platform", url: "https://play.google.com/store/apps/details?id=com.biz.kasapay&hl=en&pli=1" },
              { name: "RemitCore", tech: "Cross-border remittance platform built from the ground up — single API integration for international transfers, bill payments & multi-corridor settlement", url: "https://www.remitcore.co" },
              { name: "RemitCore — Complaints Portal", tech: "Internal customer support portal — complaint intake, tracking & resolution system for RemitCore users", url: "https://complaints.remitcore.co/login" },
              { name: "Magena Pilates", tech: "E-commerce & booking platform for a premium pilates equipment manufacturer", url: "https://www.magenapilates.com" },
              { name: "Magena Pilates — Admin", tech: "Custom admin dashboard · Content, inventory & order management", url: "https://www.magenapilates.com/admin" },
              { name: "S.Socials", tech: "Agency portfolio & CMS · React, TypeScript, Supabase", url: "https://ssocials.co" },
            ];
          }
        }
        if (version < 6) {
          const projects = (state.devProjects as Array<{ name: string; tech: string; url: string; image?: string }>) ?? [];
          const hasPremier = projects.some((p) => p.url.includes("premierbeautyclinic"));
          if (!hasPremier) {
            const ssocialsIdx = projects.findIndex((p) => p.url.includes("ssocials"));
            const newEntries = [
              { name: "Premier Beauty Clinic", tech: "Full website & booking platform for a beauty & cosmetic clinic", url: "https://premierbeautyclinic.vercel.app" },
              { name: "Premier Beauty Clinic — Staff Portal", tech: "Internal staff management & admin dashboard", url: "https://premierbeautyclinic.vercel.app/staff/login" },
            ];
            if (ssocialsIdx !== -1) {
              projects.splice(ssocialsIdx, 0, ...newEntries);
            } else {
              projects.push(...newEntries);
            }
            state.devProjects = [...projects];
          }
        }
        return state;
      },
      // Don't persist auth state to localStorage — always revalidate with Supabase
      partialize: (state) => {
        const { isAuthenticated, isSyncing, loginWithEmail, logout, loadFromSupabase, saveToSupabase, ...rest } = state;
        return rest;
      },
    }
  )
);
