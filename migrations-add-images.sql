-- Migration: Add Images to Jinja Safaris
-- This script adds the uploaded images to the slideshow and gallery

-- Ensure activity image URLs are set (in case data existed without images)
UPDATE activities SET image_url='/images/sky-diving.jpg' WHERE name='Skydiving';
UPDATE activities SET image_url='/images/nile-tubing.jpg' WHERE name='Nile Tubing';
UPDATE activities SET image_url='/images/jinja-trekking.jpg' WHERE name='Jinja Trekking';
UPDATE activities SET image_url='/images/bird-watching.jpg' WHERE name='Bird Watching';

-- Insert slideshow images
INSERT INTO slideshow_images (image_url, title, subtitle, order_index, is_active)
VALUES
  ('/images/header-cranes.jpg', 'Jinja Safaris', 'Hub of the Nile Tourism', 0, true),
  ('/images/rafting.jpg', 'White Water Rafting', 'Experience the thrill of the Nile rapids', 1, true),
  ('/images/lodge.jpg', 'Premium Accommodations', 'Enjoy luxury lodges along the Nile', 2, true),
  ('/images/attractions.jpg', 'Discover Attractions', '15 top tourist attractions in Jinja', 3, true);

-- Insert gallery images
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
  ('/images/lodge.jpg', 'Accommodations', 'Scenic lodge views by the Nile');
