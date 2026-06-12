"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight } from "lucide-react";

export default function NavBarra() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full bg-white sticky top-0 z-50 shadow-sm">
      <div className="max-w-9xl mx-auto px-6 h-20 flex justify-between items-center">
        <Link href="/" className="text-3xl font-black text-[#4a2f20] tracking-tight">
          PetShop
        </Link>

        <div className="hidden md:flex items-center gap-8 font-semibold text-gray-700">
          <Link href="#" className="text-[#4a2f20]">Home</Link>
          <Link href="#" className="hover:text-[#4a2f20] transition-colors">About</Link>
          <Link href="#" className="hover:text-[#4a2f20] transition-colors">Services</Link>
          <Link href="#" className="hover:text-[#4a2f20] transition-colors">Contact</Link>
          <button className="bg-[#4a2f20] hover:bg-[#362318] text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors">
            Carrinho <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <button className="md:hidden text-gray-700" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-4 font-semibold text-gray-700 shadow-inner">
          <Link href="#" className="text-[#eed5aa]">Menu</Link>
          <Link href="#" className="hover:text-[#eed5aa]">Sobre</Link>
          <Link href="#" className="hover:text-[#ffd387]">Contato</Link>
          <button className="bg-[#eed5aa] text-white py-3 rounded-lg text-center font-bold">
            Buy Ticket
          </button>
        </div>
      )}
    </nav>
  );
}