"use client";

import AuthProtected from "@/components/AuthProtected/AuthProtected";
import { AuthContexts } from "@/contexts/authContexts";
import { useContext } from "react";

const page = () => {
  const context = useContext(AuthContexts);
  const user = context.user?.user;
  const orders = context.orders;


  return (
    <AuthProtected>
      <div className="max-w-6xl mx-auto my-12 p-8 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 text-white rounded-3xl shadow-2xl">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600">
            Dashboard
          </h1>
        </div>
 
         <div className="bg-gray-800 text-gray-100 p-8 rounded-3xl shadow-lg transform transition duration-300 hover:scale-105">
          <h2 className="text-4xl font-semibold text-center text-indigo-400">{user?.name}</h2>

         <div className="text-center space-y-3 mt-6">
            <h3 className="text-lg font-medium text-gray-400"> 📧 {user?.email}</h3>
            <h4 className="text-lg text-gray-400"> 📞 {user?.phone}</h4>
            <h5 className="text-gray-500 text-lg"> 🏠 {user?.address}</h5>
          </div>  

        </div>

        {/* Orders Section */}
        <div className="mt-16 space-y-8">
          <h3 className="text-2xl font-semibold text-gray-200">Your Orders</h3>
          {orders.length > 0 ? (
            <div className="space-y-6">
              {orders.map((order, i) => (
                <div
                  key={i}
                  className="bg-gray-700 p-6 rounded-2xl shadow-xl hover:shadow-2xl transform transition duration-300 hover:scale-105"
                >
                  
                  <p className="text-lg font-medium text-gray-100">🧾Order N°: {order.id}</p>
                  <p className="text-gray-400">📦 Status: {order.status}</p>
            
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No orders available!</p>
          )}
        </div>
      </div>
    </AuthProtected>
  );
};

export default page;


