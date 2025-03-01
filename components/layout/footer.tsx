import Link from 'next/link';
import { Car, Phone, Mail, MapPin, Instagram, Twitter, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-secondary mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center mb-4">
              <Car className="h-6 w-6 ml-2 text-primary" />
              <h3 className="text-lg font-bold">فروشگاه قطعات رنو</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              فروشگاه تخصصی قطعات یدکی خودروهای رنو با بیش از 10 سال سابقه در ارائه قطعات اصلی و با کیفیت.
            </p>
            <div className="flex space-x-4 space-x-reverse">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">دسترسی سریع</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary">
                  صفحه اصلی
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-muted-foreground hover:text-primary">
                  محصولات
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-primary">
                  وبلاگ
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-muted-foreground hover:text-primary">
                  سبد خرید
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-muted-foreground hover:text-primary">
                  ورود / ثبت نام
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Categories */}
          <div>
            <h3 className="text-lg font-bold mb-4">دسته‌بندی محصولات</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products?category=brake" className="text-muted-foreground hover:text-primary">
                  سیستم ترمز
                </Link>
              </li>
              <li>
                <Link href="/products?category=engine" className="text-muted-foreground hover:text-primary">
                  قطعات موتوری
                </Link>
              </li>
              <li>
                <Link href="/products?category=suspension" className="text-muted-foreground hover:text-primary">
                  سیستم تعلیق
                </Link>
              </li>
              <li>
                <Link href="/products?category=electrical" className="text-muted-foreground hover:text-primary">
                  سیستم برقی
                </Link>
              </li>
              <li>
                <Link href="/products?category=body" className="text-muted-foreground hover:text-primary">
                  قطعات بدنه
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4">تماس با ما</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Phone className="h-5 w-5 ml-2 mt-0.5 text-primary" />
                <div>
                  <p className="text-muted-foreground">تلفن پشتیبانی:</p>
                  <p>۰۲۱-۱۲۳۴۵۶۷۸</p>
                </div>
              </li>
              <li className="flex items-start">
                <Mail className="h-5 w-5 ml-2 mt-0.5 text-primary" />
                <div>
                  <p className="text-muted-foreground">ایمیل:</p>
                  <p>info@renault-store.ir</p>
                </div>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 ml-2 mt-0.5 text-primary" />
                <div>
                  <p className="text-muted-foreground">آدرس:</p>
                  <p>تهران، خیابان آزادی، پلاک ۱۲۳</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
          <p>
            © {new Date().getFullYear()} فروشگاه قطعات رنو. تمامی حقوق محفوظ است.
          </p>
        </div>
      </div>
    </footer>
  );
}