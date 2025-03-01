import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import AddToCartButton from '@/components/products/add-to-cart-button';
import Pagination from '@/components/ui/pagination';

export default function ProductList({ products }: { products: any }) {
  const { data, meta } = products;
  
  if (data.length === 0) {
    return (
      <div className="text-center py-12">
        <ShoppingCart className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
        <h3 className="text-lg font-medium mb-2">محصولی یافت نشد</h3>
        <p className="text-muted-foreground mb-6">
          متأسفانه محصولی با این مشخصات یافت نشد.
        </p>
        <Button asChild>
          <Link href="/products">مشاهده همه محصولات</Link>
        </Button>
      </div>
    );
  }
  
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((product: any) => (
          <Card key={product.id} className="product-card overflow-hidden">
            <Link href={`/products/${product.slug}`} className="block">
              <div className="relative h-48 w-full">
                {product.images && product.images[0] ? (
                  <Image
                    src={product.images[0].src}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 bg-muted flex items-center justify-center">
                    <ShoppingCart className="h-12 w-12 text-muted-foreground" />
                  </div>
                )}
                
                {product.on_sale && (
                  <Badge className="absolute top-2 right-2 bg-destructive">
                    تخفیف
                  </Badge>
                )}
              </div>
            </Link>
            
            <CardContent className="pt-4">
              <Link href={`/products/${product.slug}`} className="block">
                <h3 className="font-medium line-clamp-2 min-h-[3rem]">{product.name}</h3>
              </Link>
              
              <div className="mt-2 flex justify-between items-center">
                {product.on_sale ? (
                  <div>
                    <span className="text-muted-foreground line-through text-sm">
                      {new Intl.NumberFormat('fa-IR').format(product.regular_price)} تومان
                    </span>
                    <p className="font-bold text-lg">
                      {new Intl.NumberFormat('fa-IR').format(product.sale_price)} تومان
                    </p>
                  </div>
                ) : (
                  <p className="font-bold text-lg">
                    {new Intl.NumberFormat('fa-IR').format(product.price)} تومان
                  </p>
                )}
                
                <Badge variant={product.stock_status === 'instock' ? 'outline' : 'secondary'}>
                  {product.stock_status === 'instock' ? 'موجود' : 'ناموجود'}
                </Badge>
              </div>
            </CardContent>
            
            <CardFooter>
              <AddToCartButton product={product} />
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {meta && meta.totalPages > 1 && (
        <div className="mt-8">
          <Pagination 
            totalPages={meta.totalPages} 
            currentPage={meta.currentPage} 
          />
        </div>
      )}
    </div>
  );
}