import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface NavItem {
  name: string;
  path: string;
}

export interface FooterLink {
  name: string;
  path: string;
}

export interface PageImage {
  id: string;
  url: string;
  alt: string;
}

export interface ContentStore {
  // Authentication
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  
  // Logo
  logoUrl: string;
  setLogoUrl: (url: string) => void;
  
  // Navigation
  navItems: NavItem[];
  updateNavItems: (items: NavItem[]) => void;
  
  // Footer
  footerLinks: FooterLink[];
  footerText: string;
  updateFooterLinks: (links: FooterLink[]) => void;
  updateFooterText: (text: string) => void;
  
  // Home Page Content
  homeHeroTitle: string;
  homeHeroSubtitle: string;
  homeAboutTitle: string;
  homeAboutText1: string;
  homeAboutText2: string;
  credibilityText: string;
  homeImages: {
    hero: string;
    aboutSection: string;
    featuredWork1: string;
    featuredWork2: string;
  };
  
  // About Page Content
  aboutHeroTitle: string;
  aboutText1: string;
  aboutText2: string;
  aboutText3: string;
  aboutMission: string;
  aboutVision: string;
  aboutImages: {
    hero: string;
  };
  
  // Services Page
  servicesHeroTitle: string;
  servicesHeroSubtitle: string;
  servicesIntro: string;
  
  // Portfolio Page
  portfolioHeroTitle: string;
  portfolioHeroSubtitle: string;
  portfolioIntro: string;
  
  // Process Page
  processHeroTitle: string;
  processHeroSubtitle: string;
  processIntro: string;
  
  // Personal Branding Page
  personalBrandingHeroTitle: string;
  personalBrandingHeroSubtitle: string;
  personalBrandingIntro: string;
  
  // Packages Page
  packagesHeroTitle: string;
  packagesHeroSubtitle: string;
  packagesIntro: string;
  
  // Services
  services: Array<{ title: string; description: string }>;
  
  // Contact
  contactHeroTitle: string;
  contactSubtitle: string;
  
  // Update functions
  updateHomeContent: (field: string, value: string) => void;
  updateHomeImages: (images: Partial<ContentStore['homeImages']>) => void;
  updateAboutContent: (field: string, value: string) => void;
  updateAboutImages: (images: Partial<ContentStore['aboutImages']>) => void;
  updateServicesContent: (field: string, value: string) => void;
  updatePortfolioContent: (field: string, value: string) => void;
  updateProcessContent: (field: string, value: string) => void;
  updatePersonalBrandingContent: (field: string, value: string) => void;
  updatePackagesContent: (field: string, value: string) => void;
  updateContactContent: (field: string, value: string) => void;
  updateServices: (services: Array<{ title: string; description: string }>) => void;
}

