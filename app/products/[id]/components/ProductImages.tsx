import { useState } from "react";
import Image from "next/image";

interface ProductImagesProps {
  images: string[];
}

export default function ProductImages({ images }: ProductImagesProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="space-y-4">
      <div className="relative aspect-square">
        <Image
          src={images[selectedImage]}
          alt="상품 이미지"
          fill
          className="object-cover rounded-lg"
        />
      </div>

      <div className="grid grid-cols-5 gap-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`relative aspect-square ${
              selectedImage === index ? "ring-2 ring-black rounded-md" : ""
            }`}
          >
            <Image
              src={image}
              alt={`상품 이미지 ${index + 1}`}
              fill
              className="object-cover rounded-md"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
