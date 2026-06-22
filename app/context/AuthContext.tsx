"use client";

import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

type AuthContextType = {
  token: string | null;
  profile: string | null;
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (token: string, profile: string, user: User) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [profile, setProfile] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    const storedProfile = sessionStorage.getItem("profile");
    const storedUser = sessionStorage.getItem("user");

    setToken(storedToken); 
  setProfile(storedProfile);
  // Garante que se não houver usuário logado, o estado fique estritamente null
  setUser(storedUser ? JSON.parse(storedUser) : null);

  setLoading(false);
}, []);
  

  const login = (newToken: string, newProfile: string, newUser: User) => {
    sessionStorage.setItem("token", newToken);
    sessionStorage.setItem("profile", newProfile);
    sessionStorage.setItem("user", JSON.stringify(newUser));

    setToken(newToken);
    setProfile(newProfile);
    setUser(newUser);

    router.replace("/login");
  };

  const logout = () => {
  // 1. Limpa o storage primeiro
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("profile");
  sessionStorage.removeItem("user");

  // 2. Reseta os estados imediatamente
  setToken(null);
  setProfile(null);
  setUser(null);

  // 3. SÓ AGORA redireciona
  router.replace("/login");
};

  return (
    <AuthContext.Provider
      value={{
        token,
        profile,
        user,
        isAuthenticated: !!token,
        loading,
        login,
        logout,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth deve ser usado dentro do AuthProvider");
  }

  return context;
}
