"use client";

import { API_BASE_URL } from "../utils/config";
import { useAuthContext } from "../context/AuthContext";
import { useState } from "react";
import { useUserContext } from "../context/UserContext";
import { useRouter } from "next/navigation";

export default function useUser() {
  const router = useRouter();
  const { login } = useAuthContext(); // Removi o 'user' daqui pois causava conflito de escopo
  const { email, password, name } = useUserContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(API_BASE_URL + "/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        setError("Email ou senha inválidos. Tente Novamente.");
        return;
      }

      const data = await res.json();
      setError(null);

      const token = data.token;
      const user = data.user;
      const role = data.user.role; 

      login(token, user, role);

      // CORREÇÃO: Usar a variável local 'role' garante o redirecionamento correto imediato
      if (role === "ADMIN") {
        router.push("/admin");
      } else {
        router.push("/Produtos");
      }
    } catch (err) {
      setError("Ocorreu um erro ao tentar fazer login, tente novamente mais tarde");
    } finally {
      setLoading(false);
    }
  };

  const handleCadastro = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(API_BASE_URL + "/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      });

      if (!res.ok) {
        setError("Erro ao cadastrar usuário.");
        return;
      }

      const data = await res.json();
      setError(null);

      const token = data.token;
      const user = data.user;
      const role = data.user.role;

      // CORREÇÃO: Alinhado os parâmetros com o handleLogin
      login(token, user, role);

      if (role === "ADMIN") {
        router.push("/admin");
      } else {
        router.push("/Produtos");
      }
    } catch (err) {
      setError("Ocorreu um erro ao tentar cadastrar, tente novamente mais tarde");
    } finally {
      setLoading(false);
    }
  };

  return {
    handleLogin,
    handleCadastro,
    loading,
    error,
  };
}