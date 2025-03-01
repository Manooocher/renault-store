'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  ShoppingCart, 
  Search, 
  Menu, 
  X, 
  User,
  Car,
  ChevronDown
} from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { getCategories } from '@/lib/api';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState<any[]>([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { items } = useCart();
  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await getCategories({ per_page: 10 });
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    
    fetchCategories();
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
    }
  };
  
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  
  return (
    <header className={`sticky top-0 z-50 bg-background transition-shadow duration-300 ${
      isScrolled ? 'shadow-md' : ''
    }`}>
      {/* Top bar */}
      <div className="bg-primary text-primary-foreground py-2">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="text-sm">
            تلفن پشتیبانی: ۰۲۱-۱۲۳۴۵۶۷۸
          </div>
          <div className="flex items-center space-x-4 space-x-reverse">
            <Link href="/login" className="text-sm hover:underline flex items-center">
              <User className="h-4 w-4 ml-1" />
              ورود / ثبت نام
            </Link>
          </div>
        </div>
      </div>
      
      {/* Main header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Car className="h-8 w-8 ml-2 text-primary" />
            <span className="text-xl font-bold">فروشگاه قطعات رنو</span>
          </Link>
          
          {/* Search - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative w-full">
              <Input
                type="text"
                placeholder="جستجوی قطعات..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10"
              />
              <button
                type="submit"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
              >
                <Search className="h-4 w-4" />
              </button>
            </form>
          </div>
          
          {/* Cart and mobile menu */}
          <div className="flex items-center space-x-4 space-x-reverse">
            <Link href="/cart" className="relative">
              <ShoppingCart className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
        
        {/* Search - Mobile */}
        <div className="mt-4 md:hidden">
          <form onSubmit={handleSearch} className="relative">
            <Input
              type="text"
              placeholder="جستجوی قطعات..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10"
            />
            <button
              type="submit"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            >
              <Search className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="bg-secondary">
        <div className="container mx-auto px-4">
          {/* Desktop Navigation */}
          <ul className="hidden md:flex space-x-6 space-x-reverse py-3">
            <li>
              <Link 
                href="/" 
                className={`hover:text-primary ${pathname === '/' ? 'text-primary font-medium' : ''}`}
              >
                صفحه اصلی
              </Link>
            </li>
            <li>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className={`flex items-center hover:text-primary ${
                    pathname.startsWith('/products') ? 'text-primary font-medium' : ''
                  }`}>
                    محصولات
                    <ChevronDown className="h-4 w-4 mr-1" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem asChild>
                    <Link href="/products" className="w-full">
                      همه محصولات
                    </Link>
                  </DropdownMenuItem>
                  {categories.map((category) => (
                    <DropdownMenuItem key={category.id} asChild>
                      <Link href={`/products?category=${category.id}`} className="w-full">
                        {category.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
            <li>
              <Link 
                href="/blog" 
                className={`hover:text-primary ${pathname.startsWith('/blog') ? 'text-primary font-medium' : ''}`}
              >
                وبلاگ
              </Link>
            </li>
            <li>
              <Link 
                href="/cart" 
                className={`hover:text-primary ${pathname === '/cart' ? 'text-primary font-medium' : ''}`}
              >
                سبد خرید
              </Link>
            </li>
          </ul>
          
          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <ul className="space-y-4">
                <li>
                  <Link 
                    href="/" 
                    className={pathname === '/' ? 'text-primary font-medium' : ''}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    صفحه اصلی
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/products" 
                    className={pathname.startsWith('/products') ? 'text-primary font-medium' : ''}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    محصولات
                  </Link>
                </li>
                {categories.map((category) => (
                  <li key={category.id} className="pr-4">
                    <Link 
                      href={`/products?category=${category.id}`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link 
                    href="/blog" 
                    className={pathname.startsWith('/blog') ? 'text-primary font-medium' : ''}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    وبلاگ
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/cart" 
                    className={pathname === '/cart' ? 'text-primary font-medium' : ''}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    سبد خرید
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/login" 
                    className={pathname === '/login' ? 'text-primary font-medium' : ''}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    ورود / ثبت نام
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}