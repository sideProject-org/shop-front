import React, { useState } from "react";
import ProductCard from "./ProductCard";

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  originalPrice?: number;
}

const NewProductSection: React.FC<{ products: Product[] }> = ({ products }) => {
  const [showAll, setShowAll] = useState(false);

  const displayedProducts = showAll ? products : products.slice(0, 4);

  return (
    <section className="py-16 px-44">
      <h2 className="text-3xl font-bold mb-8">NEW</h2>

      <div className="grid grid-cols-4 gap-6 gap-y-12">
        {displayedProducts.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>

      {products.length > 4 && !showAll && (
        <div className="flex justify-center mt-12">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-16 py-5 border text-base border-gray-600 rounded-xl hover:border-black transition-colors"
          >
            상품 더보기
          </button>
        </div>
      )}
    </section>
  );
};

export default NewProductSection;
