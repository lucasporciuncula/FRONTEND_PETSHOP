"use client";

import { AuthProvider } from "./context/AuthContext";
import { ProductProvider } from "./context/ProductsContext";
import { UserProvider } from "./context/UserContext";
import { CartProvider } from "./hooks/useOrders";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ProductProvider>
        <UserProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </UserProvider>
      </ProductProvider>
    </AuthProvider>
  );
}