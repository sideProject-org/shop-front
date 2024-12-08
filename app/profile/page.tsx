"use client";

import { useApiClient } from "@/context/useApiClient";
import { useAuth } from "@/context/AuthProvider";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const { requestWithToken } = useApiClient();
  const { logout, isAuthenticated } = useAuth();
  const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    const email = localStorage.getItem("email");
    setCurrentUserEmail(email);
  }, [isAuthenticated, router]);

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

  const handlePasswordReset = () => {
    // 비밀번호 재설정 로직 구현 필요
    alert("비밀번호 재설정 기능은 현재 개발 중입니다.");
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <section className="flex w-full">
      <div className="w-[300px] min-h-screen bg-white border-r border-gray-200 px-8 pt-32">
        <div className="flex flex-col gap-[20px]">
          <span className="text-[32px] font-bold text-[#141414]">
            마이페이지
          </span>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <span className="text-[24px] font-semibold text-[#141414]">
                계정 설정
              </span>
              <div className="flex flex-col gap-4">
                <button
                  onClick={handlePasswordReset}
                  className="text-[20px] text-[#141414] hover:text-gray-600 text-left"
                >
                  비밀번호 재설정
                </button>
                <button
                  onClick={handleLogout}
                  className="text-[20px] text-[#141414] hover:text-gray-600 text-left"
                >
                  로그아웃
                </button>
              </div>
            </div>

            {currentUserEmail === "administrator" && (
              <div className="flex flex-col gap-4">
                <span className="text-[24px] font-semibold text-[#141414]">
                  공지사항 관리
                </span>
                <div className="flex flex-col gap-4">
                  <Link
                    href="/notice/edit"
                    className="text-[20px] text-[#141414] hover:text-gray-600"
                  >
                    공지사항 등록
                  </Link>
                  <Link
                    href="/notice"
                    className="text-[20px] text-[#141414] hover:text-gray-600"
                  >
                    공지사항 리스트
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex-1 pt-32">
        {/* Add content for the main section here */}
      </div>
    </section>
  );
};

export default ProfilePage;
