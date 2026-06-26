"use client";

import { createContext, ReactNode, useContext, useState, useEffect, useCallback } from "react";

import { useProducts } from "../hooks/useProducts";
import { useRouter } from "next/navigation";
import { API_BASE_URL } from "../utils/config";
import { useAuthContext } from "../context/AuthContext";

// --- TIPAGENS ---
export type OrderStatus = "PROCESSANDO" | "ENVIADO" | "ENTREGUE";

export interface CartItem {
  id: number;
  label: string;
  price: number;
  image: string;
  quantity: number;
  categoria: string;
  animal: string;
}

export interface Order {
  id?: number; 
  userId: string | number | null; 
  customerEmail: string | null;
  items: CartItem[];
  total: number;
  createdAt: string;
  isDelivery: boolean;
  status?: OrderStatus; 
}

interface CartContextType {
  cartItems: CartItem[];
  orders: Order[];
  loadingOrders: boolean;
  errorOrders: string | null;
  cartTotal: number;
  addToCart: (product: number) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, amount: number) => void;
  cleanCart: () => void;
  makeOrder: (isDelivery: boolean) => Promise<void>;
  updateOrderStatus: (id: number, status: OrderStatus) => Promise<void>;
  deleteOrder: (id: number) => Promise<void>;
  refreshOrders: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const { user, token } = useAuthContext(); 
  const { products } = useProducts();
  const router = useRouter();

  // Estados
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [errorOrders, setErrorOrders] = useState<string | null>(null);

  const cartTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // --- LÓGICA DE PEDIDOS (API) ---

  const refreshOrders = useCallback(async () => {
    if (!token) return;
    try {
      setLoadingOrders(true);
      const res = await fetch(`${API_BASE_URL}/orders`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Erro ao buscar pedidos no servidor.");
      const data = await res.json();
      setOrders(data);
      setErrorOrders(null);
    } catch (err) {
      setErrorOrders(err instanceof Error ? err.message : "Erro desconhecido");
      console.error("Erro getAllOrders:", err);
    } finally {
      setLoadingOrders(false);
    }
  }, [token]);

  // Usar useEffect no lugar de chamar a função solta evita loops infinitos!
  useEffect(() => {
    refreshOrders();
  }, [refreshOrders]);

  const makeOrder = async (isDelivery: boolean) => {
    if (!user || !token) {
      setErrorOrders("Usuário não autenticado.");
      return;
    }

    try {
      setLoadingOrders(true);
      const payload = {
        userId: Number(user.id),
        customerEmail: user.email,
        items: cartItems,
        total: cartTotal,
        isDelivery,
      };

      const res = await fetch(`${API_BASE_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw console.log("Erro ao registrar o pedido no servidor.");

      const savedOrder = await res.json();

      setOrders((prev) => [...prev, savedOrder]);
      cleanCart();
      setErrorOrders(null);
      router.push("/Produtos"); // Redireciona após sucesso
    } catch (err) {
      setErrorOrders(err instanceof Error ? err.message : "Erro desconhecido");
      console.log("Erro createOrder:", err);
    } finally {
      setLoadingOrders(false);
    }
  };

  const updateOrderStatus = async (id: number, status: OrderStatus) => {
    try {
      setLoadingOrders(true);
      const res = await fetch(`${API_BASE_URL}/orders`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id, status }),
      });

      if (!res.ok) throw console.log("Erro ao atualizar status do pedido.");

      const updatedOrder = await res.json();
      setOrders((prevOrders) =>
        prevOrders.map((order) => (order.id === id ? updatedOrder : order))
      );
      setErrorOrders(null);
    } catch (err) {
      setErrorOrders(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setLoadingOrders(false);
    }
  };

  const deleteOrder = async (id: number) => {
    try {
      setLoadingOrders(true);
      const res = await fetch(`${API_BASE_URL}/orders`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) throw console.log("Erro ao deletar o pedido.");

      setOrders((prevOrders) => prevOrders.filter((order) => order.id !== id));
      setErrorOrders(null);
    } catch (err) {
      setErrorOrders(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setLoadingOrders(false);
    }
  };

  // --- LÓGICA DO CARRINHO ---

  const cleanCart = () => setCartItems([]);

  const addToCart = (product: number) => {
    if (!product) return;
    setCartItems((prev) => {
      const exists = prev.find((item) => item.id === product);
      if (exists) {
        return prev.map((item) =>
          item.id === product ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      const prdu = products.find((pro) => pro?.id === product);
      if (!prdu) return prev;
      
      return [
        ...prev,
        {
          id: prdu.id!,
          label: prdu.label,
          price: prdu.price,
          image: prdu.image,
          categoria: prdu.categoria,
          animal: prdu.animal,
          quantity: 1,
        },
      ];
    });
  };

  const updateQuantity = (id: number, amount: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, quantity: amount } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        orders,
        loadingOrders,
        errorOrders,
        cartTotal,
        addToCart,
        removeFromCart,
        updateQuantity,
        cleanCart,
        makeOrder,
        updateOrderStatus,
        deleteOrder,
        refreshOrders
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw console.log("useCart deve ser usado dentro de um CartProvider");
  return context;
};