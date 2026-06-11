"use client";

import Image from "next/image";

export default function Animals() {
  const categories = [
    { id: 1, name: "Caminha", type: "Caminha", img: "/img/animal-md-1.jpg" },
    { id: 2, name: "Osso", type: "Brinquedo", img: "/img/animal-lg-1.jpg" },
    { id: 3, name: "Shampoo", type: "Cosmetico", img: "/img/animal-lg-2.jpg" },
    { id: 4, name: "Guia", type: "Proteção", img: "/img/animal-md-2.jpg" },
    { id: 5, name: "Coleira", type: "Proteção", img: "/img/animal-md-3.jpg" },
    { id: 6, name: "Roupa", type: "Vestuario", img: "/img/animal-lg-3.jpg" },
  ];

  return (
    <section className="w-full py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-12">
          <div className="space-y-2">
            <p className="text-[#63783D] font-semibold text-lg"><span className="font-bold">#</span> Our Animals</p>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 max-w-xl leading-tight">
              PetShop <span className="text-[#63783D]">PetShop</span> Awesome Animals
            </h1>
          </div>
          <button className="bg-[#63783D] hover:bg-[#526333] text-white px-8 py-4 rounded font-semibold transition-colors whitespace-nowrap self-start md:self-auto">
            Veja nosso trabalho
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-6">
            <AnimalCard item={categories[0]} aspect="aspect-[4/3]" />
            <AnimalCard item={categories[1]} aspect="aspect-[3/4]" />
          </div>
          <div className="space-y-6">
            <AnimalCard item={categories[2]} aspect="aspect-[3/4]" />
            <AnimalCard item={categories[3]} aspect="aspect-[4/3]" />
          </div>
          <div className="space-y-6">
            <AnimalCard item={categories[4]} aspect="aspect-[4/3]" />
            <AnimalCard item={categories[5]} aspect="aspect-[3/4]" />
          </div>
        </div>
      </div>
    </section>
  );
}

function AnimalCard({ item, aspect }: { item: any; aspect: string }) {
  return (
    <div className={`relative w-full ${aspect} rounded-xl overflow-hidden group shadow-md cursor-pointer`}>
      <Image src={item.img} alt={item.name} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
        <p className="text-white/80 text-xs uppercase tracking-widest mb-1">{item.type}</p>
        <h5 className="text-white text-xl font-bold">{item.name}</h5>
      </div>
    </div>
  );
}