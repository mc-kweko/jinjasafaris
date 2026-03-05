-- Idempotent Jinja Safaris Schema
-- This version safely handles re-runs without failing on existing elements
-- Use this instead of supabase-schema.sql if your database already has some tables set up

-- Activities Table
CREATE TABLE IF NOT EXISTS activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  short_description TEXT,
  base_price_local DECIMAL(10, 2) NOT NULL,
  base_price_international DECIMAL(10, 2) NOT NULL,
  image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Seasonal Pricing Table
CREATE TABLE IF NOT EXISTS seasonal_pricing (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  activity_id UUID REFERENCES activities(id) ON DELETE CASCADE,
  season_name VARCHAR(100),
  start_date DATE,
  end_date DATE,
  price_local DECIMAL(10, 2),
  price_international DECIMAL(10, 2),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Bookings Table
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  activity_id UUID REFERENCES activities(id),
  customer_name VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(50),
  nationality VARCHAR(100),
  booking_date DATE NOT NULL,
  number_of_people INTEGER NOT NULL,
  is_local BOOLEAN DEFAULT false,
  total_price DECIMAL(10, 2) NOT NULL,
  deposit_paid DECIMAL(10, 2) NOT NULL,
  special_requests TEXT,
  status VARCHAR(20) DEFAULT 'pending',
  payment_status VARCHAR(20) DEFAULT 'pending',
  admin_response TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Testimonials Table
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_name VARCHAR(255) NOT NULL,
  customer_country VARCHAR(100),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  is_approved BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Gallery Images Table
CREATE TABLE IF NOT EXISTS gallery_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  image_url TEXT NOT NULL,
  category VARCHAR(100),
  caption TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(image_url, category, caption)
);

-- Hotels Table
CREATE TABLE IF NOT EXISTS hotels (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Slideshow Images Table
CREATE TABLE IF NOT EXISTS slideshow_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  image_url TEXT NOT NULL,
  title VARCHAR(255),
  subtitle TEXT,
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(image_url, title, order_index)
);

