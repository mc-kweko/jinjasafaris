export const dynamic = 'force-dynamic';

import type { Metadata } from 'next';

import { supabase } from '@/lib/supabase';
import Image from 'next/image';

async function getGalleryImages() {
  const { data } = await supabase.from('gallery_images').select('*').order('created_at', { ascending: false });
  return data || [];
}

export const metadata: Metadata = {
  title: 'Photo Gallery of Jinja Safaris Adventures',
  description: 'View photos from Jinja Safaris adventures, activities, landscapes, and accommodation experiences.',
  keywords: ['Jinja Safaris gallery', 'Jinja adventure photos', 'Uganda tourism gallery'],
  alternates: { canonical: '/gallery' },
  openGraph: {
    title: 'Photo Gallery of Jinja Safaris Adventures',
    description: 'Browse adventure and tourism photos from Jinja, Uganda.',
    url: '/gallery',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Photo Gallery of Jinja Safaris Adventures',
    description: 'Browse adventure and tourism photos from Jinja, Uganda.',
  },
};

export default async function GalleryPage() {
  const images = await getGalleryImages();

  const categories = ['All', ...new Set(images.map(img => img.category).filter(Boolean))];

  return (
    <div className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">Gallery</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Moments from our adventures
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image) => (
            <div key={image.id} className="relative h-64 rounded-lg overflow-hidden group cursor-pointer">
              <Image
                src={image.image_url}
                alt={image.caption || 'Gallery image'}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
              {image.caption && (
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-70 transition-all flex items-center justify-center">
                  <p className="text-white opacity-0 group-hover:opacity-100 transition-opacity px-4 text-center">
                    {image.caption}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {images.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No images in gallery yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
