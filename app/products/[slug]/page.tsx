import { getProduct, getRelatedProducts } from '@/lib/api';
import ProductDetails from '@/components/products/product-details';
import RelatedProducts from '@/components/products/related-products';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export async function generateMetadata({ 
  params 
}: { 
  params: { slug: string } 
}): Promise<Metadata> {
  const product = await getProduct(params.slug);
  
  if (!product) {
    return {
      title: 'محصول یافت نشد | فروشگاه قطعات رنو',
    };
  }

  return {
    title: `${product.name} | فروشگاه قطعات رنو`,
    description: product.short_description || 'خرید قطعات یدکی خودروهای رنو',
    openGraph: {
      images: product.images?.[0]?.src ? [product.images[0].src] : [],
    },
  };
}

export default async function ProductPage({ 
  params 
}: { 
  params: { slug: string } 
}) {
  const product = await getProduct(params.slug);
  
  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(product.id, 4);

  return (
    <div className="container mx-auto px-4 py-8">
      <ProductDetails product={product} />
      {relatedProducts.length > 0 && (
        <RelatedProducts products={relatedProducts} />
      )}
    </div>
  );
}