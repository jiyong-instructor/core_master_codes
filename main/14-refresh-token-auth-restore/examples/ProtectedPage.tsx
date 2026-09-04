"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthStore } from "./auth-store";

export default function ProtectedPage() {
  const router = useRouter();
  const accessToken = useAuthStore((store) => store.accessToken);
  const isAuthReady = useAuthStore((store) => store.isAuthReady);

  useEffect(() => {
    if (isAuthReady && accessToken === "") router.replace("/login");
  }, [accessToken, isAuthReady, router]);

  if (isAuthReady === false) return <p>로그인 상태를 확인하고 있어요.</p>;
  if (accessToken === "") return null;

  return <h1>로그인한 사용자만 보는 마이페이지</h1>;
}
