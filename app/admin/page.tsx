"use client";

import { useProducts } from "../hooks/useProducts";

export default function Admin() {
  

  const { products } = useProducts();
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <span className="tracking widest italic font-bold text-3xl text-white">
        PÁGINA
      </span>
      <span className="tracking widest italic font-bold text-3xl text-orange-400">
        ADMIN
      </span>
      <div className="flex flex-col col-end-1">
        {products.map((prod, i) => (
          <h1 className="font-bold flex" key={i}>
            {prod?.label}
            <img
              alt={prod?.label}
              className="w-20 h-20"
              src={`/images/products/${prod?.animal}/${prod?.image}.jpg`}
            />
          </h1>
        ))}
      </div>
    </div>
  );
}
