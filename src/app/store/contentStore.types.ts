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
  // Auth
  isAuthenticated: boolean;
  isSyncing: boolean;
  loginWithEmail: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => Promise<void>;

  // Supabase sync
  loadFromSupabase: () => Promise<void>;
  saveToSupabase: () => Promise<{ ok: boolean; error?: string }>;

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

  // Process steps (from DB)
  processSteps: Array<{ number: string; title: string; description: string; details: string }>;

  // Portfolio case studies (from DB)
  caseStudies: Array<{ title: string; problem: string; solution: string; result: string; image: string; url?: string }>;

  // Dev / IT projects (Sean's own work, shown on Services page)
  devProjects: Array<{ name: string; tech: string; url: string; image?: string }>;

  // Packages (from DB)
  packages: Array<{ name: string; subtitle: string; includes: string[]; result: string; tier: number; featured?: boolean }>;

  // Personal Branding (from DB)
  personalBrandingOfferings: Array<{ number: string; title: string; desc: string }>;
  personalBrandingAudiences: Array<{ title: string; statement: string; desc: string }>;

  // Contact
  contactHeroTitle: string;
  contactSubtitle: string;

  // Update functions
  updateHomeContent: (field: string, value: string) => void;
  updateHomeImages: (images: Partial<ContentStore["homeImages"]>) => void;
  updateAboutContent: (field: string, value: string) => void;
  updateAboutImages: (images: Partial<ContentStore["aboutImages"]>) => void;
  updateServicesContent: (field: string, value: string) => void;
  updatePortfolioContent: (field: string, value: string) => void;
  updateProcessContent: (field: string, value: string) => void;
  updatePersonalBrandingContent: (field: string, value: string) => void;
  updatePackagesContent: (field: string, value: string) => void;
  updateContactContent: (field: string, value: string) => void;
  updateServices: (services: Array<{ title: string; description: string }>) => void;
  updateProcessSteps: (steps: ContentStore["processSteps"]) => void;
  updateCaseStudies: (studies: ContentStore["caseStudies"]) => void;
  updateDevProjects: (projects: ContentStore["devProjects"]) => void;
  updatePackages: (packages: ContentStore["packages"]) => void;
  updatePersonalBrandingOfferings: (offerings: ContentStore["personalBrandingOfferings"]) => void;
  updatePersonalBrandingAudiences: (audiences: ContentStore["personalBrandingAudiences"]) => void;
}
