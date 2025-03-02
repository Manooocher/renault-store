import Link from "next/link";
import { Mail, Phone, MapPin, Instagram, Twitter, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold mb-4">درباره رنو پارتس</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              فروشگاه آنلاین قطعات یدکی خودروهای رنو با بیش از ۱۰ سال سابقه در ارائه قطعات اصلی و با کیفیت. ما به دنبال ارائه بهترین خدمات به مشتریان خود هستیم.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">دسترسی سریع</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  صفحه اصلی
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-primary transition-colors">
                  محصولات
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-primary transition-colors">
                  وبلاگ
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary transition-colors">
                  درباره ما
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary transition-colors">
                  تماس با ما
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-bold mb-4">دسته‌بندی‌های محبوب</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>
                <Link href="/category/engine-parts" className="hover:text-primary transition-colors">
                  قطعات موتور
                </Link>
              </li>
              <li>
                <Link href="/category/brakes" className="hover:text-primary transition-colors">
                  سیستم ترمز
                </Link>
              </li>
              <li>
                <Link href="/category/suspension" className="hover:text-primary transition-colors">
                  سیستم تعلیق
                </Link>
              </li>
              <li>
                <Link href="/category/electrical" className="hover:text-primary transition-colors">
                  قطعات الکتریکی
                </Link>
              </li>
              <li>
                <Link href="/category/body-parts" className="hover:text-primary transition-colors">
                  قطعات بدنه
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4">تماس با ما</h3>
            <ul className="space-y-3 text-gray-300 text-sm">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 ml-2 text-primary" />
                <span>تهران، خیابان آزادی، پلاک ۱۲۳، فروشگاه رنو پارتس</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 ml-2 text-primary" />
                <span>۰۲۱-۱۲۳۴۵۶۷۸</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 ml-2 text-primary" />
                <span>info@renault-parts.com</span>
              </li>
              <li className="flex items-center space-x-4 space-x-reverse mt-4">
                <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} رنو پارتس. تمامی حقوق محفوظ است.</p>
        </div>
      </div>
    </footer>
  );
}