"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthStore } from "../auth-store";

export default function ProtectedRoute() {
  const router = useRouter();
  const accessToken = useAuthStore((store) => store.accessToekn);
  const isAuthReady = useAuthStore((store) => store.isAuthReady);

  useEffect(() => {
    // 로그인 복원이 끝났는데 토큰이 없다면 로그인 페이지로 보내요.
    if (isAuthReady && accessToken === "") {
      router.replace("/login");
    }
  }, [accessToken, isAuthReady, router]);

  if (isAuthReady === false) return <p>확인 중...</p>;
  if (accessToken === "") return null;

  return <h1>마이페이지</h1>;
}
