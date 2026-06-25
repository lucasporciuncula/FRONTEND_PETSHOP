"use client";

import Image from "next/image";

export default function Animals() {
  const categories = [
    { id: 1, name: "Caminha", type: "Caminha", img: "/images/products/cat/catBed.jpg.jpg" },
    { id: 2, name: "Arranhador", type: "Brinquedo", img: "/images/products/cat/catScracher.jpg.jpg" },
    { id: 3, name: "Shampoo", type: "Cosmetico", img: "/images/products/cat/catShampoo.jpg.jpg" },
    { id: 4, name: "Caminha", type: "Caminha", img: "/images/products/dog/dogBed.jpg" },
    { id: 5, name: "Vasilha", type: "Alimentação", img: "/images/products/dog/dogBowl.jpg" },
    { id: 6, name: "Ração", type: "Comida", img: "/images/products/dog/dogFood.jpg" },
  ];

  return (
    <section className="w-full py-12 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-8 md:mb-12">
          <div className="space-y-2">
            <p className="text-[#4a2f20] font-semibold text-base sm:text-lg">
              <span className="font-bold">#</span> Nossos produtos
            </p>
            <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 max-w-xl leading-tight">
              Pet <span className="text-[#4a2f20]">Shop</span> produtos de qualidade
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimalCard item={categories[0]} aspect="aspect-square sm:aspect-[4/3]" />
          <AnimalCard item={categories[1]} aspect="aspect-square sm:aspect-[3/4]" />
          <AnimalCard item={categories[2]} aspect="aspect-square sm:aspect-[3/4]" />
          <AnimalCard item={categories[3]} aspect="aspect-square sm:aspect-[4/3]" />
          <AnimalCard item={categories[4]} aspect="aspect-square sm:aspect-[4/3]" />
          <AnimalCard item={categories[5]} aspect="aspect-square sm:aspect-[3/4]" />
        </div>
      </div>
    </section>
  );
}

function AnimalCard({ item, aspect }: { item: any; aspect: string }) {
  return (
    <div className={`relative w-full ${aspect} rounded-xl overflow-hidden group shadow-md cursor-pointer`}>
      <Image 
        src={item.img} 
        alt={item.name} 
        fill 
        sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 33vw"
        className="object-cover transition-transform duration-500 group-hover:scale-110" 
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 sm:p-6">
        <p className="text-white/80 text-xs uppercase tracking-widest mb-1">{item.type}</p>
        <h5 className="text-white text-lg sm:text-xl font-bold">{item.name}</h5>
      </div>
    </div>
  );
}