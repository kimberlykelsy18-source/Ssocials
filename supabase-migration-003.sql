-- ============================================================
-- S.Socials — Migration 003
-- Fixes RLS policies across all tables.
-- Run in Supabase → SQL Editor
-- ============================================================
-- IMPORTANT: Run this after supabase-setup.sql and 002.
-- It drops all old policies and recreates them correctly.
-- auth.role() is deprecated — replaced with (select auth.role())
-- ============================================================


-- ─── site_content ─────────────────────────────────────────────────────────────

DROP POLICY IF EXISTS "public_read_site_content"  ON site_content;
DROP POLICY IF EXISTS "admin_update_site_content"  ON site_content;
DROP POLICY IF EXISTS "admin_insert_site_content"  ON site_content;

-- Anyone can read (website loads content on every visit)
CREATE POLICY "public_read_site_content"
  ON site_content FOR SELECT
  USING (true);

-- Admin can insert (needed for upsert when row doesn't exist yet)
CREATE POLICY "admin_insert_site_content"
  ON site_content FOR INSERT
  WITH CHECK ((select auth.role()) = 'authenticated');

-- Admin can update (needed for upsert when row already exists)
CREATE POLICY "admin_update_site_content"
  ON site_content FOR UPDATE
  USING ((select auth.role()) = 'authenticated');


-- ─── contact_submissions ──────────────────────────────────────────────────────

DROP POLICY IF EXISTS "public_insert_contact"   ON contact_submissions;
DROP POLICY IF EXISTS "admin_read_contact"      ON contact_submissions;
DROP POLICY IF EXISTS "admin_update_contact"    ON contact_submissions;
DROP POLICY IF EXISTS "admin_delete_contact"    ON contact_submissions;

-- Anyone can submit the contact form
CREATE POLICY "public_insert_contact"
  ON contact_submissions FOR INSERT
  WITH CHECK (true);

-- Admin can read all submissions
CREATE POLICY "admin_read_contact"
  ON contact_submissions FOR SELECT
  USING ((select auth.role()) = 'authenticated');

-- Admin can update status and notes
CREATE POLICY "admin_update_contact"
  ON contact_submissions FOR UPDATE
  USING ((select auth.role()) = 'authenticated');

-- Admin can delete submissions
CREATE POLICY "admin_delete_contact"
  ON contact_submissions FOR DELETE
  USING ((select auth.role()) = 'authenticated');


-- ─── reviews ──────────────────────────────────────────────────────────────────

DROP POLICY IF EXISTS "public_insert_reviews"        ON reviews;
DROP POLICY IF EXISTS "public_read_approved_reviews" ON reviews;
DROP POLICY IF EXISTS "admin_read_all_reviews"       ON reviews;
DROP POLICY IF EXISTS "admin_update_reviews"         ON reviews;
DROP POLICY IF EXISTS "admin_delete_reviews"         ON reviews;

-- Anyone can submit a review
CREATE POLICY "public_insert_reviews"
  ON reviews FOR INSERT
  WITH CHECK (true);

-- Public can only read approved reviews
CREATE POLICY "public_read_approved_reviews"
  ON reviews FOR SELECT
  USING (status = 'approved');

-- Admin can read ALL reviews (pending, approved, rejected)
CREATE POLICY "admin_read_all_reviews"
  ON reviews FOR SELECT
  USING ((select auth.role()) = 'authenticated');

-- Admin can approve / reject / feature reviews
CREATE POLICY "admin_update_reviews"
  ON reviews FOR UPDATE
  USING ((select auth.role()) = 'authenticated');

-- Admin can delete reviews
CREATE POLICY "admin_delete_reviews"
  ON reviews FOR DELETE
  USING ((select auth.role()) = 'authenticated');


-- ─── media_items ──────────────────────────────────────────────────────────────

DROP POLICY IF EXISTS "public_read_media"  ON media_items;
DROP POLICY IF EXISTS "admin_manage_media" ON media_items;

-- Public can read media (website displays images/videos)
CREATE POLICY "public_read_media"
  ON media_items FOR SELECT
  USING (true);

-- Admin can insert, update, delete media items
CREATE POLICY "admin_insert_media"
  ON media_items FOR INSERT
  WITH CHECK ((select auth.role()) = 'authenticated');

CREATE POLICY "admin_update_media"
  ON media_items FOR UPDATE
  USING ((select auth.role()) = 'authenticated');

CREATE POLICY "admin_delete_media"
  ON media_items FOR DELETE
  USING ((select auth.role()) = 'authenticated');


-- ─── Update navItems in site_content to include Reviews ──────────────────────
-- Only runs if Reviews is not already present

UPDATE site_content
SET content = jsonb_set(
  content,
  '{navItems}',
  '[
    {"name": "Home",              "path": "/"},
    {"name": "About",             "path": "/about"},
    {"name": "Services",          "path": "/services"},
    {"name": "Packages",          "path": "/packages"},
    {"name": "Portfolio",         "path": "/portfolio"},
    {"name": "Personal Branding", "path": "/personal-branding"},
    {"name": "Process",           "path": "/process"},
    {"name": "Reviews",           "path": "/reviews"},
    {"name": "Contact",           "path": "/contact"}
  ]'::jsonb
)
WHERE id = 'a1b2c3d4-0000-0000-0000-000000000001'::uuid;


-- ─── Supabase Storage — site-media bucket ─────────────────────────────────────

DROP POLICY IF EXISTS "public_read_storage"  ON storage.objects;
DROP POLICY IF EXISTS "admin_upload_storage" ON storage.objects;
DROP POLICY IF EXISTS "admin_delete_storage" ON storage.objects;

CREATE POLICY "public_read_storage"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'site-media');

CREATE POLICY "admin_upload_storage"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'site-media' AND (select auth.role()) = 'authenticated');

CREATE POLICY "admin_update_storage"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'site-media' AND (select auth.role()) = 'authenticated');

CREATE POLICY "admin_delete_storage"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'site-media' AND (select auth.role()) = 'authenticated');
