import { useState, useEffect } from "react";
import HeartIcon from "@/assets/icons/heart.svg";

interface SelectedOption {
  color: string;
  size: string;
  quantity: number;
}

interface ProductInfoProps {
  product: {
    name: string;
    price: number;
    sizes: string[];
    colors: string[];
    shippingFee: number;
  };
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const [selectedOptions, setSelectedOptions] = useState<SelectedOption[]>([]);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  useEffect(() => {
    if (selectedColor && selectedSize) {
      const existingOption = selectedOptions.find(
        (option) =>
          option.color === selectedColor && option.size === selectedSize
      );

      if (!existingOption) {
        setSelectedOptions([
          ...selectedOptions,
          { color: selectedColor, size: selectedSize, quantity: 1 },
        ]);
      }

      // 옵션 추가 후 선택값 초기화
      setSelectedColor("");
      setSelectedSize("");
    }
  }, [selectedColor, selectedSize]);

  const handleQuantityChange = (index: number, change: number) => {
    const newOptions = [...selectedOptions];
    const newQuantity = Math.max(1, newOptions[index].quantity + change);
    newOptions[index].quantity = newQuantity;
    setSelectedOptions(newOptions);
  };

  const handleRemoveOption = (index: number) => {
    setSelectedOptions(selectedOptions.filter((_, i) => i !== index));
  };

  const totalQuantity = selectedOptions.reduce(
    (sum, option) => sum + option.quantity,
    0
  );
  const totalPrice = selectedOptions.reduce(
    (sum, option) => sum + option.quantity * product.price,
    0
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <h1 className="text-4xl font-bold">{product.name}</h1>
        <button className="p-2">
          <HeartIcon className="w-6 h-6" />
        </button>
      </div>

      <div className="text-3xl font-bold">
        {product.price.toLocaleString()}원
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="color" className="block text-lg mb-2">
            색상
          </label>
          <select
            id="color"
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
            className="w-full px-4 py-3 text-xl border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="">색상을 선택하세요</option>
            {product.colors.map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="size" className="block text-lg mb-2">
            사이즈
          </label>
          <select
            id="size"
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
            className="w-full px-4 py-3 text-xl border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="">사이즈를 선택하세요</option>
            {product.sizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        {selectedOptions.map((option, index) => (
          <div key={index} className="p-4 bg-gray-100 rounded-lg space-y-2">
            <div className="flex justify-between items-center">
              <div>
                {option.color} / {option.size}
              </div>
              <button
                onClick={() => handleRemoveOption(index)}
                className="text-gray-500"
              >
                ✕
              </button>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex border rounded-lg bg-white">
                <button
                  onClick={() => handleQuantityChange(index, -1)}
                  className="px-4 py-2 text-xl"
                >
                  -
                </button>
                <span className="px-4 py-2 text-xl">{option.quantity}</span>
                <button
                  onClick={() => handleQuantityChange(index, 1)}
                  className="px-4 py-2 text-xl"
                >
                  +
                </button>
              </div>
              <div className="ml-auto font-medium">
                {(product.price * option.quantity).toLocaleString()}원
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-4 border-t">
        <div className="flex justify-between text-lg mb-2">
          <span>배송비</span>
          <span>{product.shippingFee.toLocaleString()}원 이상 무료배송</span>
        </div>
        <div className="flex justify-between font-bold text-2xl">
          <span>총 결제금액</span>
          <span>{totalPrice.toLocaleString()}원</span>
        </div>
      </div>

      <div className="flex gap-4">
        <button className="flex-1 py-4 bg-black text-white text-xl">
          바로 구매
        </button>
        <button className="flex-1 py-4 border border-black text-xl">
          장바구니 담기
        </button>
      </div>
    </div>
  );
}
