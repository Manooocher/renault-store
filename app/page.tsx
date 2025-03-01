import Hero from '@/components/home/hero';
import FeaturedProducts from '@/components/home/featured-products';
import Categories from '@/components/home/categories';
import LatestBlogs from '@/components/home/latest-blogs';
import { getProducts, getCategories, getBlogPosts } from '@/lib/api';

export default async function Home() {
  const [products, categories, blogPosts] = await Promise.all([
    getProducts({ per_page: 8, featured: true }),
    getCategories({ per_page: 6 }),
    getBlogPosts({ per_page: 3 }),
  ]);

  return (
    <div className="container mx-auto px-4 py-8">
      <Hero />
      <Categories categories={categories} />
      <FeaturedProducts products={products} />
      <LatestBlogs posts={blogPosts} />
    </div>
  );
}