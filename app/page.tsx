"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthProvider";
import Link from "next/link";
import Cookie from "js-cookie";
import BannerSlider from "./components/home/BannerSlider";
import BestSection from "./components/home/BestSection";
import NewProductSection from "./components/home/NewProductSection";

export default function Home() {
  const searchParams = useSearchParams();
  const { setTokens } = useAuth();

  useEffect(() => {
    const accessToken = searchParams.get("accessToken");
    const refreshToken = searchParams.get("refreshToken");
    const error = searchParams.get("error");

    if (error) {
      alert("로그인 실패: " + error);
      return;
    }

    if (accessToken && refreshToken) {
      // 리프레시 토큰을 쿠키에 직접 저장 (Spring Security 호환)
      Cookie.set("refreshToken", refreshToken, {
        expires: 7,
        secure: false,
        sameSite: "lax",
        path: "/",
      });

      setTokens(accessToken, refreshToken);

      // URL에서 토큰 파라미터 제거
      window.history.replaceState({}, document.title, "/");
      alert("로그인 성공!");
    }
  }, [searchParams, setTokens]);

  const bannerImages = [
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8",
    "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04",
    "https://images.unsplash.com/photo-1610904058046-8009154a3848",
  ];

  const bestProducts = [
    {
      id: 1,
      name: "베스트 상품 1",
      price: 29000,
      imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    },
    {
      id: 2,
      name: "베스트 상품 2",
      price: 35000,
      imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    },
    {
      id: 3,
      name: "베스트 상품 3",
      price: 42000,
      imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    },
  ];

  const newProducts = [
    {
      id: 4,
      name: "신상품 1",
      price: 39000,
      imageUrl: "https://images.unsplash.com/photo-1572635196237-14b3f281503f",
    },
    {
      id: 5,
      name: "신상품 2",
      price: 45000,
      imageUrl: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f",
    },
  ];

  return (
    <main>
      <BannerSlider images={bannerImages} />
      <BestSection products={bestProducts} />
      <NewProductSection products={newProducts} />
    </main>
  );
}
