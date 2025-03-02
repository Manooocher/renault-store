"use client";

import { ThemeProvider } from "next-themes";
import { CartProvider } from "@/context/cart-context";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <CartProvider>
        <TooltipProvider>
          {children}
          <Toaster />
        </TooltipProvider>
      </CartProvider>
    </ThemeProvider>
  );
}