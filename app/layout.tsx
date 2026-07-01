import type { Metadata } from "next";
// 1. Importe a fonte desejada do pacote do Next.js
import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"], // Carrega os pesos que vamos usar
  display: "swap",
});
 
export const metadata: Metadata = {
  title: "PetShop Premium",
  description: "O melhor para o seu pet",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      {/* 3. Injete a classe da fonte no body do site */}
      <body className={`${nunito.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}

