"use client";

import { useProductContext } from "@/app/context/ProductsContext";
import { useCart } from "@/app/hooks/useOrders";
import { ClockCheckIcon, LogOut, Search, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const router = useRouter();
  const { products } = useProductContext();
  const { cartItems } = useCart();

  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState(products.slice(0, 0));
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const buttonClick = () => {
    router.push('/login');
  };

  const buttonClickCart = () => {
    router.push('/carrinho');
  };

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

  const handleSuggestionClick = (label: string) => {
    setIsDropdownOpen(false);
    setSearchTerm("");
    router.push(`/item/${label}`);
  };  

  return (
    <header className="w-full fixed z-50 top-0 left-0 bg-white border-b border-gray-100">
      <div className="max-w-9xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-4">
        
        {/* Logo */}
        <div className="flex shrink-0">
          <Link href="/">
            <Image
              src="/images/logo_petshop.png"
              alt="PetShop Logo"
              width={35}
              height={50}
              priority
              className="h-10 w-auto object-contain"
            />
          </Link>
        </div>

        {/* Barra de pesquisa responsiva (Oculta em telas muito pequenas, visível a partir de sm:) */}
        <div className="hidden sm:block flex-1 max-w-md relative z-50">
          <form className="relative flex items-center border rounded-lg px-3 py-2 bg-gray-50 border-[#664533] transition-all" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Pesquise produtos..."
              className="w-full bg-transparent text-sm text-gray-700 outline-none pr-8"
            />
            <Search className="absolute right-3 w-4 h-4 text-gray-400" />
          </form>

          {isDropdownOpen && suggestions.length > 0 && (
            <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-50">
              <ul className="max-h-64 overflow-y-auto">
                {suggestions.map((product) => (
                  <li
                    key={product?.id}
                    onClick={() => handleSuggestionClick(product?.label ? product?.label : "missing label")}
                    className="px-4 py-2.5 flex items-center gap-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#664533] cursor-pointer transition-colors border-b border-gray-50 last:border-none"
                  >
                    <div className="relative w-10 h-10 shrink-0 bg-gray-50 rounded overflow-hidden">
                      <Image
                        src={`/images/products/${product?.animal}/${product?.image}.jpg`}
                        alt={product?.label || "imagem"}
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                    <span className="font-medium truncate">{product?.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {isDropdownOpen && suggestions.length === 0 && (
            <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-4 text-sm text-gray-500 text-center z-50">
              Nenhum produto encontrado para "{searchTerm}"
            </div>
          )}
        </div>

        {/* Ações e Contato */}
        <div className="flex items-center gap-4 sm:gap-6 md:gap-8">
          {/* Ícones de Ação */}
          <div className="flex items-center gap-2 sm:gap-4 text-gray-700">
            <button className="relative hover:text-[#664533] transition-colors p-2" onClick={()=>router.push("/pedidos_user")} aria-label="Carrinho">
              <ClockCheckIcon className="w-5 h-5" />
            </button>

            <button className="relative hover:text-[#664533] transition-colors p-2" onClick={buttonClickCart} aria-label="Carrinho">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute top-0 right-0 bg-[#664533] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {cartItems.length}
              </span>
            </button>
            <button className="relative hover:text-[#db4e49] transition-colors p-2" onClick={buttonClick} aria-label="Sair">
              <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

          {/* Informações de contato (Ocultas no mobile, visíveis em telas grandes) */}
          <div className="hidden lg:flex gap-6 text-sm text-right border-l border-gray-100 pl-6">
            <div>
              <span className="block text-[10px] uppercase tracking-wider text-[#664533] font-medium">Telefone</span>
              <span className="font-semibold text-gray-900 whitespace-nowrap">+980-34984089</span>
            </div>
            <div>
              <span className="block text-[10px] uppercase tracking-wider text-[#664533] font-medium">Email</span>
              <span className="font-semibold text-gray-900 whitespace-nowrap">petshop@gmail.com</span>
            </div>
          </div>
        </div>

      </div>
    </header>
  );
}