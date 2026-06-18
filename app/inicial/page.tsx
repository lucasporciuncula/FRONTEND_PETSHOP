"use client";

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
    </div>
  );
}