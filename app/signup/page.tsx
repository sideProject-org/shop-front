"use client";
import React, { useState, useCallback } from "react";
import InputField from "../component/common/InputField";
import Button from "../component/common/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface FormData {
  name: string;
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
  nickname: string;
  gender: "M" | "W";
  role: "ROLE_USER" | "ROLE_COMPANY";
  phone: string;
}

const SignupPage = () => {
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    nickname: "",
    gender: "M",
    role: "ROLE_USER",
    phone: "",
  });

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }, []);

  const handleSignUpClick = useCallback(async () => {
    if (formData.password !== formData.confirmPassword) {
      alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      return;
    }

    const requestBody = {
      email: formData.email,
      password: formData.password,
      nickname: formData.nickname,
      gender: formData.gender,
      role: formData.role,
      phone: formData.phone,
    };

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/auth/sign-up`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(`회원가입 실패: ${errorData.message}`);
      } else {
        const data = await response.json();
        alert("회원가입 성공!");
        router.push("/login");
      }
    } catch (error) {
      alert("회원가입 중 오류가 발생했습니다.");
      console.error(error);
    }
  }, [formData]);

  const fields = [
    {
      label: "이름",
      name: "name",
      type: "text",
      isRequired: true,
    },
    {
      label: "아이디",
      name: "username",
      type: "text",
      isRequired: true,
      // helperText: "아이디 조건",
    },
    {
      label: "비밀번호",
      name: "password",
      type: "password",
      isRequired: true,
      helperText: "",
    },
    {
      label: "비밀번호 확인",
      name: "confirmPassword",
      type: "password",
      isRequired: true,
    },
    {
      label: "본인 확인 이메일",
      name: "email",
      type: "email",
      isRequired: true,
    },
    {
      label: "닉네임",
      name: "nickname",
      type: "text",
      isRequired: true,
    },
    {
      label: "성별",
      name: "gender",
      type: "radio",
      isRequired: true,
      options: ["M", "W"],
    },
    {
      label: "전화번호",
      name: "phone",
      type: "text",
      isRequired: true,
    },
  ];

  return (
    <main className="flex overflow-hidden flex-col justify-center items-center px-2.5 py-20 w-full leading-snug text-black font-normal min-h-[721px] text-base max-md:max-w-full">
      <h1 className="tracking-tight leading-tight text-center font-bold text-2xl">
        회원가입
      </h1>
      <div className="flex flex-col justify-center items-center mt-5 max-w-full">
        {fields.map((field) =>
          field.type === "radio" ? (
            <div key={field.name} className="flex flex-col mb-6 w-full">
              <label className="mb-2 text-black">{field.label}</label>
              <div className="flex gap-5 ">
                {field.options?.map((option) => (
                  <label key={option} className="flex items-center">
                    <input
                      type="radio"
                      name={field.name}
                      value={option}
                      checked={formData.gender === option}
                      onChange={handleChange}
                      className="mr-2 appearance-none border-2 border-black rounded-full w-4 h-4 checked:bg-black checked:border-black"
                    />
                    <span className="text-sm capitalize text-black">
                      {option === "M" ? "남자" : "여자"}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          ) : (
            <InputField
              key={field.name}
              label={field.label}
              name={field.name}
              type={field.type}
              isRequired={field.isRequired}
              value={formData[field.name as keyof FormData] || ""}
              onChange={handleChange}
              helperText={field.helperText}
            />
          )
        )}
        <div className="flex flex-col mt-5 max-w-full font-bold text-slate-950 w-[400px]">
          <Button onClick={handleSignUpClick} variant="primary">
            회원가입
          </Button>
        </div>
      </div>
    </main>
  );
};

export default SignupPage;
