"use client";

import { Product } from "@/app/interfaces";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@mui/material";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import Swal from "sweetalert2";

interface ProductDetailProps {
  product: Product;
}

const ProductDetail = ({ product }: ProductDetailProps) => {
  const { user } = useContext(AuthContext);
  const { cart, setCart } = useCart();
  const router = useRouter();
  const { id, name, price, image, description } = product;

  const isOnCart = cart?.some((item) => Number(item.id) === Number(id));

  const handleAddToCart = async () => {
    if (!user?.login) {
      Swal.fire({
        title: "Inicia sesión para continuar",
        text: "Necesitas iniciar sesión para agregar productos al carrito.",
        icon: "info",
        confirmButtonText: "Ir a login",
        confirmButtonColor: "#000",
      }).then((res) => {
        if (res.isConfirmed) router.push("/login");
      });
      return;
    }

    if (isOnCart) {
      Swal.fire({
        icon: "warning",
        title: "Producto duplicado",
        text: "Ya tienes este producto en el carrito. Solo se permite una unidad.",
        confirmButtonColor: "#000",
      });
      return;
    }

    // Confirmación de agregado
    const result = await Swal.fire({
      title: "¿Agregar al carrito?",
      text: `¿Deseas agregar "${name}" al carrito?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, agregar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#000",
      cancelButtonColor: "#555",
    });

    if (result.isConfirmed) {
      const newItem = { id, name, price, quantity: 1 };

      if (Array.isArray(cart)) {
        setCart([...cart, newItem]);
      } else {
        setCart([newItem]);
      }

      Swal.fire({
        icon: "success",
        title: "Producto agregado",
        text: `"${name}" se agregó correctamente al carrito.`,
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  return (
    <article className="backdrop-blur-md bg-white/30 dark:bg-black/30 text-black dark:text-white rounded-3xl shadow-xl p-6 mt-12 mb-12 max-w-6xl mx-auto border border-black/20 dark:border-white/20 transition-colors">
      <h1 className="text-4xl font-bold mb-6 tracking-tight">{name}</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <img
          src={image}
          alt={name}
          className="w-full lg:w-1/2 rounded-2xl shadow-md object-cover border border-gray-300 dark:border-gray-700"
        />
        <div className="flex flex-col justify-between lg:w-1/2 min-h-[400px]">
          <div>
            <p className="text-lg font-semibold text-black dark:text-gray-300 mb-2">
              Descripción:
            </p>
            <p className="text-base text-black dark:text-gray-400">
              {description}
            </p>
          </div>

          <div className="mt-auto pt-6 flex justify-between items-center">
            <p className="text-xl font-semibold">
              Precio:{" "}
              <span className="text-black dark:text-white">u$s {price}</span>
            </p>

            <Button
              variant="contained"
              onClick={isOnCart ? () => router.push("/cart") : handleAddToCart}
              startIcon={<ShoppingCartRoundedIcon />}
              sx={{
                backgroundColor: isOnCart ? "#000" : "#fff",
                color: isOnCart ? "#fff" : "#000",
                border: "1px solid #000",
                "&:hover": {
                  backgroundColor: isOnCart ? "#111" : "#f5f5f5",
                },
                textTransform: "none",
                fontWeight: 600,
                borderRadius: "12px",
                px: 2,
                py: 1.5,
              }}
            >
              {isOnCart ? "Ir al carrito" : "Añadir al carrito"}
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProductDetail;