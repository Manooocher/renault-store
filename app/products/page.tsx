import { getProducts, getCategories } from '@/lib/api';
import ProductList from '@/components/products/product-list';
import ProductFilters from '@/components/products/product-filters';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'محصولات | فروشگاه قطعات رنو',
  description: 'مشاهده و خرید انواع قطعات یدکی خودروهای رنو',
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page = typeof searchParams.page === 'string' ? parseInt(searchParams.page) : 1;
  const category = typeof searchParams.category === 'string' ? searchParams.category : undefined;
  const search = typeof searchParams.search === 'string' ? searchParams.search : undefined;

  const [products, categories] = await Promise.all([
    getProducts({ 
      per_page: 12, 
      page, 
      category, 
      search 
    }),
    getCategories({ per_page: 100 }),
  ]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">محصولات</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/4">
          <ProductFilters categories={categories} />
        </div>
        <div className="w-full md:w-3/4">
          <ProductList products={products} />
        </div>
      </div>
    </div>
  );
}