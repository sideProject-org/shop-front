import Cookie from "js-cookie";
import { useAuth } from "./AuthProvider";

export const useApiClient = () => {
  const { accessToken, setTokens, logout } = useAuth();

  // 요청 시 토큰을 포함하여 처리하는 함수
  const requestWithToken = async (url: string, options: RequestInit = {}) => {
    const headers = {
      ...(options.headers || {}),
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    };

    let response = await fetch(url, { ...options, headers });

    // 만약 access token이 만료되어 401 에러 발생
    if (response.status === 401) {
      try {
        // 토큰 만료 시 자동으로 토큰 재발급
        const newTokens = await resendTokens();

        // 새로 발급된 토큰으로 요청을 재시도
        const retryHeaders = {
          ...(options.headers || {}),
          Authorization: `Bearer ${newTokens.accessToken}`,
        };
        response = await fetch(url, { ...options, headers: retryHeaders });
      } catch (error) {
        // refreshToken도 만료된 경우 로그아웃 처리
        logout();
        throw new Error("로그인이 만료되었습니다. 다시 로그인해주세요.");
      }
    }

    return response;
  };

  // 토큰 재전송 (accessToken, refreshToken을 갱신)
  const resendTokens = async () => {
    try {
      // 토큰을 재전송하여 새로 발급받는 요청
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/resend-token`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            accessToken: Cookie.get("accessToken"),
            refreshToken: Cookie.get("refreshToken"),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("토큰 재전송에 실패했습니다.");
      }

      const data = await response.json();
      // 새로 발급받은 토큰을 쿠키에 저장
      setTokens(data.data.accessToken, data.data.refreshToken);

      // 새로 발급된 토큰 반환
      return data.data;
    } catch (error) {
      console.error("토큰 재전송 실패:", error);
      throw new Error("토큰 재전송에 실패했습니다.");
    }
  };

  return { requestWithToken, resendTokens };
};
