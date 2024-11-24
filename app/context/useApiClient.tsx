import Cookie from "js-cookie";
import { useAuth } from "./AuthProvider";

export const useApiClient = () => {
  const { accessToken, setTokens, logout } = useAuth();

  const requestWithToken = async (url: string, options: RequestInit = {}) => {
    console.log(localStorage.getItem("accessToken"));

    const headers = {
      ...(options.headers || {}),
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    };

    const response = await fetch(url, { ...options, headers });

    /*
    if (response.status === 401) {
      // Access token 만료 시 refresh token으로 갱신reissue
      const refreshResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            refreshToken: Cookie.get("refreshToken"),
          }),
        }
      );

      if (refreshResponse.ok) {
        const data = await refreshResponse.json();
        setTokens(data.data.accessToken, data.data.refreshToken);

        // 기존 요청 재시도
        const retryHeaders = {
          ...(options.headers || {}),
          Authorization: `Bearer ${data.data.accessToken}`,
        };

        return await fetch(url, { ...options, headers: retryHeaders });
      } else {
        // Refresh token도 만료된 경우 로그아웃 처리
        logout();
        throw new Error("로그인이 만료되었습니다. 다시 로그인해주세요.");
      }
    }
    */

    return response;
  };

  return { requestWithToken };
};
