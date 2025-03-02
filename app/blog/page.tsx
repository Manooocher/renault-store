import Link from "next/link";
import Image from "next/image";
import { getBlogPosts } from "@/lib/api";
import { formatDate, extractExcerpt, getImagePlaceholder } from "@/lib/utils";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface BlogPageProps {
  searchParams: {
    page?: string;
    per_page?: string;
    search?: string;
  };
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const perPage = searchParams.per_page ? parseInt(searchParams.per_page) : 9;
  const search = searchParams.search || "";
  
  const { posts, totalPages } = await getBlogPosts({
    page,
    per_page: perPage,
    search,
  });
  
  // Create pagination URL
  const createPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams();
    
    if (pageNumber !== 1) params.set("page", pageNumber.toString());
    if (perPage !== 9) params.set("per_page", perPage.toString());
    if (search) params.set("search", search);
    
    return `/blog?${params.toString()}`;
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">وبلاگ</h1>
      
      {/* Search */}
      <div className="mb-8">
        <form action="/blog" method="get" className="flex max-w-md mx-auto">
          <input
            type="text"
            name="search"
            defaultValue={search}
            placeholder="جستجو در مقالات..."
            className="flex-1 rounded-r-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="submit"
            className="bg-primary text-white px-4 py-2 rounded-l-md hover:bg-primary/90 transition-colors"
          >
            جستجو
          </button>
        </form>
      </div>
      
      {/* Blog Posts Grid */}
      {posts.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">مقاله‌ای یافت نشد</h3>
          <p className="text-gray-500">لطفاً عبارت جستجوی دیگری را امتحان کنید.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols- 3 gap-6 mb-12">
          {posts.map((post, index) => (
            <Link key={post.id} href={`/blog/${post.id}`}>
              <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all">
                <div className="aspect-video relative overflow-hidden">
                  <Image
                    src={post.featured_image_url || getImagePlaceholder(index % 3)}
                    alt={post.title.rendered}
                    fill
                    className="object-cover transition-transform hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="text-sm text-gray-500 mb-2">
                    {formatDate(post.date)}
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                    {post.title.rendered}
                  </h2>
                  <div 
                    className="text-gray-600 line-clamp-3 mb-4"
                    dangerouslySetInnerHTML={{ 
                      __html: extractExcerpt(post.excerpt.rendered) 
                    }}
                  />
                  <div className="text-primary font-medium hover:underline">
                    ادامه مطلب
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
      
      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination>
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
  );
}