-- Admin RLS Policies for Authenticated Users
-- Drop existing policies first, then recreate them correctly

-- Drop existing policies
DROP POLICY IF EXISTS "Authenticated users can view all activities" ON activities;
DROP POLICY IF EXISTS "Authenticated users can update activities" ON activities;
DROP POLICY IF EXISTS "Authenticated users can insert activities" ON activities;
DROP POLICY IF EXISTS "Authenticated users can delete activities" ON activities;

DROP POLICY IF EXISTS "Authenticated users can view all bookings" ON bookings;
DROP POLICY IF EXISTS "Authenticated users can update bookings" ON bookings;
DROP POLICY IF EXISTS "Authenticated users can delete bookings" ON bookings;

DROP POLICY IF EXISTS "Authenticated users can view all testimonials" ON testimonials;
DROP POLICY IF EXISTS "Authenticated users can update testimonials" ON testimonials;
DROP POLICY IF EXISTS "Authenticated users can delete testimonials" ON testimonials;

DROP POLICY IF EXISTS "Authenticated users can view all gallery" ON gallery_images;
DROP POLICY IF EXISTS "Authenticated users can insert gallery" ON gallery_images;
DROP POLICY IF EXISTS "Authenticated users can update gallery" ON gallery_images;
DROP POLICY IF EXISTS "Authenticated users can delete gallery" ON gallery_images;

DROP POLICY IF EXISTS "Authenticated users can view all hotels" ON hotels;
DROP POLICY IF EXISTS "Authenticated users can update hotels" ON hotels;
DROP POLICY IF EXISTS "Authenticated users can insert hotels" ON hotels;
DROP POLICY IF EXISTS "Authenticated users can delete hotels" ON hotels;

DROP POLICY IF EXISTS "Authenticated users can view all slideshow" ON slideshow_images;
DROP POLICY IF EXISTS "Authenticated users can insert slideshow" ON slideshow_images;
DROP POLICY IF EXISTS "Authenticated users can update slideshow" ON slideshow_images;
DROP POLICY IF EXISTS "Authenticated users can delete slideshow" ON slideshow_images;

DROP POLICY IF EXISTS "Authenticated users can update contact" ON contact_info;
DROP POLICY IF EXISTS "Authenticated users can view newsletter" ON newsletter;

DROP POLICY IF EXISTS "Authenticated users can view all blogs" ON blog_posts;
DROP POLICY IF EXISTS "Authenticated users can insert blogs" ON blog_posts;
DROP POLICY IF EXISTS "Authenticated users can update blogs" ON blog_posts;
DROP POLICY IF EXISTS "Authenticated users can delete blogs" ON blog_posts;

-- Now create all policies fresh

-- Activities: Allow authenticated users full access
CREATE POLICY "Authenticated users can view all activities" ON activities FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can update activities" ON activities FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert activities" ON activities FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can delete activities" ON activities FOR DELETE TO authenticated USING (true);

-- Bookings: Allow authenticated users full access
CREATE POLICY "Authenticated users can view all bookings" ON bookings FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can update bookings" ON bookings FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete bookings" ON bookings FOR DELETE TO authenticated USING (true);

-- Testimonials: Allow authenticated users full access
CREATE POLICY "Authenticated users can view all testimonials" ON testimonials FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can update testimonials" ON testimonials FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete testimonials" ON testimonials FOR DELETE TO authenticated USING (true);

-- Gallery: Allow authenticated users full access
CREATE POLICY "Authenticated users can view all gallery" ON gallery_images FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert gallery" ON gallery_images FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update gallery" ON gallery_images FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete gallery" ON gallery_images FOR DELETE TO authenticated USING (true);

-- Hotels: Allow authenticated users full access
CREATE POLICY "Authenticated users can view all hotels" ON hotels FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can update hotels" ON hotels FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert hotels" ON hotels FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can delete hotels" ON hotels FOR DELETE TO authenticated USING (true);

-- Slideshow: Allow authenticated users full access
CREATE POLICY "Authenticated users can view all slideshow" ON slideshow_images FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert slideshow" ON slideshow_images FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update slideshow" ON slideshow_images FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete slideshow" ON slideshow_images FOR DELETE TO authenticated USING (true);

-- Contact Info: Allow authenticated users full access
CREATE POLICY "Authenticated users can update contact" ON contact_info FOR UPDATE TO authenticated USING (true);

-- Newsletter: Allow authenticated users to view
CREATE POLICY "Authenticated users can view newsletter" ON newsletter FOR SELECT TO authenticated USING (true);

-- Blog Posts: Allow authenticated users full access
CREATE POLICY "Authenticated users can view all blogs" ON blog_posts FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert blogs" ON blog_posts FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update blogs" ON blog_posts FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete blogs" ON blog_posts FOR DELETE TO authenticated USING (true);
