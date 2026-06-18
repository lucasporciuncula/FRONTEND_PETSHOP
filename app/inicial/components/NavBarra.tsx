"use client";

import Link from "next/link";

export default function NavBarra() {
  return (
    <nav className="w-full bg-white sticky top-0 z-50 shadow-sm">
      <div className="max-w-9xl mx-auto px-6 h-20 flex justify-between items-center">
        <Link href="/" className="text-3xl font-black text-[#4a2f20] tracking-tight">
          PetShop
        </Link>

        <div className="hidden md:flex items-center gap-8 font-semibold text-gray-700">
          <Link href="#Home" className="text-[#4a2f20]">Home</Link>
          <Link href="#Sobre" className="hover:text-[#4a2f20] transition-colors">Sobre</Link>
          <Link href="#Produtos" className="hover:text-[#4a2f20] transition-colors">Produtos</Link>
          <Link href="#Contato" className="hover:text-[#4a2f20] transition-colors">Contato</Link>
        </div>
      </div>
    </nav>
  );
}