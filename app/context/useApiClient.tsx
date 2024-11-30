import Cookie from "js-cookie";
import { useAuth } from "./AuthProvider";
import { useRouter } from "next/navigation";

export const useApiClient = () => {
  const { accessToken, setTokens, logout } = useAuth();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();

  const requestWithToken = async (url: string, options: RequestInit = {}) => {
    let currentAccessToken = accessToken;

    const headers = {
      ...(options.headers || {}),
      Authorization: `Bearer ${currentAccessToken}`,
      "Content-Type": "application/json",
    };

    try {
      let response = await fetch(url, { ...options, headers });

      if (response.status === 401) {
        // 토큰 재전송 시도
        const resendResponse = await fetch(`${apiUrl}/auth/resend-token`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (resendResponse.ok) {
          const resendData = await resendResponse.json();
          setTokens(resendData.data.accessToken, resendData.data.refreshToken);
          currentAccessToken = resendData.data.accessToken;

          // 원래 요청 재시도
          const retryHeaders = {
            ...(options.headers || {}),
            Authorization: `Bearer ${currentAccessToken}`,
            "Content-Type": "application/json",
          };
          response = await fetch(url, { ...options, headers: retryHeaders });

          if (response.ok) {
            return response;
          }
        }

        // 토큰 재발급 시도
        const refreshToken = Cookie.get("refreshToken");
        if (!refreshToken) {
          throw new Error("리프레시 토큰이 없습니다.");
        }

        const reissueResponse = await fetch(`${apiUrl}/auth/reissue`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentAccessToken}`,
          },
          body: JSON.stringify({ refreshToken }),
        });

        if (reissueResponse.ok) {
          const reissueData = await reissueResponse.json();
          setTokens(
            reissueData.data.accessToken,
            reissueData.data.refreshToken
          );
          currentAccessToken = reissueData.data.accessToken;

          // 원래 요청 재시도
          const retryHeaders = {
            ...(options.headers || {}),
            Authorization: `Bearer ${currentAccessToken}`,
            "Content-Type": "application/json",
          };
          response = await fetch(url, { ...options, headers: retryHeaders });

          if (response.ok) {
            return response;
          }
        }

        // 모든 갱신 시도 실패
        logout();
        router.push("/login");
        throw new Error("인증이 만료되었습니다. 다시 로그인해주세요.");
      }

      return response;
    } catch (error) {
      if (
        error instanceof Error &&
        error.message === "인증이 만료되었습니다. 다시 로그인해주세요."
      ) {
        throw error;
      }
      console.error("API 요청 실패:", error);
      throw new Error("요청 처리 중 오류가 발생했습니다.");
    }
  };

  return { requestWithToken };
};
