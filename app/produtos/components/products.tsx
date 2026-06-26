"use client";

import { useProductContext } from "@/app/context/ProductsContext";
import useCategories from "@/app/hooks/useCategories";
import { useCart } from "@/app/hooks/useOrders";
import { useProducts } from "@/app/hooks/useProducts";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Produto() {
  const { setProduct } = useProductContext();
  const { products } = useProducts();
  const { addToCart } = useCart();
  const router = useRouter(); 
  const { animals, categories } = useCategories();

  const [selectedAnimal, setSelectedAnimal] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const ButtonStyle = (isActive: boolean) =>
    `px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-[11px] sm:text-xs font-bold transition-all shrink-0 ${
      isActive
        ? "bg-[#4A3728] text-white shadow-md"
        : "bg-white text-[#4A3728] hover:bg-[#F5F2EC] border border-[#E8E3DD]"
    }`;

  const produ = products.filter((p) =>
    (selectedCategory === "all" || p?.categoria === selectedCategory) &&
    (selectedAnimal === "all" || p?.animal === selectedAnimal)
  );

  return (
    <section className="py-8 sm:py-12 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-10 gap-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium text-gray-900">Produtos para Pets</h2>
        </div>

        {/* Filtros Responsivos */}
        <div className="w-full max-w-7xl flex flex-col gap-4 bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-[#E8E3DD] mb-8">
          <div className="flex items-center gap-3 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none [&::-webkit-scrollbar]:hidden">
            <span className="text-[11px] sm:text-xs font-bold text-[#8C7A6B] uppercase tracking-wider mr-2 shrink-0">Animal:</span>
            {animals.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedAnimal(filter.id)}
                className={ButtonStyle(selectedAnimal === filter.id)}
              >
                {filter.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none [&::-webkit-scrollbar]:hidden">
            <span className="text-[11px] sm:text-xs font-bold text-[#8C7A6B] uppercase tracking-wider mr-2 shrink-0">Categoria:</span>
            {categories.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedCategory(filter.id)}
                className={ButtonStyle(selectedCategory === filter.id)}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid de Produtos */}
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {produ.map((item) => (
            <div
              key={item?.id}
              className="bg-[#ffffff] rounded-2xl p-3 sm:p-4 border border-gray-100 relative group shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col h-full"
            >
              <div 
                className="relative w-full h-48 sm:h-64 bg-gray-100 rounded-xl overflow-hidden mb-4" 
                onClick={() => {
                  setProduct(item);
                  router.push(`/item/${item?.label}`);
                }}
              >
                <Image
                  src={`/images/products/${item?.animal}/${item?.image}.jpg`}
                  alt={item?.image || "nome da imagem"}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="space-y-2 flex-1 flex flex-col">
                <Link href={`/item/${item?.label}`}>
                  <h3 className="text-sm sm:text-base font-semibold text-gray-900 hover:text-[#664533] transition-colors h-10 sm:h-12 line-clamp-2 leading-snug">
                    {item?.label}
                  </h3>
                </Link>
                
                <h4 className="text-base sm:text-lg font-bold text-[#030302]">
                  R${item?.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </h4>
                
                <div className="flex items-center gap-2 pt-2 mt-auto">
                  <button
                    className="flex-1 bg-gray-900 hover:bg-[#DEAD6F] text-white text-[11px] sm:text-xs uppercase font-bold py-2.5 sm:py-3 rounded transition-colors"
                    onClick={() => addToCart(item?.id ?? 1)}
                  >
                    Adicionar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}