"use client";
import React, { useState, useCallback } from "react";
import InputField from "../component/common/InputField";
import Button from "../component/common/Button";
import Link from "next/link";

interface FormData {
  name: string | undefined;
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
  keepLoggedIn: boolean;
  [key: string]: any;
}

const SignupPage = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    keepLoggedIn: false,
  });

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }, []);

  const handleSignUpClick = useCallback(() => {
    console.log(formData);
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
      helperText: "아이디 조건",
    },
    {
      label: "비밀번호",
      name: "password",
      type: "password",
      isRequired: true,
      helperText: "비밀번호 조건",
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
  ];

  return (
    <main className="flex overflow-hidden flex-col justify-center items-center px-2.5 py-20 w-full leading-snug text-black font-normal min-h-[721px] text-base max-md:max-w-full">
      <h1 className="tracking-tight leading-tight text-center font-bold text-2xl">
        회원가입
      </h1>
      <div className="flex flex-col justify-center items-center mt-5 max-w-full">
        {fields.map((field) => (
          <InputField
            key={field.name}
            label={field.label}
            name={field.name}
            type={field.type}
            isRequired={field.isRequired}
            value={formData[field.name as keyof FormData] || "ㅇㅇ"}
            onChange={handleChange}
            helperText={field.helperText}
          />
        ))}
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
