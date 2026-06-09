export const dynamic = 'force-dynamic';

import type { Metadata } from 'next';
import { supabase } from '@/lib/supabase';
import HeroSlideshow from '@/components/HeroSlideshow';
import ActivityCard from '@/components/ActivityCard';
import NewsletterForm from '@/components/NewsletterForm';
import Link from 'next/link';
import Image from 'next/image';
import { FaShieldAlt, FaCertificate, FaUsers, FaLock } from 'react-icons/fa';

export const metadata: Metadata = {
  title: 'Jinja Safaris - Hub of the Nile Tourism',
  description: 'Jinja Safaris is a tourism and adventure company in Jinja, Uganda offering white water rafting, skydiving, Nile tubing, trekking, bird watching, hotels, and bookings.',
  keywords: ['Jinja Safaris', 'Jinja Uganda tourism', 'white water rafting', 'skydiving Uganda', 'Nile tubing', 'Jinja adventure tours'],
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Jinja Safaris - Hub of the Nile Tourism',
    description: 'Adventure bookings, partner hotels, gallery, and travel experiences in Jinja, Uganda.',
    url: '/',
    type: 'website',
    siteName: 'Jinja Safaris',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jinja Safaris - Hub of the Nile Tourism',
    description: 'Adventure bookings, partner hotels, gallery, and travel experiences in Jinja, Uganda.',
  },
};

async function getHomeData() {
  const [slidesRes, activitiesRes, hotelsRes, testimonialsRes] = await Promise.all([
    supabase.from('slideshow_images').select('*').eq('is_active', true).order('order_index'),
    supabase.from('activities').select('*').eq('is_active', true).limit(5),
    supabase.from('hotels').select('*').eq('is_active', true),
    supabase.from('testimonials').select('*').eq('is_approved', true).eq('is_featured', true).limit(3),
  ]);

  return {
    slides: slidesRes.data || [],
    activities: activitiesRes.data || [],
    hotels: hotelsRes.data || [],
    testimonials: testimonialsRes.data || [],
  };
}

export default async function HomePage() {
  const { slides, activities, hotels, testimonials } = await getHomeData();

  return (
    <>
      <HeroSlideshow slides={slides} />

      {/* Featured Activities */}
      <section className="py-12 sm:py-16 md:py-20 px-4 safari-pattern">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-14 animate-fade-in">
            <h2 className="safari-heading mb-3 sm:mb-4">Our Adventures</h2>
            <p className="text-base sm:text-xl text-safari-brown dark:text-safari-sand">Experience the thrill of the Nile</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {activities.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
          </div>
          <div className="text-center mt-8 sm:mt-12">
            <p className="text-xs sm:text-sm text-safari-brown/70 dark:text-safari-sand/70 mb-4 sm:mb-6">* Prices vary by season and tourist type (local/international)</p>
            <Link href="/activities" className="safari-btn">View All Activities</Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 sm:py-16 md:py-20 px-4 bg-gradient-to-b from-safari-cream to-white dark:from-safari-dark dark:to-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="safari-heading mb-3 sm:mb-4">Why Choose Jinja Safaris</h2>
            <p className="text-base sm:text-xl text-safari-brown dark:text-safari-sand">Your trusted adventure partner since 2014</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {[
              { icon: <FaCertificate size={28} />, title: 'Certified Guides', desc: 'Professional and experienced tour guides' },
              { icon: <FaShieldAlt size={28} />, title: 'Safety First', desc: 'Top-notch safety equipment and protocols' },
              { icon: <FaUsers size={28} />, title: 'Since 2014', desc: 'Trusted local experts with years of experience' },
              { icon: <FaLock size={28} />, title: 'Secure Booking', desc: 'Safe and easy online booking system' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="text-center group">
                <div className="bg-gradient-to-br from-safari-orange to-safari-sand text-white w-14 h-14 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  {icon}
                </div>
                <h3 className="text-sm sm:text-xl font-bold mb-2 sm:mb-3 text-safari-brown dark:text-safari-sand">{title}</h3>
                <p className="text-xs sm:text-base text-gray-600 dark:text-gray-400">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Hotels */}
      <section className="py-12 sm:py-16 md:py-20 px-4 safari-pattern">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="safari-heading mb-3 sm:mb-4">Partner Hotels</h2>
            <p className="text-base sm:text-xl text-safari-brown dark:text-safari-sand">Comfortable accommodation for your stay</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {hotels.map((hotel) => (
              <div key={hotel.id} className="safari-card group">
                <div className="relative h-48 sm:h-56 overflow-hidden">
                  <Image
                    src={hotel.image_url || '/images/placeholder.jpg'}
                    alt={hotel.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <div className="p-4 sm:p-6">
                  <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-safari-brown dark:text-safari-sand">{hotel.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{hotel.description}</p>
                  <Link href="/hotels" className="inline-flex items-center text-safari-orange hover:text-safari-brown font-semibold transition text-sm sm:text-base">
                    View Details <span className="ml-2">→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="py-12 sm:py-16 md:py-20 px-4 bg-gradient-to-b from-safari-cream to-white dark:from-safari-dark dark:to-gray-900">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10 sm:mb-14">
              <h2 className="safari-heading mb-3 sm:mb-4">What Our Guests Say</h2>
              <p className="text-base sm:text-xl text-safari-brown dark:text-safari-sand">Real experiences from real adventurers</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="safari-card p-6 sm:p-8 hover:scale-105 transition-transform duration-300">
                  <div className="flex mb-4 sm:mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-safari-orange text-xl sm:text-2xl">★</span>
                    ))}
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4 sm:mb-6 italic text-sm sm:text-lg">&quot;{testimonial.comment}&quot;</p>
                  <div className="border-t border-safari-sand/30 pt-4">
                    <p className="font-bold text-safari-brown dark:text-safari-sand">{testimonial.customer_name}</p>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{testimonial.customer_country}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter */}
      <section className="py-12 sm:py-16 md:py-20 px-4 bg-gradient-to-r from-safari-brown via-safari-orange to-safari-sand text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">Stay Updated</h2>
          <p className="text-sm sm:text-lg mb-6 sm:mb-8 opacity-90">Subscribe to our newsletter for exclusive deals and adventure tips</p>
          <NewsletterForm />
        </div>
      </section>
    </>
  );
}
