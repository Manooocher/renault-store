import { getBlogPosts, getBlogCategories } from '@/lib/api';
import BlogList from '@/components/blog/blog-list';
import BlogSidebar from '@/components/blog/blog-sidebar';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'وبلاگ | فروشگاه قطعات رنو',
  description: 'آخرین مقالات و اخبار در مورد خودروهای رنو و قطعات آن',
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page = typeof searchParams.page === 'string' ? parseInt(searchParams.page) : 1;
  const category = typeof searchParams.category === 'string' ? searchParams.category : undefined;

  const [posts, categories] = await Promise.all([
    getBlogPosts({ 
      per_page: 9, 
      page, 
      category 
    }),
    getBlogCategories(),
  ]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">وبلاگ</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-2/3">
          <BlogList posts={posts} />
        </div>
        <div className="w-full lg:w-1/3">
          <BlogSidebar categories={categories} />
        </div>
      </div>
    </div>
  );
}