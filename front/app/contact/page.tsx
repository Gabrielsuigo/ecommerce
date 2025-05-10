import React from "react";


const contactPage = () => {

  return (

    <div className="max-w-6xl mx-auto my-12 p-8 bg-gray-800 text-white rounded-3xl shadow-xl">
      <h1 className="text-4xl font-bold text-center text-indigo-500">Contact Us</h1>
      <p className="text-center text-lg mt-4 text-gray-400">
        We would love to hear from you! Please reach out to us for any questions or support.
      </p>
      <div className="mt-8 text-center">
        <p className="text-lg font-semibold">📧 Email: support@store.com</p>
        <p className="text-lg font-semibold mt-2">📞 Phone: (11) 2503-3874</p>
      </div>
    </div>
  );
};

export default contactPage;