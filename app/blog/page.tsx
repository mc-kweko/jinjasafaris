export const dynamic = 'force-dynamic';

import type { Metadata } from 'next';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';
import Link from 'next/link';
import { formatDate } from '@/utils/helpers';

async function getBlogPosts() {
  const { data } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false });
  return data || [];
}

export const metadata: Metadata = {
  title: 'Jinja Safaris Travel Blog',
  description: 'Travel tips, adventure stories, destination guides, and tourism updates from Jinja Safaris.',
  keywords: ['Jinja Safaris blog', 'Uganda travel tips', 'Jinja tourism blog', 'adventure guides'],
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Jinja Safaris Travel Blog',
    description: 'Travel tips, adventure stories, destination guides, and tourism updates.',
    url: '/blog',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jinja Safaris Travel Blog',
    description: 'Travel tips, adventure stories, destination guides, and tourism updates.',
  },
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="py-12 sm:py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">Our Blog</h1>
          <p className="text-base sm:text-xl text-gray-600 dark:text-gray-400">
            Stories, tips, and guides for your adventure
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {posts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`}>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition h-full flex flex-col">
                {post.featured_image && (
                  <div className="relative h-44 sm:h-48 flex-shrink-0">
                    <Image
                      src={post.featured_image}
                      alt={post.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-4 sm:p-6 flex flex-col flex-1">
                  <p className="text-xs sm:text-sm text-gray-500 mb-2">{formatDate(post.created_at)}</p>
                  <h3 className="text-lg sm:text-xl font-bold mb-2 hover:text-primary line-clamp-2">{post.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 flex-1">{post.excerpt}</p>
                  <p className="text-primary font-semibold mt-4 text-sm sm:text-base">Read more →</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No blog posts yet. Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  );
}
