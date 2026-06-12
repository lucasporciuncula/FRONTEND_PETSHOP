"use client";

import { useRouter } from "next/navigation";
import { API_BASE_URL } from "../utils/config";
import { useAuthContext } from "../context/AuthContext";
import { useState } from "react";
import { useUserContext } from "../context/UserContext";

export default function useUser() {
  const router = useRouter();
  const { user, login } = useAuthContext();
  const { email, password, name } = useUserContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      console.log("handlelogin começou");
      setLoading(true);
      const res = await fetch(API_BASE_URL + "/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        console.log("Email ou senha inválidos. Tente Novamente.");
        return;
      }

      const data = await res.json();
      setError(null);

      //usa o context aq
      console.log("data:", data);
      const token = data.token;
      const user = data.user;
      const role = data.user.role; // Se o role estiver dentro do objeto user

      login(token, user, role);

      if (user?.role == "ADMIN") {
        router.push("/admin");
      } else {
        router.push("/Produtos");
      }
    } catch (err) {
      setError(
        "ocoreu um erro ao tentar fazer login, tente novamnete mais tarde",
      );
    }
  };

  const handleCadastro = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await fetch(API_BASE_URL + "/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name }),
      });

      if (!res.ok) {
        console.log("Email ou senha ou nome inválidos. Tente Novamente.");
        return;
      }

      const data = await res.json();
      setError(null);

      //usa o context aq
      login(data.token, data.user.role, data.user);

      if (user?.role == "ADMIN") {
        router.push("/admin");
      } else {
        router.push("/Produtos");
      }
    } catch (err) {
      setError(
        "ocoreu um erro ao tentar fazer login, tente novamnete mais tarde",
      );
    }
  };
  return {
    handleLogin,
    handleCadastro,
  };
}
