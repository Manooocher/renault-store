"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/cart-context";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { CheckoutFormData } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { CreditCard, Truck, MapPin } from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, totalPrice, clearCart } = useCart();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<CheckoutFormData>({
    first_name: "",
    last_name: "",
    address_1: "",
    address_2: "",
    city: "",
    state: "",
    postcode: "",
    country: "IR",
    email: "",
    phone: "",
    payment_method: "novino",
    order_notes: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleRadioChange = (value: string) => {
    setFormData((prev) => ({ ...prev, payment_method: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (cartItems.length === 0) {
      toast({
        title: "سبد خرید خالی است",
        description: "لطفاً ابتدا محصولاتی را به سبد خرید خود اضافه کنید.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call to create order
    try {
      // In a real app, you would send the order to your backend
      // const response = await fetch('/api/orders', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ items: cartItems, customer: formData }),
      // });
      
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Simulate successful order
      toast({
        title: "سفارش با موفقیت ثبت شد",
        description: "شما به درگاه پرداخت هدایت خواهید شد.",
      });
      
      // Clear cart and redirect to payment gateway
      clearCart();
      router.push("/payment-success");
    } catch (error) {
      toast({
        title: "خطا در ثبت سفارش",
        description: "متأسفانه مشکلی در ثبت سفارش رخ داده است. لطفاً دوباره تلاش کنید.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (cartItems.length === 0) {
    router.push("/cart");
    return null;
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">تکمیل خرید</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit}>
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6">
              <h2 className="text-lg font-bold mb-4 flex items-center">
                <MapPin className="h-5 w-5 ml-2 text-primary" />
                اطلاعات ارسال
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="first_name">نام</Label>
                  <Input
                    id="first_name"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="last_name">نام خانوادگی</Label>
                  <Input
                    id="last_name"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">شماره موبایل</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">ایمیل</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="address_1">آدرس</Label>
                  <Input
                    id="address_1"
                    name="address_1"
                    value={formData.address_1}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="city">شهر</Label>
                  <Input
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="state">استان</Label>
                  <Input
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="postcode">کد پستی</Label>
                  <Input
                    id="postcode"
                    name="postcode"
                    value={formData.postcode}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6">
              <h2 className="text-lg font-bold mb-4 flex items-center">
                <Truck className="h-5 w-5 ml-2 text-primary" />
                روش ارسال
              </h2>
              
              <RadioGroup defaultValue="standard" className="space-y-3">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <RadioGroupItem value="standard" id="shipping-standard" />
                  <Label htmlFor="shipping-standard" className="flex-1">
                    <div className="font-medium">ارسال استاندارد</div>
                    <div className="text-sm text-gray-500">۳ تا ۵ روز کاری - رایگان</div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <RadioGroupItem value="express" id="shipping-express" />
                  <Label htmlFor="shipping-express" className="flex-1">
                    <div className="font-medium">ارسال سریع</div>
                    <div className="text-sm text-gray-500">۱ تا ۲ روز کاری - ۳۰,۰۰۰ تومان</div>
                  </Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6">
              <h2 className="text-lg font-bold mb-4 flex items-center">
                <CreditCard className="h-5 w-5 ml-2 text-primary" />
                روش پرداخت
              </h2>
              
              <RadioGroup 
                value={formData.payment_method} 
                onValueChange={handleRadioChange}
                className="space-y-3"
              >
                <div className="flex items-center space-x-2 space-x-reverse">
                  <RadioGroupItem value="novino" id="payment-novino" />
                  <Label htmlFor="payment-novino" className="flex-1">
                    <div className="font-medium">درگاه پرداخت نوینو</div>
                    <div className="text-sm text-gray-500">پرداخت امن آنلاین با تمامی کارت‌های بانکی</div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <RadioGroupItem value="cod" id="payment-cod" />
                  <Label htmlFor="payment-cod" className="flex-1">
                    <div className="font-medium">پرداخت در محل</div>
                    <div className="text-sm text-gray-500">پرداخت هنگام تحویل کالا</div>
                  </Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <Label htmlFor="order_notes">توضیحات سفارش (اختیاری)</Label>
              <Textarea
                id="order_notes"
                name="order_notes"
                value={formData.order_notes}
                onChange={handleInputChange}
                placeholder="اگر توضیح خاصی برای سفارش خود دارید، اینجا بنویسید..."
                className="mt-2"
              />
            </div>
          </form>
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 sticky top-24">
            <h2 className="text-lg font-bold mb-4">خلاصه سفارش</h2>
            
            <div className="space-y-4 mb-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>
                    {item.name} <span className="text-gray-500">× {item.quantity}</span>
                  </span>
                  <span className="font-medium">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            
            <Separator className="my-4" />
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">مجموع:</span>
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
            
            <Button 
              className="w-full mt-6" 
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white ml-2"></div>
                  در حال پردازش...
                </div>
              ) : (
                "پرداخت و ثبت سفارش"
              )}
            </Button>
            
            <div className="mt-6 text-xs text-gray-500">
              <p>با کلیک بر روی دکمه بالا، شما به درگاه پرداخت هدایت خواهید شد.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}