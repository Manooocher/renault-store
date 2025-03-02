import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('fa-IR', {
    style: 'currency',
    currency: 'IRR',
    maximumFractionDigits: 0,
  }).format(price);
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export function getDiscountPercentage(regularPrice: number, salePrice: number): number {
  if (!regularPrice || !salePrice || regularPrice <= salePrice) return 0;
  return Math.round(((regularPrice - salePrice) / regularPrice) * 100);
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\u0600-\u06FF\s]/g, '') // Keep Persian characters
    .replace(/\s+/g, '-');
}

export function extractExcerpt(html: string, maxLength: number = 150): string {
  // Remove HTML tags
  const text = html.replace(/<\/?[^>]+(>|$)/g, '');
  return truncateText(text, maxLength);
}

export function getImagePlaceholder(index?: number): string {
  const placeholders = [
    'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=500&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=500&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1526726538690-5cbf956ae2fd?q=80&w=500&auto=format&fit=crop',
  ];
  
  if (index !== undefined && index < placeholders.length) {
    return placeholders[index];
  }
  
  return placeholders[Math.floor(Math.random() * placeholders.length)];
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('fa-IR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

export function getStockLabel(status: string): { label: string; color: string } {
  switch (status) {
    case 'instock':
      return { label: 'موجود', color: 'text-green-600' };
    case 'outofstock':
      return { label: 'ناموجود', color: 'text-red-600' };
    case 'onbackorder':
      return { label: 'قابل سفارش', color: 'text-amber-600' };
    default:
      return { label: 'نامشخص', color: 'text-gray-600' };
  }
}