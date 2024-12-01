"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthProvider";
import Link from "next/link";
import Cookie from "js-cookie";

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

  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-20 px-4">
      쇼핑몰 홈
      <br />
      <Link href={"/login"}>로그인으로 이동</Link>
    </main>
  );
}
