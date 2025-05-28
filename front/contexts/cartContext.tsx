"use client";

import { createContext, useEffect, useState, useContext } from "react";
import { useAuth } from "./AuthContext";

export interface Cart {
  id: number;
  name: string;
  price: number;
}

interface CartContextProps {
  cart: Cart[];
  setCart: (cart: Cart[]) => void;
  emptyCart: () => void;
}

const CartContext = createContext<CartContextProps>({
  cart: [],
  setCart: () => {},
  emptyCart: () => {},
});

const CART_EXPIRATION_HOURS = 24;

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<Cart[]>([]);
  const { user } = useAuth();
  const userEmail = user?.user?.email;

  useEffect(() => {
    if (userEmail) {
      const storedCart = localStorage.getItem(`cart-${userEmail}`);
      if (storedCart) {
        const parsed = JSON.parse(storedCart);
        const savedTime = new Date(parsed.timestamp);
        const now = new Date();
        const diffInHours =
          (now.getTime() - savedTime.getTime()) / (1000 * 60 * 60);

        if (diffInHours > CART_EXPIRATION_HOURS) {
          // 🧹 Si el carrito es viejo, lo borramos
          localStorage.removeItem(`cart-${userEmail}`);
          setCart([]);
          alert("Tu carrito expiró por inactividad."); // ✅ Cartel agregado
        } else {
          setCart(parsed.items || []);
        }
      } else {
        setCart([]);
      }
    } else {
      setCart([]);
    }
  }, [userEmail]);

  useEffect(() => {
    if (userEmail) {
      const now = new Date();
      const data = {
        items: cart,
        timestamp: now.toISOString(), // 🕓 guardamos fecha actual
      };
      localStorage.setItem(`cart-${userEmail}`, JSON.stringify(data));
    }
  }, [cart, userEmail]);

  const emptyCart = () => {
    if (userEmail) {
      localStorage.removeItem(`cart-${userEmail}`);
    }
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, setCart, emptyCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
export { CartContext };
// "use client";

// import { createContext, useEffect, useState, useContext } from "react";
// import { useAuth } from "./AuthContext";

// export interface Cart {
//   id: number;
//   name: string;
//   price: number;
// }

// interface CartContextProps {
//   cart: Cart[];
//   setCart: (cart: Cart[]) => void;
//   emptyCart: () => void;
// }

// const CartContext = createContext<CartContextProps>({
//   cart: [],
//   setCart: () => {},
//   emptyCart: () => {},
// });

// export const CartProvider = ({ children }: { children: React.ReactNode }) => {
//   const [cart, setCart] = useState<Cart[]>([]);
//   const { user } = useAuth();

//   const userEmail = user?.user?.email;

//   useEffect(() => {
//     if (userEmail) {
//       const storedCart = localStorage.getItem(`cart-${userEmail}`);
//       if (storedCart) {
//         setCart(JSON.parse(storedCart));
//       } else {
//         setCart([]);
//       }
//     } else {
//       setCart([]);
//     }
//   }, [userEmail]);

//   useEffect(() => {
//     if (userEmail) {
//       localStorage.setItem(`cart-${userEmail}`, JSON.stringify(cart));
//     }
//   }, [cart, userEmail]);

//   const emptyCart = () => {
//     if (userEmail) {
//       localStorage.removeItem(`cart-${userEmail}`);
//     }
//     setCart([]);
//   };

//   return (
//     <CartContext.Provider value={{ cart, setCart, emptyCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => useContext(CartContext);
// export { CartContext };
