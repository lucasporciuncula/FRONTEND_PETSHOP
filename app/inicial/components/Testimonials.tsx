"use client";

import { useState } from "react";
import Image from "next/image";

export default function Testimonials() {
  const [active, setActive] = useState(0);

  const list = [
    { name: "Pai João de Oxum", role: "Babalorixá", img: "/images/reviewers/1.jpg", text: "Amei os banhos de descarrego que dão nos bichos! Meu gato entrou com sete vidas e saiu brilhando tanto que parecia ter ganhado mais sete. Axé e muito obrigado pelo atendimento!" },
    { name: "Mestre Hermes da Silva", role: "Alquimista", img: "/images/reviewers/2.jpg", text: "Transformaram o pelo do meu cachorro de latão para ouro puro com os produtos de vocês! A fórmula desse shampoo é pura magia da transmutação. Recomendo de olhos fechados." },
    { name: "Cláudio Xicungunha", role: "Radiestesista Técnico", img: "/images/reviewers/3.jpg", text: "Passei o pêndulo na ração que comprei aqui e a energia vibratória deu 100% positiva! Meu cachorro parou de latir para o vento e o ambiente de casa ficou limpíssimo." }
  ];

  const handlePrev = () => {
    setActive((prev) => (prev === 0 ? list.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActive((prev) => (prev === list.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="w-full py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-12">Our Clients Say!</h1>
        <div className="relative">
          <button
            onClick={handlePrev}
            className="absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 bg-white hover:bg-[#664533] text-gray-700 hover:text-white border border-gray-100 rounded-full flex items-center justify-center shadow-md transition-all duration-200 active:scale-95 invisible sm:visible"
            aria-label="Previous testimonial"
          >
            &#10094;
          </button>
          <div className="bg-white rounded-2xl p-8 sm:p-12 shadow-md border border-gray-100 flex flex-col items-center space-y-6">
            <div className="relative w-24 h-24 rounded-full p-1 border-2 border-[#664533]">
              <Image src={list[active].img} alt={list[active].name} fill className="rounded-full object-cover" />
            </div>
            <p className="text-gray-600 italic max-w-2xl leading-relaxed">{list[active].text}</p>
            <div>
              <h5 className="font-bold text-gray-900 text-lg">{list[active].name}</h5>
              <span className="text-sm text-[#664533] font-medium">{list[active].role}</span>
            </div>

            <button
              onClick={handleNext}
              className="absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 bg-white hover:bg-[#664533] text-gray-700 hover:text-white border border-gray-100 rounded-full flex items-center justify-center shadow-md transition-all duration-200 active:scale-95 invisible sm:visible"
              aria-label="Next testimonial"
            >
              &#10095;
            </button>
          </div>
          <div className="flex justify-center gap-3 mt-6">
            {list.map((_, index) => (
              <button
                key={index}
                onClick={() => setActive(index)}
                className={`h-3 rounded-full transition-all duration-300 ${active === index ? "w-8 bg-[#664533]" : "w-3 bg-gray-300"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}