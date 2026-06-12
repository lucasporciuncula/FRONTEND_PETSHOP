"use client";

import Banner from "./components/Banner";
import Categories from "./components/Categorias";
import Header from "./components/Header";
import Roupas from "./components/Roupas";
import { ThemeProvider } from "../context/ThemeContext" 

export default function Produtos() {
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
