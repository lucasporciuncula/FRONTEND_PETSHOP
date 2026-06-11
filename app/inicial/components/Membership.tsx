"use client";

import Image from "next/image";
import { Check } from "lucide-react";

export default function Membership() {
  const plans = [
    { id: "01", title: "Popular", price: "$99.00", bg: "/img/animal-lg-1.jpg", perks: ["10% discount", "2 adult and 2 child", "Free animal exhibition"] },
    { id: "02", title: "Standard", price: "$149.00", bg: "/img/animal-lg-2.jpg", perks: ["15% discount", "4 adult and 4 child", "Free animal exhibition"] },
    { id: "03", title: "Premium", price: "$199.00", bg: "/img/animal-lg-3.jpg", perks: ["20% discount", "6 adult and 6 child", "Free animal exhibition"] }
  ];

  return (
    <section className="w-full py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-12">
          <div className="space-y-2">
            <p className="text-[#63783D] font-semibold text-lg"><span className="font-bold">#</span> Membership</p>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
              You Can Be A Proud Member Of <span className="text-[#63783D]">Zoofari</span>
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div key={index} className="relative rounded-2xl overflow-hidden group shadow-lg text-white p-8 pt-24 flex flex-col justify-end min-h-105">
              <Image src={plan.bg} alt={plan.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gray-950/70" />
              <span className="absolute top-4 right-6 text-6xl font-black text-white/10 select-none">{plan.id}</span>
              <div className="relative z-10 space-y-4">
                <h4 className="text-xl font-bold tracking-wide">{plan.title}</h4>
                <h3 className="text-3xl font-extrabold text-[#b2ca87]">{plan.price}</h3>
                <div className="space-y-2 pt-2 border-t border-white/10">
                  {plan.perks.map((perk, pIdx) => (
                    <div key={pIdx} className="flex items-center gap-2 text-sm text-gray-200">
                      <Check className="w-4 h-4 text-[#b2ca87] shrink-0" />
                      <span>{perk}</span>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 border border-white/30 hover:border-white hover:bg-white hover:text-gray-950 py-3 rounded-xl font-semibold text-sm transition-all">
                  Get Started
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}