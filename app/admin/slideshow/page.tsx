'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { SlideshowImage } from '@/types';

export default function AdminSlideshowPage() {
  const router = useRouter();
  const [slides, setSlides] = useState<SlideshowImage[]>([]);
  const [newSlide, setNewSlide] = useState({ title: '', subtitle: '', image_url: '' });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    checkAuth();
    fetchSlides();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      router.push('/admin');
    }
  };

  const fetchSlides = async () => {
    const { data } = await supabase.from('slideshow_images').select('*').order('order_index');
    setSlides(data || []);
  };

  const addSlide = async () => {
    if (!newSlide.title || (!selectedFile && !newSlide.image_url)) {
      alert('Please fill in title and select a file or provide an image URL');
      return;
    }

    setUploading(true);

    let imageUrl = newSlide.image_url;

    if (selectedFile) {
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `slideshow/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('slideshow')
        .upload(filePath, selectedFile);

      if (uploadError) {
        alert('Error uploading file: ' + uploadError.message);
        setUploading(false);
        return;
      }

      const { data } = supabase.storage
        .from('slideshow')
        .getPublicUrl(filePath);

      imageUrl = data.publicUrl;
    }

    await supabase.from('slideshow_images').insert([{
      title: newSlide.title,
      subtitle: newSlide.subtitle,
      image_url: imageUrl,
      order_index: slides.length,
      is_active: true,
    }]);

    setNewSlide({ title: '', subtitle: '', image_url: '' });
    setSelectedFile(null);
    fetchSlides();
    setUploading(false);
  };

  const toggleActive = async (id: string, isActive: boolean) => {
    await supabase.from('slideshow_images').update({ is_active: !isActive }).eq('id', id);
    fetchSlides();
  };

  const deleteSlide = async (id: string) => {
    if (confirm('Are you sure you want to delete this slide?')) {
      await supabase.from('slideshow_images').delete().eq('id', id);
      fetchSlides();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Slideshow Manager</h1>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-xl font-bold mb-4">Add New Slide</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Title"
              value={newSlide.title}
              onChange={(e) => setNewSlide({ ...newSlide, title: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700"
            />
            <input
              type="text"
              placeholder="Subtitle"
              value={newSlide.subtitle}
              onChange={(e) => setNewSlide({ ...newSlide, subtitle: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700"
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
              value={newSlide.image_url}
              onChange={(e) => setNewSlide({ ...newSlide, image_url: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700"
            />
            <button
              onClick={addSlide}
              disabled={uploading}
              className="bg-primary hover:bg-secondary disabled:opacity-50 text-white px-6 py-2 rounded-lg transition"
            >
              {uploading ? 'Uploading...' : 'Add Slide'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {slides.map((slide) => (
            <div key={slide.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <div
                className="h-48 bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.image_url})` }}
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{slide.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{slide.subtitle}</p>
                <div className="flex gap-4">
                  <button
                    onClick={() => toggleActive(slide.id, slide.is_active)}
                    className={`${
                      slide.is_active ? 'bg-yellow-500' : 'bg-green-500'
                    } hover:opacity-80 text-white px-4 py-2 rounded-lg transition`}
                  >
                    {slide.is_active ? 'Deactivate' : 'Activate'}
                  </button>
                  <button
                    onClick={() => deleteSlide(slide.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
