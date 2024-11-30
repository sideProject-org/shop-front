import Cookie from "js-cookie";
import { useAuth } from "./AuthProvider";

export const useApiClient = () => {
  const { accessToken, setTokens, logout } = useAuth();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const requestWithToken = async (url: string, options: RequestInit = {}) => {
    const headers = {
      ...(options.headers || {}),
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    };

    const response = await fetch(url, { ...options, headers });

    if (response.status === 401) {
      try {
        // 먼저 토큰 재전송 시도
        const resendResponse = await fetch(`${apiUrl}/auth/resend-token`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // 쿠키 포함
        });

        if (resendResponse.ok) {
          const resendData = await resendResponse.json();
          setTokens(resendData.data.accessToken, resendData.data.refreshToken);

          // 원래 요청 재시도
          const retryHeaders = {
            ...(options.headers || {}),
            Authorization: `Bearer ${resendData.data.accessToken}`,
          };
          return await fetch(url, { ...options, headers: retryHeaders });
        }

        // 토큰 재전송 실패시 재발급 시도
        const refreshToken = Cookie.get("refreshToken");
        const reissueResponse = await fetch(`${apiUrl}/auth/reissue`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ refreshToken }),
        });

        if (reissueResponse.ok) {
          const reissueData = await reissueResponse.json();
          setTokens(
            reissueData.data.accessToken,
            reissueData.data.refreshToken
          );

          // 원래 요청 재시도
          const retryHeaders = {
            ...(options.headers || {}),
            Authorization: `Bearer ${reissueData.data.accessToken}`,
          };
          return await fetch(url, { ...options, headers: retryHeaders });
        }

        // 모든 갱신 시도 실패
        logout();
        throw new Error("로그인이 만료되었습니다. 다시 로그인해주세요.");
      } catch (error) {
        logout();
        throw new Error("인증 처리 중 오류가 발생했습니다.");
      }
    }

    return response;
  };

  return { requestWithToken };
};
