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
    supabase.from('hotels').select('*').eq('is_active', true).limit(5),
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
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Our Adventures</h2>
            <p className="text-gray-600 dark:text-gray-400">Experience the thrill of the Nile</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activities.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
          </div>
          <div className="text-center mt-8">
            <p className="text-sm text-gray-500 mb-4">* Prices vary by season and tourist type (local/international)</p>
            <Link href="/activities" className="inline-block bg-primary hover:bg-secondary text-white px-8 py-3 rounded-full transition">
              View All Activities
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-4 bg-gray-100 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Why Choose Jinja Safaris</h2>
            <p className="text-gray-600 dark:text-gray-400">Your trusted adventure partner since 2014</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCertificate size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Certified Guides</h3>
              <p className="text-gray-600 dark:text-gray-400">Professional and experienced tour guides</p>
            </div>
            <div className="text-center">
              <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaShieldAlt size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Safety First</h3>
              <p className="text-gray-600 dark:text-gray-400">Top-notch safety equipment and protocols</p>
            </div>
            <div className="text-center">
              <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUsers size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Since 2014</h3>
              <p className="text-gray-600 dark:text-gray-400">Trusted local experts with years of experience</p>
            </div>
            <div className="text-center">
              <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaLock size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Booking</h3>
              <p className="text-gray-600 dark:text-gray-400">Safe and easy online booking system</p>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Hotels */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Partner Hotels</h2>
            <p className="text-gray-600 dark:text-gray-400">Comfortable accommodation for your stay</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hotels.map((hotel) => (
              <div key={hotel.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={hotel.image_url || '/images/placeholder.jpg'}
                    alt={hotel.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{hotel.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{hotel.description}</p>
                  <Link href="/hotels" className="text-primary hover:text-secondary font-semibold">
                    View Details →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="py-16 px-4 bg-gray-100 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">What Our Guests Say</h2>
              <p className="text-gray-600 dark:text-gray-400">Real experiences from real adventurers</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-accent text-xl">★</span>
                    ))}
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4 italic">&quot;{testimonial.comment}&quot;</p>
                  <p className="font-semibold">{testimonial.customer_name}</p>
                  <p className="text-sm text-gray-500">{testimonial.customer_country}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter */}
      <section className="py-16 px-4 bg-primary text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="mb-8">Subscribe to our newsletter for exclusive deals and adventure tips</p>
          <NewsletterForm />
        </div>
      </section>
    </>
  );
}
