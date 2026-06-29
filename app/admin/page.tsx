"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useProductContext } from "../context/ProductsContext";
import { useProducts } from "../hooks/useProducts";
import ProductList from "./components/ProductList";
import AdminFilters from "./components/AdminFilters";
import ProductDetails from "./components/ProductDetails";
import ProductForm from "./components/ProductForm";
import { Products } from "../types/productsType";
import { LogOut } from "lucide-react";

export type modoAtivado = "olhar" | "criar" | "editar"

export default function Admin() {
  const { product, setProduct } = useProductContext();
  const { products, createProduct, deleteProduct, updateProduct } = useProducts();
  const router = useRouter();

  // Estados com tipagem inferida e explícita
  const [selectedAnimal, setSelectedAnimal] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [mode, setModoAtivado] = useState<modoAtivado>("olhar");
  // Altere o useEffect de validação do Admin para isto:
  const { user, loading, logout } = useAuthContext(); // Adicione 'loading' aqui se necessário

  useEffect(() => {
  if (loading) return; 
  if (!user) return;
  if (user.role !== "ADMIN") {
    router.push("/Produtos");
  }
}, [user, loading, router]);

  if (loading) {
    return <div className="p-8">Carregando painel...</div>;
  }

  const filteredProducts = products
    .filter((p) => p?.animal === selectedAnimal || selectedAnimal === "all")
    .filter((p) => p?.categoria === selectedCategory || selectedCategory === "all");

  const handleSelectProduct = (prod: Products) => {
    setProduct(prod?.id === product?.id ? null : prod);
    setModoAtivado("olhar");
  };

  return (
    <div className="flex flex-col items-center justify-start w-full min-h-screen bg-[#FAFAF8] p-8 font-sans">

      <div className="w-full max-w-7xl mb-8 flex justify-between items-end">
        <div>
          <span className="text-[#4A3728] font-bold text-sm tracking-widest uppercase mb-1 block">
            # Painel de Controle
          </span>
          <h1 className="font-extrabold text-4xl text-[#4A3728]">
            Administração Pet Shop
          </h1>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => router.push("/pedidos_admin")}
            className="px-6 py-3 rounded-lg text-sm font-bold transition-all bg-[#4A3728] hover:bg-[#38291e] text-white shadow-md flex"
          >
            Voltar
          </button>
          <button
            onClick={() => logout()}
            className="px-6 py-3 rounded-lg text-sm font-bold transition-all bg-[#4A3728] hover:bg-[#38291e] text-white shadow-md flex"
          >
            <LogOut size={20} color="white" /> Sair
          </button>
          <button
            onClick={() => { setModoAtivado("criar"); setProduct(null); }}
            className="px-6 py-3 rounded-lg text-sm font-bold transition-all bg-[#4A3728] hover:bg-[#38291e] text-white shadow-md"
          >
            + Novo Produto
          </button>
          <button
            onClick={() => mode === "editar" ? setModoAtivado("olhar") : setModoAtivado("editar")}
            disabled={!product && mode !== "criar"}
            className="px-6 py-3 rounded-lg text-sm font-bold transition-all bg-[#F5F2EC] hover:bg-[#e8e2d5] text-[#4A3728] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {mode === "editar" ? "Cancelar Edição" : "Editar Selecionado"}
          </button>
        </div>
      </div>

      <AdminFilters
        selectedAnimal={selectedAnimal}
        setSelectedAnimal={setSelectedAnimal}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <div className="flex flex-col lg:flex-row gap-6 w-full max-w-7xl mt-8 items-start justify-between flex-1">

        <ProductList
          products={filteredProducts}
          selectedProduct={product}
          onSelect={handleSelectProduct}
        />

        <div className="w-full lg:max-w-md xl:max-w-lg sticky top-8">
          {mode === "olhar" && (
            <ProductDetails
              product={product}
              onDelete={deleteProduct}
            />
          )}

          {(mode === "criar" || mode === "editar") && (
            <ProductForm
              mode={mode}
              initialData={mode === "editar" ? product : null}
              onSubmit={mode === "criar" ? createProduct : updateProduct}
              onCancel={() => setModoAtivado("olhar")}
            />
          )}
        </div>

      </div>
    </div>
  );
}