"use client";

import { useState } from "react";
import Topbar from "./components/Topbar";
import NavBarra from "./components/NavBarra";
import Hero from "./components/Hero";
import Sobre from "./components/Sobre";
import Facts from "./components/Facts";
import VisitingHours from "./components/VisitingHours";
import Membership from "./components/Membership";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
import Animals from "./components/animals";

export default function Home() {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <div className=" bg-white font-sans antialiased text-gray-900">
      <Topbar />
      <NavBarra />
      <section id="Home" className="">
        <Hero /></section>
      <section id="Sobre" className="py-20"><Sobre /></section>
      <Facts />
      <section id="Produtos" className="py-10"><Animals /></section>
       <section id="Contato" className=""><VisitingHours /></section>
      <Membership />
      <Testimonials />
      <Footer />

      {showVideo && (
        <div className="fixed inset-0 z-100 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-3xl rounded-2xl overflow-hidden relative shadow-2xl">
            <button
              onClick={() => setShowVideo(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black font-bold text-xl z-10 p-2"
            >
              ✕
            </button>
            <div className="aspect-video w-full">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/DWRcNpR6Kdc?autoplay=1"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}