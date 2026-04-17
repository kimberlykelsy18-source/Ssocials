-- ============================================================
-- S.Socials — Migration 002
-- Run in Supabase → SQL Editor after the initial setup
-- ============================================================

-- 1. REVIEWS / TESTIMONIALS
-- ============================================================
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  company text,
  role text,
  service_used text NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text text NOT NULL,
  status text NOT NULL DEFAULT 'pending',   -- pending | approved | rejected
  featured boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Anyone can submit a review
CREATE POLICY "public_insert_reviews"
  ON reviews FOR INSERT WITH CHECK (true);

-- Public can only read approved reviews
CREATE POLICY "public_read_approved_reviews"
  ON reviews FOR SELECT USING (status = 'approved');

-- Admin can read ALL reviews
CREATE POLICY "admin_read_all_reviews"
  ON reviews FOR SELECT USING (auth.role() = 'authenticated');

-- Admin can update status / featured flag
CREATE POLICY "admin_update_reviews"
  ON reviews FOR UPDATE USING (auth.role() = 'authenticated');

-- Admin can delete reviews
CREATE POLICY "admin_delete_reviews"
  ON reviews FOR DELETE USING (auth.role() = 'authenticated');


-- 2. MEDIA ITEMS
-- Tracks every file uploaded to Supabase Storage
-- ============================================================
CREATE TABLE IF NOT EXISTS media_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  url text NOT NULL,
  storage_path text NOT NULL,
  type text NOT NULL CHECK (type IN ('image', 'video')),
  purpose text NOT NULL DEFAULT 'general',  -- hero | portfolio | about | general
  created_at timestamptz DEFAULT now()
);

ALTER TABLE media_items ENABLE ROW LEVEL SECURITY;

-- Public can read media (so site can display images)
CREATE POLICY "public_read_media"
  ON media_items FOR SELECT USING (true);

-- Only admin can insert / update / delete
CREATE POLICY "admin_manage_media"
  ON media_items FOR ALL USING (auth.role() = 'authenticated');


-- 3. SUPABASE STORAGE BUCKET
-- Run this to create the public media bucket
-- ============================================================
-- Go to: Supabase → Storage → New bucket
-- Name: site-media
-- Public: YES (toggle on)
-- Then run the policy below:

INSERT INTO storage.buckets (id, name, public)
VALUES ('site-media', 'site-media', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "public_read_storage"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'site-media');

CREATE POLICY "admin_upload_storage"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'site-media' AND auth.role() = 'authenticated');

CREATE POLICY "admin_delete_storage"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'site-media' AND auth.role() = 'authenticated');


-- ============================================================
-- 4. SAMPLE DATA — REVIEWS
-- ============================================================

INSERT INTO reviews (name, company, role, service_used, rating, review_text, status, featured) VALUES

-- Featured reviews (shown in the navy highlight cards)
(
  'Dr. Amara Osei',
  'Osei Aesthetic Clinic',
  'Founder & Medical Director',
  'brand-identity',
  5,
  'S.Socials completely transformed how our clinic is perceived. Within three months of the rebrand, our consultation bookings increased by 60%. The team understood exactly what luxury healthcare branding should feel like — premium, trustworthy, and aspirational.',
  'approved',
  true
),
(
  'Natasha Elmore',
  'Lumière Skin Studio',
  'Creative Director',
  'full-package',
  5,
  'Working with S.Socials was the best business decision I made this year. They didn''t just build us a brand — they built us a reputation. Our social media presence now reflects the quality we deliver in the treatment room, and our clients notice the difference immediately.',
  'approved',
  true
),

-- Regular approved reviews
(
  'Dr. James Whitfield',
  'Whitfield Wellness Group',
  'CEO',
  'personal-branding',
  5,
  'I was sceptical that personal branding would make a real difference for a medical practice. I was wrong. S.Socials positioned me as a thought leader in private healthcare and the results speak for themselves — I now get speaking invitations and press enquiries monthly.',
  'approved',
  false
),
(
  'Sofia Marchetti',
  'Villa Rosa Med Spa',
  'Owner',
  'marketing',
  5,
  'Our return on investment from the marketing campaign S.Socials ran was extraordinary. They understood our Italian-inspired aesthetic and translated it into campaigns that resonated deeply with our clientele. Professional, creative, and genuinely invested in our success.',
  'approved',
  false
),
(
  'Dr. Priya Nair',
  'Nair Dermatology & Aesthetics',
  'Consultant Dermatologist',
  'digital-presence',
  5,
  'The new website and digital strategy positioned my practice exactly where I wanted to be — as a premium, science-backed clinic that patients trust before they even walk through the door. Exceptional attention to detail throughout the entire process.',
  'approved',
  false
),
(
  'Marcus Chen',
  'Equilibrium Wellness',
  'Co-Founder',
  'brand-identity',
  4,
  'S.Socials delivered a brand identity that finally captures the balance and calm we strive to create for our clients. The process was collaborative and they pushed us to think bigger than we initially imagined. Very happy with the results.',
  'approved',
  false
),
(
  'Isabelle Laurent',
  'Maison de Beauté',
  'Brand Manager',
  'full-package',
  5,
  'From the very first discovery session, the S.Socials team demonstrated a deep understanding of our French beauty heritage and how to position it for a British audience. The full package they delivered exceeded every expectation we set at the start.',
  'approved',
  false
),
(
  'Dr. Kwame Asante',
  'Asante Private Health',
  'Medical Director',
  'personal-branding',
  5,
  'My online presence was non-existent before working with S.Socials. They built an authority platform that now generates genuine patient enquiries and positions me as a leading voice in private healthcare. The team is exceptional — highly recommend without reservation.',
  'approved',
  false
),

-- A pending review (visible in admin, not yet shown publicly)
(
  'Rachel Thompson',
  'Glow & Go Beauty Bar',
  'Owner',
  'marketing',
  4,
  'Really pleased with the social media strategy. Our engagement has gone up significantly and we''re attracting the right kind of client — exactly what we asked for. The onboarding process was thorough and the team were responsive throughout.',
  'pending',
  false
),

-- A rejected review (example of admin moderation)
(
  'Anonymous',
  NULL,
  NULL,
  'consulting',
  2,
  'Test review submission — please ignore.',
  'rejected',
  false
);


-- ============================================================
-- 5. SAMPLE DATA — MEDIA ITEMS
-- ============================================================
-- These use placeholder Unsplash URLs. Replace with your real
-- Supabase Storage URLs after uploading your actual assets.
-- ============================================================

INSERT INTO media_items (name, url, storage_path, type, purpose) VALUES

(
  'Hero Background — Luxury Clinic',
  'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1600&q=80',
  'placeholder-hero-clinic.jpg',
  'image',
  'hero'
),
(
  'About Section — Team Portrait',
  'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=1200&q=80',
  'placeholder-about-team.jpg',
  'image',
  'about'
),
(
  'Portfolio — Brand Identity Case Study',
  'https://images.unsplash.com/photo-1586717799252-bd134ad00e26?w=1200&q=80',
  'placeholder-portfolio-branding.jpg',
  'image',
  'portfolio'
),
(
  'Portfolio — Digital Campaign Visuals',
  'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1200&q=80',
  'placeholder-portfolio-digital.jpg',
  'image',
  'portfolio'
),
(
  'Hero Background — Medical Spa',
  'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1600&q=80',
  'placeholder-hero-spa.jpg',
  'image',
  'hero'
),
(
  'General — Branding Flatlay',
  'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&q=80',
  'placeholder-general-flatlay.jpg',
  'image',
  'general'
);
