"use client";
import Link from "next/link";
import { ProductListProps } from "@/app/interfaces";

const SearchResults = ({ products, onClick }: ProductListProps) => {
  if (products.length === 0) return null;

  return (
    <div className="container mx-auto px-6 mt-6">
      <h3 className="text-lg text-white mb-3">Search Results</h3>
      <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="bg-gray-800 p-4 rounded-lg shadow-md hover:scale-105 transition duration-300">
            <Link href={`/products/${product.id}`} onClick={onClick}>
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
  );
};

export default SearchResults;