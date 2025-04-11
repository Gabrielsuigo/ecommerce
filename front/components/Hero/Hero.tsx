import Link from "next/link";

const Hero = () => {
  return (
    <header className="h-[12.5rem] flex flex-col items-center justify-center bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 text-white rounded-3xl shadow-xl my-3 p-6">
      <h1 className="text-4xl font-semibold mb-4">Welcome to my page</h1>
      <Link
        href="/products"
        className="bg-indigo-600 py-2 px-6 rounded-lg text-lg text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        Go to product
      </Link>
    </header>
  );
};

export default Hero;