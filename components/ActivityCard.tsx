'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Activity } from '@/types';

interface ActivityCardProps {
  activity: Activity;
  currency?: 'USD' | 'UGX';
}

export default function ActivityCard({ activity, currency = 'USD' }: ActivityCardProps) {
  const price = currency === 'USD'
    ? activity.base_price_international
    : activity.base_price_international * 3700;

  const priceDisplay = currency === 'USD'
    ? `$${price}`
    : `UGX ${price.toLocaleString()}`;

  return (
    <div className="safari-card group">
      <div className="relative h-56 sm:h-64 md:h-72 overflow-hidden">
        <Image
          src={activity.image_url || '/images/placeholder.jpg'}
          alt={activity.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 sm:mb-2">{activity.name}</h3>
          <p className="text-white/90 text-xs sm:text-sm line-clamp-2">{activity.short_description}</p>
        </div>
      </div>
      <div className="p-4 sm:p-6">
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <div>
            <p className="text-xs text-safari-brown/70 dark:text-safari-sand/70">Starting from</p>
            <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-safari-orange to-safari-sand bg-clip-text text-transparent">{priceDisplay}</p>
          </div>
        </div>
        <Link href={`/booking?activity=${activity.id}`} className="safari-btn w-full text-center block text-sm sm:text-base">
          Book Now
        </Link>
      </div>
    </div>
  );
}
