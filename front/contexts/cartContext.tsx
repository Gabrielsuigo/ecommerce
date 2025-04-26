"use client";

import { createContext, useEffect, useState } from "react";

export interface Cart {
  id: number;
  name: string;
  price: number;
}

// creo interface del context
interface CartContextProps {
  // tipos de lo que comparto
  cart: Cart[];
  setCart: (cart: Cart[]) => void;
  emptyCart: () => void;
}

// Creo el contexto, aca vamos a guardar los datos
export const CartContexts = createContext<CartContextProps>({
  // datos iniciales con los que comparto
  cart: [],
  setCart: () => {},
  emptyCart: () => {},
});

// Crear el provider

export const CartProvider = ({ children }: { children: React.ReactNode }) => {

  // Código compartido
  const [cart, setCart] = useState<Cart[]>([]);

  useEffect(() => {
    if (cart?.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  useEffect(() => {
    const localCart = JSON.parse(localStorage.getItem("cart")!);
    setCart(localCart);
  }, []);

  const emptyCart = () => {
    localStorage.removeItem("cart");
    setCart([]);
  };

  return (
    <CartContexts.Provider value={{ cart, setCart, emptyCart }}>
      {children}
    </CartContexts.Provider>
  );
};



