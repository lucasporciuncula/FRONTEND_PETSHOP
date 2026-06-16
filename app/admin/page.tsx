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


// Recomendo mover esta interface para um arquivo separado, ex: types/Product.ts
export interface Product {
  id: number; // ou string, dependendo do seu banco de dados
  label: string;
  description: string;
  price: number;
  animal: string;
  categoria: string;
  image: string;
}

export type AdminMode = "view" | "create" | "edit";

export default function Admin() {
  const { product, setProduct } = useProductContext();
  const { products, createProduct, deleteProduct, updateProduct } = useProducts();
  const { user } = useAuthContext();
  const router = useRouter();

  // Estados com tipagem inferida e explícita
  const [selectedAnimal, setSelectedAnimal] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [mode, setMode] = useState<AdminMode>("view");

  useEffect(() => {
    if (user !== "ADMIN") {
      router.push("/Produtos");
    }
  }, [user, router]);

  const filteredProducts = products
    .filter((p) => p?.animal === selectedAnimal || selectedAnimal === "all")
    .filter((p) => p?.categoria === selectedCategory || selectedCategory === "all");

  const handleSelectProduct = (prod: Product) => {
    setProduct(prod?.id === product?.id ? null : prod);
    setMode("view");
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
            onClick={() => { setMode("create"); setProduct(null); }}
            className="px-6 py-3 rounded-lg text-sm font-bold transition-all bg-[#4A3728] hover:bg-[#38291e] text-white shadow-md"
          >
            + Novo Produto
          </button>
          <button
            onClick={() => mode === "edit" ? setMode("view") : setMode("edit")}
            disabled={!product && mode !== "create"}
            className="px-6 py-3 rounded-lg text-sm font-bold transition-all bg-[#F5F2EC] hover:bg-[#e8e2d5] text-[#4A3728] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {mode === "edit" ? "Cancelar Edição" : "Editar Selecionado"}
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
          {mode === "view" && (
            <ProductDetails
              product={product}
              onDelete={deleteProduct}
            />
          )}

          {(mode === "create" || mode === "edit") && (
            <ProductForm
              mode={mode}
              initialData={mode === "edit" ? product : null}
              onSubmit={mode === "create" ? createProduct : updateProduct}
              onCancel={() => setMode("view")}
            />
          )}
        </div>

      </div>
    </div>
  );
}