"use client";

import { useAuthStore } from "../auth-store";

export default function AuthReadyScreen() {
  const accessToken = useAuthStore((store) => store.accessToken);
  const isAuthReady = useAuthStore((store) => store.isAuthReady);

  // 재발급 요청이 끝나기 전에는 로그인 여부를 아직 알 수 없어요.
  if (isAuthReady === false) {
    return <p>로그인 상태를 확인하고 있어요.</p>;
  }

  if (accessToken === "") {
    return <p>로그인이 필요해요.</p>;
  }

  return <p>로그인 상태예요.</p>;
}
