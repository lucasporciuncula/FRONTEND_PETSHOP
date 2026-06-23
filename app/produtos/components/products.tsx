"use client";

import { useCart } from "@/app/context/OrdersContext";
import { useProductContext } from "@/app/context/ProductsContext";
import useCategories from "@/app/hooks/useCategories";
import { useProducts } from "@/app/hooks/useProducts";
import Image from "next/image";
import Link from "next/link";
// IMPORTANTE: Mude para useRouter
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Produto() {

    const { setProduct } = useProductContext();
    const { products } = useProducts();
    const { addToCart } = useCart()
    const router = useRouter(); // Inicializa o roteador
    const {animals, categories} = useCategories()

    const [selectedAnimal, setSelectedAnimal] = useState("all")

    const [selectedCategory, setSelectedCategory] = useState("all")

    const ButtonStyle = (isActive: boolean) =>
        `px-5 py-2.5 rounded-full text-xs font-bold transition-all shrink-0 ${isActive
            ? "bg-[#4A3728] text-white shadow-md"
            : "bg-white text-[#4A3728] hover:bg-[#F5F2EC] border border-[#E8E3DD]"
        }`;


    const produ = products.filter((p) =>
        (selectedCategory === "all" || p?.categoria === selectedCategory) &&
        (selectedAnimal === "all" || p?.animal === selectedAnimal)
    );
    return (
        <section className="py-12 bg-gray-50/50">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4">
                    <h2 className="text-3xl md:text-4xl font-medium text-gray-900">Produtos para Pets</h2>
                </div>

                <div className="w-full max-w-7xl flex flex-col gap-4 bg-white p-6 rounded-2xl shadow-sm border border-[#E8E3DD]">
                    <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide pb-2">
                        <span className="text-xs font-bold text-[#8C7A6B] uppercase tracking-wider mr-2">Animal:</span>
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

                    <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide">
                        <span className="text-xs font-bold text-[#8C7A6B] uppercase tracking-wider mr-2">Categoria:</span>
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

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {produ.map((item) => (
                        <div
                            key={item?.id}
                            className="bg-white rounded-2xl p-4 border border-gray-100 relative group shadow-sm hover:shadow-md transition-shadow cursor-pointer"

                        >
                            {/* Resto do seu código do card de produto continua igual... */}
                            <div className="relative w-full h-64 bg-gray-100 rounded-xl overflow-hidden mb-4" onClick={() => {
                                // 1. Salva no contexto
                                setProduct(item);
                                // 2. Navega para a página do item
                                router.push(`/item/${item?.label}`);
                            }}>
                                <Image
                                    src={`/images/products/${item?.animal}/${item?.image}.jpg`}
                                    alt={item?.image || "nome da imagem"}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>

                            <div className="space-y-2">
                                <Link href={`/item/${item?.label}`}>
                                    <h3 className="text-base font-semibold text-gray-900 hover:text-[#664533] transition-colors">
                                        {item?.label}
                                    </h3>
                                </Link>
                                <h4 className="text-lg font-bold text-[#030302]">R${item?.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</h4>
                                <div className="flex items-center gap-2 pt-2">
                                    <button
                                        className="flex-1 bg-gray-900 hover:bg-[#DEAD6F] text-white text-xs uppercase font-bold py-3 rounded transition-colors"
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