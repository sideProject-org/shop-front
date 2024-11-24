import React from "react";
import GoogleIcon from "@/assets/icons/google.svg";
import KakaoIcon from "@/assets/icons/kakao.svg";
import Link from "next/link";

interface SocialLoginButtonProps {
  provider: "google" | "kakao";
}

const SocialLoginButton: React.FC<SocialLoginButtonProps> = ({ provider }) => {
  const providerConfig = {
    google: {
      text: "구글로 시작하기",
      bgColor: "bg-white",
      textColor: "text-slate-950",
      borderColor: "border-zinc-400",
      Icon: GoogleIcon,
      authUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/oauth2/authorization/google`,
    },
    kakao: {
      text: "카카오로 시작하기",
      bgColor: "bg-yellow-400",
      textColor: "text-slate-950",
      borderColor: "border-yellow-400",
      Icon: KakaoIcon,
      authUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/oauth2/authorization/kakao`,
    },
  };

  const config = providerConfig[provider];

  return (
    <Link
      href={config.authUrl}
      className={`flex items-center gap-2.5 justify-center py-4 mt-2.5 w-full ${config.bgColor} ${config.textColor} border border-solid ${config.borderColor} min-h-[52px]`}
    >
      <config.Icon className="object-contain w-5 h-5" />
      <span className="self-stretch my-auto">{config.text}</span>
    </Link>
  );
};

export default SocialLoginButton;
