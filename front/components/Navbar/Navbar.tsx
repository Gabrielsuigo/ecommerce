"use client";

import Link from "next/link";
import UserWidget from "../UserWidget/UserWidget";

// Suponiendo que tienes una lista de productos
import { Product } from "@/app/interfaces"; // Asegúrate de que el tipo Product esté bien definido
import { useRouter } from "next/navigation"; // Para redirigir a la página de resultados de búsqueda si es necesario
import { useState } from "react";

const Navbar = () => {
  // Estado para el término de búsqueda
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const router = useRouter();

  // Simulación de una lista de productos (esto se puede obtener de una API o contexto)
  const products: Product[] = [
    { id: 1, name: "Iphone 16", price: 699, image: "https://www.apple.com/v/iphone-16/f/images/overview/product-viewer/iphone/green__rbnj2er55kam_large.jpg",  description: "High-quality product", stock: 50, categoryId: 1 },
    { id: 2, name: "MacBook Air", price: 999, image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mba13-skyblue-select-202503?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1741885365897", description: "Premium product", stock: 30, categoryId: 2 },
    { id: 3, name: "Ipad Pro", price: 799, image: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/ipad-pro-model-select-gallery-2-202405?wid=5120&hei=2880&fmt=webp&qlt=70&.v=cXN0QTVTNDBtbGIzcy91THBPRThnMkpvMjZnN3E5aGRZVXJIWmhFMitJSU9WV3R2ZHdZMXRzTjZIcWdMTlg4eUJQYkhSV3V1dC9oa0s5K3lqMGtUaFMvR01EVDlzK0hIS1J2bTdpY0pVeTBWNTFabEhVdlFNSjJrWGh4dTRLbEk&traceId=1", description: "Affordable and reliable", stock: 20, categoryId: 1 },
    { id: 4, name: "Apple Watch series 10", price: 399, image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/s10-case-unselect-gallery-1-202503?wid=5120&hei=3280&fmt=p-jpg&qlt=80&.v=1739305300233", description: "Best value for money", stock: 40, categoryId: 3 },
    { id: 5, name: "AirPods 4",  price: 249, image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airpods-4-hero-select-202409?wid=976&hei=916&fmt=jpeg&qlt=90&.v=1725502960502", description: "Compact and efficient", stock: 10, categoryId: 2 },
    { id: 6, name: "HomePod", price: 99, image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/homepod-select-202210?wid=1080&hei=1080&fmt=jpeg&qlt=90&.v=1670557209908", description: "Budget-friendly option", stock: 5, categoryId: 3 },
  ];

  // Función para manejar el cambio en la barra de búsqueda
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    // Filtrar productos en base al término de búsqueda
    if (value.trim() !== "") {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]); // Si no hay búsqueda, mostrar todos
    }
  };

  // Función para manejar la búsqueda al hacer clic en el botón



  const handleSearch = () => {
    if (searchTerm.trim()) {
      router.push(`/search?query=${searchTerm}`); // Redirigir a la página de resultados de búsqueda
    }
  };

  return (
    <nav className="bg-gray-900 text-white py-4 shadow-lg rounded-b-3xl">
      <div className="container flex justify-between items-center mx-auto px-6">
        {/* Logo o Título */}
    

        <Link
          href="/"
          className="relative inline-block text-2xl font-light text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 via-blue-300 to-purple-600 hover:text-indigo-500 hover:scale-105 transition-all duration-500 ease-in-out group"
        >
          STORE
          {/* Fondo difuso que aparece al hacer hover */}
          <span className="absolute inset-0 bg-white opacity-10 blur-sm rounded-xl group-hover:opacity-30 transition-all duration-500"></span>
        </Link>

        {/* Barra de búsqueda */}
        <div className="flex items-center bg-gray-800 rounded-lg px-4 py-2 w-2/5">
          <input
            type="text"
            placeholder="Search for products..."
            className="bg-transparent text-white placeholder-gray-400 outline-none w-full py-2 px-4 rounded-lg focus:ring-2 focus:ring-indigo-500 transition duration-300"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button
            onClick={handleSearch}
            className="ml-2 text-white bg-indigo-600 hover:bg-indigo-700 py-2 px-4 rounded-lg shadow-md focus:outline-none transition duration-300"
          >
            Search
          </button>
        </div>

        {/* User Widget */}
        <UserWidget />
      </div>

      {/*Mostrar resultados filtrados de búsqueda */}


      {filteredProducts.length > 0 && (
        <div className="container mx-auto px-6 mt-6">
          <h3 className="text-lg text-white mb-3">Search Results</h3>
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-4">

          {filteredProducts.map((product) => (
  <div key={product.id} className="bg-gray-800 p-4 rounded-lg shadow-md hover:scale-105 transition duration-300">
    <Link href={`/products/${product.id}`}>
      <h4 className="text-lg font-semibold text-indigo-400">{product.name}</h4>
      <p className="text-sm text-gray-300">{product.description}</p>
      <p className="text-white text-sm mt-2">Stock: {product.stock}</p>
      <p className="text-white text-sm">Category: {product.categoryId}</p>
      <img src={product.image} alt={product.name} className="w-full h-auto rounded-lg" />
      <p className="text-white text-sm mt-2">Precio u$s{product.price}</p>
    </Link>
  </div>
))}
       
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
