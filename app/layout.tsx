import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "./context/AuthContext";
import { UserProvider } from "./context/UserContext";

export const metadata: Metadata = {
  title: "SnapBite Delivery",
  description: "O melhor delivery de lanches",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased"><AuthProvider>
       <UserProvider>
              {children}</UserProvider>
          </AuthProvider>
      </body>
    </html>
  );
}
