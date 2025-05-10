
import React from "react";

interface CardListProps {
  children: React.ReactNode;
}

const CarList = ({ children }: CardListProps) => {
  return (
    <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6 p-6 bg-gray-900 rounded-3xl shadow-xl">
      {children}
    </div>
  );
};

export default CarList;
