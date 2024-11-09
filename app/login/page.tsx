"use client";
import React, { useState, useCallback } from "react";
import InputField from "../component/common/InputField";
import Button from "../component/common/Button";
import SocialLoginButton from "../component/common/SocialLoginButton";
import Link from "next/link";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);

  const handleUsernameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setUsername(e.target.value);
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

  const handleLoginClick = useCallback(() => {
    // TODO:: 로그인 연결
    console.log({ username, password, keepLoggedIn });
  }, [username, password, keepLoggedIn]);

  return (
    <main className="flex overflow-hidden flex-col justify-center items-center px-2.5 py-20 w-full leading-snug text-black font-normal text-base max-md:max-w-full">
      <h1 className="tracking-tight leading-tight text-center font-bold text-2xl">
        로그인
      </h1>
      <div className="flex flex-col justify-center items-center mt-5 max-w-full">
        <InputField
          label="아이디"
          value={username}
          onChange={handleUsernameChange}
          name={""}
        />
        <InputField
          label="비밀번호"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          name={""}
        />
        <div className="flex overflow-hidden gap-10 justify-between items-center mt-8 w-full max-w-[400px] text-sm">
          <label className="self-stretch">
            <input
              type="checkbox"
              checked={keepLoggedIn}
              onChange={handleKeepLoggedInChange}
              className="mr-2"
            />
            로그인 유지하기
          </label>
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
          <Button onClick={handleLoginClick} variant="primary">
            로그인
          </Button>
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
