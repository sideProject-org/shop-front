import React from "react";
import ProductCard from "./ProductCard";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  originalPrice?: number;
}

const BestSection: React.FC<{ products: Product[] }> = ({ products }) => {
  return (
    <section className="pt-10 pb-10 px-44">
      <h2 className="text-3xl font-bold mb-8">BEST</h2>

      <div className="relative">
        <Swiper
          modules={[Navigation]}
          slidesPerView={3.5}
          spaceBetween={32}
          className="best-swiper"
        >
          {products.map((product, index) => (
            <SwiperSlide key={product.id}>
              <div className="relative">
                <div className="absolute top-4 left-4 z-10 w-8 h-8 bg-white rounded-lg flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <ProductCard {...product} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default BestSection;
