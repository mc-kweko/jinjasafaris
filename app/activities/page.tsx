export const dynamic = 'force-dynamic';

import type { Metadata } from 'next';

import { supabase } from '@/lib/supabase';
import ActivityCard from '@/components/ActivityCard';

async function getActivities() {
  const { data } = await supabase.from('activities').select('*').eq('is_active', true);
  return data || [];
}

export const metadata: Metadata = {
  title: 'Activities in Jinja, Uganda',
  description: 'Explore Jinja Safaris activities including white water rafting, skydiving, Nile tubing, trekking, and bird watching.',
  keywords: ['activities in Jinja', 'white water rafting Jinja', 'skydiving Uganda', 'Nile tubing', 'bird watching Uganda'],
  alternates: { canonical: '/activities' },
  openGraph: {
    title: 'Activities in Jinja, Uganda | Jinja Safaris',
    description: 'Browse adventure activities and book your Nile experience.',
    url: '/activities',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Activities in Jinja, Uganda | Jinja Safaris',
    description: 'Browse adventure activities and book your Nile experience.',
  },
};

export default async function ActivitiesPage() {
  const activities = await getActivities();

  return (
    <div className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">Our Activities</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Choose your adventure on the Nile
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activities.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </div>

        {activities.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No activities available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
}
