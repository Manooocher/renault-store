import { Product, Category, BlogPost } from "@/types";

const API_URL = "https://renault-store.ir/wp-json/wc/v3";
const CONSUMER_KEY = process.env.WC_CONSUMER_KEY || "";
const CONSUMER_SECRET = process.env.WC_CONSUMER_SECRET || "";

// Helper function to build authentication parameters
const getAuthParams = () => {
  return new URLSearchParams({
    consumer_key: CONSUMER_KEY,
    consumer_secret: CONSUMER_SECRET,
  }).toString();
};

// Fetch products with optional filters
export async function getProducts(
  params: {
    category?: number;
    search?: string;
    page?: number;
    per_page?: number;
    orderby?: string;
    order?: "asc" | "desc";
  } = {}
): Promise<{ products: Product[]; totalPages: number }> {
  const queryParams = new URLSearchParams({
    ...params,
    page: params.page?.toString() || "1",
    per_page: params.per_page?.toString() || "12",
  });

  const authParams = getAuthParams();
  const url = `${API_URL}/products?${queryParams}&${authParams}`;

  try {
    const response = await fetch(url, { next: { revalidate: 3600 } });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const products = await response.json();
    const totalPages = parseInt(response.headers.get("X-WP-TotalPages") || "1", 10);
    
    return { products, totalPages };
  } catch (error) {
    console.error("Error fetching products:", error);
    return { products: [], totalPages: 0 };
  }
}

// Fetch a single product by ID
export async function getProduct(id: number): Promise<Product | null> {
  const authParams = getAuthParams();
  const url = `${API_URL}/products/${id}?${authParams}`;

  try {
    const response = await fetch(url, { next: { revalidate: 3600 } });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    return null;
  }
}

// Fetch all categories
export async function getCategories(): Promise<Category[]> {
  const authParams = getAuthParams();
  const url = `${API_URL}/products/categories?per_page=100&${authParams}`;

  try {
    const response = await fetch(url, { next: { revalidate: 86400 } }); // Cache for 24 hours
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const categories = await response.json();
    
    // Organize categories into a hierarchy
    const parentCategories = categories.filter((cat: any) => cat.parent === 0);
    
    return parentCategories.map((parent: any) => ({
      ...parent,
      children: categories.filter((child: any) => child.parent === parent.id)
    }));
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

// Fetch a single category by ID
export async function getCategory(id: number): Promise<Category | null> {
  const authParams = getAuthParams();
  const url = `${API_URL}/products/categories/${id}?${authParams}`;

  try {
    const response = await fetch(url, { next: { revalidate: 86400 } });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching category ${id}:`, error);
    return null;
  }
}

// Fetch blog posts
export async function getBlogPosts(
  params: {
    page?: number;
    per_page?: number;
    search?: string;
  } = {}
): Promise<{ posts: BlogPost[]; totalPages: number }> {
  const queryParams = new URLSearchParams({
    page: params.page?.toString() || "1",
    per_page: params.per_page?.toString() || "10",
    search: params.search || "",
  });

  const url = `https://renault-store.ir/wp-json/wp/v2/posts?${queryParams}`;

  try {
    const response = await fetch(url, { next: { revalidate: 3600 } });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const posts = await response.json();
    const totalPages = parseInt(response.headers.get("X-WP-TotalPages") || "1", 10);
    
    return { posts, totalPages };
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return { posts: [], totalPages: 0 };
  }
}

// Fetch a single blog post by ID
export async function getBlogPost(id: number): Promise<BlogPost | null> {
  const url = `https://renault-store.ir/wp-json/wp/v2/posts/${id}`;

  try {
    const response = await fetch(url, { next: { revalidate: 3600 } });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching blog post ${id}:`, error);
    return null;
  }
}

// Search products
export async function searchProducts(
  query: string,
  params: {
    page?: number;
    per_page?: number;
  } = {}
): Promise<{ products: Product[]; totalPages: number }> {
  return getProducts({
    search: query,
    page: params.page,
    per_page: params.per_page,
  });
}