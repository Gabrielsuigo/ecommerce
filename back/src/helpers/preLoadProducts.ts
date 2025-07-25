import { AppDataSource } from "../config/dataSource";
import { Product } from "../entities/Product";
import { ProductRepository } from "../repositories/product.repository";

interface IProduct {
  name: string;
  price: number;
  description: string;
  image: string;
  categoryId: number;
  stock: number;
}

const productsToPreLoad: IProduct[] = [
  {
    name: "iPhone 16",
    price: 699,
    description:
      "Experience power and elegance with the iPhone 16: capture stunning moments with its dual-camera system, enjoy exceptional performance, and immerse yourself in a brilliant Liquid Retina display. Discover a world of possibilities in the palm of your hand!",
    image:
      "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-16-model-unselect-gallery-2-202409_GEO_US?wid=5120&hei=2880&fmt=webp&qlt=70&.v=ZnlzVUZzRWd3dlg0RllqbHhQSUpKTGdzSmpObkZCM3MrNmJ5SkhESlNDZ1FydVY5cEpsVTdwMmk5U2U2UXBQVThLcXQxZ1h0QThIT2dnUm5qbGk5OUJkSERIUjY1Wk1Od3FtNjF6NFZLVXZtZEowT3Fwbmhld1JjblRvOVpZeVcwTko2SW91TzhmREJLUUxPTmhpZ1NB&traceId=1",
    categoryId: 1,
    stock: 10,
  },
  {
    name: "MacBook Air",
    price: 999,
    description:
      "Embrace efficiency and sophistication with the MacBook Air: lightweight design meets powerful performance, stunning Retina display brings your work to life, and all-day battery life keeps you productive wherever you go. Elevate your computing experience with the MacBook Air.",
    image:
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mba15-midnight-select-202306?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1684518479433",
    categoryId: 2,
    stock: 10,
  },
  {
    name: "iPad Pro",
    price: 799,
    description:
      "Unleash your creativity and productivity with the iPad Pro: powerful performance, stunning Liquid Retina display, and all-day battery life make the iPad Pro the perfect tool for work and play. Transform your ideas into reality with the iPad Pro.",
    image:
      "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/ipad-pro-model-select-gallery-2-202405?wid=5120&hei=2880&fmt=webp&qlt=70&.v=cXN0QTVTNDBtbGIzcy91THBPRThnMkpvMjZnN3E5aGRZVXJIWmhFMitJSU9WV3R2ZHdZMXRzTjZIcWdMTlg4eUJQYkhSV3V1dC9oa0s5K3lqMGtUaFMvR01EVDlzK0hIS1J2bTdpY0pVeTBWNTFabEhVdlFNSjJrWGh4dTRLbEk&traceId=1",
    categoryId: 3,
    stock: 10,
  },
  {
    name: "Apple Watch Series 10",
    price: 399,
    description:
      "Stay connected and healthy with the Apple Watch Series 6: track your workouts, monitor your health, and stay in touch with the people and information you care about most. Experience the future of health and wellness with the Apple Watch Series 10.",
    image:
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/s10-case-unselect-gallery-1-202409?wid=5120&hei=3280&fmt=p-jpg&qlt=80&.v=1724620940808",
    categoryId: 4,
    stock: 10,
  },
  {
    name: "AirPods 4",
    price: 249,
    description:
      "Immerse yourself in sound with the AirPods Pro: active noise cancellation, transparency mode, and customizable fit make the AirPods Pro the perfect companion for music, calls, and everything in between. Elevate your audio experience with the AirPods 4.",
    image:
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airpods-4-anc-select-202409_FV1?wid=976&hei=916&fmt=jpeg&qlt=90&.v=1725502554118",
    categoryId: 5,
    stock: 10,
  },
  {
    name: "HomePo",
    price: 299,
    description:
      "Elevate your home audio experience with the HomePod: immersive sound, intelligent assistant, and smart home hub make the HomePod mini the perfect addition to your home. Enjoy a world of music, news, and more with the HomePod.",
    image:
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/homepod-202210-gallery-4?wid=4062&hei=2400&fmt=jpeg&qlt=90&.v=1669944429825",
    categoryId: 6,
    stock: 10,
  },
   {
    name: "HomePo",
    price: 299,
    description:
      "Elevate your home audio experience with the HomePod: immersive sound, intelligent assistant, and smart home hub make the HomePod mini the perfect addition to your home. Enjoy a world of music, news, and more with the HomePod.",
    image:
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/homepod-202210-gallery-4?wid=4062&hei=2400&fmt=jpeg&qlt=90&.v=1669944429825",
    categoryId: 7,
    stock: 10,
  },
     {
    name: "HomePo",
    price: 299,
    description:
      "Elevate your home audio experience with the HomePod: immersive sound, intelligent assistant, and smart home hub make the HomePod mini the perfect addition to your home. Enjoy a world of music, news, and more with the HomePod.",
    image:
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/homepod-202210-gallery-4?wid=4062&hei=2400&fmt=jpeg&qlt=90&.v=1669944429825",
    categoryId: 8,
    stock: 10,
  },
];

export const preLoadProducts = async () => {
  const products = await ProductRepository.find();
  if (!products.length)
    await AppDataSource.createQueryBuilder()
      .insert()
      .into(Product)
      .values(productsToPreLoad)
      .execute();
  console.log("Products preloaded");
};
