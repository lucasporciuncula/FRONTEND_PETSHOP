"use client";

import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

export default function Sobre() {
  const points = [
    "Qualidade nos produtos",
    "Amantes do meio ambiente",
    "Profissionais selecionados",
    "Premio de qualidade"
  ];

  return (
    <section className="w-full py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="relative aspect-4/3 rounded-2xl overflow-hidden shadow-xl">
          <Image src="/images/clinica.png" alt="About Zoofari" fill className="object-cover" />
        </div>
        <div className="space-y-6">
          <p className="text-[#4a2f20] font-bold tracking-wider uppercase text-sm"># Bem-vindo</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
            Porque comprar conosco? 
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Trabalhamos com as melhores marcas para seus companheiros
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {points.map((point, index) => (
              <div key={index} className="flex items-center gap-3 text-gray-800 font-semibold">
                <CheckCircle2 className="w-5 h-5 text-[#4a2f20] shrink-0" />
                <span>{point}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}