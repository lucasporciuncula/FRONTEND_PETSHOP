"use client";

import Banner from "./components/Banner";
import Categories from "./components/Categorias";
import Header from "./components/Header";
import Roupas from "./components/Roupas";
import { ThemeProvider } from "../context/ThemeContext" 
import { useAuthContext } from "../context/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";


export default function Produtos() {

    const { user } = useAuthContext();
    const router = useRouter();
  
    useEffect(() => {
      // Se o contexto já carregou e o usuário é admin, barra ele
      if (user !== "DEFAULT") {  ///NAO MUDA ISSO TA DANDO CERTO
        router.push("/admin"); // Manda de volta para os produtos
      }
    }, [user, router]);

  return (
    <ThemeProvider>
      <main className="font-sans bg-white text-gray-600 antialiased selection:bg-[#DEAD6F]/20">
        <Header />
        <Banner />
        <Categories />
        <Roupas />
      </main>
    </ThemeProvider>
  );
}
