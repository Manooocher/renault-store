import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle, Home, Package } from "lucide-react";

export default function PaymentSuccessPage() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <div className="max-w-md mx-auto">
        <div className="bg-green-100 p-6 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
          <CheckCircle className="h-12 w-12 text-green-600" />
        </div>
        
        <h1 className="text-2xl font-bold mb-4">پرداخت با موفقیت انجام شد</h1>
        
        <p className="text-gray-500 mb-8">
          سفارش شما با موفقیت ثبت شد و به زودی برای شما ارسال خواهد شد. 
          شماره پیگیری سفارش شما: <span className="font-bold text-gray-900">RP-12345</span>
        </p>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-8">
          <h2 className="font-bold mb-4">اطلاعات سفارش</h2>
          
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">شماره سفارش:</span>
              <span>RP-12345</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">تاریخ سفارش:</span>
              <span>۱۴۰۴/۰۳/۱۵</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">روش پرداخت:</span>
              <span>درگاه پرداخت نوینو</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">مبلغ پرداخت شده:</span>
              <span>۲,۵۰۰,۰۰۰ تومان</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button variant="outline" className="w-full sm:w-auto">
              <Home className="h-4 w-4 ml-2" />
              بازگشت به صفحه اصلی
            </Button>
          </Link>
          <Link href="/account/orders">
            <Button className="w-full sm:w-auto">
              <Package className="h-4 w-4 ml-2" />
              پیگیری سفارش
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}