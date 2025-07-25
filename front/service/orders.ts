// Aca hago la comunicacion con el backend para trerme las ordenes.

import { Cart } from "@/contexts/CartContext";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export const postOrders = async (
  userId: number,
  token: string,
  cart: Cart[]
) => {
  const Data = { userId, products: cart.map((item) => item.id) };

  const res = await fetch(`${apiUrl}/orders`, {
    method: "POST",
    body: JSON.stringify(Data),
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
  return await res.json();
};
