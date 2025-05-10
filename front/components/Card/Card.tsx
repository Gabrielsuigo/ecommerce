import { Product } from "@/app/interfaces";
import Link from "next/link";

interface CardProps extends Product {}

const Card = ({ name, image, price, id }: CardProps) => {
  return (
    <Link href={`/products/${id}`}>
      <article
        className="transition-all duration-300 ease-in-out transform hover:scale-105 p-6 rounded-2xl shadow-xl bg-gray-800 text-white hover:shadow-2xl"
      >
        <h3 className="text-xl font-semibold mb-4">{name}</h3>

        <img
          src={image}
          alt={name}
          className="w-full h-56 object-cover rounded-lg mb-4"
        />

        <p className="text-lg font-medium"> u$s {price}</p>
      </article>
    </Link>
  );
};

export default Card;






