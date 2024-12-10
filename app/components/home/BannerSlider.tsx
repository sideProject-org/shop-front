"use client";
import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

interface BannerSliderProps {
  images: string[];
}

const BannerSlider: React.FC<BannerSliderProps> = ({ images }) => {
  return (
    <section className="relative w-full px-44 py-8">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        pagination={{
          clickable: true,
          bulletClass:
            "swiper-pagination-bullet !bg-gray-300 !w-3 !h-3 !opacity-100",
          bulletActiveClass: "swiper-pagination-bullet-active !bg-black",
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="w-full h-[520px] rounded-xl group"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              <Image
                src={image}
                alt={`배너 이미지 ${index + 1}`}
                fill
                className="object-cover rounded-lg"
                priority={index === 0}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default BannerSlider;
