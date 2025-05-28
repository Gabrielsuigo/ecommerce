import { getProducts } from "@/service/products";
import React from "react";

const Examen = async () => {
  const productos = await getProducts();

  return (
    <div>
      <h1> {productos[0].name}</h1>
    </div>
  );
};

export default Examen;
