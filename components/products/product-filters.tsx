'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Search, FilterX } from 'lucide-react';

export default function ProductFilters({ categories }: { categories: any[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get('search') || ''
  );
  
  const currentCategory = searchParams.get('category');
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    const params = new URLSearchParams(searchParams.toString());
    
    if (searchQuery) {
      params.set('search', searchQuery);
    } else {
      params.delete('search');
    }
    
    params.delete('page');
    
    router.push(`/products?${params.toString()}`);
  };
  
  const handleCategoryChange = (categoryId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (params.get('category') === categoryId) {
      params.delete('category');
    } else {
      params.set('category', categoryId);
    }
    
    params.delete('page');
    
    router.push(`/products?${params.toString()}`);
  };
  
  const clearFilters = () => {
    router.push('/products');
  };
  
  const hasActiveFilters = searchParams.toString() !== '';
  
  return (
    <div className="bg-card rounded-lg shadow-sm p-6 sticky top-24">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium">فیلترها</h2>
        {hasActiveFilters && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={clearFilters}
            className="h-8 px-2"
          >
            <FilterX className="h-4 w-4 ml-1" />
            پاک کردن
          </Button>
        )}
      </div>
      
      <form onSubmit={handleSearch} className="mb-6">
        <div className="relative">
          <Input
            type="text"
            placeholder="جستجوی محصول..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
          <button
            type="submit"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
          >
            <Search className="h-4 w-4" />
          </button>
        </div>
      </form>
      
      <Accordion type="single" collapsible defaultValue="categories">
        <AccordionItem value="categories">
          <AccordionTrigger>دسته‌بندی‌ها</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 mt-2">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center">
                  <Checkbox
                    id={`category-${category.id}`}
                    checked={currentCategory === category.id.toString()}
                    onCheckedChange={() => handleCategoryChange(category.id.toString())}
                  />
                  <Label
                    htmlFor={`category-${category.id}`}
                    className="mr-2 cursor-pointer"
                  >
                    {category.name}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}