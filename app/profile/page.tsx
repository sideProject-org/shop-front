"use client";

import { useApiClient } from "@/context/useApiClient";
import { useAuth } from "@/context/AuthProvider";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const { requestWithToken } = useApiClient();
  const { logout } = useAuth();
  const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const email = localStorage.getItem("email");
    setCurrentUserEmail(email);
  }, []);

  const handleLogout = async () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    try {
      const response = await requestWithToken(`${apiUrl}/members/logout`, {
        method: "POST",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "로그아웃 요청이 실패했습니다.");
      }

      logout();
      localStorage.removeItem("email");
      router.push("/login");
      alert("로그아웃 되었습니다.");
    } catch (error) {
      if (
        error instanceof Error &&
        error.message === "인증이 만료되었습니다. 다시 로그인해주세요."
      ) {
        router.push("/login");
        return;
      }
      console.error("로그아웃 실패:", error);
      alert("로그아웃 중 문제가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <main className="flex overflow-hidden flex-col px-44 py-20 w-full leading-snug text-black font-normal text-base max-md:max-w-full">
      <h1 className="tracking-tight leading-tight font-bold text-2xl">
        프로필
      </h1>
      <div onClick={handleLogout}>로그아웃</div>
      {currentUserEmail === "administrator" && (
        <Link href={"/notice/edit"}>공지사항 등록</Link>
      )}
    </main>
  );
};

export default ProfilePage;
