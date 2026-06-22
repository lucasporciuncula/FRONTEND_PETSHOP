"use client";

import { LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  const buttonClick = () => {
    router.push('/login');
  };

  return (
    <header className="w-full bg-white border-b border-gray-100">
      {/* Container Principal: Grid com 3 colunas */}
      <div className="w-full pr-4 pl-0 py-4 sm:py-6 grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
        
        {/* 1. Logo (Esquerda) */}
        <div className="flex justify-start ml-10">
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

        {/* 2. Barra de Pesquisa (Centro) */}
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

        {/* 3. Botões e Contatos (Direita) */}
        <div className="hidden sm:flex items-center justify-end gap-8 mr-10">
          
          {/* Botões: Carrinho e Logout */}
          <div className="flex items-center gap-4 text-gray-700">
            <button className="relative hover:text-[#664533] transition-colors p-1">
              <svg width="22" height="22" viewBox="0 0 24 24"><path fill="currentColor" d="M8.5 19a1.5 1.5 0 1 0 1.5 1.5A1.5 1.5 0 0 0 8.5 19ZM19 16H7a1 1 0 0 1 0-2h8.491a3.013 3.013 0 0 0 2.885-2.176l1.585-5.55A1 1 0 0 0 19 5H6.74a3.007 3.007 0 0 0-2.82-2H3a1 1 0 0 0 0 2h.921a1.005 1.005 0 0 1 .962.725l.155.545v.005l1.641 5.742A3 3 0 0 0 7 18h12a1 1 0 0 0 0-2Zm-1.326-9l-1.22 4.274a1.005 1.005 0 0 1-.963.726H8.754l-.255-.892L7.326 7ZM16.5 19a1.5 1.5 0 1 0 1.5 1.5a1.5 1.5 0 0 0-1.5-1.5Z"/></svg>
              <span className="absolute -top-1 -right-1 bg-[#664533] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">3</span>
            </button>
            <button className="relative hover:text-[#db4e49] transition-colors p-1" onClick={buttonClick}>
              <LogOut size={18}/>     
            </button>
          </div>

          {/* Informações de Contato */}
          <div className="flex gap-6 text-sm text-right">
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
      </div>
    </header>
  );
}