"use client";

import { AuthContext } from "@/contexts/AuthContext";
import Link from "next/link";
import { useContext } from "react";

const UserWidget = () => {
  const { user, logout } = useContext(AuthContext);


  return (
    <div className="flex items-center gap-4">
      {!user?.login ? (
        <>
          <Link
            href="/login"
            className="text-sm font-semibold text-black dark:text-white hover:text-neutral-800 dark:hover:text-neutral-300 transition duration-300"
          >
            👤 Sign In
          </Link>
          <Link
            href="/register"
            className="text-sm font-semibold text-black dark:text-white border border-black dark:border-white hover:bg-neutral-100 dark:hover:bg-neutral-800 py-1 px-3 rounded-lg transition duration-300"
          >
            Register
          </Link>
        </>
      ) : (
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="text-sm font-semibold text-black dark:text-white hover:text-primary dark:hover:text-primary transition duration-300"
          >
            👤 {user.user.name}
          </Link>
         <button
            onClick={logout}
            className="text-sm font-semibold text-black dark:text-white border border-black dark:border-white hover:bg-neutral-100 dark:hover:bg-neutral-800 py-1 px-3 rounded-lg transition duration-300"
          >
            Log Out
          </button>
        </div>
      )}
    </div>
  );
};

export default UserWidget;