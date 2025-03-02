import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, getProducts } from "@/lib/api";
import { formatPrice, getStockLabel } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product/product-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddToCartButton from "@/components/product/add-to-cart-button";

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const productId = parseInt(params.id);
  const product = await getProduct(productId);
  
  if (!product) {
    notFound();
  }
  
  // Get related products
  const { products: relatedProducts } = await getProducts({
    include: product.related_ids.slice(0, 4),
  });
  
  const stockInfo = getStockLabel(product.stock_status);
  const discountPercentage = product.on_sale && product.regular_price
    ? Math.round(((parseFloat(product.regular_price) - parseFloat(product.price)) / parseFloat(product.regular_price)) * 100)
    : 0;
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <nav className="flex text-sm text-gray-500">
          <Link href="/" className="hover:text-primary">
            صفحه اصلی
          </Link>
          <span className="mx-2">/</span>
          {product.categories && product.categories[0] && (
            <>
              <Link 
                href={`/category/${product.categories[0].id}`}
                className="hover:text-primary"
              >
                {product.categories[0].name}
              </Link>
              <span className="mx-2">/</span>
            </>
          )}
          <span className="text-gray-900">{product.name}</span>
        </nav>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Product Images */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="relative aspect-square mb-4 overflow-hidden rounded-md">
            {product.images && product.images[0] ? (
              <Image
                src={product.images[0].src}
                alt={product.name}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400">بدون تصویر</span>
              </div>
            )}
            
            {product.on_sale && discountPercentage > 0 && (
              <div className="absolute top-2 left-2 bg-red-500 text-white text-sm font-bold px-2 py-1 rounded-full">
                {discountPercentage}٪ تخفیف
              </div>
            )}
          </div>
          
          {/* Thumbnail Gallery */}
          {product.images && product.images.length > 1 && (
            <div className="grid grid-cols-5 gap-2">
              {product.images.map((image) => (
                <div 
                  key={image.id} 
                  className="aspect-square rounded-md overflow-hidden border border-gray-200 cursor-pointer hover:border-primary"
                >
                  <Image
                    src={image.src}
                    alt={image.name || product.name}
                    width={80}
                    height={80}
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Product Info */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h1>
          
          {/* Categories */}
          {product.categories && product.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {product.categories.map((category) => (
                <Link 
                  key={category.id}
                  href={`/category/${category.id}`}
                  className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 px-2 py-1 rounded-full"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          )}
          
          {/* Price */}
          <div className="mb-6">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-gray-900">
                {formatPrice(parseFloat(product.price))}
              </span>
              {product.on_sale && product.regular_price && (
                <span className="text-sm text-gray-500 line-through">
                  {formatPrice(parseFloat(product.regular_price))}
                </span>
              )}
            </div>
            
            {/* Stock Status */}
            <div className={`text-sm mt-1 ${stockInfo.color}`}>
              {stockInfo.label}
            </div>
          </div>
          
          {/* Short Description */}
          {product.short_description && (
            <div 
              className="text-gray-600 mb-6 prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: product.short_description }}
            />
          )}
          
          {/* Add to Cart */}
          <AddToCartButton product={product} />
          
          {/* Additional Info */}
          <div className="mt-8 border-t border-gray-200 pt-6">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex flex-col">
                <span className="text-gray-500">کد محصول:</span>
                <span className="font-medium">{product.sku || "---"}</span>
              </div>
              
              {product.attributes && product.attributes.length > 0 && 
                product.attributes.map((attr) => (
                  <div key={attr.id} className="flex flex-col">
                    <span className="text-gray-500">{attr. name}:</span>
                    <span className="font-medium">{attr.options.join(', ')}</span>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
      
      {/* Product Details Tabs */}
      <div className="mb-12">
        <Tabs defaultValue="description">
          <TabsList className="w-full justify-start border-b">
            <TabsTrigger value="description">توضیحات</TabsTrigger>
            <TabsTrigger value="specifications">مشخصات فنی</TabsTrigger>
            <TabsTrigger value="reviews">نظرات کاربران</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="py-4">
            <div 
              className="prose prose-blue max-w-none"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          </TabsContent>
          <TabsContent value="specifications" className="py-4">
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <tbody className="divide-y divide-gray-200">
                  {product.attributes && product.attributes.length > 0 ? (
                    product.attributes.map((attr) => (
                      <tr key={attr.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50 w-1/3">
                          {attr.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {attr.options.join(', ')}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td className="px-6 py-4 text-sm text-gray-500 text-center" colSpan={2}>
                        اطلاعات فنی برای این محصول ثبت نشده است.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="py-4">
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">هنوز نظری برای این محصول ثبت نشده است.</p>
              <Button>ثبت نظر</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-6">محصولات مرتبط</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}