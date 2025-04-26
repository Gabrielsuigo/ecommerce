"use client";

import {
  validateEmail,
  validatePassword,
  validateAddress,
  validatePhone,
  validateName,
} from "@/helpers/validation";
import { register } from "@/service/auth";
import { useRouter } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";

const RegisterForm = () => {
  const router = useRouter();

  const initialData = {
    email: "",
    password: "",
    name: "",
    address: "",
    phone: "",
  };
  const initalDirty = {
    email: false,
    password: false,
    address: false,
    name: false,
    phone: false,
  };
  const [Data, setData] = useState(initialData);
  const [errors, setErrors] = useState(initialData);
  const [dirty, setDirty] = useState(initalDirty);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await register(Data);
    if (res.statusCode) {
      alert(res.message);
    } else {
      alert("Registration successful");
      router.push("/login");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...Data, [e.target.name]: e.target.value });
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setDirty({ ...dirty, [e.target.name]: true });
  };

  useEffect(() => {
    setErrors({
      email: validateEmail(Data.email),
      password: validatePassword(Data.password),
      address: validateAddress(Data.address),
      name: validateName(Data.name),
      phone: validatePhone(Data.phone),
    });
    console.log(errors);
  }, [Data]);

  return (
    <form
      className="max-w-sm mx-auto flex flex-col gap-6 p-8 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 text-white rounded-3xl shadow-xl"
      onSubmit={(e) => handleSubmit(e)}
    >

      <div className="text-center mb-6">
  <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-lg">
    Creá una cuenta
  </h2>
  <p className="mt-2 text-gray-300 text-sm">Registrate para comenzar tu experiencia</p>
</div>

      <label htmlFor="email" className="text-lg font-medium">Email</label>
      <input
        className="bg-gray-700 text-white rounded-lg p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        type="email"
        placeholder="name@gmail.com"
        name="email"
        onChange={(e) => handleChange(e)}
        value={Data.email}
        onBlur={(e) => handleBlur(e)}
      />
      {dirty.email && <p className="text-red-600 mt-1">{errors.email}</p>}

      <label htmlFor="password" className="text-lg font-medium">Password</label>
      <input
        className="bg-gray-700 text-white rounded-lg p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        type="password"
        placeholder="********"
        name="password"
        onChange={(e) => handleChange(e)}
        value={Data.password}
        onBlur={(e) => handleBlur(e)}
      />
      {dirty.password && <p className="text-red-600 mt-1">{errors.password}</p>}

      <label htmlFor="name" className="text-lg font-medium">Name y Last name</label>
      <input
        className="bg-gray-700 text-white rounded-lg p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        type="text"
        id="name"
        name="name"
        value={Data.name}
        placeholder="John Doe"
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {dirty.name && <p className="text-red-600 mt-1">{errors.name}</p>}

      <label htmlFor="address" className="text-lg font-medium">Address</label>
      <input
        className="bg-gray-700 text-white rounded-lg p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        type="text"
        id="address"
        name="address"
        value={Data.address}
        placeholder="Street, City, Country"
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {dirty.address && <p className="text-red-600 mt-1">{errors.address}</p>}

      <label htmlFor="phone" className="text-lg font-medium">Phone</label>
      <input
        className="bg-gray-700 text-white rounded-lg p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        type="tel"
        id="phone"
        placeholder="011-1122-3344"
        name="phone"
        value={Data.phone}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {dirty.phone && <p className="text-red-600 mt-1">{errors.phone}</p>}

      <button
        type="submit"
        className="mt-6 py-3 px-6 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        Register
      </button>
    </form>
  );
};

export default RegisterForm;