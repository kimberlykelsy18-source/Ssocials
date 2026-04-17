-- ============================================================
-- S.Socials — Supabase Database Setup
-- Paste this entire file into Supabase → SQL Editor → Run
-- ============================================================

-- 1. SITE CONTENT TABLE
-- Single JSONB row stores all CMS text + page data
-- ============================================================
CREATE TABLE IF NOT EXISTS site_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz DEFAULT now()
);

-- Seed the one and only row with all default content
INSERT INTO site_content (id, content)
VALUES (
  'a1b2c3d4-0000-0000-0000-000000000001'::uuid,
  '{
    "logoUrl": "",
    "footerText": "© 2026 S.Socials. All rights reserved.",
    "homeHeroTitle": "At S.Socials, we envision a world where health, beauty, and wellness brands and the institutions behind them don''t just exist, they lead, influence, and transform lives.",
    "homeHeroSubtitle": "We build high-converting, premium brand experiences for clinics, wellness brands, and private healthcare providers through strategic marketing, refined visual storytelling, and digital systems.",
    "homeAboutTitle": "About S.Socials",
    "homeAboutText1": "S.Socials is a marketing and branding agency focused on building and scaling brands in the health, beauty, wellness, and private healthcare space.",
    "homeAboutText2": "We combine strategy, branding, marketing, and digital systems to create brands that are not only seen but trusted, chosen, and remembered.",
    "credibilityText": "Trusted by growing health, beauty, wellness, and private healthcare brands.",
    "aboutHeroTitle": "Who We Are",
    "aboutText1": "At S.Socials, we specialize in building and scaling brands in the health, beauty, wellness, and private healthcare space through strategic marketing and premium visual storytelling.",
    "aboutText2": "In an industry driven by trust and perception, we combine strategic marketing with refined visual storytelling to position our clients as credible, premium leaders in their space.",
    "aboutText3": "Our focus is simple, help you attract the right audience, communicate your value with clarity, and build a brand that drives consistent growth, loyalty, and long-term success.",
    "aboutMission": "To transform brands into trusted industry leaders.",
    "aboutVision": "To create a world where brands don''t just exist they influence, lead, and transform lives.",
    "servicesHeroTitle": "Our Services",
    "servicesHeroSubtitle": "Tailored solutions for health, beauty, wellness, and private healthcare brands.",
    "portfolioHeroTitle": "Our Work",
    "portfolioHeroSubtitle": "See how we''ve helped brands transform their presence.",
    "processHeroTitle": "Our Process",
    "processHeroSubtitle": "A strategic, proven approach to building premium brands.",
    "personalBrandingHeroTitle": "Personal Branding",
    "personalBrandingHeroSubtitle": "Position yourself as a trusted authority in your field.",
    "packagesHeroTitle": "Our Packages",
    "packagesHeroSubtitle": "Tailored solutions for every stage of your brand journey.",
    "contactHeroTitle": "Let''s build something that sets you apart.",
    "contactSubtitle": "Book a consultation to discuss how we can help elevate your brand.",
    "processSteps": [
      { "number": "01", "title": "Strategy", "description": "We define your positioning, audience, and direction.", "details": "Through in-depth discovery sessions, we understand your business goals, target audience, competitive landscape, and brand aspirations. We develop a comprehensive strategy that guides all subsequent work." },
      { "number": "02", "title": "Build", "description": "We develop your brand identity and systems.", "details": "With strategy in place, we craft your visual identity, messaging framework, and brand guidelines. Every element is designed to reflect your positioning and resonate with your target audience." },
      { "number": "03", "title": "Execute", "description": "We launch across platforms with precision.", "details": "We implement your brand across all touchpoints—website, social media, marketing materials, and digital systems. Every execution is carefully crafted to maintain consistency and drive results." },
      { "number": "04", "title": "Scale", "description": "We optimize and grow your brand sustainably.", "details": "Post-launch, we monitor performance, gather insights, and continuously optimize. We help you scale strategically, ensuring your brand maintains its premium positioning as you grow." }
    ],
    "caseStudies": [
      { "title": "Aesthetic Clinic", "problem": "Weak branding and low perceived value", "solution": "Full rebrand + marketing strategy", "result": "Increased bookings and higher-value clients", "image": "https://images.unsplash.com/photo-1759262151080-e05ba1c6294f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" },
      { "title": "Private Hospital", "problem": "Outdated perception and poor digital experience", "solution": "Website redesign + system integration", "result": "Improved trust and patient experience", "image": "https://images.unsplash.com/photo-1670665352618-49ae2ae914ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" },
      { "title": "Beauty Brand", "problem": "No clear identity in a saturated market", "solution": "Branding + launch strategy", "result": "Strong recognition and engagement", "image": "https://images.unsplash.com/photo-1760614034530-a0d34463e03d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" },
      { "title": "Wellness Brand", "problem": "Low conversions", "solution": "Website + funnel optimization", "result": "Increased bookings and engagement", "image": "https://images.unsplash.com/photo-1773924093206-9a433a14bb44?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" }
    ],
    "packages": [
      { "name": "The Foundation", "subtitle": "For new or rebranding businesses", "includes": ["Brand strategy", "Logo design", "Brand guidelines"], "result": "A strong, professional brand foundation.", "tier": 1 },
      { "name": "The Growth", "subtitle": "For scaling brands", "includes": ["Content creation", "Social media management", "Marketing strategy"], "result": "Consistent visibility and client acquisition.", "tier": 2 },
      { "name": "The Authority", "subtitle": "For brands ready to dominate", "includes": ["Full brand management", "Marketing execution", "Digital systems integration"], "result": "Market leadership and premium positioning.", "tier": 3, "featured": true },
      { "name": "The Healthcare Elevation", "subtitle": "For private hospitals and healthcare providers", "includes": ["Brand audit & repositioning", "Website redesign", "Booking systems & CRM", "Patient journey optimization"], "result": "Improved patient trust, efficiency, and overall experience.", "tier": 3 },
      { "name": "The Authority Presence", "subtitle": "For doctors and founders", "includes": ["Personal brand strategy", "Image consultancy", "Content direction", "Profile optimization"], "result": "Authority, trust, and premium personal positioning.", "tier": 2 }
    ],
    "personalBrandingOfferings": [
      { "number": "01", "title": "Personal Brand Strategy", "desc": "Define your unique positioning, voice, and value proposition in your industry." },
      { "number": "02", "title": "Image Consultancy", "desc": "Refine how you present yourself online and offline to align with your brand goals." },
      { "number": "03", "title": "Content Strategy", "desc": "Develop content that positions you as a thought leader and builds credibility." },
      { "number": "04", "title": "Profile Optimization", "desc": "Audit and enhance your digital presence across platforms for impact and trust." }
    ],
    "personalBrandingAudiences": [
      { "title": "Doctors", "statement": "Your expertise is your brand. We make sure the world sees it.", "desc": "Build trust and authority beyond your clinic walls." },
      { "title": "Clinic Founders", "statement": "Your story is your strongest asset.", "desc": "Become the face that defines your brand''s identity." },
      { "title": "Wellness Leaders", "statement": "Lead with presence. Grow with purpose.", "desc": "Position yourself as the authority in your field." }
    ]
  }'::jsonb
)
ON CONFLICT (id) DO NOTHING;

