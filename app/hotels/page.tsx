export const dynamic = 'force-dynamic';

import type { Metadata } from 'next';

import { supabase } from '@/lib/supabase';
import Image from 'next/image';

async function getHotels() {
  const { data } = await supabase.from('hotels').select('*').eq('is_active', true);
  return data || [];
}

export const metadata: Metadata = {
  title: 'Partner Hotels in Jinja',
  description: 'Discover partner hotels and accommodation options for your Jinja Safari adventure.',
  keywords: ['Jinja hotels', 'partner hotels Jinja', 'accommodation in Jinja', 'Nile resort'],
  alternates: { canonical: '/hotels' },
  openGraph: {
    title: 'Partner Hotels in Jinja | Jinja Safaris',
    description: 'Browse accommodation options near the Nile.',
    url: '/hotels',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Partner Hotels in Jinja | Jinja Safaris',
    description: 'Browse accommodation options near the Nile.',
  },
};

export default async function HotelsPage() {
  const hotels = await getHotels();

  return (
    <div className="py-24 px-4 safari-pattern">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="safari-heading mb-6">Partner Hotels</h1>
          <p className="text-2xl text-safari-brown dark:text-safari-sand">
            Comfortable stays for your Jinja adventure
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hotels.map((hotel) => (
            <div key={hotel.id} className="safari-card group">
              <div className="relative h-72 overflow-hidden">
                <Image
                  src={hotel.image_url || '/images/placeholder.jpg'}
                  alt={hotel.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{hotel.name}</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">{hotel.description}</p>
                <a
                  href={`https://wa.me/256123456789?text=I'm interested in ${hotel.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="safari-btn w-full text-center block"
                >
                  Inquire Now
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
