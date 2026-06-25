"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function NavBarra() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full bg-white sticky top-0 z-50 shadow-sm">
      <div className="max-w-9xl mx-auto px-4 sm:px-6 h-20 flex justify-between items-center">
        <Link href="/" className="text-2xl sm:text-3xl font-black text-[#4a2f20] tracking-tight">
          PetShop
        </Link>

        <div className="hidden md:flex items-center gap-8 font-semibold text-gray-700">
          <Link href="#Home" className="text-[#4a2f20]">Home</Link>
          <Link href="#Sobre" className="hover:text-[#4a2f20] transition-colors">Sobre</Link>
          <Link href="#Produtos" className="hover:text-[#4a2f20] transition-colors">Produtos</Link>
          <Link href="#Contato" className="hover:text-[#4a2f20] transition-colors">Contato</Link>
        </div>

        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="md:hidden p-2 text-gray-700 hover:text-[#4a2f20] focus:outline-none"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <div className={`md:hidden border-t border-gray-100 bg-white transition-all duration-200 overflow-hidden ${isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="px-4 pt-2 pb-4 space-y-3 font-semibold text-gray-700 flex flex-col">
          <Link href="#Home" onClick={() => setIsOpen(false)} className="text-[#4a2f20] py-1">Home</Link>
          <Link href="#Sobre" onClick={() => setIsOpen(false)} className="hover:text-[#4a2f20] transition-colors py-1">Sobre</Link>
          <Link href="#Produtos" onClick={() => setIsOpen(false)} className="hover:text-[#4a2f20] transition-colors py-1">Produtos</Link>
          <Link href="#Contato" onClick={() => setIsOpen(false)} className="hover:text-[#4a2f20] transition-colors py-1">Contato</Link>
        </div>
      </div>
    </nav>
  );
}