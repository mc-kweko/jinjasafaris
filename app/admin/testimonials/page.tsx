'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { Testimonial } from '@/types';

export default function AdminTestimonialsPage() {
  const router = useRouter();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [filter, setFilter] = useState('pending');

  useEffect(() => {
    checkAuth();
    fetchTestimonials();
  }, [filter]);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      router.push('/admin');
    }
  };

  const fetchTestimonials = async () => {
    let query = supabase.from('testimonials').select('*').order('created_at', { ascending: false });
    
    if (filter === 'pending') {
      query = query.eq('is_approved', false);
    } else if (filter === 'approved') {
      query = query.eq('is_approved', true);
    }

    const { data } = await query;
    setTestimonials(data || []);
  };

  const approveTestimonial = async (id: string) => {
    await supabase.from('testimonials').update({ is_approved: true }).eq('id', id);
    fetchTestimonials();
  };

  const toggleFeatured = async (id: string, isFeatured: boolean) => {
    await supabase.from('testimonials').update({ is_featured: !isFeatured }).eq('id', id);
    fetchTestimonials();
  };

  const deleteTestimonial = async (id: string) => {
    if (confirm('Are you sure you want to delete this testimonial?')) {
      await supabase.from('testimonials').delete().eq('id', id);
      fetchTestimonials();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Testimonials Manager</h1>

        <div className="mb-6 flex gap-4">
          <button
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 rounded-lg ${filter === 'pending' ? 'bg-primary text-white' : 'bg-white dark:bg-gray-800'}`}
          >
            Pending
          </button>
          <button
            onClick={() => setFilter('approved')}
            className={`px-4 py-2 rounded-lg ${filter === 'approved' ? 'bg-primary text-white' : 'bg-white dark:bg-gray-800'}`}
          >
            Approved
          </button>
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg ${filter === 'all' ? 'bg-primary text-white' : 'bg-white dark:bg-gray-800'}`}
          >
            All
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold">{testimonial.customer_name}</h3>
                  <p className="text-sm text-gray-500">{testimonial.customer_country}</p>
                </div>
                <div className="flex gap-2">
                  {testimonial.is_approved && (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Approved</span>
                  )}
                  {testimonial.is_featured && (
                    <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">Featured</span>
                  )}
                </div>
              </div>

              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`text-xl ${i < testimonial.rating ? 'text-accent' : 'text-gray-300'}`}>
                    ★
                  </span>
                ))}
              </div>

              <p className="text-gray-700 dark:text-gray-300 mb-4 italic">&quot;{testimonial.comment}&quot;</p>

              <div className="flex gap-2 flex-wrap">
                {!testimonial.is_approved && (
                  <button
                    onClick={() => approveTestimonial(testimonial.id)}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition text-sm"
                  >
                    Approve
                  </button>
                )}
                {testimonial.is_approved && (
                  <button
                    onClick={() => toggleFeatured(testimonial.id, testimonial.is_featured)}
                    className={`${
                      testimonial.is_featured ? 'bg-yellow-500' : 'bg-blue-500'
                    } hover:opacity-80 text-white px-4 py-2 rounded-lg transition text-sm`}
                  >
                    {testimonial.is_featured ? 'Unfeature' : 'Feature'}
                  </button>
                )}
                <button
                  onClick={() => deleteTestimonial(testimonial.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {testimonials.length === 0 && (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg">
            <p className="text-gray-500">No testimonials found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
