export const dynamic = 'force-dynamic';

import { supabase } from '@/lib/supabase';
import Image from 'next/image';

async function getHotels() {
  const { data } = await supabase.from('hotels').select('*').eq('is_active', true);
  return data || [];
}

export const metadata = {
  title: 'Partner Hotels - Jinja Safaris',
  description: 'Comfortable accommodation options in Jinja',
};

export default async function HotelsPage() {
  const hotels = await getHotels();

  return (
    <div className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">Partner Hotels</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Comfortable stays for your Jinja adventure
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hotels.map((hotel) => (
            <div key={hotel.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
              <div className="relative h-64">
                <Image
                  src={hotel.image_url || '/images/placeholder.jpg'}
                  alt={hotel.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3">{hotel.name}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{hotel.description}</p>
                <a
                  href={`https://wa.me/256123456789?text=I'm interested in ${hotel.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-primary hover:bg-secondary text-white px-6 py-2 rounded-full transition"
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
