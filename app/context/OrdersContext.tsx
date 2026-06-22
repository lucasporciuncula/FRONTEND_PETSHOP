"use client";

import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";
import { useAuthContext } from "./AuthContext";
import { IncrementalCache } from "next/dist/server/lib/incremental-cache";
import { User } from "../types/Users";

export interface CartItem {
  id: number;
  label: string;
  price: number;
  image: string;
  quantity: number;
  categoria:string
  animal:string
}

export interface Order {
  userId: string|null
  customerEmail: string|null
  items: CartItem[];
  total: number;
  createdAt: string; 
}

interface CartContextType {
  cartItems: CartItem[];
  orders: Order[]; 
  addToCart: (product: CartItem) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, amount: number) => void;
  cartTotal: number;
  cleanCart:()=>void
  setOrders: Dispatch<SetStateAction<Order[]>>
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const { user } = useAuthContext(); // Pega as informações do usuário logado do seu AuthContext
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([])

  const makeOrder = (items:CartItem[],total:number, date:string, user:User|null) => {
    setOrders((prev)=>[...prev,{ items, total,createdAt:date, userId:user, customerEmail:user?.email}])
  }

  const cleanCart = () => {
    setCartItems([])
  }

  const addToCart = (product: CartItem) => {
    if (!product.id) {
      console.error("Erro: O produto adicionado não possui um 'id' válido.", product);
      return;
    }

    setCartItems((prev) => {
      const exists = prev.find((item) => String(item.id) === String(product.id));

      if (exists) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: number, amount: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + amount } : item
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
        cleanCart
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