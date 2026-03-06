'use client';

import { useState, useEffect, Suspense } from 'react';
import { supabase } from '@/lib/supabase';
import { Activity } from '@/types';
import { formatCurrency, calculateDeposit, validateEmail, validatePhone } from '@/utils/helpers';
import { useSearchParams } from 'next/navigation';

function BookingForm() {
  const searchParams = useSearchParams();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [currency, setCurrency] = useState<'USD' | 'UGX'>('USD');
  
  const [formData, setFormData] = useState({
    activity_id: searchParams.get('activity') || '',
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    nationality: '',
    booking_date: '',
    number_of_people: 1,
    is_local: false,
    special_requests: '',
  });

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    const { data } = await supabase.from('activities').select('*').eq('is_active', true);
    if (data) setActivities(data);
  };

  const selectedActivity = activities.find(a => a.id === formData.activity_id);
  const pricePerPerson = selectedActivity 
    ? (formData.is_local ? selectedActivity.base_price_local : selectedActivity.base_price_international)
    : 0;
  const totalPrice = pricePerPerson * formData.number_of_people;
  const deposit = calculateDeposit(totalPrice);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(formData.customer_email)) {
      alert('Please enter a valid email');
      return;
    }
    
    if (!validatePhone(formData.customer_phone)) {
      alert('Please enter a valid phone number');
      return;
    }

    setLoading(true);

    const { error } = await supabase.from('bookings').insert([{
      ...formData,
      total_price: totalPrice,
      deposit_paid: deposit,
      status: 'pending',
      payment_status: 'pending',
    }]);

    setLoading(false);

    if (error) {
      alert('Booking failed. Please try again.');
    } else {
      setSuccess(true);
      setFormData({
        activity_id: '',
        customer_name: '',
        customer_email: '',
        customer_phone: '',
        nationality: '',
        booking_date: '',
        number_of_people: 1,
        is_local: false,
        special_requests: '',
      });
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-md text-center">
          <div className="text-green-500 text-6xl mb-4">✓</div>
          <h2 className="text-2xl font-bold mb-4">Booking Successful!</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Thank you for your booking. We&apos;ll send you a confirmation email shortly.
          </p>
          <button
            onClick={() => setSuccess(false)}
            className="bg-primary hover:bg-secondary text-white px-6 py-2 rounded-full transition"
          >
            Make Another Booking
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Book Your Adventure</h1>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <div className="mb-6 flex justify-end">
            <button
              onClick={() => setCurrency(currency === 'USD' ? 'UGX' : 'USD')}
              className="bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded-lg"
            >
              Currency: {currency}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-2 font-semibold">Select Activity *</label>
              <select
                value={formData.activity_id}
                onChange={(e) => setFormData({ ...formData, activity_id: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                required
              >
                <option value="">Choose an activity</option>
                {activities.map((activity) => (
                  <option key={activity.id} value={activity.id}>
                    {activity.name} - {formatCurrency(
                      formData.is_local ? activity.base_price_local : activity.base_price_international,
                      currency
                    )}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 font-semibold">Full Name *</label>
                <input
                  type="text"
                  value={formData.customer_name}
                  onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold">Email *</label>
                <input
                  type="email"
                  value={formData.customer_email}
                  onChange={(e) => setFormData({ ...formData, customer_email: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold">Phone *</label>
                <input
                  type="tel"
                  value={formData.customer_phone}
                  onChange={(e) => setFormData({ ...formData, customer_phone: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold">Nationality *</label>
                <input
                  type="text"
                  value={formData.nationality}
                  onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold">Booking Date *</label>
                <input
                  type="date"
                  value={formData.booking_date}
                  onChange={(e) => setFormData({ ...formData, booking_date: e.target.value })}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold">Number of People *</label>
                <input
                  type="number"
                  min="1"
                  value={formData.number_of_people}
                  onChange={(e) => setFormData({ ...formData, number_of_people: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                  required
                />
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.is_local}
                  onChange={(e) => setFormData({ ...formData, is_local: e.target.checked })}
                  className="w-5 h-5"
                />
                <span className="font-semibold">I am a local tourist (Ugandan resident)</span>
              </label>
            </div>

            <div>
              <label className="block mb-2 font-semibold">Special Requests</label>
              <textarea
                value={formData.special_requests}
                onChange={(e) => setFormData({ ...formData, special_requests: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                rows={4}
              />
            </div>

            {selectedActivity && (
              <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4">Booking Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Activity:</span>
                    <span className="font-semibold">{selectedActivity.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Price per person:</span>
                    <span className="font-semibold">{formatCurrency(pricePerPerson, currency)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Number of people:</span>
                    <span className="font-semibold">{formData.number_of_people}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t pt-2">
                    <span>Total Price:</span>
                    <span>{formatCurrency(totalPrice, currency)}</span>
                  </div>
                  <div className="flex justify-between text-primary">
                    <span>Deposit Required (30%):</span>
                    <span className="font-bold">{formatCurrency(deposit, currency)}</span>
                  </div>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-secondary text-white py-3 rounded-full text-lg font-semibold transition disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Confirm Booking'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <BookingForm />
    </Suspense>
  );
}
