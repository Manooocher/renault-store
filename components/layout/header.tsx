"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ShoppingCart, Menu, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useCart } from "@/context/cart-context";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useCategories } from "@/hooks/use-categories";

export default function Header() {
  const pathname = usePathname();
  const { categories, isLoading } = useCategories();
  const { cartItems } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "bg-white shadow-md py-2"
          : "bg-white/80 backdrop-blur-md py-4"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-primary">رنو پارتس</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 space-x-reverse">
            <Link
              href="/"
              className={cn(
                "px-3 py-2 text-sm font-medium rounded-md",
                pathname === "/"
                  ? "bg-primary/10 text-primary"
                  : "text-gray-700 hover:bg-gray-100"
              )}
            >
              صفحه اصلی
            </Link>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" className="px-3 py-2 text-sm font-medium">
                  دسته‌بندی‌ها
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="py-4">
                  <h2 className="text-lg font-bold mb-4">دسته‌بندی‌ها</h2>
                  {isLoading ? (
                    <div className="flex justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                    </div>
                  ) : (
                    <ul className="space-y-2">
                      {categories?.map((category) => (
                        <li key={category.id}>
                          <Link
                            href={`/category/${category.id}`}
                            className="block p-2 hover:bg-gray-100 rounded-md"
                          >
                            {category.name}
                          </Link>
                          {category.children && category.children.length > 0 && (
                            <ul className="pr-4 mt-1 space-y-1 border-r border-gray-200">
                              {category.children.map((subCategory) => (
                                <li key={subCategory.id}>
                                  <Link
                                    href={`/category/${subCategory.id}`}
                                    className="block p-1 text-sm hover:bg-gray-100 rounded-md"
                                  >
                                    {subCategory.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </SheetContent>
            </Sheet>
            <Link
              href="/products"
              className={cn(
                "px-3 py-2 text-sm font-medium rounded-md",
                pathname === "/products"
                  ? "bg-primary/10 text-primary"
                  : "text-gray-700 hover:bg-gray-100"
              )}
            >
              محصولات
            </Link>
            <Link
              href="/blog"
              className={cn(
                "px-3 py-2 text-sm font-medium rounded-md",
                pathname === "/blog"
                  ? "bg-primary/10 text-primary"
                  : "text-gray-700 hover:bg-gray-100"
              )}
            >
              وبلاگ
            </Link>
            <Link
              href="/contact"
              className={cn(
                "px-3 py-2 text-sm font-medium rounded-md",
                pathname === "/contact"
                  ? "bg-primary/10 text-primary"
                  : "text-gray-700 hover:bg-gray-100"
              )}
            >
              تماس با ما
            </Link>
          </nav>

          {/* Search, Cart, and User */}
          <div className="flex items-center space-x-4 space-x-reverse">
            <form onSubmit={handleSearch} className="hidden md:flex relative">
              <Input
                type="search"
                placeholder="جستجوی قطعات..."
                className="w-[200px] lg:w-[300px] pl-10 pr-4"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button
                type="submit"
                variant="ghost"
                size="icon"
                className="absolute left-0 top-0 h-full"
              >
                <Search className="h-4 w-4" />
              </Button>
            </form>

            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartItems.length > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  >
                    {cartItems.length}
                  </Badge>
                )}
              </Button>
            </Link>

            <Link href="/account">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="py-4">
                  <form onSubmit={handleSearch} className="relative mb-6">
                    <Input
                      type="search"
                      placeholder="جستجوی قطعات..."
                      className="w-full pl-10 pr-4"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Button
                      type="submit"
                      variant="ghost"
                      size="icon"
                      className="absolute left-0 top-0 h-full"
                    >
                      <Search className="h-4 w-4" />
                    </Button>
                  </form>

                  <nav className="space-y-2">
                    <Link
                      href="/"
                      className="block p-2 hover:bg-gray-100 rounded-md"
                    >
                      صفحه اصلی
                    </Link>
                    <div className="p-2">
                      <div className="font-medium mb-2">دسته‌بندی‌ها</div>
                      {isLoading ? (
                        <div className="flex justify-center">
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                        </div>
                      ) : (
                        <ul className="space-y-1 pr-2">
                          {categories?.slice(0, 5).map((category) => (
                            <li key={category.id}>
                              <Link
                                href={`/category/${category.id}`}
                                className="block p-1 text-sm hover:bg-gray-100 rounded-md"
                              >
                                {category.name}
                              </Link>
                            </li>
                          ))}
                          <li>
                            <Link
                              href="/categories"
                              className="block p-1 text-sm text-primary hover:underline"
                            >
                              مشاهده همه دسته‌بندی‌ها
                            </Link>
                          </li>
                        </ul>
                      )}
                    </div>
                    <Link
                      href="/products"
                      className="block p-2 hover:bg-gray-100 rounded-md"
                    >
                      محصولات
                    </Link>
                    <Link
                      href="/blog"
                      className="block p-2 hover:bg-gray-100 rounded-md"
                    >
                      وبلاگ
                    </Link>
                    <Link
                      href="/contact"
                      className="block p-2 hover:bg-gray-100 rounded-md"
                    >
                      تماس با ما
                    </Link>
                    <Link
                      href="/account"
                      className="block p-2 hover:bg-gray-100 rounded-md"
                    >
                      حساب کاربری
                    </Link>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}