import { useState } from "react";
import Image from "next/image";
import StarIcon from "@/assets/icons/star.svg";
import StarFillIcon from "@/assets/icons/star_fill.svg";
import LikeIcon from "@/assets/icons/like.svg";
import DislikeIcon from "@/assets/icons/dislike.svg";

interface Review {
  id: number;
  author: string;
  rating: number;
  content: string;
  date: string;
  imageUrl?: string;
  likes?: number;
  dislikes?: number;
}

interface ProductReviewsProps {
  productId: number;
}

type RatingPercentages = {
  [key in 1 | 2 | 3 | 4 | 5]: number;
};

export default function ProductReviews({ productId }: ProductReviewsProps) {
  const reviews: Review[] = [
    {
      id: 1,
      author: "김민지",
      rating: 5,
      content: "구구 추천합니당",
      date: "2023-12-01",
    },
    {
      id: 2,
      author: "김민지",
      rating: 5,
      content: "구구 추천합니당",
      date: "2023-12-01",
    },
  ];

  const averageRating =
    reviews.length > 0
      ? Number(
          (
            reviews.reduce((sum, review) => sum + review.rating, 0) /
            reviews.length
          ).toFixed(1)
        )
      : 0;

  const ratingCounts = reviews.reduce((acc, review) => {
    acc[review.rating as 1 | 2 | 3 | 4 | 5] =
      (acc[review.rating as 1 | 2 | 3 | 4 | 5] || 0) + 1;
    return acc;
  }, {} as RatingPercentages);

  const ratingPercentages: RatingPercentages = {
    5: ((ratingCounts[5] || 0) / reviews.length) * 100,
    4: ((ratingCounts[4] || 0) / reviews.length) * 100,
    3: ((ratingCounts[3] || 0) / reviews.length) * 100,
    2: ((ratingCounts[2] || 0) / reviews.length) * 100,
    1: ((ratingCounts[1] || 0) / reviews.length) * 100,
  };

  const RatingStars = ({ rating }: { rating: number }) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((index) => (
          <div key={index} className="relative">
            <StarIcon className="text-gray-200" />
            <div className="absolute inset-0 overflow-hidden">
              <StarFillIcon className="text-black" />
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="py-8">
      <div className="mb-12">
        <div className="text-3xl font-bold">리뷰</div>
        <div className="flex items-start gap-12 my-8">
          <div className="">
            <span className="text-5xl font-bold mb-4">{averageRating}</span>
            <div className="mb-2">
              <RatingStars rating={averageRating} />
            </div>
            <span>{reviews.length}개의 리뷰</span>
          </div>

          <div className="space-y-2 w-[40rem]">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center gap-2">
                <span className="w-8 text-lg">{rating}</span>
                <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-black rounded-full"
                    style={{
                      width: `${
                        ratingPercentages[rating as 1 | 2 | 3 | 4 | 5]
                      }%`,
                    }}
                  />
                </div>
                <span className="w-16 text-right text-gray-500">
                  {Math.round(ratingPercentages[rating as 1 | 2 | 3 | 4 | 5])}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {reviews.map((review) => (
          <div key={review.id} className="border-b pb-8">
            <span className="font-bold text-xl block">{review.author}</span>
            <span className="text-gray-500 text-sm">{review.date}</span>

            <div className="my-2">
              <RatingStars rating={review.rating} />
            </div>

            {review.imageUrl && (
              <div className="relative w-24 h-24 mb-4">
                <Image
                  src={review.imageUrl}
                  alt="리뷰 이미지"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            )}

            <p className="text-lg mb-4">{review.content}</p>

            <div className="flex gap-4 text-sm text-gray-500">
              <button className="flex items-center gap-1">
                <LikeIcon className="h-5 w-5" />
                <span>{review.likes || 0}</span>
              </button>
              <button className="flex items-center gap-1">
                <DislikeIcon className="h-5 w-5" />
                <span>{review.dislikes || 0}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
