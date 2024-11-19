import React, { createContext, useContext, useState, useEffect } from "react";
import Cookie from "js-cookie";

interface AuthContextType {
  accessToken: string | null;
  isAuthenticated: boolean;
  setTokens: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedAccessToken = localStorage.getItem("accessToken");
    const storedRefreshToken = Cookie.get("refreshToken");

    if (storedAccessToken && storedRefreshToken) {
      setAccessToken(storedAccessToken);
      setRefreshToken(storedRefreshToken);
      setIsAuthenticated(true);
    }
  }, []);

  const setTokens = (access: string, refresh: string) => {
    localStorage.setItem("accessToken", access);
    Cookie.set("refreshToken", refresh, { expires: 7 });
    setAccessToken(access);
    setRefreshToken(refresh);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    Cookie.remove("refreshToken");
    setAccessToken(null);
    setRefreshToken(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        isAuthenticated,
        setTokens,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
