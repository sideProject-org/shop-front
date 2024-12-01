import React from "react";
import Image from "next/image";
import GoogleIcon from "@/assets/icons/google.svg";
import KakaoIcon from "@/assets/icons/kakao.svg";
import NaverIcon from "@/assets/icons/naver.png";
import Link from "next/link";

interface SocialLoginButtonProps {
  provider: "google" | "kakao" | "naver";
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
      isImage: false,
    },
    kakao: {
      text: "카카오로 시작하기",
      bgColor: "bg-yellow-400",
      textColor: "text-slate-950",
      borderColor: "border-yellow-400",
      Icon: KakaoIcon,
      authUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/oauth2/authorization/kakao`,
      isImage: false,
    },
    naver: {
      text: "네이버로 시작하기",
      bgColor: "bg-[#03C75A]",
      textColor: "text-white",
      borderColor: "border-[#03C75A]",
      Icon: NaverIcon,
      authUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/oauth2/authorization/naver`,
      isImage: true,
    },
  };

  const config = providerConfig[provider];

  return (
    <Link
      href={config.authUrl}
      className={`flex items-center gap-2.5 justify-center py-4 mt-2.5 w-full ${config.bgColor} ${config.textColor} border border-solid ${config.borderColor} min-h-[52px]`}
    >
      {config.isImage ? (
        <Image
          src={config.Icon}
          alt={`${provider} 로그인`}
          width={20}
          height={20}
          className="object-contain"
        />
      ) : (
        <config.Icon className="object-contain " />
      )}
      <span className="self-stretch my-auto">{config.text}</span>
    </Link>
  );
};

export default SocialLoginButton;
