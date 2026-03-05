export const dynamic = 'force-dynamic';

import { supabase } from '@/lib/supabase';
import HeroSlideshow from '@/components/HeroSlideshow';
import ActivityCard from '@/components/ActivityCard';
import NewsletterForm from '@/components/NewsletterForm';
import Link from 'next/link';
import Image from 'next/image';
import { FaShieldAlt, FaCertificate, FaUsers, FaLock } from 'react-icons/fa';

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
      <section className="py-20 px-4 safari-pattern">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="safari-heading mb-4">Our Adventures</h2>
            <p className="text-xl text-safari-brown dark:text-safari-sand">Experience the thrill of the Nile</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activities.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
          </div>
          <div className="text-center mt-12">
            <p className="text-sm text-safari-brown/70 dark:text-safari-sand/70 mb-6">* Prices vary by season and tourist type (local/international)</p>
            <Link href="/activities" className="safari-btn">
              View All Activities
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-4 bg-gradient-to-b from-safari-cream to-white dark:from-safari-dark dark:to-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="safari-heading mb-4">Why Choose Jinja Safaris</h2>
            <p className="text-xl text-safari-brown dark:text-safari-sand">Your trusted adventure partner since 2014</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="bg-gradient-to-br from-safari-orange to-safari-sand text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <FaCertificate size={36} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-safari-brown dark:text-safari-sand">Certified Guides</h3>
              <p className="text-gray-600 dark:text-gray-400">Professional and experienced tour guides</p>
            </div>
            <div className="text-center group">
              <div className="bg-gradient-to-br from-safari-orange to-safari-sand text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <FaShieldAlt size={36} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-safari-brown dark:text-safari-sand">Safety First</h3>
              <p className="text-gray-600 dark:text-gray-400">Top-notch safety equipment and protocols</p>
            </div>
            <div className="text-center group">
              <div className="bg-gradient-to-br from-safari-orange to-safari-sand text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <FaUsers size={36} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-safari-brown dark:text-safari-sand">Since 2014</h3>
              <p className="text-gray-600 dark:text-gray-400">Trusted local experts with years of experience</p>
            </div>
            <div className="text-center group">
              <div className="bg-gradient-to-br from-safari-orange to-safari-sand text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <FaLock size={36} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-safari-brown dark:text-safari-sand">Secure Booking</h3>
              <p className="text-gray-600 dark:text-gray-400">Safe and easy online booking system</p>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Hotels */}
      <section className="py-20 px-4 safari-pattern">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="safari-heading mb-4">Partner Hotels</h2>
            <p className="text-xl text-safari-brown dark:text-safari-sand">Comfortable accommodation for your stay</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hotels.map((hotel) => (
              <div key={hotel.id} className="safari-card group">
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={hotel.image_url || '/images/placeholder.jpg'}
                    alt={hotel.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-3 text-safari-brown dark:text-safari-sand">{hotel.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{hotel.description}</p>
                  <Link href="/hotels" className="inline-flex items-center text-safari-orange hover:text-safari-brown font-semibold transition">
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
        <section className="py-20 px-4 bg-gradient-to-b from-safari-cream to-white dark:from-safari-dark dark:to-gray-900">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="safari-heading mb-4">What Our Guests Say</h2>
              <p className="text-xl text-safari-brown dark:text-safari-sand">Real experiences from real adventurers</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="safari-card p-8 hover:scale-105 transition-transform duration-300">
                  <div className="flex mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-safari-orange text-2xl">★</span>
                    ))}
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-6 italic text-lg">&quot;{testimonial.comment}&quot;</p>
                  <div className="border-t border-safari-sand/30 pt-4">
                    <p className="font-bold text-safari-brown dark:text-safari-sand">{testimonial.customer_name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.customer_country}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter */}
      <section className="py-20 px-4 bg-gradient-to-r from-safari-brown via-safari-orange to-safari-sand text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Stay Updated</h2>
          <p className="text-lg mb-8 opacity-90">Subscribe to our newsletter for exclusive deals and adventure tips</p>
          <NewsletterForm />
        </div>
      </section>
    </>
  );
}
