"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative w-full min-h-[calc(100vh-80px)] lg:min-h-187.5 flex items-center bg-gray-900 overflow-hidden">
      
      <div className="absolute inset-0 z-0 opacity-40">
        <Image 
  src="/images/BANNER.png" 
  alt="PetShop Banner" 
  fill 
  priority

  quality={100} 

  className="object-cover object-center scale-105 rendering-pixelated-none" 
/>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full py-20 text-white grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight">
            PetShop <br />
            Pet <span className="text-[#eed5aa]">Shop</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-xl leading-relaxed">
            descrição super foda.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <button className="bg-[#eed5aa] hover:bg-[#ffd894] px-8 py-4 rounded-xl font-bold transition-transform active:scale-95 shadow-lg">
              Leia mais
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}