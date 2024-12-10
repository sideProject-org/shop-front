import React from "react";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  imageUrl,
}) => {
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
        </div>
        <h3 className="mt-2 text-lg font-semibold">{name}</h3>
        <p className="text-gray-800">{price.toLocaleString()}원</p>
      </div>
    </Link>
  );
};

export default ProductCard;
