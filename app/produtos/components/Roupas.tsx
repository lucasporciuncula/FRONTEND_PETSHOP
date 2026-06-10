"use client";

import Image from "next/image";
import Link from "next/link";

export default function Roupas() {
  return (
    <section className="py-12 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4">
          <h2 className="text-3xl md:text-4xl font-medium text-gray-900">Roupas para Pets</h2>
          <Link href="#" className="border border-gray-300 bg-white px-6 py-2.5 rounded text-xs uppercase font-semibold text-gray-700 hover:bg-gray-900 hover:text-white transition-colors">
            Ver Tudo
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="bg-white rounded-2xl p-4 border border-gray-100 relative group shadow-sm hover:shadow-md transition-shadow">
              <span className="absolute top-4 left-4 z-10 bg-[#DEAD6F] text-white text-[11px] font-bold px-2.5 py-1 rounded">
                {item === 3 ? "-10%" : "Novo"}
              </span>

              <div className="relative w-full h-64 bg-gray-100 rounded-xl overflow-hidden mb-4">
                <Image 
                  src={`/images/item${item === 4 ? 4 : item}.jpg`} 
                  alt="Moletom Pet"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="space-y-2">
                <Link href="#">
                  <h3 className="text-base font-semibold text-gray-900 hover:text-[#DEAD6F] transition-colors">
                    Moletom Grey Hoodie
                  </h3>
                </Link>
                <div className="flex items-center gap-1 text-xs text-[#DEAD6F]">
                  <span>★★★★★</span>
                </div>
                <h4 className="text-lg font-bold text-[#DEAD6F]">$18.00</h4>
                <div className="flex items-center gap-2 pt-2">
                  <button className="flex-1 bg-gray-900 hover:bg-[#DEAD6F] text-white text-xs uppercase font-bold py-3 rounded transition-colors">
                    Adicionar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}