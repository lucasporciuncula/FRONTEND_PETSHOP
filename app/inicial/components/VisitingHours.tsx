"use client";

export default function VisitingHours() {
  const days = [
    { name: "Monday", time: "9:00AM - 6:00PM" },
    { name: "Tuesday", time: "9:00AM - 6:00PM" },
    { name: "Wednesday", time: "9:00AM - 6:00PM" },
    { name: "Thursday", time: "9:00AM - 6:00PM" },
    { name: "Friday", time: "9:00AM - 6:00PM" },
    { name: "Saturday", time: "9:00AM - 6:00PM" },
    { name: "Sunday", time: "Closed", highlight: true },
  ];

  return (
    <section className="w-full bg-[#63783D] my-16 py-16 text-white">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <h1 className="text-3xl font-bold tracking-tight border-b border-white/20 pb-4">Visiting Hours</h1>
          <div className="divide-y divide-white/10">
            {days.map((day, idx) => (
              <div key={idx} className="flex justify-between items-center py-3 text-base">
                <span className="font-medium">{day.name}</span>
                <span className={day.highlight ? "text-red-200 font-bold" : "opacity-90"}>{day.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h1 className="text-3xl font-bold tracking-tight border-b border-white/20 pb-4">Contact Info</h1>
          <div className="space-y-4">
            <div className="grid grid-cols-3 py-2 border-b border-white/10">
              <span className="font-semibold text-white/80">Office</span>
              <span className="col-span-2 opacity-95">123 Street, New York, USA</span>
            </div>
            <div className="grid grid-cols-3 py-2 border-b border-white/10">
              <span className="font-semibold text-white/80">Zoo</span>
              <span className="col-span-2 opacity-95">123 Street, New York, USA</span>
            </div>
            <div className="grid grid-cols-3 py-2 border-b border-white/10">
              <span className="font-semibold text-white/80">Ticket</span>
              <div className="col-span-2 space-y-1 opacity-95">
                <p>+012 345 6789</p>
                <p className="text-sm opacity-75">ticket@example.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}