-- Contact Info Table
CREATE TABLE IF NOT EXISTS contact_info (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  phone VARCHAR(50),
  email VARCHAR(255) UNIQUE,
  whatsapp VARCHAR(50),
  instagram VARCHAR(255),
  twitter VARCHAR(255),
  tiktok VARCHAR(255),
  address TEXT,
  map_embed TEXT,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Newsletter Table
CREATE TABLE IF NOT EXISTS newsletter (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  subscribed_at TIMESTAMP DEFAULT NOW()
);

-- Blog Posts Table
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  content TEXT,
  excerpt TEXT,
  featured_image TEXT,
  author VARCHAR(255),
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Admin Activity Logs Table
CREATE TABLE IF NOT EXISTS admin_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  admin_email VARCHAR(255),
  action VARCHAR(255),
  details TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Insert default contact info (ignore if exists)
INSERT INTO contact_info (phone, email, whatsapp, instagram, twitter, tiktok, address, map_embed)
VALUES (
  '+256 123 456 789',
  'info@jinjasafaris.com',
  '+256123456789',
  'https://instagram.com/jinjasafaris',
  'https://twitter.com/jinjasafaris',
  'https://tiktok.com/@jinjasafaris',
  'Rubaga Hill, Jinja City, Eastern Uganda',
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.757!2d33.204!3d0.424!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMMKwMjUnMjYuNCJOIDMzwrAxMicxNC40IkU!5e0!3m2!1sen!2sug!4v1234567890'
)
ON CONFLICT (email) DO NOTHING;

-- Insert default activities (ignore if exists)
INSERT INTO activities (name, short_description, description, base_price_local, base_price_international, image_url)
VALUES
  ('White Water Rafting', 'Experience the thrill of the Nile rapids', 'Navigate through Grade 5 rapids on the mighty Nile River. Perfect for adventure seekers looking for an adrenaline rush.', 80, 110, '/images/rafting.jpg'),
  ('Skydiving', 'Jump from 10,000 feet above the Nile', 'Experience the ultimate thrill with a tandem skydive over the beautiful Nile River and Jinja landscape.', 300, 350, '/images/sky-diving.jpg'),
  ('Nile Tubing', 'Relax and float down the Nile', 'A more relaxed water adventure perfect for families. Float down the calm sections of the Nile River.', 35, 45, '/images/nile-tubing.jpg'),
  ('Jinja Trekking', 'Explore the natural beauty of Jinja', 'Guided trekking tours through the lush landscapes surrounding Jinja. Suitable for all fitness levels.', 20, 25, '/images/jinja-trekking.jpg'),
  ('Bird Watching', 'Discover Uganda''s diverse bird species', 'Join our expert guides to spot over 200 bird species in the Jinja region. Perfect for nature enthusiasts.', 25, 30, '/images/bird-watching.jpg')
ON CONFLICT (name) DO NOTHING;

-- Insert default hotels (ignore if exists)
INSERT INTO hotels (name, description, image_url)
VALUES
  ('Friends Guesthouse and Restaurant', 'Cozy guesthouse with authentic local cuisine and comfortable rooms near the Nile.', '/images/friends-guesthouse.jpg'),
  ('Jinja Nile Resort', 'Luxury resort offering stunning Nile views, spa services, and world-class amenities.', '/images/jinja-nile-resort.jpg'),
  ('Nile Village Hotel & Spa', 'Boutique hotel with spa facilities, riverside dining, and modern accommodations.', '/images/nile-village.jpg'),
  ('The Haven Eco River Lodge', 'Eco-friendly lodge committed to sustainability with beautiful river views.', '/images/haven-eco.jpg'),
  ('Whispers of the Nile Eco Luxury Resort', 'Premium eco-luxury resort offering exclusive experiences and pristine natural surroundings.', '/images/whispers-nile.jpg')
ON CONFLICT (name) DO NOTHING;

-- Insert slideshow images (no conflict handling - use plain insert)
INSERT INTO slideshow_images (image_url, title, subtitle, order_index, is_active)
VALUES
  ('/images/header-cranes.jpg', 'Jinja Safaris', 'Hub of the Nile Tourism', 0, true),
  ('/images/rafting.jpg', 'White Water Rafting', 'Experience the thrill of the Nile rapids', 1, true),
  ('/images/lodge.jpg', 'Premium Accommodations', 'Enjoy luxury lodges along the Nile', 2, true),
  ('/images/attractions.jpg', 'Discover Attractions', '15 top tourist attractions in Jinja', 3, true)
ON CONFLICT DO NOTHING;

-- Insert gallery images (no conflict handling - use plain insert)
INSERT INTO gallery_images (image_url, category, caption)
VALUES
  ('/images/gallery-1.jpg', 'Adventures', 'Thrilling moments from our safari adventures'),
  ('/images/gallery-2.jpg', 'Landscapes', 'Beautiful Jinja landscapes and scenery'),
  ('/images/gallery-3.jpg', 'Nature', 'Flora and fauna of the Nile region'),
  ('/images/rafting.jpg', 'Activities', 'White water rafting on the Nile River'),
  ('/images/sky-diving.jpg', 'Activities', 'Skydiving over the Nile River'),
  ('/images/nile-tubing.jpg', 'Activities', 'Relaxing Nile tubing experience'),
  ('/images/jinja-trekking.jpg', 'Activities', 'Guided trekking in Jinja landscapes'),
  ('/images/bird-watching.jpg', 'Activities', 'Spotting birds in the Jinja region'),
  ('/images/lodge.jpg', 'Accommodations', 'Scenic lodge views by the Nile')
ON CONFLICT DO NOTHING;

-- Enable Row Level Security (safe to run multiple times)
ALTER TABLE IF EXISTS activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS hotels ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS slideshow_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS contact_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS newsletter ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS blog_posts ENABLE ROW LEVEL SECURITY;

-- Public read policies (drop and recreate to ensure correct)
DROP POLICY IF EXISTS "Public can view active activities" ON activities;
CREATE POLICY "Public can view active activities" ON activities FOR SELECT USING (is_active = true);

DROP POLICY IF EXISTS "Public can view approved testimonials" ON testimonials;
CREATE POLICY "Public can view approved testimonials" ON testimonials FOR SELECT USING (is_approved = true);

DROP POLICY IF EXISTS "Public can view gallery" ON gallery_images;
CREATE POLICY "Public can view gallery" ON gallery_images FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can view active hotels" ON hotels;
CREATE POLICY "Public can view active hotels" ON hotels FOR SELECT USING (is_active = true);

DROP POLICY IF EXISTS "Public can view active slideshow" ON slideshow_images;
CREATE POLICY "Public can view active slideshow" ON slideshow_images FOR SELECT USING (is_active = true);

DROP POLICY IF EXISTS "Public can view contact info" ON contact_info;
CREATE POLICY "Public can view contact info" ON contact_info FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can view published blogs" ON blog_posts;
CREATE POLICY "Public can view published blogs" ON blog_posts FOR SELECT USING (published = true);

-- Public insert policies
DROP POLICY IF EXISTS "Public can create bookings" ON bookings;
CREATE POLICY "Public can create bookings" ON bookings FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Public can subscribe newsletter" ON newsletter;
CREATE POLICY "Public can subscribe newsletter" ON newsletter FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Public can submit testimonials" ON testimonials;
CREATE POLICY "Public can submit testimonials" ON testimonials FOR INSERT WITH CHECK (true);
