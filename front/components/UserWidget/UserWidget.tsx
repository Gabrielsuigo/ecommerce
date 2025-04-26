"use client";

import { AuthContexts } from "@/contexts/authContexts";
import Link from "next/link";
import { useContext } from "react";
import { useRouter } from "next/navigation"; // Necesario para redirigir a login después del registro

const UserWidget = () => {
  const { user, logout } = useContext(AuthContexts);
  const router = useRouter();  // Para redirigir después del registro

  // Manejar el registro, redirigiendo a login después
  const handleRegisterRedirect = () => {
    router.push("/register"); // Redirige a la página de registro
  };

  return (
    <div className="flex items-center gap-4">
      {!user?.login ? (
        <>
          <Link
            href="/login"
            className="text-sm font-semibold text-white hover:text-indigo-400 transition duration-300"
          >
          👤  Sign In
          </Link>
          <button
            onClick={handleRegisterRedirect}
            className="text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 py-1 px-3 rounded-lg transition duration-300"
          >
            Register
          </button>
        </>
      ) : (
        // Si el usuario está logueado, muestra su nombre 
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="text-sm font-semibold text-white hover:text-indigo-400 transition duration-300"
          >
           👤 {user.user.name}
          </Link>
          <button
            onClick={logout}
            className="text-sm font-semibold text-white bg-red-600 hover:bg-red-700 py-1 px-3 rounded-lg transition duration-300"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default UserWidget;