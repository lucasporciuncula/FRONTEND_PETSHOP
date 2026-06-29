"use client";

import Banner from "./components/Banner";
import Header from "./components/Header";
import Produto from "./components/products";
import { ThemeProvider } from "../context/ThemeContext"
import { useAuthContext } from "../context/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";


export default function Produtos() {

  const { user } = useAuthContext();
  const router = useRouter();

  // Altere o useEffect da página de Produtos para isto:
  useEffect(() => {
    // Se o usuário estiver logado e for um ADMIN, manda ele para a página de admin
    if (user?.role === "ADMIN") {
      router.push("/pedidos_admin");
    }
  }, [user, router]);

  return (
    <ThemeProvider>
      <main className="font-sans bg-white text-gray-600 antialiased selection:bg-[#DEAD6F]/20">
      <section id="top">
        <Header /></section>
        <Banner />
        <section  id="produtos">
        <Produto/>
        </section>
      </main>
    </ThemeProvider>
  );
}
