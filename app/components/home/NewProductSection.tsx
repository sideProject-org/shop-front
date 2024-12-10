import React from "react";
import ProductCard from "./ProductCard";
import Link from "next/link";

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

const NewProductSection: React.FC<{ products: Product[] }> = ({ products }) => {
  return (
    <section className="py-16 px-44">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">NEW</h2>
        <Link href="/products/new" className="text-gray-600 hover:text-black">
          더보기
        </Link>
      </div>
      <div className="grid grid-cols-4 gap-6 gap-y-12">
        {products.slice(0, 8).map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </section>
  );
};

export default NewProductSection;
