import { getProducts, getCategories } from "@/lib/api";
import { ProductGrid } from "@/components/product/product-grid";
import { ProductFilters } from "@/components/product/product-filters";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface SearchPageProps {
  searchParams: {
    q?: string;
    page?: string;
    per_page?: string;
    category?: string | string[];
    min_price?: string;
    max_price?: string;
    car_model?: string | string[];
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || "";
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const perPage = searchParams.per_page ? parseInt(searchParams.per_page) : 12;
  
  // Handle multiple categories
  const categoryIds = searchParams.category
    ? Array.isArray(searchParams.category)
      ? searchParams.category.map(Number)
      : [parseInt(searchParams.category)]
    : undefined;
  
  // Get the first category for API call (WooCommerce API limitation)
  const categoryId = categoryIds && categoryIds.length > 0 ? categoryIds[0] : undefined;
  
  const { products, totalPages } = await getProducts({
    search: query,
    category: categoryId,
    page,
    per_page: perPage,
  });
  
  const categories = await getCategories();
  
  // Create pagination URL
  const createPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams();
    
    params.set("q", query);
    if (pageNumber !== 1) params.set("page", pageNumber.toString());
    if (perPage !== 12) params.set("per_page", perPage.toString());
    if (categoryIds) {
      categoryIds.forEach(id => params.append("category", id.toString()));
    }
    if (searchParams.min_price) params.set("min_price", searchParams.min_price);
    if (searchParams.max_price) params.set("max_price", searchParams.max_price);
    
    if (Array.isArray(searchParams.car_model)) {
      searchParams.car_model.forEach(model => params.append("car_model", model));
    } else if (searchParams.car_model) {
      params.set("car_model", searchParams.car_model);
    }
    
    return `/search?${params.toString()}`;
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-2">
        نتایج جستجو برای: <span className="text-primary">{query}</span>
      </h1>
      <p className="text-gray-500 mb-8">
        {products.length} محصول یافت شد
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Filters Sidebar */}
        <div className="md:col-span-1">
          <ProductFilters 
            categories={categories}
            selectedCategories={categoryIds}
            minPrice={0}
            maxPrice={10000000}
            selectedPriceRange={[
              searchParams.min_price ? parseInt(searchParams.min_price) : 0,
              searchParams.max_price ? parseInt(searchParams.max_price) : 10000000,
            ]}
            selectedCarModels={
              Array.isArray(searchParams.car_model)
                ? searchParams.car_model
                : searchParams.car_model
                ? [searchParams.car_model]
                : []
            }
          />
        </div>
        
        {/* Products Grid */}
        <div className="md:col-span-3">
          <ProductGrid products={products} />
          
          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination className="mt-8">
              <PaginationContent>
                {page > 1 && (
                  <PaginationItem>
                    <PaginationPrevious href={createPageUrl(page - 1)} />
                  </PaginationItem>
                )}
                
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNumber;
                  
                  if (totalPages <= 5) {
                    // Show all pages if 5 or fewer
                    pageNumber = i + 1;
                  } else if (page <= 3) {
                    // Near the start
                    pageNumber = i + 1;
                  } else if (page >= totalPages - 2) {
                    // Near the end
                    pageNumber = totalPages - 4 + i;
                  } else {
                    // In the middle
                    pageNumber = page - 2 + i;
                  }
                  
                  return (
                    <PaginationItem key={pageNumber}>
                      <PaginationLink
                        href={createPageUrl(pageNumber)}
                        isActive={pageNumber === page}
                      >
                        {pageNumber}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}
                
                {page < totalPages && (
                  <PaginationItem>
                    <PaginationNext href={createPageUrl(page + 1)} />
                  </PaginationItem>
                )}
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </div>
    </div>
  );
}