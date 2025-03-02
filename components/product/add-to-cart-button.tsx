"use client";

import { useState } from "react";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/context/cart-context";
import { ShoppingCart, Plus, Minus, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const { addToCart } = useCart();
  const { toast } = useToast();
  
  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: parseFloat(product.price),
      regularPrice: product.regular_price ? parseFloat(product.regular_price) : undefined,
      quantity,
      image: product.images[0]?.src || "/placeholder.jpg",
    });
    
    setIsAdded(true);
    
    toast({
      title: "محصول به سبد خرید اضافه شد",
      description: `${product.name} با موفقیت به سبد خرید اضافه شد.`,
    });
    
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };
  
  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };
  
  const decrementQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };
  
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };
  
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center">
        <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-none"
            onClick={decrementQuantity}
            disabled={quantity <= 1}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <Input
            type="number"
            min="1"
            value={quantity}
            onChange={handleQuantityChange}
            className="h-10 w-16 border-0 text-center focus-visible:ring-0"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-none"
            onClick={incrementQuantity}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        
        <Button
          onClick={handleAddToCart}
          className="mr-4 flex-1"
          disabled={product.stock_status === "outofstock" || isAdded}
        >
          {isAdded ? (
            <>
              <Check className="h-5 w-5 mr-2" />
              <span>به سبد خرید اضافه شد</span>
            </>
          ) : (
            <>
              <ShoppingCart className="h-5 w-5 ml-2" />
              <span>افزودن به سبد خرید</span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
}