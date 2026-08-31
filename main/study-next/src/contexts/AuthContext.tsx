"use client";

import { createContext, useContext, useEffect, useState } from "react";

type AuthContextValue = {
  accessToken: string;
  isReady: boolean;
  saveAccessToken: (token: string) => void;
  removeAccessToken: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [accessToken, setAccessToken] = useState("");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // sessionStorage는 브라우저에만 있으므로 화면이 열린 뒤에 읽어요.
    // 서버 HTML을 만들 때 바로 읽지 않으면 hydration 오류도 피할 수 있습니다.
    const timer = window.setTimeout(() => {
      const savedToken = sessionStorage.getItem("accessToken") ?? "";
      setAccessToken(savedToken);
      setIsReady(true);
    }, 0);

    // 컴포넌트가 먼저 사라지면 예약한 작업도 함께 정리합니다.
    return () => window.clearTimeout(timer);
  }, []);

  const saveAccessToken = (token: string) => {
    setAccessToken(token);
    sessionStorage.setItem("accessToken", token);
  };

  const removeAccessToken = () => {
    setAccessToken("");
    sessionStorage.removeItem("accessToken");
  };

  return (
    <AuthContext.Provider
      value={{ accessToken, isReady, saveAccessToken, removeAccessToken }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth는 AuthProvider 안에서 사용해야 합니다.");
  }

  return context;
}