export const useContentStore = create<ContentStore>()(
  persist(
    (set) => ({
      // Authentication
      isAuthenticated: false,
      login: (password) => {
        if (password === "yourpassword") {
          set({ isAuthenticated: true });
          return true;
        }
        return false;
      },
      logout: () => set({ isAuthenticated: false }),
      
      // Logo
      logoUrl: '',
      setLogoUrl: (url) => set({ logoUrl: url }),
      
      // Navigation
      navItems: [
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
        { name: "Services", path: "/services" },
        { name: "Packages", path: "/packages" },
        { name: "Portfolio", path: "/portfolio" },
        { name: "Personal Branding", path: "/personal-branding" },
        { name: "Process", path: "/process" },
        { name: "Contact", path: "/contact" },
      ],
      updateNavItems: (items) => set({ navItems: items }),
      
      // Footer
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
      
      // Home Page Default Content
      homeHeroTitle: "At S.Socials, we envision a world where health, beauty, and wellness brands and the institutions behind them don't just exist, they lead, influence, and transform lives.",
      homeHeroSubtitle: "We build high-converting, premium brand experiences for clinics, wellness brands, and private healthcare providers through strategic marketing, refined visual storytelling, and digital systems.",
      homeAboutTitle: "About S.Socials",
      homeAboutText1: "S.Socials is a marketing and branding agency focused on building and scaling brands in the health, beauty, wellness, and private healthcare space.",
      homeAboutText2: "We combine strategy, branding, marketing, and digital systems to create brands that are not only seen but trusted, chosen, and remembered.",
      credibilityText: "Trusted by growing health, beauty, wellness, and private healthcare brands.",
      homeImages: {
        hero: "https://images.unsplash.com/photo-1760647422523-f532034a49ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzcGElMjB0cmVhdG1lbnQlMjB3ZWxsbmVzc3xlbnwxfHx8fDE3NzU3MTY5MDd8MA&ixlib=rb-4.1.0&q=80&w=1080",
        aboutSection: "https://images.unsplash.com/photo-1762625570087-6d98fca29531?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhZXN0aGV0aWMlMjBjbGluaWMlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NzU3NTE5NDF8MA&ixlib=rb-4.1.0&q=80&w=1080",
        featuredWork1: "https://images.unsplash.com/photo-1774128718008-0c1b53143601?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwYnJhbmRpbmclMjBkZXNpZ258ZW58MXx8fHwxNzc1NzAyMTgxfDA&ixlib=rb-4.1.0&q=80&w=1080",
        featuredWork2: "https://images.unsplash.com/photo-1740138160889-29d711607d71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWxsbmVzcyUyMGJyYW5kJTIwYWVzdGhldGljfGVufDF8fHx8MTc3NTc1MDM5NXww&ixlib=rb-4.1.0&q=80&w=1080",
      },
      
      // About Page Default Content
      aboutHeroTitle: "Who We Are",
      aboutText1: "At S.Socials, we specialize in building and scaling brands in the health, beauty, wellness, and private healthcare space through strategic marketing and premium visual storytelling.",
      aboutText2: "In an industry driven by trust and perception, we combine strategic marketing with refined visual storytelling to position our clients as credible, premium leaders in their space.",
      aboutText3: "Our focus is simple, help you attract the right audience, communicate your value with clarity, and build a brand that drives consistent growth, loyalty, and long-term success.",
      aboutMission: "To transform brands into trusted industry leaders.",
      aboutVision: "To create a world where brands don't just exist they influence, lead, and transform lives.",
      aboutImages: {
        hero: "https://images.unsplash.com/photo-1640909386733-e5260a325c26?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwcHJvZmVzc2lvbmFsJTIwYnJhbmRpbmd8ZW58MXx8fHwxNzc1NzUxOTQyfDA&ixlib=rb-4.1.0&q=80&w=1080",
      },
      
      // Other Pages
      servicesHeroTitle: "Our Services",
      servicesHeroSubtitle: "Tailored solutions for health, beauty, wellness, and private healthcare brands.",
      servicesIntro: "We offer comprehensive solutions for health, beauty, wellness, and private healthcare brands.",
      
      portfolioHeroTitle: "Our Work",
      portfolioHeroSubtitle: "See how we've helped brands transform their presence.",
      portfolioIntro: "See how we've helped brands transform their presence.",
      
      processHeroTitle: "Our Process",
      processHeroSubtitle: "A strategic, proven approach to building premium brands.",
      processIntro: "A strategic, proven approach to building premium brands.",
      
      personalBrandingHeroTitle: "Personal Branding",
      personalBrandingHeroSubtitle: "Position yourself as a trusted authority in your field.",
      personalBrandingIntro: "Position yourself as a trusted authority in your field.",
      
      packagesHeroTitle: "Our Packages",
      packagesHeroSubtitle: "Tailored solutions for every stage of your brand journey.",
      packagesIntro: "Tailored solutions for every stage of your brand journey.",
      
      // Services Default Content
      services: [
        { title: "Brand & Identity", description: "We build distinctive brand identities that reflect credibility, professionalism, and premium positioning." },
        { title: "Marketing & Growth", description: "We develop and execute strategies that attract, convert, and retain the right audience." },
        { title: "Creative & Content", description: "We craft visually compelling content that elevates your brand perception." },
        { title: "Digital Presence", description: "We design websites and platforms structured to convert visitors into clients." },
        { title: "Digital Systems & Automation", description: "We implement booking systems, CRM integrations, and automation to streamline operations and improve experience." },
        { title: "Healthcare Branding & Patient Experience", description: "We help hospitals and healthcare providers build trust, improve perception, and enhance patient journeys." },
        { title: "Personal Branding & Image Consultancy", description: "We position doctors and founders as trusted authorities in their space." },
        { title: "Consulting", description: "We provide clarity, direction, and actionable strategies for growth." },
      ],
      
      // Contact Default Content
      contactHeroTitle: "Let's build something that sets you apart.",
      contactSubtitle: "Book a consultation to discuss how we can help elevate your brand.",
      
      // Update functions
      updateHomeContent: (field, value) => set((state) => ({ [field]: value })),
      updateHomeImages: (images) => set((state) => ({ homeImages: { ...state.homeImages, ...images } })),
      updateAboutContent: (field, value) => set((state) => ({ [field]: value })),
      updateAboutImages: (images) => set((state) => ({ aboutImages: { ...state.aboutImages, ...images } })),
      updateServicesContent: (field, value) => set((state) => ({ [field]: value })),
      updatePortfolioContent: (field, value) => set((state) => ({ [field]: value })),
      updateProcessContent: (field, value) => set((state) => ({ [field]: value })),
      updatePersonalBrandingContent: (field, value) => set((state) => ({ [field]: value })),
      updatePackagesContent: (field, value) => set((state) => ({ [field]: value })),
      updateContactContent: (field, value) => set((state) => ({ [field]: value })),
      updateServices: (services) => set({ services }),
    }),
    {
      name: 'ssocials-content-storage',
    }
  )
);