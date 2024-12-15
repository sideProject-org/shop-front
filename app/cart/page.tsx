"use client";
import React, { useState } from "react";
import Image from "next/image";

interface CartItem {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  discountRate: number;
  quantity: number;
  imageUrl: string;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "[그린스마스에디션] 화종십 멀티즈 기형 2type 월세코리 인형",
      price: 6900,
      originalPrice: 7800,
      discountRate: 12,
      quantity: 1,
      imageUrl: "https://images.unsplash.com/photo-1507764923504-cd90bf7da772",
    },
  ]);

  const handleQuantityChange = (id: number, change: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const shippingFee = 3000;

  return (
    <main className="px-44 py-8 font-bold">
      <h1 className="text-4xl mb-8">장바구니</h1>

      <div className="flex gap-8">
        <div className="flex-1">
          <table className="w-full">
            <thead>
              <tr className="border-t-2 border-b border-t-black border-b-gray-200 text-xl">
                <th className="py-4 text-left">
                  <input type="checkbox" className="mr-2" />
                </th>
                <th className="text-left">상품 정보</th>
                <th className="text-center">수량</th>
                <th className="text-right pr-4">주문금액</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id} className="border-b border-gray-200">
                  <td className="py-4">
                    <input type="checkbox" />
                  </td>
                  <td className="flex gap-4 h-40 items-center">
                    <div className="w-24 h-24 relative">
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="text-xl font-bold">
                      <h3 className="">{item.name}</h3>
                      <span className="text-gray-400">
                        {item.originalPrice.toLocaleString()}원
                      </span>
                      <div className="">
                        <span className="text-cyan-500 ">
                          {item.discountRate}%
                        </span>
                        <span className="ml-2">
                          {item.price.toLocaleString()}원
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleQuantityChange(item.id, -1)}
                        className="w-12 h-12 border rounded-full text-xl"
                      >
                        -
                      </button>
                      <span className="text-xl">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item.id, 1)}
                        className="w-12 h-12 border rounded-full text-xl"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="text-right pr-4 text-xl">
                    {(item.price * item.quantity).toLocaleString()}원
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="w-72  bg-white">
          <h2 className="text-3xl mb-6 border-b-2 border-black pb-4">
            구매 금액
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between text-xl">
              <span>주문 금액</span>
              <span>{calculateTotalPrice().toLocaleString()}원</span>
            </div>
            <div className="flex justify-between text-xl">
              <span>할인 금액</span>
              <span>{calculateTotalPrice().toLocaleString()}원</span>
            </div>
            <div className="flex justify-between text-xl">
              <span>배송비</span>
              <span>{shippingFee.toLocaleString()}원</span>
            </div>
            <div className="flex justify-end text-2xl">
              <span>
                {(calculateTotalPrice() + shippingFee).toLocaleString()}원
              </span>
            </div>
          </div>
          <button className="w-full mt-6 py-4 bg-black text-white text-xl">
            구매하기
          </button>
        </div>
      </div>
    </main>
  );
}
