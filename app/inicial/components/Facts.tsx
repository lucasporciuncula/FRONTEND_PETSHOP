"use client";

import { Award, PawPrint, Users, ShieldCheck } from "lucide-react";

export default function Facts() {
  const stats = [
    { icon: <Award className="w-7 h-7 sm:w-8 sm:h-8" />, num: "15+", label: "Anos de experiência" },
    { icon: <PawPrint className="w-7 h-7 sm:w-8 sm:h-8" />, num: "5080+", label: "Total de atendimentos" },
    { icon: <Users className="w-7 h-7 sm:w-8 sm:h-8" />, num: "5678+", label: "Compras online" },
    { icon: <ShieldCheck className="w-7 h-7 sm:w-8 sm:h-8" />, num: "100%", label: "Segurança" }
  ];

  return (
    <section className="w-full bg-[#4a2f20] py-10 sm:py-16 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center">
        {stats.map((stat, idx) => (
          <div key={idx} className="space-y-2 sm:space-y-3 flex flex-col items-center p-2">
            <div className="p-3 sm:p-4 bg-white/10 rounded-2xl mb-1 shrink-0">{stat.icon}</div>
            <h3 className="text-2xl sm:text-4xl font-black tracking-tight">{stat.num}</h3>
            <p className="text-xs sm:text-sm font-medium text-gray-200 max-w-35.5 sm:max-w-none">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}