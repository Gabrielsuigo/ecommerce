import { Product } from "@/app/interfaces";
import { productsMock } from "@/app/mocks/products";

const ffProductsMock = process.env.FF_PRODUCTS_MOCK || false
const  apiUrl = process.env.API_URL || "http://localhost:3001"

export const getProducts = async (): Promise<Product[]> => {
let isFetchFailing = false;

  const res = await fetch(apiUrl + "/products", {
    cache: "no-store",
  })
  .then((res) => res.json())
  .catch(() => (isFetchFailing = true));

  if (isFetchFailing && ffProductsMock){
    return productsMock;
  }

  return res;
};

export const getFeaturedProducts = async (): Promise<Product[]> => {
    const res = await getProducts();
    const featured = Array.isArray(res) && res.length > 3 ? res.slice(0, 3) : [];
    return featured;
}

export const getProductsId = async (id: number): Promise<Product> => {
    const res = await getProducts();
    const productFilter = res.filter((p)=> p.id === id)[0];
    return productFilter;
}




