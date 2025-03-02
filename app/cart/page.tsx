"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/cart-context";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, totalPrice } = useCart();
  const [couponCode, setCouponCode] = useState("");
  
  const handleQuantityChange = (id: number, newQuantity: number) => {
    updateQuantity(id, newQuantity);
  };
  
  const handleRemoveItem = (id: number) => {
    removeFromCart(id);
  };
  
  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    // Coupon logic would go here
    alert(`کد تخفیف ${couponCode} اعمال شد`);
  };
  
  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <div className="bg-gray-100 p-6 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
            <ShoppingBag className="h-12 w-12 text-gray-400" />
          </div>
          <h1 className="text-2xl font-bold mb-4">سبد خرید شما خالی است</h1>
          <p className="text-gray-500 mb-8">
            محصولات مورد نظر خود را به سبد خرید اضافه کنید تا در اینجا نمایش داده شوند.
          </p>
          <Link href="/products">
            <Button className="w-full">
              مشاهده محصولات
            </Button>
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">سبد خرید</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-gray-50 text-sm font-medium text-gray-500">
              <div className="col-span-6">محصول</div>
              <div className="col-span-2 text-center">قیمت</div>
              <div className="col-span-2 text-center">تعداد</div>
              <div className="col-span-2 text-center">جمع</div>
            </div>
            
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item p-4">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  {/* Product */}
                  <div className="col-span-6 flex items-center">
                    <div className="relative w-16 h-16 rounded-md overflow-hidden border border-gray-200 flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="mr-4 flex-grow">
                      <Link href={`/product/${item.id}`} className="font-medium text-gray-900 hover:text-primary">
                        {item.name}
                      </Link>
                      {item.regularPrice && item.regularPrice > item.price && (
                        <div className="text-xs text-red-500 mt-1">
                          {Math.round(((item.regularPrice - item.price) / item.regularPrice) * 100)}٪ تخفیف
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Price */}
                  <div className="md:col-span-2 text-center">
                    <div className="md:hidden text-sm text-gray-500 mb-1">قیمت:</div>
                    <div className="font-medium">
                      {formatPrice(item.price)}
                    </div>
                  </div>
                  
                  {/* Quantity */}
                  <div className="md:col-span-2 flex justify-center">
                    <div className="md:hidden text-sm text-gray-500 mb-1">تعداد:</div>
                    <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-none"
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <Input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                        className="h-8 w-12 border-0 text-center focus-visible:ring-0"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-none"
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  
                  {/* Subtotal */}
                  <div className="md:col-span-2 flex items-center justify-between md:justify-center">
                    <div className="md:hidden text-sm text-gray-500">جمع:</div>
                    <div className="font-medium">
                      {formatPrice(item.price * item.quantity)}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-gray-400 hover:text-red-500 md:mr-4"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-between mt-6">
            <Link href="/products">
              <Button variant="outline" className="flex items-center">
                <ArrowRight className="h-4 w-4 ml-2" />
                ادامه خرید
              </Button>
            </Link>
            
            <form onSubmit={handleApplyCoupon} className="flex">
              <Input
                type="text"
                placeholder="کد تخفیف"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="w-40 ml-2"
              />
              <Button type="submit" variant="outline">
                اعمال کد
              </Button>
            </form>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold mb-4">خلاصه سفارش</h2>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">تعداد محصولات:</span>
                <span>{cartItems.reduce((sum, item) => sum + item.quantity, 0)} عدد</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">مجموع قیمت:</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">هزینه ارسال:</span>
                <span>رایگان</span>
              </div>
              
              <Separator className="my-4" />
              
              <div className="flex justify-between font-bold">
                <span>مبلغ قابل پرداخت:</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
            </div>
            
            <Link href="/checkout">
              <Button className="w-full mt-6">
                ادامه فرآیند خرید
              </Button>
            </Link>
            
            <div className="mt-6 text-xs text-gray-500">
              <p>با کلیک بر روی دکمه بالا، شما به صفحه تکمیل اطلاعات و پرداخت هدایت خواهید شد.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}