-- 2. CONTACT SUBMISSIONS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  business_name text NOT NULL,
  industry text NOT NULL,
  service_needed text NOT NULL,
  budget_range text,
  email text NOT NULL,
  phone text,
  status text NOT NULL DEFAULT 'new',
  notes text,
  created_at timestamptz DEFAULT now()
);

-- 3. ROW LEVEL SECURITY
-- ============================================================
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- site_content: public can read (website loads it on every visit)
CREATE POLICY "public_read_site_content"
  ON site_content FOR SELECT
  USING (true);

-- site_content: only authenticated admin can update
CREATE POLICY "admin_update_site_content"
  ON site_content FOR UPDATE
  USING (auth.role() = 'authenticated');

-- contact_submissions: anyone can insert (contact form)
CREATE POLICY "public_insert_contact"
  ON contact_submissions FOR INSERT
  WITH CHECK (true);

-- contact_submissions: only authenticated admin can read
CREATE POLICY "admin_read_contact"
  ON contact_submissions FOR SELECT
  USING (auth.role() = 'authenticated');

-- contact_submissions: only authenticated admin can update
CREATE POLICY "admin_update_contact"
  ON contact_submissions FOR UPDATE
  USING (auth.role() = 'authenticated');

-- 4. UPDATED_AT AUTO-TRIGGER
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_site_content_updated_at
  BEFORE UPDATE ON site_content
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
