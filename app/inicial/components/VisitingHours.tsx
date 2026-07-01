"use client";

export default function VisitingHours() {
  const days = [
    { name: "Segunda-feira", time: "7:30AM - 21:30PM" },
    { name: "Terça-feira", time: "7:30AM - 21:30PM" },
    { name: "Quarta-feira", time: "7:30AM - 21:30PM" },
    { name: "Quinta-feira", time: "7:30AM - 21:30PM" },
    { name: "Sexta-feira", time: "7:30AM - 21:30PM" },
    { name: "Sábado", time: "9:00AM - 14:00PM" },
    { name: "Domingo", time: "Closed", highlight: true },
  ];

  return (
    <section className="w-full bg-[#4a2f20] my-8 sm:my-16 py-12 sm:py-16 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
        <div className="space-y-4 sm:space-y-6">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight border-b border-white/20 pb-4">Horário de atendimento</h1>
          <div className="divide-y divide-white/10">
            {days.map((day, idx) => (
              <div key={idx} className="flex justify-between items-center py-3 text-sm sm:text-base gap-2">
                <span className="font-bold shrink-0">{day.name}</span>
                <span className={`text-right ${day.highlight ? "text-red-200 font-bold" : "opacity-90"}`}>{day.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4 sm:space-y-6">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight border-b border-white/20 pb-4">Informação de contato</h1>
          <div className="space-y-3 sm:space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 py-2 sm:py-3 border-b border-white/10 text-sm sm:text-base">
              <span className="font-semibold text-white/80">Escritório</span>
              <span className="sm:col-span-2 opacity-95">Av principal, Santa Cruz do Sul, BR</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 py-2 sm:py-3 border-b border-white/10 text-sm sm:text-base">
              <span className="font-semibold text-white/80">Pet-Shop</span>
              <span className="sm:col-span-2 opacity-95">Av principal, Santa Cruz do Sul, BR</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 py-2 sm:py-3 border-b border-white/10 text-sm sm:text-base">
              <span className="font-semibold text-white/80">Reservas</span>
              <div className="sm:col-span-2 space-y-1 opacity-95">
                <p>+51 987 345 6789</p>
                <p className="text-xs sm:text-sm opacity-75">Pet-shop@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}