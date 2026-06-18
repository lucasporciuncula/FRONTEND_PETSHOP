"use client";


import Image from "next/image";
import Link from "next/link";

export default function Banner() {
  return (
    <section className="bg-[#664533] py-12 md:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-5 flex justify-center order-2 md:order-1">
          <div className="relative w-72 h-72 sm:w-96 sm:h-96 md:w-full md:h-100">
            <Image 
              src="/images/banner-img.png" 
              alt="Banner Pet" 
              fill
              priority
              className="object-contain"
            />
          </div>
        </div>

        <div className="md:col-span-7 space-y-6 text-center md:text-left order-1 md:order-2">
          <span className="inline-block text-[#DEAD6F] text-xs font-semibold uppercase tracking-widest bg-[#DEAD6F]/10 px-3 py-1 rounded-full">
            Economize de 10% a 20% Off
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-normal text-white leading-tight">
            O melhor lugar para os <span className="text-[#DEAD6F] block sm:inline">seus pets</span>
          </h1>
          <div className="pt-4">
            <Link 
              href="#" 
              className="inline-flex items-center gap-2 border-2 border-white px-8 py-3.5 rounded text-sm uppercase font-semibold text-white hover:bg-white hover:text-white transition-all group"
            >
              Comprar Agora
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}