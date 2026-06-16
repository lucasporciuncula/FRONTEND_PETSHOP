"use client";

import { useRouter } from "next/navigation";
import { useAuthContext } from "../context/AuthContext";
import { useProductContext } from "../context/ProductsContext";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useProducts } from "../hooks/useProducts";

export default function Admin() {
  const { product, setProduct, id } = useProductContext();
  const { products, createProduct, deleteProduct, updateProduct } =
    useProducts();

  const { user } = useAuthContext();
  const router = useRouter();

  const [selectedAnimal, setSelectedAnimal] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const fiteredProducts = products
    .filter((p) => p?.animal === selectedAnimal || selectedAnimal === "all")
    .filter(
      (p) => p?.categoria === selectedCategory || selectedCategory === "all",
    );

  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const [label, setLabel] = useState(product?.label);
  const [price, setPrice] = useState(product?.price);
  const [description, setDescription] = useState(product?.description);
  const [animal, setAnimal] = useState(product?.animal);
  const [category, setCategory] = useState(product?.categoria);
  const [image, setImage] = useState(product?.image);

  useEffect(() => {
    if (user !== "ADMIN") {
      router.push("/Produtos");
    }
  }, [user, router]);

  return (
    <div className="flex items-center justify-start w-full min-h-screen flex-col bg-[#0b0b0b] p-6">
      <span className="tracking-widest italic font-bold text-3xl text-white mb-6">
        PÁGINA do ADMIN
      </span>

      {/* Filtros de Animal */}
      <div className="flex items-center gap-2 border-b border-white/5 pb-5 overflow-x-auto scrollbar-hide w-full max-w-6xl justify-center">
        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mr-2">
          Animal:
        </span>
        {[
          { id: "all", label: "Todos" },
          { id: "dog", label: "Cachorros" },
          { id: "cat", label: "Gatos" },
        ].map((filter) => (
          <button
            key={filter.id}
            onClick={() => setSelectedAnimal(filter.id)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              selectedAnimal === filter.id
                ? "bg-[#f26422] text-white shadow-md shadow-[#f26422]/10"
                : "bg-[#121212] text-gray-400 hover:bg-[#161616] border border-white/5"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Filtros de Categoria */}
      <div className="flex items-center gap-2 border-b border-white/5 py-5 overflow-x-auto scrollbar-hide w-full max-w-6xl justify-center">
        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mr-2">
          Categoria:
        </span>
        {[
          { id: "all", label: "Todos" },
          { id: "bed", label: "Camas" },
          { id: "food", label: "Alimentação" },
          { id: "transport", label: "Transporte" },
          { id: "toy", label: "Brinquedos" },
          { id: "hygiene", label: "Higiene" },
          { id: "medicine", label: "Medicamentos" },
          { id: "shampoo", label: "Shampoos" },
        ].map((filter) => (
          <button
            key={filter.id}
            onClick={() => setSelectedCategory(filter.id)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              selectedCategory === filter.id
                ? "bg-[#f26422] text-white shadow-md shadow-[#f26422]/10"
                : "bg-[#121212] text-gray-400 hover:bg-[#161616] border border-white/5"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2 border-b border-white/5 py-5 overflow-x-auto scrollbar-hide w-full max-w-6xl justify-center">
        <button
          onClick={() => {
            (setIsCreating(!isCreating), setIsEditing(false));
          }}
          className="px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 hover:bg-green-600 bg-green-900 text-white shadow-md"
        >
          Criar novo Produto
        </button>
        <button
          onClick={() => {
            (setIsEditing(!isEditing), setIsCreating(false));
          }}
          className="px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 hover:bg-blue-600 bg-blue-900 text-white shadow-md"
        >
          Editar Produto Selecionado
        </button>
      </div>

      {/* CONTAINER PRINCIPAL LADO A LADO */}
      <div className="flex flex-row gap-2 w-full max-w-7xl mt-5 items-start justify-between flex-1">
        {/* COLUNA ESQUERDA: Lista de Produtos */}
        <div className="flex flex-col gap-4 overflow-y-auto max-h-[70vh] flex-1 scrollbar-hide max-w-150 w-full">
          {fiteredProducts.length === 0 ? (
            <p className="text-center text-gray-500 my-auto py-12 font-medium">
              Nenhum pedido encontrado neste filtro.
            </p>
          ) : (
            fiteredProducts.map((prod) => {
              const isSelected = product?.label === prod?.label;
              return (
                <div
                  key={prod?.label}
                  onClick={() =>
                    setProduct(prod?.id === product?.id ? null : prod)
                  }
                  className={`p-6 rounded-3xl border transition-all flex items-center justify-between cursor-pointer group min-h-32 w-full ${
                    isSelected
                      ? "bg-[#141414] border-[#f26422] shadow-lg shadow-[#f26422]/5"
                      : "bg-[#121212] border-white/5 hover:border-white/15 hover:bg-[#151515]"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="relative w-24 h-24 shrink-0 bg-[#1a1a1a] rounded-xl overflow-hidden flex items-center justify-center">
                      <Image
                        src={`/images/products/${prod?.animal}/${prod?.image}.jpg`}
                        alt={prod?.label || "Imagem do produto"}
                        width={150}
                        height={150}
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col text-sm text-gray-400">
                      <p className="font-bold text-gray-200 text-base">
                        {prod?.label}
                      </p>
                      <p className="font-normal text-gray-400 mt-1 text-sm line-clamp-2">
                        {prod?.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* COLUNA DIREITA: Detalhes do Produto Selecionado */}
        {isCreating === false && isEditing === false && (
          <div className="w-full max-w-150 bg-[#1e1e1e] border border-white/5 rounded-3xl p-6 flex flex-col gap-5 shadow-xl sticky top-6">
            <div className="flex flex-col gap-3">
              <h4 className="text-[10px] font-black uppercase text-gray-500 tracking-wider">
                Informações do Produto
              </h4>

              {product ? (
                <div className="flex flex-col gap-3 text-xs font-medium text-gray-300">
                  <div className="relative shrink-0 overflow-hidden flex items-center justify-center">
                    <Image
                      src={`/images/products/${product?.animal}/${product?.image}.jpg`}
                      alt={product?.label || "Imagem do produto"}
                      width={180}
                      height={180}
                      className="object-cover  rounded-2xl"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="text-gray-500 text-[10px] uppercase">
                      Animal
                    </span>
                    <span className="text-sm bg-[#121212] p-2 rounded-lg border border-white/5 capitalize">
                      {product?.animal}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-gray-500 text-[10px] uppercase">
                      Categoria
                    </span>
                    <span className="text-sm bg-[#121212] p-2 rounded-lg border border-white/5 capitalize">
                      {product?.categoria}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-gray-500 text-[10px] uppercase">
                      Nome
                    </span>
                    <span className="text-sm bg-[#121212] p-2 rounded-lg border border-white/5">
                      {product?.label}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-gray-500 text-[10px] uppercase">
                      Descrição
                    </span>
                    <span className="text-sm bg-[#121212] p-2 rounded-lg border border-white/5">
                      {product?.description}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-gray-500 text-[10px] uppercase">
                      Preço
                    </span>
                    <span className="text-sm bg-[#121212] p-2 rounded-lg border border-white/5 capitalize">
                      {product?.price.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                      })}
                    </span>
                    <button
                      onClick={() =>
                        deleteProduct(product?.id ? product.id : 1)
                      }
                      className="px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 hover:bg-red-600 bg-red-900 text-white shadow-md "
                    >
                      Deletar Produto Selecionado
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500 my-auto py-6 text-xs font-medium">
                  Selecione um produto na lista para visualizar as informações
                  aqui.
                </div>
              )}
            </div>
          </div>
        )}

        {isCreating === true && (
          <div className="w-full max-w-150 bg-[#1e1e1e] border border-white/5 rounded-3xl p-6 flex flex-col gap-5 shadow-xl sticky top-6">
            <div className="flex flex-col gap-3">
              <h4 className="text-[10px] font-black uppercase text-gray-500 tracking-wider">
                Criando um Produto
              </h4>

              {product ? (
                <div className="flex flex-col gap-3 text-xs font-medium text-gray-300">
                  <div className="relative shrink-0 overflow-hidden flex items-center justify-center">
                    <Image
                      src={`/images/products/${product?.animal}/${product?.image}.jpg`}
                      alt={product?.label || "Imagem do produto"}
                      width={180}
                      height={180}
                      className="object-cover  rounded-2xl"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="text-gray-500 text-[10px] uppercase">
                      Animal
                    </span>
                    <input
                      className="text-sm bg-[#121212] p-2 rounded-lg border border-white/5"
                      onChange={(e) => {
                        setAnimal(e.target.value);
                      }}
                      value={product.animal}
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-gray-500 text-[10px] uppercase">
                      Categoria
                    </span>
                    <input
                      className="text-sm bg-[#121212] p-2 rounded-lg border border-white/5"
                      onChange={(e) => {
                        setAnimal(e.target.value);
                      }}
                      value={product.animal}
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-gray-500 text-[10px] uppercase">
                      Nome
                    </span>
                    <span className="text-sm bg-[#121212] p-2 rounded-lg border border-white/5">
                      {product?.label}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-gray-500 text-[10px] uppercase">
                      Descrição
                    </span>
                    <span className="text-sm bg-[#121212] p-2 rounded-lg border border-white/5">
                      {product?.description}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-gray-500 text-[10px] uppercase">
                      Preço
                    </span>
                    <span className="text-sm bg-[#121212] p-2 rounded-lg border border-white/5 capitalize">
                      {product?.price.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                      })}
                    </span>
                    <button
                      onClick={() =>
                        deleteProduct(product?.id ? product.id : 1)
                      }
                      className="px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 hover:bg-red-600 bg-red-900 text-white shadow-md "
                    >
                      Deletar Produto Selecionado
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500 my-auto py-6 text-xs font-medium">
                  Selecione um produto na lista para visualizar as informações
                  aqui.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
