import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPost, getBlogPosts } from "@/lib/api";
import { formatDate, getImagePlaceholder } from "@/lib/utils";
import { CalendarIcon, User, Clock, ArrowRight } from "lucide-react";

interface BlogPostPageProps {
  params: {
    id: string;
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const postId = parseInt(params.id);
  const post = await getBlogPost(postId);
  
  if (!post) {
    notFound();
  }
  
  // Get related posts
  const { posts: relatedPosts } = await getBlogPosts({
    per_page: 3,
    exclude: [postId],
  });
  
  // Estimate reading time (rough calculation)
  const wordCount = post.content.rendered.replace(/<[^>]*>/g, '').split(/\s+/).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200)); // Assuming 200 words per minute
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <Link href="/blog" className="flex items-center text-primary mb-6 hover:underline">
          <ArrowRight className="h-4 w-4 ml-1" />
          بازگشت به وبلاگ
        </Link>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {post.title.rendered}
        </h1>
        
        <div className="flex flex-wrap items-center text-sm text-gray-500 mb-8 gap-4">
          <div className="flex items-center">
            <User className="h-4 w-4 ml-1" />
            <span>نویسنده: ادمین</span>
          </div>
          <div className="flex items-center">
            <CalendarIcon className="h-4 w-4 ml-1" />
            <span>{formatDate(post.date)}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 ml-1" />
            <span>{readingTime} دقیقه مطالعه</span>
          </div>
        </div>
        
        {post.featured_image_url && (
          <div className="mb-8 rounded-lg overflow-hidden">
            <Image
              src={post.featured_image_url}
              alt={post.title.rendered}
              width={800}
              height={450}
              className="w-full object-cover"
            />
          </div>
        )}
        
        <div 
          className="prose prose-lg max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        />
        
        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-12">
            {post.tags.map((tag) => (
              <Link 
                key={tag}
                href={`/blog?tag=${tag}`}
                className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1 rounded-full"
              >
                #{tag}
              </Link>
            ))}
          </div>
        )}
      </div>
      
      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="max-w-5xl mx-auto mt-16">
          <h2 className="text-2xl font-bold mb-6">مقالات مرتبط</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((relatedPost, index) => (
              <Link key={relatedPost.id} href={`/blog/${relatedPost.id}`}>
                <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all">
                  <div className="aspect-video relative overflow-hidden">
                    <Image
                      src={relatedPost.featured_image_url || getImagePlaceholder(index)}
                      alt={relatedPost.title.rendered}
                      fill
                      className="object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <div className="text-sm text-gray-500 mb-1">
                      {formatDate(relatedPost.date)}
                    </div>
                    <h3 className="font-bold text-gray-900 line-clamp-2">
                      {relatedPost.title.rendered}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}