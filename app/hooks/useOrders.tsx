import { useEffect, useState, useCallback } from "react";
import { useAuthContext } from "../context/AuthContext";
import { API_BASE_URL } from "../utils/config";
import { useCart } from "../context/OrdersContext";

// Definição exata dos status vindos do Prisma do seu Backend
export type OrderStatus = "PROCESSANDO" | "ENVIADO" | "ENTREGUE";

export function useOrders() {
  const { token, user } = useAuthContext();
  const { setOrders, cartItems, cartTotal, cleanCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 1. Buscar todos os pedidos
  const getAllOrders = useCallback(async () => {
    if (!token) return;

    try {
      setLoading(true);
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
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
      console.error("Erro getAllOrders:", err);
    } finally {
      setLoading(false);
    }
  }, [token, setOrders]);

  useEffect(() => {
    getAllOrders();
  }, [getAllOrders]);

  const createOrder = async (isDelivery: boolean): Promise<boolean> => {
    if (!user || !token) {
      setError("Usuário não autenticado.");
      return false;
    }

    try {
      setLoading(true);
      
      const payload = {
        userId: Number(user.id), // Garantindo que vai como número para o Prisma
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

      if (!res.ok) throw new Error("Erro ao registrar o pedido no servidor.");

      const savedOrder = await res.json();

      // Atualiza o estado global adicionando o pedido retornado do banco (já com ID gerado)
      setOrders((prevOrders) => [...prevOrders, savedOrder]);
      
      // Limpa o carrinho local se a requisição deu certo
      cleanCart();
      setError(null);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
      console.error("Erro createOrder:", err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // 3. Atualizar Status do Pedido (Rota Admin)
  const updateOrderStatus = async (id: number, status: OrderStatus) => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/orders`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id, status }), // Corpo esperado pelo seu OrderController
      });

      if (!res.ok) throw new Error("Erro ao atualizar status do pedido.");

      const updatedOrder = await res.json();

      // Atualiza a lista local com o pedido modificado
      setOrders((prevOrders) =>
        prevOrders.map((order) => (order.id === id ? updatedOrder : order))
      );
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
      console.error("Erro updateOrderStatus:", err);
    } finally {
      setLoading(false);
    }
  };

  // 4. Deletar Pedido (Rota Admin)
  const deleteOrder = async (id: number) => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/orders`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id }), // O seu backend espera o id no body: const { id } = req.body
      });

      if (!res.ok) throw new Error("Erro ao deletar o pedido.");

      // Remove da lista local se foi deletado no banco
      setOrders((prevOrders) => prevOrders.filter((order) => order.id !== id));
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
      console.error("Erro deleteOrder:", err);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    createOrder,
    updateOrderStatus,
    deleteOrder,
    refreshOrders: getAllOrders, // Permite recarregar manualmente na UI se necessário
  };
}