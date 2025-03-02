import Link from "next/link";
import Image from "next/image";
import { getProducts, getCategories } from "@/lib/api";
import { ProductGrid } from "@/components/product/product-grid";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Truck, ShieldCheck, CreditCard, Phone } from "lucide-react";

export default async function Home() {
  // Fetch featured products
  const { products: featuredProducts } = await getProducts({
    per_page: 8,
    featured: true,
  });

  // Fetch new arrivals
  const { products: newArrivals } = await getProducts({
    per_page: 4,
    orderby: "date",
  });

  // Fetch categories
  const categories = await getCategories();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="text-center md:text-right">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                قطعات اصلی خودروهای رنو
              </h1>
              <p className="text-lg mb-8 text-blue-100">
                با کیفیت‌ترین قطعات یدکی برای خودروهای رنو با گارانتی اصالت و بهترین قیمت
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <Link href="/products">
                  <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50">
                    مشاهده محصولات
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    تماس با ما
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <Image
                src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1200&auto=format&fit=crop"
                alt="Renault Parts"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center p-4 border border-gray-100 rounded-lg shadow-sm">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <Truck className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">ارسال سریع</h3>
                <p className="text-sm text-gray-500">ارسال به سراسر کشور</p>
              </div>
            </div>
            <div className="flex items-center p-4 border border-gray-100 rounded-lg shadow-sm">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <ShieldCheck className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">ضمانت اصالت</h3>
                <p className="text-sm text-gray-500">تضمین کیفیت محصولات</p>
              </div>
            </div>
            <div className="flex items-center p-4 border border-gray-100 rounded-lg shadow-sm">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <CreditCard className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">پرداخت امن</h3>
                <p className="text-sm text-gray-500">درگاه پرداخت معتبر</p>
              </div>
            </div>
            <div className="flex items-center p-4 border border-gray-100 rounded-lg shadow-sm">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">پشتیبانی</h3>
                <p className="text-sm text-gray-500">مشاوره تخصصی رایگان</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">محصولات ویژه</h2>
            <Link href="/products" className="text-primary flex items-center hover:underline">
              <span>مشاهده همه</span>
              <ChevronLeft className="h-4 w-4 mr-1" />
            </Link>
          </div>
          <ProductGrid products={featuredProducts} />
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">دسته‌بندی‌های محصولات</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.slice(0, 6).map((category) => (
              <Link key={category.id} href={`/category/${category.id}`}>
                <div className="category-card bg-gray-50 border border-gray-100 rounded-lg p-4 text-center h-full flex flex-col items-center justify-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                    {category.image ? (
                      <Image
                        src={category.image.src}
                        alt={category.name}
                        width={40}
                        height={40}
                        className="object-contain"
                      />
                    ) : (
                      <div className="text-primary text-xl font-bold">
                        {category.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <h3 className="font-medium text-gray-900">{category.name}</h3>
                  <p className="text-xs text-gray-500 mt-1">{category.count} محصول</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/categories">
              <Button variant="outline">مشاهده همه دسته‌بندی‌ها</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">جدیدترین محصولات</h2>
            <Link href="/products?orderby=date&order=desc" className="text-primary flex items-center hover:underline">
              <span>مشاهده همه</span>
              <ChevronLeft className="h-4 w-4 mr-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map((product) => (
              <Link key={product.id} href={`/product/${product.id}`}>
                <div className="product-card bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100">
                  <div className="aspect-video overflow-hidden">
                    {product.images && product.images[0] ? (
                      <Image
                        src={product.images[0].src}
                        alt={product.name}
                        width={400}
                        height={225}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400">بدون تصویر</span>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900 mb-2 line-clamp-1">{product.name}</h3>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-gray-900">
                        {new Intl.NumberFormat('fa-IR').format(parseInt(product.price))} تومان
                      </span>
                      <span className="text-xs bg-blue-100 text-primary px-2 py-1 rounded">جدید</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-700 to-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">به دنبال قطعه خاصی هستید؟</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            اگر قطعه مورد نظر خود را پیدا نکردید، با ما تماس بگیرید. کارشناسان ما آماده کمک به شما هستند.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50">
                تماس با ما
              </Button>
            </Link>
            <Link href="/products">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                مشاهده محصولات
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}