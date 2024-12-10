import React from "react";
import ProductCard from "./ProductCard";
import Link from "next/link";

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

const BestSection: React.FC<{ products: Product[] }> = ({ products }) => {
  return (
    <section className="pt-10 pb-10 px-44">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">BEST</h2>
        <Link href="/products/best" className="text-gray-600 hover:text-black">
          더보기
        </Link>
      </div>
      <div className="grid grid-cols-3 gap-8">
        {products.slice(0, 3).map((product, index) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </section>
  );
};

export default BestSection;
