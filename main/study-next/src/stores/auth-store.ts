import { create } from "zustand";

// 여러 화면에서 함께 사용할 로그인 상태의 모양
type AuthStore = {
  accessToken: string;
  isAuthReady: boolean;
  setAccessToken: (accessToken: string) => void;
  finishAuth: () => void;
  clearAuth: () => void;
};

// Zustand store는 Provider 없이 필요한 컴포넌트에서 바로 사용할 수 있어요.
export const useAuthStore = create<AuthStore>()((set) => ({
  accessToken: "",

  // 앱 시작 시 refresh token 확인이 끝나기 전에는 false예요.
  isAuthReady: false,

  setAccessToken: (accessToken) => set({ accessToken }),
  finishAuth: () => set({ isAuthReady: true }),

  // 로그아웃하면 token을 비우고 확인 완료 상태로 유지해요.
  clearAuth: () => set({ accessToken: "", isAuthReady: true }),
}));
