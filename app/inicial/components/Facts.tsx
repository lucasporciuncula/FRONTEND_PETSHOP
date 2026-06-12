"use client";

import { Award, PawPrint, Users, ShieldCheck } from "lucide-react";

export default function Facts() {
  const stats = [
    { icon: <Award className="w-8 h-8" />, num: "15+", label: "Anos de experiência" },
    { icon: <PawPrint className="w-8 h-8" />, num: "1234+", label: "Total de atendimentos" },
    { icon: <Users className="w-8 h-8" />, num: "5678+", label: "Compras online" },
    { icon: <ShieldCheck className="w-8 h-8" />, num: "100%", label: "Segurança" }
  ];

  return (
    <section className="w-full bg-[#4a2f20] py-16 text-white">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
        {stats.map((stat, idx) => (
          <div key={idx} className="space-y-3 flex flex-col items-center">
            <div className="p-4 bg-white/10 rounded-2xl mb-1">{stat.icon}</div>
            <h3 className="text-3xl sm:text-4xl font-black tracking-tight">{stat.num}</h3>
            <p className="text-sm font-medium text-gray-200">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}