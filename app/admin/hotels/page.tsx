'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { Hotel } from '@/types';

export default function AdminHotelsPage() {
  const router = useRouter();
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Hotel>>({});
  const [newHotel, setNewHotel] = useState({ name: '', description: '', image_url: '' });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    checkAuth();
    fetchHotels();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      router.push('/admin');
    }
  };

  const fetchHotels = async () => {
    const { data } = await supabase.from('hotels').select('*');
    setHotels(data || []);
  };

  const addHotel = async () => {
    if (!newHotel.name || !newHotel.description || (!selectedFile && !newHotel.image_url)) {
      alert('Please fill in all required fields and select a file or provide an image URL');
      return;
    }

    setUploading(true);

    let imageUrl = newHotel.image_url;

    if (selectedFile) {
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `hotels/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('hotels')
        .upload(filePath, selectedFile);

      if (uploadError) {
        alert('Error uploading file: ' + uploadError.message);
        setUploading(false);
        return;
      }

      const { data } = supabase.storage
        .from('hotels')
        .getPublicUrl(filePath);

      imageUrl = data.publicUrl;
    }

    await supabase.from('hotels').insert([{
      name: newHotel.name,
      description: newHotel.description,
      image_url: imageUrl,
      is_active: true
    }]);

    setNewHotel({ name: '', description: '', image_url: '' });
    setSelectedFile(null);
    fetchHotels();
    setUploading(false);
  };

  const handleEdit = (hotel: Hotel) => {
    setEditing(hotel.id);
    setFormData(hotel);
  };

  const handleSave = async () => {
    if (!editing) return;
    await supabase.from('hotels').update(formData).eq('id', editing);
    setEditing(null);
    fetchHotels();
  };

  const toggleActive = async (id: string, isActive: boolean) => {
    await supabase.from('hotels').update({ is_active: !isActive }).eq('id', id);
    fetchHotels();
  };

  const deleteHotel = async (id: string) => {
    if (confirm('Are you sure you want to delete this hotel?')) {
      await supabase.from('hotels').delete().eq('id', id);
      fetchHotels();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Hotel Manager</h1>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-xl font-bold mb-4">Add New Hotel</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Hotel Name"
              value={newHotel.name}
              onChange={(e) => setNewHotel({ ...newHotel, name: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700"
            />
            <textarea
              placeholder="Description"
              value={newHotel.description}
              onChange={(e) => setNewHotel({ ...newHotel, description: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700"
              rows={3}
            />
            <div>
              <label className="block text-sm font-medium mb-2">Upload Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700"
              />
            </div>
            <input
              type="text"
              placeholder="Or enter Image URL (if not uploading file)"
              value={newHotel.image_url}
              onChange={(e) => setNewHotel({ ...newHotel, image_url: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700"
            />
            <button
              onClick={addHotel}
              disabled={uploading}
              className="bg-primary hover:bg-secondary disabled:opacity-50 text-white px-6 py-2 rounded-lg transition"
            >
              {uploading ? 'Uploading...' : 'Add Hotel'}
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {hotels.map((hotel) => (
            <div key={hotel.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              {editing === hotel.id ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700"
                  />
                  <textarea
                    value={formData.description || ''}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700"
                    rows={3}
                  />
                  <input
                    type="text"
                    value={formData.image_url || ''}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700"
                  />
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
                      <h3 className="text-2xl font-bold">{hotel.name}</h3>
                      <p className="text-gray-600 dark:text-gray-400 mt-2">{hotel.description}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      hotel.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {hotel.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <div className="flex gap-4">
                    <button
                      onClick={() => handleEdit(hotel)}
                      className="bg-primary hover:bg-secondary text-white px-6 py-2 rounded-lg transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => toggleActive(hotel.id, hotel.is_active)}
                      className={`${
                        hotel.is_active ? 'bg-yellow-500' : 'bg-green-500'
                      } hover:opacity-80 text-white px-6 py-2 rounded-lg transition`}
                    >
                      {hotel.is_active ? 'Deactivate' : 'Activate'}
                    </button>
                    <button
                      onClick={() => deleteHotel(hotel.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition"
                    >
                      Delete
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
