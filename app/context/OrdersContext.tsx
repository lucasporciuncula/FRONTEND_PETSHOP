"use client";

import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";
import { useAuthContext } from "./AuthContext";
import { useProducts } from "../hooks/useProducts";
import { useRouter } from "next/navigation";

export interface CartItem {
  id: number;
  label: string;
  price: number;
  image: string;
  quantity: number;
  categoria: string
  animal: string
}

export interface Order {
  id?: number; // Opcional no front antes de salvar, mas presente vindo do back
  userId: string | number | null; // Alinhado com a conversão numérica
  customerEmail: string | null;
  items: CartItem[];
  total: number;
  createdAt: string;
  isDelivery: boolean;
  status?: "PROCESSANDO" | "ENVIADO" | "ENTREGUE"; // Sincronizado com o Enum do Prisma
}

interface CartContextType {
  cartItems: CartItem[];
  orders: Order[];
  addToCart: (product: number) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, amount: number) => void;
  cartTotal: number;
  cleanCart: () => void
  setOrders: Dispatch<SetStateAction<Order[]>>
  makeOrder: (isDelivery:boolean) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const { user } = useAuthContext(); // Pega as informações do usuário logado do seu AuthContext
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([])
  const { products } = useProducts()

  const router = useRouter()

  const makeOrder = (isDelivery:boolean) => {
    setOrders((prev) => [...prev, {
      userId: user?.id ?? null,
      customerEmail: user?.email ?? null,
      items: cartItems,
      total: cartTotal,
      createdAt: (new Date().toISOString()),
      isDelivery
    }])
    cleanCart()
    router.push("/Produtos")
  }

  const cleanCart = () => {
    setCartItems([])
  }

  const addToCart = (product: number) => {
  if (!product) {
    console.error("Erro: O ID do produto adicionado não é válido.", product);
    return;
  }

    setCartItems((prev) => {
      const exists = prev.find((item) => item.id === product);

      if (exists) {
        return prev.map((item) =>
          item.id === product
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      const prdu = products.find((pro) => pro?.id === product);
      
if (!prdu) {
  console.error("Produto não encontrado na lista global");
  return prev; 
}
return [
  ...prev, 
  { 
    id: prdu.id!,
    label: prdu.label,
    price: prdu.price,
    image: prdu.image,
    categoria: prdu.categoria,
    animal: prdu.animal,
    quantity: 1 
  }
];
    });
  };

  const updateQuantity = (id: number, amount: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: amount } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const cartTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        orders, // Expondo a lista de pedidos atualizada
        addToCart,
        removeFromCart,
        updateQuantity,
        cartTotal,
        cleanCart,
        makeOrder,
        setOrders
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart deve ser usado dentro de um CartProvider");
  return context;
};