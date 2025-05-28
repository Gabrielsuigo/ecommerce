import Card from "@/components/Card/Card";
import CarList from "@/components/CarList/CarList";
import { getProducts } from "@/service/products";

const page = async () => {
  const products = await getProducts();

  return (
    
    <CarList>
      {Array.isArray(products)
? products.map((product) => (
  <Card key={product.id} {...product} />
))
: null}
        </CarList>
);
};
export default page;
