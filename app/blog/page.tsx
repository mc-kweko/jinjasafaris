export const dynamic = 'force-dynamic';

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

export const metadata = {
  title: 'Blog - Jinja Safaris',
  description: 'Travel tips, stories, and adventure guides',
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">Our Blog</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Stories, tips, and guides for your adventure
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`}>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
                {post.featured_image && (
                  <div className="relative h-48">
                    <Image
                      src={post.featured_image}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  <p className="text-sm text-gray-500 mb-2">{formatDate(post.created_at)}</p>
                  <h3 className="text-xl font-bold mb-2 hover:text-primary">{post.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{post.excerpt}</p>
                  <p className="text-primary font-semibold mt-4">Read more →</p>
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
