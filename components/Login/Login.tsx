"use client";

import { login } from "@/service/auth";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { FormEvent, useEffect, useState } from "react";
import { validateEmail, validatePassword } from "@/helpers/validation";
import Swal from "sweetalert2";

const Login = () => {
  const { setUser } = useAuth();
  const router = useRouter();

  const [Data, setData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [dirty, setDirty] = useState({ email: false, password: false });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await login(Data);

      // ❌ Error controlado desde backend
      if (res.statusCode) {
        Swal.fire({
          icon: "error",
          title: "Error al iniciar sesión",
          text: res.message || "Verifica tus credenciales e intenta nuevamente.",
          confirmButtonColor: "#000",
        });
        return;
      }

      // ✅ Login exitoso
      Swal.fire({
        icon: "success",
        title: "¡Bienvenido!",
        text: "Inicio de sesión exitoso.",
        showConfirmButton: false,
        timer: 1500,
      });

      setUser(res);
      localStorage.setItem("user", JSON.stringify(res));

      // Redirección suave
      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      Swal.fire({
        icon: "error",
        title: "Error inesperado",
        text: "Ocurrió un error al intentar iniciar sesión.",
        confirmButtonColor: "#000",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...Data, [e.target.name]: e.target.value });
  };

  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDirty({ ...dirty, [e.target.name]: true });
  };

  useEffect(() => {
    const currentErrors = {
      email: validateEmail(Data.email),
      password: validatePassword(Data.password),
    };
    setErrors(currentErrors);
  }, [Data]);

  return (
    <div className="flex items-center justify-center min-h-screen text-black bg-transparent">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-6 p-8 rounded-3xl border border-neutral-300 shadow-xl bg-white/70 backdrop-blur-sm"
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight">Iniciá sesión</h2>
          <p className="text-sm text-neutral-500 mt-1">
            Accedé a tu cuenta para continuar
          </p>
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={Data.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="nombre@correo.com"
            className="mt-1 w-full p-3 rounded-xl bg-neutral-100 border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-black"
          />
          {dirty.email && errors.email && (
            <p className="text-sm text-red-600 mt-1">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium">
            Contraseña
          </label>
          <div className="relative mt-1">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              value={Data.password}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="********"
              className="w-full p-3 rounded-xl bg-neutral-100 border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-black pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black select-none"
              aria-label="Mostrar u ocultar contraseña"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                />
                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth={2} />
              </svg>
            </button>
          </div>
          {dirty.password && errors.password && (
            <p className="text-sm text-red-600 mt-1">{errors.password}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className={`w-full py-3 rounded-xl text-white font-semibold transition duration-200 ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-black hover:bg-neutral-800"
          }`}
          disabled={loading}
        >
          {loading ? "Cargando..." : "Iniciar sesión"}
        </button>
      </form>
    </div>
  );
};

export default Login;

