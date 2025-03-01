import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { CalendarIcon, FileText } from 'lucide-react';

export default function LatestBlogs({ posts }: { posts: any[] }) {
  return (
    <section className="my-16">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">آخرین مقالات</h2>
        <Button variant="outline" asChild>
          <Link href="/blog">مشاهده همه</Link>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Card key={post.id} className="overflow-hidden product-card">
            <Link href={`/blog/${post.slug}`} className="block">
              <div className="relative h-48 w-full">
                {post.featured_media_url ? (
                  <Image
                    src={post.featured_media_url}
                    alt={post.title.rendered}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 bg-muted flex items-center justify-center">
                    <FileText className="h-12 w-12 text-muted-foreground" />
                  </div>
                )}
              </div>
            </Link>
            
            <CardContent className="pt-4">
              <div className="flex items-center text-sm text-muted-foreground mb-2">
                <CalendarIcon className="h-4 w-4 ml-1" />
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString('fa-IR')}
                </time>
              </div>
              
              <Link href={`/blog/${post.slug}`} className="block">
                <h3 className="font-medium line-clamp-2 mb-2">
                  {post.title.rendered}
                </h3>
              </Link>
              
              <div 
                className="text-muted-foreground text-sm line-clamp-3"
                dangerouslySetInnerHTML={{ 
                  __html: post.excerpt.rendered 
                }}
              />
            </CardContent>
            
            <CardFooter>
              <Button variant="outline" asChild className="w-full">
                <Link href={`/blog/${post.slug}`}>ادامه مطلب</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}