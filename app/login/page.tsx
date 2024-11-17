"use client";
import React, { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import InputField from "../component/common/InputField";
import Button from "../component/common/Button";
import SocialLoginButton from "../component/common/SocialLoginButton";
import Link from "next/link";
import Cookie from "js-cookie";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      console.log("이미 로그인된 사용자입니다.");
      router.push("/");
    }
  }, [router]);

  const handleEmailChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
    },
    []
  );

  const handlePasswordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
    },
    []
  );

  const handleKeepLoggedInChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setKeepLoggedIn(e.target.checked);
    },
    []
  );

  const handleLoginClick = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/auth/sign-in`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "로그인 실패");
      }

      const data = await response.json();
      console.log("data:", data.data.accessToken);

      localStorage.setItem("accessToken", data.data.accessToken);

      Cookie.set("refreshToken", data.data.refreshToken, {
        expires: 7,
        secure: true,
        sameSite: "Strict",
      });

      alert("로그인 성공!");
      router.push("/");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [email, password, router]);

  const fetchWithAccessToken = useCallback(
    async (url: string, options: RequestInit = {}) => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setError("Access token이 없습니다. 다시 로그인해주세요.");
        return null;
      }

      try {
        const response = await fetch(url, {
          ...options,
          headers: {
            ...options.headers,
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("API 요청 실패");
        }

        return await response.json();
      } catch (err: any) {
        setError(err.message);
        return null;
      }
    },
    []
  );

  return (
    <main className="flex overflow-hidden flex-col justify-center items-center px-2.5 py-20 w-full leading-snug text-black font-normal text-base max-md:max-w-full">
      <h1 className="tracking-tight leading-tight text-center font-bold text-2xl">
        로그인
      </h1>
      <div className="flex flex-col justify-center items-center mt-5 max-w-full">
        <InputField
          label="이메일"
          value={email}
          onChange={handleEmailChange}
          name="email"
        />
        <InputField
          label="비밀번호"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          name="password"
        />

        <div className="flex overflow-hidden gap-10 justify-between items-center mt-8 w-full max-w-[400px] text-sm">
          {/* <label className="self-stretch">
            <input
              type="checkbox"
              checked={keepLoggedIn}
              onChange={handleKeepLoggedInChange}
              className="mr-2"
            />
            로그인 유지하기
          </label> */}
          <div className="flex gap-2.5 items-center self-stretch my-auto">
            <a href="#" className="self-stretch my-auto">
              아이디 찾기
            </a>
            <div className="shrink-0 self-stretch my-auto w-0 border border-solid bg-slate-950 border-slate-950 h-[15px]" />
            <a href="#" className="self-stretch my-auto">
              비밀번호 찾기
            </a>
          </div>
        </div>

        <div className="flex flex-col mt-5 max-w-full font-bold text-slate-950 w-[400px]">
          <Button
            onClick={handleLoginClick}
            variant="primary"
            disabled={loading}
          >
            {loading ? "로그인 중..." : "로그인"}
          </Button>
          {error && <p className="mt-2 text-red-500 font-normal">{error}</p>}
          <SocialLoginButton provider="google" />
          <SocialLoginButton provider="kakao" />
        </div>
        <p className="mt-5 max-w-full text-sm w-[400px]">계정이 없으신가요?</p>
        <Link href={"/signup"}>
          <Button variant="secondary" className="mt-5 w-[400px]">
            회원가입
          </Button>
        </Link>
      </div>
    </main>
  );
};

export default LoginPage;
