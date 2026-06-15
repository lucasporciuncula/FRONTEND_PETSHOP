"use client";

import { useRouter } from "next/navigation";
import { useAuthContext } from "../context/AuthContext";
import { useProductContext } from "../context/ProductsContext"; import { useEffect } from "react";

export default function Admin() {
  const { product, products, setProduct } = useProductContext()
  const { user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    // Se o contexto já carregou e o usuário NÃO é admin, barra ele
    if (user !== "ADMIN") {  ///NAO MUDA ISSO TA DANDO CERTO
      router.push("/Produtos"); // Manda de volta para os produtos
    }
  }, [user, router]);

  return (
    <div className="flex items-center justify-center w-full h-screen flex-col col-end-1">
      <span className="tracking widest italic font-bold text-3xl text-white">
        PÁGINA do ADMIN
      </span>

      <div className="flex flex-col gap-4 overflow-y-auto max-h-145 pr-2 flex-1">
        {products.length === 0 ? (
          <p className="text-center text-gray-500 my-auto py-12 font-medium">
            Nenhum pedido encontrado neste filtro.
          </p>
        ) : (
          products.map((prod) => {
            const isSelected = product?.label === prod?.label
            return (
              <div
                key={prod?.label}
                onClick={() => setProduct(prod)} // Clicar em qualquer ponto do retângulo ativa o prontuário
                className={`p-7 rounded-4x1 border transition-all flex items-center justify-between cursor-pointer group min-h-30 ${isSelected
                    ? "bg-[#141414] border-[#f26422] shadow-lg shadow-[#f26422]/5" // Card selecionado
                    : "bg-[#121212] border-white/5 hover:border-white/15 hover:bg-[#151515]" // Card não selecionado
                  }`}
              ><div>
                  <img className="" src={`/image/products/${prod?.animal}/${prod?.image}.jpg}`} alt={prod?.label} />
                </div>
                <div className="flex items-center gap-12 text-sm text-gray-400">
                  <p className="font-bold text-gray-200 mt-1 text-base">
                    {prod?.label}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
