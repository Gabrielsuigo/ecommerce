
"use client";

import { Product } from "@/app/interfaces";
import { useContext } from "react";
import { AuthContexts } from "@/contexts/authContexts";
import { useRouter } from "next/navigation";
import { CartContexts } from "@/contexts/cartContext";

interface ProductDetailProps {
  product: Product;
}

const ProductDetail = ({ product }: ProductDetailProps) => {
  const { user } = useContext(AuthContexts);
  const { cart, setCart } = useContext(CartContexts);
  const router = useRouter();
  const { id, name, price, image, description } = product;
  const isOnCart = cart?.some((item) => item.id === id);

  const handleAddToCart = () => {
    if (user?.login) {
      if (Array.isArray(cart)) {
        setCart([...cart, { id, name, price }]);
      } else {
        setCart([{ id, name, price }]);
      }

      alert("Added to cart!");
    } else {
      alert("Please login to add to cart");
      setTimeout(() => {
        router.push("/login");
      }, 1000);
    }
  };

  return (
    <article className="bg-gray-900 text-white rounded-2xl shadow-2xl p-6">
      <h1 className="text-3xl font-semibold mb-4">{name}</h1>
      <div className="flex flex-col lg:flex-row gap-6">
        <img
          src={image}
          alt={name}
          className="w-full lg:w-1/2 rounded-lg shadow-lg object-cover mb-4 lg:mb-0"
        />

        <div className="flex flex-col gap-4 lg:w-1/2">
          <p className="text-xl font-semibold"> Description: </p>
          <p className="text-gray-400 text-lg">{description}</p>

          <div className="flex justify-between items-center">
            <p className="text-xl font-semibold">Precio u$s {price}</p>

            <button
              onClick={
                isOnCart ? () => router.push("/cart") : () => handleAddToCart()
              }
              className={`${
                isOnCart
                  ? "bg-indigo-500 hover:bg-indigo-600"
                  : "bg-green-500 hover:bg-green-600"
              } text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300`}
            >
              {isOnCart ? "Go to Cart" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProductDetail;
