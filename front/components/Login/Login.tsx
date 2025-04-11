// "use client";

// import { login } from "@/service/auth";
// import { useRouter } from "next/navigation";
// import { AuthContexts } from "@/contexts/authContexts";
// import { FormEvent, useContext, useEffect, useState } from "react";
// import { validateEmail, validatePassword } from "@/helpers/validation";

// const Login = () => {
//   const { setUser } = useContext(AuthContexts);

//   const router = useRouter();

//   const initialData = { email: "", password: "" };
//   const initialDirty = { email: false, password: false };

//   const [Data, setData] = useState(initialData);
//   const [errors, setErrors] = useState(initialData);
//   const [dirty, setDirty] = useState(initialDirty);

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const res = await login(Data);
//     if (res.statusCode) {
//       alert(res.message);
//     } else {
//       alert("Login successful");
//       setUser(res);
//       router.push("/");
//     }
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setData({ ...Data, [e.target.name]: e.target.value });
//   };

//   const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setDirty({ ...dirty, [e.target.name]: true });
//   };

//   useEffect(() => {
//     setErrors({
//       email: validateEmail(Data.email),
//       password: validatePassword(Data.password),
//     });
//   }, [Data]);

//   return (
//     <form
//       className="max-w-sm mx-auto flex flex-col gap-5"
//       onSubmit={(e) => handleSubmit(e)}
//     >
//       <label htmlFor="email">Email</label>
//       <input className="rounded-lg"
//         type="email"
//         id="email"
//         placeholder="name@flowbite.com"
//         name="email"
//         value={Data.email}
//         onChange={handleChange}
//         onBlur={handleBlur}
//       />
//       {dirty.email ? <p className="text-red-600">{errors.email}</p> : null}

//       <label htmlFor="password">Password</label>
//       <input className="rounded-lg"
//         type="password"
//         id="password"
//         name="password"
//         value={Data.password}
//         placeholder="Al least 5 characters"
//         onChange={handleChange}
//         onBlur={handleBlur}
//       />
//       {dirty.password ? (
//         <p className="text-red-600">{errors.password}</p>
//       ) : null}

//       <button type="submit">Login</button>
//     </form>
//   );
// };
// export default Login;

"use client";

import { login } from "@/service/auth";
import { useRouter } from "next/navigation";
import { AuthContexts } from "@/contexts/authContexts";
import { FormEvent, useContext, useEffect, useState } from "react";
import { validateEmail, validatePassword } from "@/helpers/validation";

const Login = () => {
  const { setUser } = useContext(AuthContexts);
  const router = useRouter();

  const initialData = { email: "", password: "" };
  const initialDirty = { email: false, password: false };

  const [Data, setData] = useState(initialData);
  const [errors, setErrors] = useState(initialData);
  const [dirty, setDirty] = useState(initialDirty);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await login(Data);
    if (res.statusCode) {
      alert(res.message);
    } else {
      alert("Login successful");
      setUser(res);
      router.push("/");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...Data, [e.target.name]: e.target.value });
  };

  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDirty({ ...dirty, [e.target.name]: true });
  };

  useEffect(() => {
    setErrors({
      email: validateEmail(Data.email),
      password: validatePassword(Data.password),
    });
  }, [Data]);

  return (
    <form
      className="max-w-sm mx-auto flex flex-col gap-6 p-8 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 text-white rounded-3xl shadow-xl"
      onSubmit={(e) => handleSubmit(e)}
    >
      <h2 className="text-3xl font-semibold text-center mb-6">Login</h2>

      {/* Email */}
      <label htmlFor="email" className="text-lg font-medium">Email</label>
      <input
        className="bg-gray-700 text-white rounded-lg p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        type="email"
        id="email"
        placeholder="name@flowbite.com"
        name="email"
        value={Data.email}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {dirty.email && <p className="text-red-600 mt-1">{errors.email}</p>}

      {/* Password */}
      <label htmlFor="password" className="text-lg font-medium">Password</label>
      <input
        className="bg-gray-700 text-white rounded-lg p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        type="password"
        id="password"
        name="password"
        value={Data.password}
        placeholder="At least 5 characters"
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {dirty.password && <p className="text-red-600 mt-1">{errors.password}</p>}

      {/* Submit Button */}
      <button
        type="submit"
        className="mt-6 py-3 px-6 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        Login
      </button>
    </form>
  );
};

export default Login;