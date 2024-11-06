import React from "react";

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
      iconSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/b7c719a1134086bae52505224c1ada24ae2a86167391151b1b9cc1adb5039d97?placeholderIfAbsent=true&apiKey=d0103dce2d69490fafde2fd943d1365d",
    },
    kakao: {
      text: "카카오로 시작하기",
      bgColor: "bg-yellow-400",
      textColor: "text-slate-950",
      borderColor: "border-yellow-400",
      iconSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/cd4d3390bc889bcfe45265a36c367543d0eb4e457bb3743407f48b63a9bbec78?placeholderIfAbsent=true&apiKey=d0103dce2d69490fafde2fd943d1365d",
    },
  };

  const config = providerConfig[provider];

  return (
    <button
      className={`flex overflow-hidden gap-2.5 justify-center items-center py-4 mt-2.5 w-full ${config.bgColor} ${config.textColor} border border-solid ${config.borderColor} min-h-[52px]`}
    >
      <img
        src={config.iconSrc}
        alt=""
        className="object-contain shrink-0 self-stretch my-auto w-4 aspect-square"
      />
      <span className="self-stretch my-auto">{config.text}</span>
    </button>
  );
};

export default SocialLoginButton;
