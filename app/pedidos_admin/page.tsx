"use client"; 

import { useState } from "react";
import { Flame, Clock, LogOut, X, UserIcon, Phone, MapPin } from "lucide-react";
import { useAuthContext } from "../context/AuthContext"; 
import { useCart } from "../hooks/useOrders";

export default function AdminPanel() {
  const { logout } = useAuthContext();
  const { orders } = useCart()
  const [selectedStatusFilter, setSelectedStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<typeof orders[0] | null>(orders[0] || null);
  const totalProcessando = orders.filter((o) => o.status === "PROCESSANDO").length;
  const totalEnviado = orders.filter((o) => o.status === "ENVIADO").length;
  const totalEntregue = orders.filter((o) => o.status === "ENTREGUE").length;
  const filteredOrders = orders.filter((order) => {
    const matchesStatus = selectedStatusFilter === "all" || order.status === selectedStatusFilter;
    return matchesStatus
  });

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-black font-sans p-8 flex flex-col gap-6 selection:bg-[#F5F2EC]">
      
      <header className="w-full bg-[#FAFAF8] border border-[#664533] rounded-3xl p-5 flex items-center justify-between shadow-xl">
        <div className="flex items-center gap-2">
          <div className="bg-[#FAFAF8] p-1.5 rounded-xl text-black flex items-center justify-center">
            <Flame size={28} className="fill-white" /> 
          </div>
          <h1 className="text-2xl font-black text-black tracking-normal">
            Pet<span className="text-[#664533]">Shop</span>
            <span className="text-xs font-bold text-gray-700 uppercase tracking-widest ml-4 bg-[#FAFAF8] px-3 py-1.5 rounded-xl border border-[#664533]">
              Painel Produtos - Admin
            </span>
          </h1>
        </div>
        
        <div className="flex items-center gap-6 ">
          <button className="text-xs bg-[#FAFAF8] hover:bg-[#664533] text-black font-bold uppercase tracking-wider px-5 py-3 rounded-2xl transition-all shadow-lg shadow-[#f26422]/10 active:scale-95">
           Voltar para admin
          </button>
          
          <div className="flex items-center gap-3 bg-[#FAFAF8] px-4 py-2 rounded-2xl border border-[#664533]">
            <div className="text-xs text-gray-700 font-bold uppercase tracking-widest">
              Dono: <span className="text-black">PetShop Corp</span>
            </div>
            <div className="w-px h-4 bg-[#FAFAF8] mx-1" /> 
            <button 
              onClick={logout}
              className="text-gray-700 hover:text-red-500 transition-colors flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider cursor-pointer"
            >
              <LogOut size={20} />
              Sair
            </button>
          </div>
        </div>
      </header>

      <div className="flex gap-6 items-stretch flex-1 min-h-145  shadow-xl">      
        <div className="flex-1 bg-[#FAFAF8] border border-[#664533]rounded-4xl p-6 flex flex-col gap-6 shadow-xl">

          <div className="flex items-center gap-2 border-b border-[#664533] pb-5 overflow-x-auto scrollbar-hide">
            <span className="text-xs font-bold text-gray-800 uppercase tracking-wider mr-2">Filtros:</span>
            {[
              { id: "all", label: "Todos", count: orders.length },
              { id: "processando", label: "Processando", count: totalProcessando },
              { id: "enviado", label: "Enviado", count: totalEnviado },
              { id: "entregue", label: "Entregue", count: totalEntregue },
            ].map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedStatusFilter(filter.id)} 
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  selectedStatusFilter === filter.id
                    ? "bg-[#FAFAF8] text-black shadow-md shadow-[#f26422]/10" 
                    : "bg-[#FAFAF8] text-gray-700 hover:bg-[#664533] border border-[#664533]" 
                }`}
              >
                {filter.label} <span className="opacity-50 ml-1 bg-[#FAFAF8] px-1.5 py-0.5 rounded-md">{filter.count}</span>
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-4 overflow-y-auto max-h-145 pr-2 flex-1  shadow-xl">
            {filteredOrders.length === 0 ? (
              <p className="text-center text-gray-800 my-auto py-12 font-medium">Nenhum pedido encontrado neste filtro.</p>
            ) : (
              filteredOrders.map((order) => {
                const isSelected = selectedOrder?.id === order.id;

                return (
                  <div
                    key={order.id}
                    onClick={() => setSelectedOrder(order)} 
                    className={`p-7 rounded-4xl border transition-all flex items-center justify-between cursor-pointer group min-h-30 ${
                      isSelected
                        ? "bg-[#FAFAF8] border-[#664533] shadow-lg shadow-[#f26422]/5" 
                        : "bg-[#FAFAF8] border-[#664533] hover:border-[#664533] hover:bg-[#664533]" 
                    }`}
                  >
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-3.5">
                        <span className="text-3xl font-black tracking-tight">{order.id}</span>
                        <span className="bg-[#FAFAF8] px-3 py-1 rounded-xl border border-[#664533]text-[10px] font-black uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
                         {order?.createdAt}
                        </span>
                      </div>

                      <div className="flex items-center gap-12 text-sm text-gray-800  shadow-xl">
                        <div>
                          <p className="text-[10px] uppercase font-bold text-gray-800 tracking-wider">Cliente</p>
                          <p className="font-bold text-gray-600 mt-1 text-base">{order.customerEmail} ID: {order.id}</p>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase font-bold text-gray-800 tracking-wider">Horário</p>
                          <p className="font-bold text-gray-600 mt-1 flex items-center gap-1">
                            <Clock size={14} className="text-gray-800" />
                            {order.status} 
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="text-right pr-2">
                      <p className="text-[10px] uppercase font-bold text-gray-800 tracking-wider  shadow-xl">Total</p>
                      <p className="text-2xl font-black text-black mt-1 group-hover:text-[#ccbcbcd2] transition-colors">
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

        <div className="w-full max-w-sm bg-[#FAFAF8] border border-[#664533] rounded-4xl p-6 flex flex-col gap-5 shadow-xl sticky top-6">
          {selectedOrder ? (
            <>
              <div className="flex justify-between items-center border-b border-[#664533]pb-4">
                <h3 className="text-sm font-black uppercase tracking-wider">Prontuário do Pedido</h3>
                <button 
                  onClick={() => setSelectedOrder(null)} 
                  className="p-1.5 hover:bg-white/5 rounded-xl text-black hover:text-black transition"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="flex flex-col gap-1 bg-[#FAFAF8] border border-[#664533] p-4 rounded-2xl shadow-xl">
                <span className="text-[10px] font-bold text-black uppercase tracking-widest">Protocolo</span>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-black">{selectedOrder.id}</span>
                  <span className="text-xs font-bold text-green-400">
                    {/* {ORDER_STATUSES[selectedOrder.status as keyof typeof ORDER_STATUSES]?.label} */}label aq
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-3  shadow-xl">
                <h4 className="text-[10px] font-black uppercase text-black tracking-wider">Informações do Cliente</h4>
                <div className="flex flex-col gap-3 text-xs font-medium text-black">
                  <div className="flex items-center gap-2.5">
                    <UserIcon size={15} className="text-black" />
                    <span className="text-black font-bold">{selectedOrder.customerEmail}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Phone size={15} className="text-black" />
                    <span>{selectedOrder.userId}</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <MapPin size={15} className="text-black mt-0.5 shrink-0" />
                    <span className="leading-relaxed">{selectedOrder.isDelivery}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 border-t border-b border-[#664533] py-4 my-1  shadow-xl">
                <h4 className="text-[10px] font-black uppercase text-black tracking-wider mb-1">Produtos comprados</h4>
                <div className="flex flex-col gap-2.5 max-h-40 overflow-y-auto pr-1">
                  {selectedOrder.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-xs font-bold">
                      <span className="text-black">
                        {item.quantity}x <span className="text-black font-medium">{item.label}</span>
                      </span>
                      <span>
                        R$ {(item.price * item.quantity).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-auto flex flex-col gap-2 bg-[#FAFAF8] border border-[#664533] p-4 rounded-2xl text-xs font-medium text-black">
                <div className="flex justify-between">
                  <span>Total:</span>
                  <span className="text-black">R$ {selectedOrder.total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between items-center border-t border-[#664533] pt-2 mt-1 text-black font-black text-sm">
                  <span>Total Geral:</span>
                  <span className="text-[#664533] text-xl">
                    R$ {selectedOrder.total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center text-gray-500 my-auto text-xs font-medium  shadow-xl">
              Selecione um pedido na lista para visualizar o prontuário aqui.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}