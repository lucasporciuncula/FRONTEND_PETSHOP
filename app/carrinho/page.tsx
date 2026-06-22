"use client";

import Image from "next/image";
import Link from "next/link";
import { useProducts } from "../hooks/useProducts";
export default function Carrinho() {

    const {products} = useProducts()

  return (
    <div className="flex flex-col items-center justify-start w-full min-h-screen bg-[#FAFAF8] font-sans">
      
      <div className="w-full max-w-7xl px-8 py-4 grid grid-cols-1 md:grid-cols-3 items-center gap-4">
        <div className="flex justify-start">
          <Link href="/">
            <Image
              src="/images/logo_petshop.png"
              alt="PetShop Logo"
              width={35}
              height={50}
              priority
              className="h-auto w-auto object-contain"
            />
          </Link>
        </div>

        <div className="hidden md:block">
          <form className="relative flex items-center border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 focus-within:border-[#664533] transition-all">
            <input
              type="text"
              placeholder="Pesquise por mais de 10.000 produtos..."
              className="w-full bg-transparent text-sm text-gray-700 outline-none pr-8"
            />
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className="absolute right-3 text-gray-400">
              <path fill="currentColor" d="M21.71 20.29L18 16.61A9 9 0 1 0 16.61 18l3.68 3.68a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.39ZM11 18a7 7 0 1 1 7-7a7 7 0 0 1-7 7Z" />
            </svg>
          </form>
        </div>

        <div className="hidden sm:flex justify-end gap-6 text-sm text-right">
          <div>
            <span className="block text-xs uppercase tracking-wider text-[#664533] font-medium">Telefone</span>
            <span className="font-semibold text-gray-900">+980-34984089</span>
          </div>
          <div>
            <span className="block text-xs uppercase tracking-wider text-[#664533] font-medium">Email</span>
            <span className="font-semibold text-gray-900">petshop@gmail.com</span>
          </div>
        </div>
      </div>


      <div className="w-full bg-[#664533] py-4 px-8 sm:px-16 flex justify-between items-center">
        <h1 className="text-3xl sm:text-4xl font-normal text-white">
          Carrinho
        </h1>
        <button
          onClick={() => setItensFicticios([])}
          className="text-lg font-medium text-[#DEAD6F] hover:text-white transition-colors uppercase tracking-wider"
        >
          limpar
        </button>
      </div>

      {/* 3. LISTA DE PRODUTOS DA ORDER (.MAP) */}
      <div className="w-full max-w-7xl px-8 sm:px-16 py-8 flex flex-col gap-6 flex-1">
        {products.length === 0 ? (
          <div className="text-center py-12 text-gray-400 text-lg">Seu carrinho está vazio.</div>
        ) : (
          products.map((item) => (
            <div 
              key={item?.id} 
              className="w-full flex items-center justify-between border-b border-gray-200 pb-6 last:border-none"
            >
              {/* Bloco da Esquerda: Imagem + Detalhes */}
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 border border-gray-300 bg-white rounded flex items-center justify-center p-2">
                  <div className="w-full h-full bg-gray-100 rounded relative">
                    {/* Substitua pelo item.imagem quando os dados reais existirem */}
                    <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">[Imagem]</div>
                  </div>
                </div>
                
                <div className="flex flex-col gap-1">
                  <span className="text-xs uppercase font-bold text-gray-400 tracking-wider">
                    {item?.categoria}
                  </span>
                  <h3 className="text-lg font-bold text-[#4A3728]">
                    {item?.label}
                  </h3>
                  <span className="text-sm text-gray-500">
                    Preço unitário: R$ {item?.price.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Bloco da Direita: Quantidade + Preço Total do Item */}
              <div className="flex flex-col items-end gap-2 text-right">
                <div className="px-3 py-1 border border-gray-300 bg-white text-gray-700 text-sm font-semibold rounded">
                  Qtd: {item?.}
                </div>
                <span className="text-xl font-extrabold text-[#4A3728]">
                  R$ {(item?.preco * item?.quantidade).toFixed(2)}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 4. RODAPÉ DE FINALIZAÇÃO DA COMPRA (Faixa bege com botão Comprar à direita) */}
      <div className="w-full bg-[#E6DCD2] py-6 px-8 sm:px-16 flex justify-end items-center mt-auto">
        <div className="flex items-center gap-8">
          <div className="text-right">
            <span className="text-xs uppercase tracking-wider text-[#664533] block">Total do Pedido</span>
            <span className="text-2xl font-black text-[#664533]">
              R$ {itensFicticios.reduce((acc, item) => acc + (item.preco * item.quantidade), 0).toFixed(2)}
            </span>
          </div>
          <button className="bg-[#664533] hover:bg-[#523728] text-white px-10 py-4 font-bold text-lg rounded shadow-md active:scale-95 transition-all uppercase tracking-wider">
            COmprar
          </button>
        </div>
      </div>

    </div>
  );
}