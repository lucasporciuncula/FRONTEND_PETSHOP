"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

type productInfo = {
  label: string;
  price: number;
  description: string;
  image: string;
  categoria: string;
  animal: string;
  id:number
};
type ProductContextType = {
  id: number |undefined;
  product: productInfo | null;
  setProduct: Dispatch<SetStateAction<productInfo | null>>;
  products: Array<productInfo | null>;
  setProducts: Dispatch<SetStateAction<(productInfo | null)[]>>;
};

const ProductContext = createContext<ProductContextType | null>(null);

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [product, setProduct] = useState<productInfo | null>(null);
  const [products, setProducts] = useState<Array<productInfo | null>>([]);

  return (
    <ProductContext.Provider
      value={{
        id:product?.id,
        product,
        setProduct,
        products,
        setProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProductContext() {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error("useProducts deve ser usado dentro do ProductsProvider");
  }

  return context;
}
