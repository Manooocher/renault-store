"use client";

import { useState, useEffect } from "react";
import { getProducts } from "@/lib/api";
import { Product } from "@/types";

interface UseProductsProps {
  category?: number;
  search?: string;
  page?: number;
  per_page?: number;
  orderby?: string;
  order?: "asc" | "desc";
}

export function useProducts({
  category,
  search,
  page = 1,
  per_page = 12,
  orderby = "date",
  order = "desc",
}: UseProductsProps = {}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const { products: fetchedProducts, totalPages: fetchedTotalPages } = await getProducts({
          category,
          search,
          page,
          per_page,
          orderby,
          order,
        });
        
        setProducts(fetchedProducts);
        setTotalPages(fetchedTotalPages);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch products"));
        console.error("Error fetching products:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [category, search, page, per_page, orderby, order]);

  return { products, totalPages, isLoading, error, currentPage: page };
}