"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

type UserContextType = {
  name: string;
  email: string;
  password: string;
  setName: Dispatch<SetStateAction<string>>
  setEmail: Dispatch<SetStateAction<string>>
  setPassword: Dispatch<SetStateAction<string>>
};

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <UserContext.Provider
      value={{
        name,
        email,
        password,
        setName,
        setEmail,
        setPassword
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser deve ser usado dentro do UserProvider");
  }

  return context;
}
