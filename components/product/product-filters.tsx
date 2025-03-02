"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Category } from "@/types";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { X } from "lucide-react";

interface ProductFiltersProps {
  categories: Category[];
  minPrice?: number;
  maxPrice?: number;
  selectedCategories?: number[];
  selectedPriceRange?: [number, number];
  carModels?: string[];
  selectedCarModels?: string[];
}

export function ProductFilters({
  categories,
  minPrice = 0,
  maxPrice = 10000000,
  selectedCategories = [],
  selectedPriceRange = [minPrice, maxPrice],
  carModels = ["L90", "Megane", "Sandero", "Talisman", "Koleos", "Duster"],
  selectedCarModels = [],
}: ProductFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [priceRange, setPriceRange] = useState<[number, number]>(selectedPriceRange);
  const [localSelectedCategories, setLocalSelectedCategories] = useState<number[]>(selectedCategories);
  const [localSelectedCarModels, setLocalSelectedCarModels] = useState<string[]>(selectedCarModels);
  
  const handleCategoryChange = (categoryId: number, checked: boolean) => {
    setLocalSelectedCategories(prev => 
      checked 
        ? [...prev, categoryId]
        : prev.filter(id => id !== categoryId)
    );
  };
  
  const handleCarModelChange = (model: string, checked: boolean) => {
    setLocalSelectedCarModels(prev => 
      checked 
        ? [...prev, model]
        : prev.filter(m => m !== model)
    );
  };
  
  const handlePriceChange = (value: number[]) => {
    setPriceRange([value[0], value[1]]);
  };
  
  const applyFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    
    // Clear existing filter params
    params.delete("category");
    params.delete("min_price");
    params.delete("max_price");
    params.delete("car_model");
    
    // Add new filter params
    localSelectedCategories.forEach(catId => {
      params.append("category", catId.toString());
    });
    
    if (priceRange[0] !== minPrice) {
      params.set("min_price", priceRange[0].toString());
    }
    
    if (priceRange[1] !== maxPrice) {
      params.set("max_price", priceRange[1].toString());
    }
    
    localSelectedCarModels.forEach(model => {
      params.append("car_model", model);
    });
    
    router.push(`/products?${params.toString()}`);
  };
  
  const resetFilters = () => {
    setLocalSelectedCategories([]);
    setLocalSelectedCarModels([]);
    setPriceRange([minPrice, maxPrice]);
    router.push("/products");
  };
  
  const hasActiveFilters = localSelectedCategories.length > 0 || 
    localSelectedCarModels.length > 0 || 
    priceRange[0] !== minPrice || 
    priceRange[1] !== maxPrice;
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-lg">فیلترها</h3>
        {hasActiveFilters && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={resetFilters}
            className="text-xs text-gray-500 hover:text-red-500"
          >
            <X className="h-3 w-3 mr-1" />
            حذف فیلترها
          </Button>
        )}
      </div>
      
      <Accordion type="multiple" defaultValue={["categories", "price", "car_models"]}>
        <AccordionItem value="categories">
          <AccordionTrigger>دسته‌بندی‌ها</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2 space-x-reverse">
                  <Checkbox 
                    id={`category-${category.id}`}
                    checked={localSelectedCategories.includes(category.id)}
                    onCheckedChange={(checked) => 
                      handleCategoryChange(category.id, checked === true)
                    }
                  />
                  <label 
                    htmlFor={`category-${category.id}`}
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {category.name}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="price">
          <AccordionTrigger>محدوده قیمت</AccordionTrigger>
          <AccordionContent>
            <div className="pt-4 px-2">
              <Slider
                defaultValue={priceRange}
                min={minPrice}
                max={maxPrice}
                step={100000}
                value={priceRange}
                onValueChange={handlePriceChange}
              />
              <div className="flex justify-between mt-2 text-sm text-gray-500">
                <span>{new Intl.NumberFormat('fa-IR').format(priceRange[0])} تومان</span>
                <span>{new Intl.NumberFormat('fa-IR').format(priceRange[1])} تومان</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="car_models">
          <AccordionTrigger>مدل خودرو</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {carModels.map((model) => (
                <div key={model} className="flex items-center space-x-2 space-x-reverse">
                  <Checkbox 
                    id={`model-${model}`}
                    checked={localSelectedCarModels.includes(model)}
                    onCheckedChange={(checked) => 
                      handleCarModelChange(model, checked === true)
                    }
                  />
                  <label 
                    htmlFor={`model-${model}`}
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {model}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      
      <Button 
        onClick={applyFilters} 
        className="w-full mt-4"
      >
        اعمال فیلترها
      </Button>
    </div>
  );
}