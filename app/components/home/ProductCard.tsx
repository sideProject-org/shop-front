import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import HeartIcon from "@/assets/icons/heart.svg";
import HeartFilledIcon from "@/assets/icons/heart-filled.svg";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  originalPrice?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  imageUrl,
  originalPrice,
}) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLikeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLiked(!isLiked);
    alert("좋아요!");
  };

  const discountRate = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  return (
    <Link href={`/products/${id}`}>
      <div className="relative flex flex-col">
        <div className="relative w-full aspect-square">
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover rounded-lg"
          />
          <button
            onClick={handleLikeClick}
            className="absolute bottom-3 right-3 p-2 rounded-md bg-white/80 hover:bg-white transition-colors"
          >
            {isLiked ? (
              <HeartFilledIcon className="w-6 h-6" />
            ) : (
              <HeartIcon className="w-6 h-6" />
            )}
          </button>
        </div>
        <div className="mt-2">
          <h3 className="text-lg font-bold">{name}</h3>
          <div className="flex items-center gap-2">
            {discountRate > 0 && (
              <span className="text-mint-500 font-bold">{discountRate}%</span>
            )}
            <p className="font-bold">{price.toLocaleString()}원</p>
            {originalPrice && (
              <p className="text-gray-400 line-through">
                {originalPrice.toLocaleString()}원
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
