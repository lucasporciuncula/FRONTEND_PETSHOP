"use client";

import { useState } from "react";
import Image from "next/image";

export default function Testimonials() {
  const [active, setActive] = useState(0);

  const list = [
    { name: "John Doe", role: "Biologist", img: "/img/testimonial-1.jpg", text: "Clita clita tempor justo dolor ipsum amet kasd amet duo justo duo duo labore sed sed. Magna ut diam sit et amet stet eos sed clita erat magna elitr erat sit sit erat at rebum justo sea clita." },
    { name: "Jane Smith", role: "Photographer", img: "/img/testimonial-2.jpg", text: "Magna ut diam sit et amet stet eos sed clita erat magna elitr erat sit sit erat at rebum justo sea clita. Clita clita tempor justo dolor ipsum amet kasd amet duo justo duo duo labore sed sed." },
    { name: "Alex Rivera", role: "Tourist", img: "/img/testimonial-3.jpg", text: "Amet kasd amet duo justo duo duo labore sed sed. Magna ut diam sit et amet stet eos sed clita erat magna elitr erat sit sit erat at rebum justo sea clita clita clita tempor justo." }
  ];

  return (
    <section className="w-full py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-12">Our Clients Say!</h1>
        <div className="bg-white rounded-2xl p-8 sm:p-12 shadow-md border border-gray-100 flex flex-col items-center space-y-6">
          <div className="relative w-24 h-24 rounded-full p-1 border-2 border-[#63783D]">
            <Image src={list[active].img} alt={list[active].name} fill className="rounded-full object-cover" />
          </div>
          <p className="text-gray-600 italic max-w-2xl leading-relaxed">"{list[active].text}"</p>
          <div>
            <h5 className="font-bold text-gray-900 text-lg">{list[active].name}</h5>
            <span className="text-sm text-[#63783D] font-medium">{list[active].role}</span>
          </div>
        </div>
        <div className="flex justify-center gap-3 mt-6">
          {list.map((_, index) => (
            <button 
              key={index} 
              onClick={() => setActive(index)}
              className={`h-3 rounded-full transition-all duration-300 ${active === index ? "w-8 bg-[#63783D]" : "w-3 bg-gray-300"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}