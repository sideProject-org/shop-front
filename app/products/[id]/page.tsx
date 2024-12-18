"use client";

import { useState } from "react";
import ProductImages from "./components/ProductImages";
import ProductInfo from "./components/ProductInfo";
import ProductReviews from "./components/ProductReviews";
import TabMenu from "./components/TabMenu";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  images: string[];
  sizes: string[];
  colors: string[];
  shippingFee: number;
}

export default function ProductDetail() {
  // TODO :: id로 데이터 get
  const [selectedTab, setSelectedTab] = useState<
    "상품 정보" | "사이즈" | "리뷰"
  >("상품 정보");

  // 임시 데이터
  const product: Product = {
    id: 1,
    name: "다이아 모노그램 톤 자카드 후드",
    price: 10000,
    description: "상품 상세 설명...",
    images: [
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8",
      "https://images.unsplash.com/photo-1610904058046-8009154a3848",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["white", "navy"],
    shippingFee: 30000,
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ProductImages images={product.images} />
        <ProductInfo product={product} />
      </div>

      <div className="mt-16">
        <TabMenu selectedTab={selectedTab} onTabChange={setSelectedTab} />

        {selectedTab === "상품 정보" ? (
          <div className="py-8">{product.description}</div>
        ) : selectedTab === "사이즈" ? (
          <div className="py-8">사이즈(추후 이미지 넣을 예정)</div>
        ) : (
          <ProductReviews productId={product.id} />
        )}
      </div>
    </main>
  );
}
