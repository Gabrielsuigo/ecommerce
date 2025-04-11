"use client";

import { Order, UserSession } from "@/app/interfaces";
import { createContext, useEffect, useState } from "react";

// creo interface del context
interface AuthContextProps {
  user: UserSession | null;
  setUser: (user: UserSession | null) => void;
  logout: () => void;
  orders: Order[];
  setOrders: (orders: Order[]) => void;
}

// Creo el contexto, aca vamos a guardar los datos
export const AuthContexts = createContext<AuthContextProps>({
  user: null,
  orders: [],
  setUser: () => {},
  logout: () => {},
  setOrders: () => {},
});


// Crear el provider
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserSession | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      
      setOrders(user?.user.orders || []);
    }
  }, [user]);

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("user")!);
    setUser(localUser);
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContexts.Provider value={{ user, setUser, logout, orders, setOrders }}>
      {children}
    </AuthContexts.Provider>
  );
};
