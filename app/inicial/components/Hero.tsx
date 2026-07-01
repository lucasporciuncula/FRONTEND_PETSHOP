"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative w-full min-h-137.5 md:h-[75vh] lg:h-[85vh] flex items-center overflow-hidden bg-[#e6d5b8]">

      <Image
        src="/images/teste1.png"
        alt="Cachorros e gato de estimação"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center select-none"
      />

      {/* NOVA CAMADA DE GRADIENTE (Escurece de forma sutil e suave a partir da esquerda) */}
      <div className="absolute inset-0 bg-linear-to-r from-[#0f0a05]/95 via-[#0f0a05]/50 to-transparent pointer-events-none z-0" />

      {/* CONTAINER DO CONTEÚDO */}
      <div className="relative z-10 w-full pl-6 sm:pl-12 lg:pl-16 pr-4">
        <div className="max-w-xl md:max-w-2xl flex flex-col items-start space-y-6 md:space-y-5">

          {/* 2. TEXTO DO LOGO ATUALIZADO PARA BRANCO */}
          <h1 className="text-3xl sm:text-5xl lg:text-7xl font-black text-white tracking-tight">
            PET
            <span className="relative inline-block text-[#c78f5d] ml-2">
              SHOP
            </span>
          </h1>
          
          {/* Micro-tag adaptada para o fundo escuro */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xs text-white border border-white/20 px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold shadow-xs">
            <span>Nova Coleção Outono/Inverno</span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#d4af37]" />
          </div>

          {/* 3. TÍTULO PRINCIPAL ATUALIZADO PARA BRANCO */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.15] tracking-tight">
            Onde o carinho <br className="hidden sm:block" />
            encontra a <br />
            <span className="relative inline-block text-[#e4a166] mt-1">
              melhor qualidade.
              {/* Linha decorativa abaixo da palavra chave */}
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-[#d4af37] rounded-full" />
            </span>
          </h1>

          {/* Botão Interativo com tom caramelo para destacar no fundo escuro */}
          <button className="group flex items-center gap-3 bg-[#e4a166] hover:bg-[#c78f5d] text-[#4a2f20] font-bold px-8 py-4 rounded-full shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 text-base cursor-pointer">
            <span>Explorar Produtos</span>
            
            <svg 
              className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110 text-[#4a2f20]" 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M12 14c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm-4.5-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm-8.25-5c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25zm7.5 0c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25z"/>
            </svg>
          </button>

        </div>
      </div>
    </section>
  );
}