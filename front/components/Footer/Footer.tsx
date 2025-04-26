
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16 mt-10 shadow-lg rounded-t-3xl">
      <div className="container mx-auto text-center">
        <p className="text-sm text-gray-400 mt-2">FOOTER</p>
        <p className="text-sm text-gray-400 mt-2">
          © 2024 STORE. All rights reserved.
        </p>
        <div className="mt-4">
          <Link href="/contact" className="text-lg font-semibold text-indigo-400 hover:text-indigo-600 transition">
            Contactanos
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
