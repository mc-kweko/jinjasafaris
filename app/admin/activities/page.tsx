'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { Activity } from '@/types';

export default function AdminActivitiesPage() {
  const router = useRouter();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Activity>>({});

  useEffect(() => {
    checkAuth();
    fetchActivities();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      router.push('/admin');
    }
  };

  const fetchActivities = async () => {
    const { data } = await supabase.from('activities').select('*');
    setActivities(data || []);
  };

  const handleEdit = (activity: Activity) => {
    setEditing(activity.id);
    setFormData(activity);
  };

  const handleSave = async () => {
    if (!editing) return;

    await supabase.from('activities').update(formData).eq('id', editing);
    setEditing(null);
    fetchActivities();
  };

  const toggleActive = async (id: string, isActive: boolean) => {
    await supabase.from('activities').update({ is_active: !isActive }).eq('id', id);
    fetchActivities();
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Manage Activities</h1>

        <div className="space-y-6">
          {activities.map((activity) => (
            <div key={activity.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              {editing === activity.id ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700"
                    placeholder="Activity Name"
                  />
                  <textarea
                    value={formData.description || ''}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700"
                    placeholder="Description"
                    rows={3}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-2 text-sm">Local Price ($)</label>
                      <input
                        type="number"
                        value={formData.base_price_local || 0}
                        onChange={(e) => setFormData({ ...formData, base_price_local: parseFloat(e.target.value) })}
                        className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm">International Price ($)</label>
                      <input
                        type="number"
                        value={formData.base_price_international || 0}
                        onChange={(e) => setFormData({ ...formData, base_price_international: parseFloat(e.target.value) })}
                        className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700"
                      />
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button
                      onClick={handleSave}
                      className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditing(null)}
                      className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold">{activity.name}</h3>
                      <p className="text-gray-600 dark:text-gray-400 mt-2">{activity.description}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      activity.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {activity.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Local Price</p>
                      <p className="text-xl font-bold">${activity.base_price_local}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">International Price</p>
                      <p className="text-xl font-bold">${activity.base_price_international}</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button
                      onClick={() => handleEdit(activity)}
                      className="bg-primary hover:bg-secondary text-white px-6 py-2 rounded-lg transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => toggleActive(activity.id, activity.is_active)}
                      className={`${
                        activity.is_active ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
                      } text-white px-6 py-2 rounded-lg transition`}
                    >
                      {activity.is_active ? 'Deactivate' : 'Activate'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
