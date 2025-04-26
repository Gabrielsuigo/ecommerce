
import ProductDetail from "@/components/productDetail/productDetail";
import { getProductsId } from "@/service/products";
import { notFound } from "next/navigation";
 
const page = async ({ params }: {params: { id: string}}) => {
    const { id } = await params;
    const product = await getProductsId(Number(id))

    if(!product){
       notFound();
    }

    return <ProductDetail product={product}/>;
};

export default page

