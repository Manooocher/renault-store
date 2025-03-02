import { notFound } from "next/navigation";
import { getCategory, getProducts } from "@/lib/api";
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

interface CategoryPageProps {
  params: {
    id: string;
  };
  searchParams: {
    page?: string;
    per_page?: string;
  };
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const categoryId = parseInt(params.id);
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const perPage = searchParams.per_page ? parseInt(searchParams.per_page) : 12;
  
  const category = await getCategory(categoryId);
  
  if (!category) {
    notFound();
  }
  
  const { products, totalPages } = await getProducts({
    category: categoryId,
    page,
    per_page: perPage,
  });
  
  // Create pagination URL
  const createPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams();
    
    if (pageNumber !== 1) params.set("page", pageNumber.toString());
    if (perPage !== 12) params.set("per_page", perPage.toString());
    
    const queryString = params.toString();
    return `/category/${categoryId}${queryString ? `?${queryString}` : ''}`;
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-2">{category.name}</h1>
      
      {category.description && (
        <div 
          className="text-gray-600 mb-8 prose prose-sm max-w-none"
          dangerouslySetInnerHTML={{ __html: category.description }}
        />
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Filters Sidebar */}
        <div className="md:col-span-1">
          <ProductFilters 
            categories={[category]}
            selectedCategories={[categoryId]}
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