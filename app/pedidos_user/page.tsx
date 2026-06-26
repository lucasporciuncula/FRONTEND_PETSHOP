"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "../context/OrdersContext";
import { useRouter } from "next/navigation";
import { useProductContext } from "../context/ProductsContext";
import { useState } from "react";
export default function Carrinho() {

  const router = useRouter();
  const { orders } = useCart();
  const { products } = useProductContext()
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState(products.slice(0, 0));
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim().length > 0) {
      const filtered = products.filter((product) =>
        product?.label.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
      setIsDropdownOpen(true);
    } else {
      setSuggestions([]);
      setIsDropdownOpen(false);
    }
  };

  const handleClick = () => {
    router.push("/Produtos")
  }

  const handleSuggestionClick = (label: string) => {
    setIsDropdownOpen(false);
    setSearchTerm("");
    router.push(`/item/${label}`);
  };

  const handleNext = () =>{
    if(cartItems[0]===undefined){return}
    router.push("/pagamento")
  }


  const { cartItems, cartTotal, cleanCart, updateQuantity, makeOrder } = useCart()

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

        <div className="hidden md:block relative z-50">


          <form className="relative flex items-center border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 focus-within:border-[#664533] transition-all" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Pesquise por mais de 10.000 produtos..."
              className="w-full bg-transparent text-sm text-gray-700 outline-none pr-8"
            />
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className="absolute right-3 text-gray-400">
              <path fill="currentColor" d="M21.71 20.29L18 16.61A9 9 0 1 0 16.61 18l3.68 3.68a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.39ZM11 18a7 7 0 1 1 7-7a7 7 0 0 1-7 7Z" />
            </svg>
          </form>

          {isDropdownOpen && suggestions.length > 0 && (
            <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
              <ul className="max-h-80 overflow-y-auto">
                {suggestions.map((product) => (
                  <li
                    key={product?.id}
                    onClick={() => handleSuggestionClick(product?.label ? product?.label : "missing label")}
                    className="px-4 py-3 flex items-center gap-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#664533] cursor-pointer transition-colors border-b border-gray-50 last:border-none"
                  >
                    <div className="relative w-20 h-20 shrink-0 bg-gray-100 rounded overflow-hidden">
                      <Image
                        src={`/images/products/${product?.animal}/${product?.image}.jpg`}
                        alt={product?.label || "nome da imagem"}
                        fill
                        className="object-contain p-4"
                      />
                    </div>
                    <span className="font-medium">{product?.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}


          {isDropdownOpen && suggestions.length === 0 && (
            <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-4 text-sm text-gray-500 text-center">
              Nenhum produto encontrado para {searchTerm}
            </div>
          )}
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
        <div className="flex flex-row flex-2">
          <div className="border border-gray-500 bg-white p-2 mx-2 mr-10 font-bold text-black rounded-sm cursor-pointer hover:bg-[#E6DCD2]" onClick={() => handleClick()}>
            Voltar
          </div>
          <h1 className="text-3xl sm:text-4xl text-white font-extrabold">
            Carrinho
          </h1>
        </div>
        <button
          onClick={() => cleanCart()}
          className="text-lg font-medium text-[#DEAD6F] hover:text-white transition-colors uppercase tracking-wider"
        >
          limpar
        </button>
      </div>

      {/* 3. LISTA DE PRODUTOS DA ORDER (.MAP) */}
      <div className="w-full max-w-7xl px-8 sm:px-16 py-8 flex flex-col gap-6 flex-1">
        {cartItems.length === 0 ? (
          <div className="text-center py-12 text-gray-400 text-lg">Nenhum pedido feito..</div>
        ) : (
          orders.map((item) => (
            <div
              key={item?.id}
              className="w-full flex items-center justify-between border-b border-gray-200 pb-6 last:border-none"
            >
              {/* Bloco da Esquerda: Imagem + Detalhes */}
              <div className="flex items-center gap-6">
                <div className="flex flex-col gap-1">
                  <span className="text-xs uppercase font-bold text-gray-400 tracking-wider">
                    Pedido em: {item?.createdAt}
                  </span>
                  <h3 className="text-lg font-bold text-[#4A3728]">
                    {item?.status}
                  </h3>
                  <h3 className="text-lg font-bold text-[#4A3728]">
                    {item?.isDelivery?"Delivery":"Retire na loja!"}
                  </h3>
                  <span className="text-sm text-gray-500">
                    Preço unitário: R$ {item?.total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Bloco da Direita: Quantidade + Preço Total do Item */}
              <div className="flex flex-col items-end gap-2 text-right">
                <span className="text-xl font-extrabold text-[#4A3728]">
                  R$ {(item?.total).toFixed(2)}
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
              R$ {cartTotal}
            </span>
          </div>
          <button className="bg-[#664533] hover:bg-[#523728] text-white px-10 py-4 font-bold text-lg rounded shadow-md active:scale-95 transition-all uppercase tracking-wider" onClick={()=>handleNext()}>
            Comprar
          </button>
        </div>
      </div>
    </div>
  );
}