import Card from "@/components/Card/Card";
import CarList from "@/components/CarList/CarList";
import Hero from "@/components/Hero/Hero";
import { getFeaturedProducts } from "@/service/products";

const page = async () => {
  const products = await getFeaturedProducts() 
  return (
    <>
    <Hero/>
      <CarList>
        {products.map((product) => (
       <Card key={product.id} {...product} />
      ))}
      </CarList>
    </>
  );
};
export default page;
          



