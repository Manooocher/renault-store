'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { getOrder, processPayment } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { CreditCard, CheckCircle, AlertCircle } from 'lucide-react';

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order_id');
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    async function fetchOrder() {
      if (!orderId) {
        router.push('/cart');
        return;
      }

      try {
        const orderData = await getOrder(Number(orderId));
        setOrder(orderData);
      } catch (error) {
        console.error('Error fetching order:', error);
        toast({
          title: 'خطا',
          description: 'مشکلی در دریافت اطلاعات سفارش رخ داد',
          variant: 'destructive',
        });
        router.push('/cart');
      } finally {
        setLoading(false);
      }
    }

    fetchOrder();
  }, [orderId, router, toast]);

  const handlePayment = async () => {
    if (!order) return;

    setProcessing(true);
    try {
      // Simulate payment processing with Novino gateway
      const result = await processPayment(order.id, order.total);
      
      if (result.success) {
        setPaymentStatus('success');
        toast({
          title: 'پرداخت موفق',
          description: 'سفارش شما با موفقیت ثبت شد',
          variant: 'default',
        });
      } else {
        setPaymentStatus('error');
        toast({
          title: 'خطا در پرداخت',
          description: result.message || 'مشکلی در پرداخت رخ داد',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Payment error:', error);
      setPaymentStatus('error');
      toast({
        title: 'خطا در پرداخت',
        description: 'مشکلی در پرداخت رخ داد. لطفا دوباره تلاش کنید',
        variant: 'destructive',
      });
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="animate-pulse h-6 w-1/4 bg-muted rounded mx-auto mb-8"></div>
        <div className="animate-pulse h-64 w-full max-w-md bg-muted rounded mx-auto"></div>
      </div>
    );
  }

  if (paymentStatus === 'success') {
    return (
      <div className="container mx-auto px-4 py-16 max-w-md">
        <div className="bg-card rounded-lg shadow-sm p-8 text-center">
          <CheckCircle className="h-16 w-16 mx-auto mb-4 text-green-500" />
          <h1 className="text-2xl font-bold mb-4">پرداخت موفق</h1>
          <p className="text-muted-foreground mb-6">
            سفارش شما با موفقیت ثبت شد و به زودی برای شما ارسال خواهد شد.
          </p>
          <p className="font-medium mb-8">
            شماره سفارش: {order.id}
          </p>
          <Button onClick={() => router.push('/')} className="w-full">
            بازگشت به صفحه اصلی
          </Button>
        </div>
      </div>
    );
  }

  if (paymentStatus === 'error') {
    return (
      <div className="container mx-auto px-4 py-16 max-w-md">
        <div className="bg-card rounded-lg shadow-sm p-8 text-center">
          <AlertCircle className="h-16 w-16 mx-auto mb-4 text-destructive" />
          <h1 className="text-2xl font-bold mb-4">خطا در پرداخت</h1>
          <p className="text-muted-foreground mb-8">
            متأسفانه مشکلی در پرداخت رخ داد. لطفا دوباره تلاش کنید.
          </p>
          <Button onClick={handlePayment} className="w-full mb-4">
            تلاش مجدد
          </Button>
          <Button 
            variant="outline" 
            onClick={() => router.push('/cart')} 
            className="w-full"
          >
            بازگشت به سبد خرید
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 max-w-md">
      <div className="bg-card rounded-lg shadow-sm p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">پرداخت سفارش</h1>
        
        <div className="mb-8">
          <h2 className="text-lg font-medium mb-4">اطلاعات سفارش</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">شماره سفارش:</span>
              <span>{order?.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">تاریخ:</span>
              <span>{new Date(order?.date_created).toLocaleDateString('fa-IR')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">مبلغ قابل پرداخت:</span>
              <span className="font-bold">
                {new Intl.NumberFormat('fa-IR').format(Number(order?.total))} تومان
              </span>
            </div>
          </div>
        </div>
        
        <div className="bg-muted p-4 rounded-lg mb-8">
          <div className="flex items-center">
            <CreditCard className="h-5 w-5 ml-2" />
            <span>درگاه پرداخت: نوینو</span>
          </div>
        </div>
        
        <Button 
          onClick={handlePayment} 
          className="w-full" 
          disabled={processing}
        >
          {processing ? 'در حال پردازش...' : 'پرداخت'}
        </Button>
      </div>
    </div>
  );
}