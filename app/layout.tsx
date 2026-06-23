import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "./context/AuthContext";
import { UserProvider } from "./context/UserContext";
import { ProductProvider } from "./context/ProductsContext";
import { CartProvider } from "./context/OrdersContext";

export const metadata: Metadata = {
  title: "PetShop",
  description: "muito bom os produtos tá",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased"> <ProductProvider><AuthProvider>
        <CartProvider>
         
            
              <UserProvider>
                {children}
              </UserProvider>
            
         
        </CartProvider> </AuthProvider></ProductProvider>
      </body>
    </html>
  );
}
