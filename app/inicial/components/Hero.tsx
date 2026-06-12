"use client";

import Image from "next/image";

export default function Hero() {
  return (

    <section className="relative w-full min-h-[calc(100vh-80px)] lg:min-h-187.5 flex items-start overflow-hidden">

      <div className="absolute inset-0 z-0">
        <Image 
          src="/images/teste1.png" 
          alt="PetShop Banner" 
          fill 
          priority
          quality={100} 
          className="object-cover object-center scale-100 rendering-pixelated-none" 
        />
      </div>
      
      <div className="max-w-8xl mx-auto px-6 md:px-12 lg:px-30 relative z-10 w-full pt-16 lg:pt-24 text-[#4a2f20]">
        <div className="max-w-sm space-y-3 lg:ml-4">

          <h1 className="text-4xl sm:text-5xl lg:text-[64px] font-black leading-[0.95] tracking-tight">
            PetShop <br />
            Pet <span className="text-[#eed5aa]">Shop</span>
          </h1>
          
          <p className="text-[#4a2f20] text-lg lg:text-xl font-normal">
            descrição super foda.
          </p>
          
          <div className="pt-2">
            <button className="bg-[#4a2f20] hover:bg-[#5c3d2e] text-[#eed5aa] px-6 py-2 rounded-full text-xs font-bold transition-transform active:scale-95 shadow-md">
              Leia mais
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}