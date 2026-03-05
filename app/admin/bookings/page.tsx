'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { Booking, Activity } from '@/types';
import { formatDate, formatCurrency } from '@/utils/helpers';

export default function AdminBookingsPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState<(Booking & { activity?: Activity })[]>([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
    fetchBookings();
  }, [filter]);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      router.push('/admin');
    }
  };

  const fetchBookings = async () => {
    let query = supabase.from('bookings').select(`
      *,
      activity:activities(name)
    `).order('created_at', { ascending: false });

    if (filter !== 'all') {
      query = query.eq('status', filter);
    }

    const { data } = await query;
    setBookings(data || []);
    setLoading(false);
  };

  const updateStatus = async (id: string, status: string) => {
    await supabase.from('bookings').update({ status }).eq('id', id);
    fetchBookings();
  };

  const exportToCSV = () => {
    const csv = [
      ['Date', 'Customer', 'Email', 'Phone', 'Activity', 'People', 'Total', 'Status'],
      ...bookings.map(b => [
        formatDate(b.created_at),
        b.customer_name,
        b.customer_email,
        b.customer_phone,
        (b.activity as any)?.name || '',
        b.number_of_people,
        b.total_price,
        b.status,
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bookings-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Manage Bookings</h1>
          <button
            onClick={exportToCSV}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition"
          >
            Export CSV
          </button>
        </div>

        <div className="mb-6 flex gap-4">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg ${filter === 'all' ? 'bg-primary text-white' : 'bg-white dark:bg-gray-800'}`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 rounded-lg ${filter === 'pending' ? 'bg-primary text-white' : 'bg-white dark:bg-gray-800'}`}
          >
            Pending
          </button>
          <button
            onClick={() => setFilter('confirmed')}
            className={`px-4 py-2 rounded-lg ${filter === 'confirmed' ? 'bg-primary text-white' : 'bg-white dark:bg-gray-800'}`}
          >
            Confirmed
          </button>
          <button
            onClick={() => setFilter('cancelled')}
            className={`px-4 py-2 rounded-lg ${filter === 'cancelled' ? 'bg-primary text-white' : 'bg-white dark:bg-gray-800'}`}
          >
            Cancelled
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Activity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">People</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Total</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {bookings.map((booking) => (
                  <tr key={booking.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{formatDate(booking.booking_date)}</td>
                    <td className="px-6 py-4 text-sm">
                      <div>{booking.customer_name}</div>
                      <div className="text-gray-500 text-xs">{booking.customer_email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{(booking.activity as any)?.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{booking.number_of_people}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold">{formatCurrency(booking.total_price)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                        booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <select
                        value={booking.status}
                        onChange={(e) => updateStatus(booking.id, e.target.value)}
                        className="border rounded px-2 py-1 dark:bg-gray-700"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
