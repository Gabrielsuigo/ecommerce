"use client";

import { AuthContexts } from "@/contexts/authContexts";
import { CartContexts } from "@/contexts/cartContext";
import { postOrders } from "@/service/orders";
import { useContext } from "react";

const CartDetail = () => {
  const { user, orders, setOrders } = useContext(AuthContexts);
  const { cart, emptyCart } = useContext(CartContexts);


  const handleBuy = async () => {
    await postOrders(user?.user.id || 0, user?.token || "", cart).then((res) => {
      if (res.status === "approved") {
        setOrders([...orders, { id: parseInt(res.id) }]);
        alert(`Order ID: ${res.id}`);
        emptyCart();
      } else {
        alert(res);
      }
    });
  };
  
  return (
    

    <div className="max-w-4xl mx-auto my-12 p-8 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 text-white rounded-3xl shadow-2xl">
      {/* Cart Header */}
      <div className="text-center mb-8">
        <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600">
        🛒 Your Cart
        </h2>
      </div>

      {/* Cart Items */}
      {cart?.length === 0 ? (
        <h3 className="text-lg font-medium text-gray-400 text-center">Your cart is empty</h3>
      ) : (
        <div className="space-y-6">
          {cart?.map((item, i) => (
            <div
            key={i}
            className="bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transform transition duration-300 hover:scale-105"
            >
              <div className="flex justify-between items-center">
                <span className="font-semibold text-lg text-gray-100">{item.name}</span>
                <span className="text-sm text-gray-400">{`U$s${item.price}`}</span>

              </div>
            </div>
          ))}
        </div>
      )}



      <div className="mt-8 text-center">

        <button
          onClick={handleBuy}
          disabled ={!cart || cart.length === 0}
          className= "bg-indigo-600 text-white font-semibold py-2 px-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105"
          >
              {cart.length > 0 && (
                <div className="text-right mt-4 text-lg font-semibold text-indigo-300">
                  Total: u$s{cart.reduce((acc, item) => acc + item.price, 0)}
                </div>
              )}
          Comprar
        </button>
      </div>
    </div>
          
  );
};

export default CartDetail;
