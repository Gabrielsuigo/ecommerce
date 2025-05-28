"use client";
import { SearchBarProps } from "@/app/interfaces";

const SearchBar = ({ value, onChange, onSearch }: SearchBarProps) => (
  <div className="flex items-center bg-gray-800 rounded-lg px-4 py-2 w-2/5">
    <input
      type="text"
      placeholder="Search for products..."
      className="bg-transparent text-white placeholder-gray-400 outline-none w-full py-2 px-4 rounded-lg focus:ring-2 focus:ring-indigo-500 transition duration-300"
      value={value}
      onChange={onChange}
    />
    <button
      onClick={onSearch}
      className="ml-2 text-white bg-indigo-600 hover:bg-indigo-700 py-2 px-4 rounded-lg shadow-md focus:outline-none transition duration-300"
    >
      Search
    </button>
  </div>
);

export default SearchBar