import { getBlogPost, getRelatedPosts } from '@/lib/api';
import BlogContent from '@/components/blog/blog-content';
import RelatedPosts from '@/components/blog/related-posts';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export async function generateMetadata({ 
  params 
}: { 
  params: { slug: string } 
}): Promise<Metadata> {
  const post = await getBlogPost(params.slug);
  
  if (!post) {
    return {
      title: 'مقاله یافت نشد | فروشگاه قطعات رنو',
    };
  }

  return {
    title: `${post.title.rendered} | فروشگاه قطعات رنو`,
    description: post.excerpt.rendered.replace(/<[^>]*>/g, '').slice(0, 160),
    openGraph: {
      images: post.featured_media_url ? [post.featured_media_url] : [],
    },
  };
}

export default async function BlogPostPage({ 
  params 
}: { 
  params: { slug: string } 
}) {
  const post = await getBlogPost(params.slug);
  
  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(post.id, 3);

  return (
    <div className="container mx-auto px-4 py-8">
      <BlogContent post={post} />
      {relatedPosts.length > 0 && (
        <RelatedPosts posts={relatedPosts} />
      )}
    </div>
  );
}