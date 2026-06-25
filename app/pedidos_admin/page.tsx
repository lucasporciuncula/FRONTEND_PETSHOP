"use client"; 

import { useState } from "react";
import { Flame, Clock, CheckCircle2, Clipboard, LogOut, X, UserIcon, Phone, MapPin } from "lucide-react";
import { ordersList, ORDER_STATUSES } from "../data/ordersList";
import { useAuthContext } from "../context/AuthContext"; 

export default function AdminPanel() {
  const { logout } = useAuthContext();
  const [selectedStatusFilter, setSelectedStatusFilter] = useState("all");
  const [selectedAnimalFilter, setSelectedAnimalFilter] = useState("Todos");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("Todos");
  const [selectedOrder, setSelectedOrder] = useState<typeof ordersList[0] | null>(ordersList[0] || null);
  const totalPending = ordersList.filter((o) => o.status === "pending").length;
  const totalProduction = ordersList.filter((o) => o.status === "production").length;
  const totalSent = ordersList.filter((o) => o.status === "sent").length;
  const totalDelivered = ordersList.filter((o) => o.status === "delivered").length;
  const filteredOrders = ordersList.filter((order) => {
    const matchesStatus = selectedStatusFilter === "all" || order.status === selectedStatusFilter;
    const matchesAnimal = selectedAnimalFilter === "Todos" || order.items.some(item =>
      !(item as any).animal || (item as any).animal === selectedAnimalFilter
    );

    const matchesCategory = selectedCategoryFilter === "Todos" || order.items.some(item =>
      !(item as any).category || (item as any).category === selectedCategoryFilter
    );

    return matchesStatus && matchesAnimal && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#121212] text-white font-sans p-8 flex flex-col gap-6 selection:bg-[#f26422]/30">
      

      <header className="w-full bg-[#1e1e1e] border border-white/5 rounded-3xl p-5 flex items-center justify-between shadow-xl">
        <div className="flex items-center gap-2">
          <div className="bg-[#664533] p-1.5 rounded-xl text-white flex items-center justify-center">
            <Flame size={28} className="fill-white" /> 
          </div>
          <h1 className="text-2xl font-black text-white tracking-normal">
            Pet<span className="text-[#664533]">Shop</span>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-4 bg-white/5 px-3 py-1.5 rounded-xl border border-white/5">
              Painel Produtos - Admin
            </span>
          </h1>
        </div>
        
        <div className="flex items-center gap-6">
          <button className="text-xs bg-[#664533] hover:bg-[#664533] text-white font-bold uppercase tracking-wider px-5 py-3 rounded-2xl transition-all shadow-lg shadow-[#f26422]/10 active:scale-95">
           Voltar para admin
          </button>
          
          <div className="flex items-center gap-3 bg-[#121212] px-4 py-2 rounded-2xl border border-white/5">
            <div className="text-xs text-gray-400 font-bold uppercase tracking-widest">
              Dono: <span className="text-white">PetShop Corp</span>
            </div>
            <div className="w-px h-4 bg-white/10 mx-1" /> 
            <button 
              onClick={logout}
              className="text-gray-400 hover:text-red-500 transition-colors flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider cursor-pointer"
            >
              <LogOut size={20} />
              Sair
            </button>
          </div>
        </div>
      </header>

      {/* <section className="bg-[#1e1e1e] border border-white/5 rounded-4xl p-6 flex flex-col gap-4 shadow-lg text-xs font-bold uppercase tracking-wider">
        <div className="flex items-center gap-4 border-b border-white/5 pb-4">
          <span className="text-gray-500 w-24">Animal:</span>
          <div className="flex gap-2">
            {["Todos", "Cachorros", "Gatos"].map((animal) => (
              <button
                key={animal}
                onClick={() => setSelectedAnimalFilter(animal)}
                className={`px-4 py-2.5 rounded-xl transition-all ${
                  selectedAnimalFilter === animal
                    ? "bg-[#664533] text-white shadow-md shadow-[#f26422]/10"
                    : "bg-[#121212] text-gray-400 hover:bg-[#161616] border border-white/5"
                }`}
              >
                {animal}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4 pt-1">
          <span className="text-gray-500 w-24">Categoria:</span>
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pr-2">
            {["Todos", "Camas", "Alimentação", "Transporte", "Brinquedos", "Higiene", "Medicamentos", "Shampoos"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategoryFilter(cat)}
                className={`px-4 py-2.5 rounded-xl transition-all shrink-0 ${
                  selectedCategoryFilter === cat
                    ? "bg-[#664533] text-white shadow-md shadow-[#f26422]/10"
                    : "bg-[#121212] text-gray-400 hover:bg-[#161616] border border-white/5"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section> */}

      <div className="flex gap-6 items-stretch flex-1 min-h-145">      
        <div className="flex-1 bg-[#1e1e1e] border border-white/5 rounded-4xl p-6 flex flex-col gap-6 shadow-xl">

          <div className="flex items-center gap-2 border-b border-white/5 pb-5 overflow-x-auto scrollbar-hide">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mr-2">Filtros:</span>
            {[
              { id: "all", label: "Todos", count: ordersList.length },
              { id: "pending", label: "Recebidos", count: totalPending },
              { id: "production", label: "Produção", count: totalProduction },
              { id: "sent", label: "Enviados", count: totalSent },
              { id: "delivered", label: "Entregues", count: totalDelivered },
            ].map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedStatusFilter(filter.id)} 
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  selectedStatusFilter === filter.id
                    ? "bg-[#664533] text-white shadow-md shadow-[#f26422]/10" 
                    : "bg-[#121212] text-gray-400 hover:bg-[#161616] border border-white/5" 
                }`}
              >
                {filter.label} <span className="opacity-50 ml-1 bg-white/5 px-1.5 py-0.5 rounded-md">{filter.count}</span>
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-4 overflow-y-auto max-h-145 pr-2 flex-1">
            {filteredOrders.length === 0 ? (
              <p className="text-center text-gray-500 my-auto py-12 font-medium">Nenhum pedido encontrado neste filtro.</p>
            ) : (
              filteredOrders.map((order) => {
                const statusMeta = ORDER_STATUSES[order.status as keyof typeof ORDER_STATUSES];
                const isSelected = selectedOrder?.id === order.id;

                return (
                  <div
                    key={order.id}
                    onClick={() => setSelectedOrder(order)} 
                    className={`p-7 rounded-4xl border transition-all flex items-center justify-between cursor-pointer group min-h-30 ${
                      isSelected
                        ? "bg-[#141414] border-[#664533] shadow-lg shadow-[#f26422]/5" 
                        : "bg-[#121212] border-white/5 hover:border-white/15 hover:bg-[#151515]" 
                    }`}
                  >
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-3.5">
                        <span className="text-3xl font-black tracking-tight">{order.id}</span>
                        <span className="bg-[#1e1e1e] px-3 py-1 rounded-xl border border-white/5 text-[10px] font-black uppercase tracking-wider text-gray-300 flex items-center gap-1.5">
                          {statusMeta?.icon} {statusMeta?.label}
                        </span>
                      </div>

                      <div className="flex items-center gap-12 text-sm text-gray-400">
                        <div>
                          <p className="text-[10px] uppercase font-bold text-gray-600 tracking-wider">Cliente</p>
                          <p className="font-bold text-gray-200 mt-1 text-base">{order.customerName}</p>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase font-bold text-gray-600 tracking-wider">Horário</p>
                          <p className="font-bold text-gray-200 mt-1 flex items-center gap-1">
                            <Clock size={14} className="text-gray-500" />
                            {order.statusHistory[0]?.time || "13:34"} 
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="text-right pr-2">
                      <p className="text-[10px] uppercase font-bold text-gray-600 tracking-wider">Total</p>
                      <p className="text-2xl font-black text-white mt-1 group-hover:text-[#ccbcbcd2] transition-colors">
                        <span className="text-[#664533] text-sm font-bold mr-0.5">R$</span>
                        {order.total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div className="w-full max-w-sm bg-[#1e1e1e] border border-white/5 rounded-4xl p-6 flex flex-col gap-5 shadow-xl sticky top-6">
          {selectedOrder ? (
            <>
              <div className="flex justify-between items-center border-b border-white/5 pb-4">
                <h3 className="text-sm font-black uppercase tracking-wider">Prontuário do Pedido</h3>
                <button 
                  onClick={() => setSelectedOrder(null)} 
                  className="p-1.5 hover:bg-white/5 rounded-xl text-gray-400 hover:text-white transition"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="flex flex-col gap-1 bg-[#121212] border border-white/5 p-4 rounded-2xl">
                <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Protocolo</span>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-black">{selectedOrder.id}</span>
                  <span className="text-xs font-bold text-green-400">
                    {ORDER_STATUSES[selectedOrder.status as keyof typeof ORDER_STATUSES]?.label}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <h4 className="text-[10px] font-black uppercase text-gray-500 tracking-wider">Informações do Cliente</h4>
                <div className="flex flex-col gap-3 text-xs font-medium text-gray-300">
                  <div className="flex items-center gap-2.5">
                    <UserIcon size={15} className="text-gray-500" />
                    <span className="text-gray-200 font-bold">{selectedOrder.customerName}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Phone size={15} className="text-gray-500" />
                    <span>{selectedOrder.customerPhone}</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <MapPin size={15} className="text-gray-500 mt-0.5 shrink-0" />
                    <span className="leading-relaxed">{selectedOrder.address}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 border-t border-b border-white/5 py-4 my-1">
                <h4 className="text-[10px] font-black uppercase text-gray-500 tracking-wider mb-1">Produtos comprados</h4>
                <div className="flex flex-col gap-2.5 max-h-40 overflow-y-auto pr-1">
                  {selectedOrder.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-xs font-bold">
                      <span className="text-gray-400">
                        {item.quantity}x <span className="text-white font-medium">{item.name}</span>
                      </span>
                      <span>
                        R$ {(item.price * item.quantity).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {selectedOrder.notes && (
                <div className="bg-yellow-500/5 border border-yellow-500/10 p-3.5 rounded-xl text-xs text-yellow-500/90 font-medium">
                  <strong>Observação:</strong> {selectedOrder.notes}
                </div>
              )}

              <div className="mt-auto flex flex-col gap-2 bg-[#121212] border border-white/5 p-4 rounded-2xl text-xs font-medium text-gray-400">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="text-gray-200">R$ {selectedOrder.subtotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxa de Entrega:</span>
                  <span className="text-gray-200">R$ {selectedOrder.deliveryFee.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between items-center border-t border-white/5 pt-2 mt-1 text-white font-black text-sm">
                  <span>Total Geral:</span>
                  <span className="text-[#664533] text-xl">
                    R$ {selectedOrder.total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center text-gray-500 my-auto text-xs font-medium">
              Selecione um pedido na lista para visualizar o prontuário aqui.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}