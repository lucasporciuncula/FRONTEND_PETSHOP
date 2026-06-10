"use client";

import React, { createContext, useContext, useState } from "react";

interface ThemeContextType {
  isCartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  themeColor: string;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isCartOpen, setCartOpen] = useState(false);
  const themeColor = "#DEAD6F"; // dourada 

  return (
    <ThemeContext.Provider value={{ isCartOpen, setCartOpen, themeColor }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme deve ser usado dentro de um ThemeProvider");
  }
  return context;
}