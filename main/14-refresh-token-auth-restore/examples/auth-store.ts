import { create } from "zustand";

type AuthStore = {
  accessToken: string;
  isAuthReady: boolean;
  setAccessToken: (accesToken: string) => void;
  setIsAuthReady: (isAuthReady: boolean) => void;
};

export const useAuthStore = create<AuthStore>()((set) => ({
  accessToken: "",
  // 앱 시작 시 로그인 복구 확인이 끝났는지 따로 저장해요.
  isAuthReady: false,
  setAccessToken: (accessToken) => set({ accessToken }),
  setIsAuthReady: (isAuthready) => set({ isAuthready }),
}));
