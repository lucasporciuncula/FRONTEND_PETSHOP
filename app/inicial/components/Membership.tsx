"use client";

import Image from "next/image";
import { Check } from "lucide-react";

export default function Membership() {
  const plans = [
    { id: "01", title: "Popular", price: "R$99.00", bg: "/images/membership/coruja-bronze.jpg", perks: ["10% desconto", "2 produtos da sua escolha", "cupons mensais"], color: "text-[#CD7F32]", borderColor: "border-[#CD7F32]/30 hover:border-[#CD7F32] hover:bg-[#CD7F32]",badge: "border-[#CD7F32]/20" },
    { id: "02", title: "iniciante", price: "R$149.00", bg: "/images/membership/gato-prata.jpg", perks: ["15% disconto", "4 produtos da sua escolha", "cupons semanais"], color: "text-[#E2E8F0]", borderColor: "border-white/30 hover:border-white hover:bg-white hover:text-gray-950",badge: "border-white/20" },
    { id: "03", title: "Premium", price: "R$199.00", bg: "/images/membership/cachorro-ouro.jpg", perks: ["20% desconto", "6 produtos da sua escolha e brindes", "cupons diários"], color: "text-[#D4AF37]", borderColor: "border-[#D4AF37]/40 hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-white",badge: "border-[#D4AF37]/20" }
  ];

  return (
    <section className="w-full py-12 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-8 md:mb-12">
          <div className="space-y-2">
            <p className="text-[#4a2f20] font-semibold text-base sm:text-lg"><span className="font-bold">#</span> Colaboradores</p>
            <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 leading-tight">
              Você pode ser um colaborador do <span className="text-[#4a2f20]">PetShop</span>
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-center">
          {plans.map((plan, index) => (
            <div key={index} className={`relative rounded-2xl overflow-hidden group shadow-lg text-white p-6 sm:p-8 pt-20 sm:pt-24 flex flex-col justify-end min-h-95 sm:min-h-105 transition-all duration-300 ${index === 1 ? "lg:scale-105 ring-2 ring-white/20 z-10" : ""}`}>
              <Image src={plan.bg} alt={plan.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gray-950/70" />
              <span className="absolute top-4 right-6 text-5xl sm:text-6xl font-black text-white/10 select-none">{plan.id}</span>
              <div className="relative z-10 space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-lg sm:text-xl font-bold tracking-wide">{plan.title}</h4>
                  <span className={`text-[10px] sm:text-xs uppercase tracking-widest border px-2 py-0.5 rounded-md text-gray-300 ${plan.badge}`}>
                      {index === 0 ? "Bronze" : index === 1 ? "Prata" : "Ouro"}
                  </span>
                </div>
                <h3 className={`text-2xl sm:text-3xl font-extrabold ${plan.color}`}>{plan.price}</h3>
                <div className="space-y-2 pt-2 border-t border-white/10">
                  {plan.perks.map((perk, pIdx) => (
                    <div key={pIdx} className="flex items-center gap-2 text-xs sm:text-sm text-gray-200">
                      <Check className={`w-4 h-4 shrink-0 ${plan.color}`} />
                      <span>{perk}</span>
                    </div>
                  ))}
                </div>
                <button className={`w-full mt-4 border py-2.5 sm:py-3 rounded-xl font-semibold text-sm transition-all ${plan.borderColor}`}>
                  Vamos começar!
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}