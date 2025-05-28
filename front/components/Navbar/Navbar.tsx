"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import { Product } from "@/app/interfaces";
import { getProducts } from "@/service/products";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";

import UserWidget from "../UserWidget/UserWidget";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  const router = useRouter();
  const { user } = useAuth();
  const { cart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setFilteredProducts(
      value.trim()
        ? products.filter((p) =>
            p.name.toLowerCase().includes(value.toLowerCase())
          )
        : []
    );
  };

  const handleSearch = () => {
    if (searchTerm.trim()) router.push(`/search=${searchTerm}`);
  };

  const handleProductClick = () => {
    setSearchTerm("");
    setFilteredProducts([]);
  };

  return (
    <nav className="bg-gray-900 text-white py-4 shadow-lg rounded-b-3xl">
      <div className="container flex justify-between items-center mx-auto px-6">
        <Link
          href="/"
          className="flex items-center hover:scale-105 transition duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384 512"
            className="w-8 h-8 fill-white"
          >
            <path d="M318.7 268.1c-.3-45.5 37.1-67.3 38.7-68.3-21.1-30.9-53.8-35.1-65.4-35.6-27.8-2.8-54.4 16.4-68.5 16.4-14.2 0-36.3-16-59.7-15.6-30.7.4-59 17.8-74.8 45.3-32.1 55.7-8.2 138.3 22.9 183.5 15.2 22.1 33.3 46.9 57.1 46 22.6-.9 31.2-14.7 58.4-14.7s35 14.7 59.1 14.3c24.4-.4 39.9-22.5 54.9-44.9 17.3-25.2 24.4-49.6 24.7-50.9-.5-.2-47.1-18-47.4-71.5zM256.5 91.7c12.3-15 20.6-35.8 18.3-56.7-17.7.7-39.2 11.8-51.8 26.8-11.4 13.2-21.4 34.5-18.7 54.8 19.7 1.5 39.9-10 52.2-24.9z" />
          </svg>
        </Link>

        <SearchBar
          value={searchTerm}
          onChange={handleSearchChange}
          onSearch={handleSearch}
        />

        <div className="flex items-center gap-4">
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

      <SearchResults products={filteredProducts} onClick={handleProductClick} />
    </nav>
  );
};

export default Navbar;
