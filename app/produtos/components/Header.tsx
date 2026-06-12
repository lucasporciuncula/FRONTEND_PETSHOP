"use client";

import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full bg-white border-b border-gray-100">
        <div className="w-full pr-4 pl-0 py-4 sm:py-6 grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
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

        <div className="hidden md:block">
          <form className="relative flex items-center border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 focus-within:border-[#DEAD6F] transition-all">
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

        <div className="hidden sm:flex justify-end gap-6 text-sm text-right mr-10">
          <div>
            <span className="block text-xs uppercase tracking-wider text-gray-400 font-medium">Telefone</span>
            <span className="font-semibold text-gray-900">+980-34984089</span>
          </div>
          <div>
            <span className="block text-xs uppercase tracking-wider text-gray-400 font-medium">Email</span>
            <span className="font-semibold text-gray-900">waggy@gmail.com</span>
          </div>
        </div>
      </div>

      <div className="w-full bg-white border-t border-gray-100">
        <nav className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="relative">
            <select className="appearance-none bg-[#DEAD6F] text-white text-xs font-medium uppercase tracking-wider py-2.5 pl-4 pr-10 rounded cursor-pointer outline-none">
              <option>Comprar por Categoria</option>
              <option>Roupas</option>
              <option>Alimentação</option>
              <option>Brinquedos</option>
            </select>
          </div>

          <ul className="hidden md:flex items-center gap-8 font-medium text-sm text-gray-800 uppercase tracking-wide">
            <li><Link href="#" className="text-[#DEAD6F]">Home</Link></li>
            <li><Link href="#" className="hover:text-[#DEAD6F] transition-colors">Páginas</Link></li>
            <li><Link href="#" className="hover:text-[#DEAD6F] transition-colors">Loja</Link></li>
            <li><Link href="#" className="hover:text-[#DEAD6F] transition-colors">Blog</Link></li>
            <li><Link href="#" className="hover:text-[#DEAD6F] transition-colors">Contato</Link></li>
          </ul>

          <div className="flex items-center gap-4 text-gray-700">
            <button className="hover:text-[#DEAD6F] transition-colors p-1">
              <svg width="22" height="22" viewBox="0 0 24 24"><path fill="currentColor" d="M15.71 12.71a6 6 0 1 0-7.42 0a10 10 0 0 0-6.22 8.18a1 1 0 0 0 2 .22a8 8 0 0 1 15.9 0a1 1 0 0 0 1 .89h.11a1 1 0 0 0 .88-1.1a10 10 0 0 0-6.25-8.19ZM12 12a4 4 0 1 1 4-4a4 4 0 0 1-4 4Z"/></svg>
            </button>
            <button className="relative hover:text-[#DEAD6F] transition-colors p-1">
              <svg width="22" height="22" viewBox="0 0 24 24"><path fill="currentColor" d="M8.5 19a1.5 1.5 0 1 0 1.5 1.5A1.5 1.5 0 0 0 8.5 19ZM19 16H7a1 1 0 0 1 0-2h8.491a3.013 3.013 0 0 0 2.885-2.176l1.585-5.55A1 1 0 0 0 19 5H6.74a3.007 3.007 0 0 0-2.82-2H3a1 1 0 0 0 0 2h.921a1.005 1.005 0 0 1 .962.725l.155.545v.005l1.641 5.742A3 3 0 0 0 7 18h12a1 1 0 0 0 0-2Zm-1.326-9l-1.22 4.274a1.005 1.005 0 0 1-.963.726H8.754l-.255-.892L7.326 7ZM16.5 19a1.5 1.5 0 1 0 1.5 1.5a1.5 1.5 0 0 0-1.5-1.5Z"/></svg>
              <span className="absolute -top-1 -right-1 bg-[#DEAD6F] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">3</span>
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}