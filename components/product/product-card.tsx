import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  
  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: parseFloat(product.price),
      regularPrice: product.regular_price ? parseFloat(product.regular_price) : undefined,
      quantity: 1,
      image: product.images[0]?.src || "/placeholder.jpg",
    });
  };

  const discountPercentage = product.on_sale && product.regular_price
    ? Math.round(((parseFloat(product.regular_price) - parseFloat(product.price)) / parseFloat(product.regular_price)) * 100)
    : 0;

  return (
    <div className="product-card bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 hover:border-primary/20 transition-all">
      <div className="relative">
        <Link href={`/product/${product.id}`}>
          <div className="aspect-square overflow-hidden">
            {product.images && product.images[0] ? (
              <Image
                src={product.images[0].src}
                alt={product.name}
                width={300}
                height={300}
                className="object-cover w-full h-full transition-transform hover:scale-105"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400">بدون تصویر</span>
              </div>
            )}
          </div>
        </Link>
        {product.on_sale && discountPercentage > 0 && (
          <div className="discount-badge">
            {discountPercentage}٪ تخفیف
          </div>
        )}
      </div>
      
      <div className="p-4">
        <Link href={`/product/${product.id}`}>
          <h3 className="font-medium text-gray-900 mb-1 hover:text-primary transition-colors line-clamp-2 h-12">
            {product.name}
          </h3>
        </Link>
        
        <div className="flex items-center justify-between mt-2">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-bold text-gray-900">
                {formatPrice(parseFloat(product.price))}
              </span>
              {product.on_sale && product.regular_price && (
                <span className="text-sm text-gray-500 line-through">
                  {formatPrice(parseFloat(product.regular_price))}
                </span>
              )}
            </div>
            {product.stock_status === "outofstock" && (
              <span className="text-xs text-red-500 mt-1">ناموجود</span>
            )}
          </div>
          
          <Button
            onClick={handleAddToCart}
            size="sm"
            variant="ghost"
            className="text-primary hover:text-primary hover:bg-primary/10"
            disabled={product.stock_status === "outofstock"}
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}