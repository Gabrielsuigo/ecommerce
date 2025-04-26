"use client";

import Link from "next/link";
import UserWidget from "../UserWidget/UserWidget";

// Suponiendo que tienes una lista de productos
import { Product } from "@/app/interfaces"; 
import { useRouter } from "next/navigation"; 
import { useState } from "react";

import { AuthContexts } from "@/contexts/authContexts";
import { CartContexts } from "@/contexts/cartContext";
import { useContext } from "react";


const Navbar = () => {

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const router = useRouter();
  const { user } = useContext(AuthContexts);
  const { cart } = useContext(CartContexts)

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
  const handleProductClick = () => {
    setSearchTerm("");
    setFilteredProducts([]);
  };

  // Función para manejar la búsqueda al hacer clic en el botón



  const handleSearch = () => {
    if (searchTerm.trim()) {
      router.push(`/search=${searchTerm}`); 
    }
  };

  return (


    <nav className="bg-gray-900 text-white py-4 shadow-lg rounded-b-3xl">
      <div className="container flex justify-between items-center mx-auto px-6">
      <Link href="/" className="flex items-center hover:scale-105 transition duration-300">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 384 512"
    className="w-8 h-8 fill-white"
  >
    <path d="M318.7 268.1c-.3-45.5 37.1-67.3 38.7-68.3-21.1-30.9-53.8-35.1-65.4-35.6-27.8-2.8-54.4 16.4-68.5 16.4-14.2 0-36.3-16-59.7-15.6-30.7.4-59 17.8-74.8 45.3-32.1 55.7-8.2 138.3 22.9 183.5 15.2 22.1 33.3 46.9 57.1 46 22.6-.9 31.2-14.7 58.4-14.7s35 14.7 59.1 14.3c24.4-.4 39.9-22.5 54.9-44.9 17.3-25.2 24.4-49.6 24.7-50.9-.5-.2-47.1-18-47.4-71.5zM256.5 91.7c12.3-15 20.6-35.8 18.3-56.7-17.7.7-39.2 11.8-51.8 26.8-11.4 13.2-21.4 34.5-18.7 54.8 19.7 1.5 39.9-10 52.2-24.9z" />
  </svg>
</Link>
    

       
       {/* barra de busqueda */}

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


      
        <div className="flex item-center gap-4">
        {user && cart && (
          <Link href="/cart" className="relative group">
    <span className="text-2xl">🛒</span>
    {cart.length > 0 && (
      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
        {cart.length}
      </span>
    )}
  </Link>
)}
 
        <UserWidget />
      </div>
    </div>



     {filteredProducts.length > 0 && (
        <div className="container mx-auto px-6 mt-6">
          <h3 className="text-lg text-white mb-3">Search Results</h3>
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-4">

          {filteredProducts.map((product) => (
  <div key={product.id} className="bg-gray-800 p-4 rounded-lg shadow-md hover:scale-105 transition duration-300">
    <Link href={`/products/${product.id}`} onClick={handleProductClick}>
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

