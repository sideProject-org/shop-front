import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Cookie from "js-cookie";

const LoginCallback = () => {
  const router = useRouter();

  useEffect(() => {
    const handleCallback = async () => {
      const query = new URLSearchParams(window.location.search);
      const token = query.get("token");

      if (token) {
        Cookie.set("accessToken", token, { expires: 7, secure: true });
        alert("로그인 성공!");
        router.push("/");
      } else {
        alert("로그인 실패. 다시 시도해주세요.");
        router.push("/login");
      }
    };

    handleCallback();
  }, [router]);

  return <div>로그인 처리 중...</div>;
};

export default LoginCallback;
