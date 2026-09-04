"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthStore } from "@/src/stores/auth-store";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const accessToken = useAuthStore((store) => store.accessToken);
  const isAuthReady = useAuthStore((store) => store.isAuthReady);

  useEffect(() => {
    // 저장된 token 확인이 끝났는데 token이 없으면 로그인 화면으로 이동해요.
    if (isAuthReady && !accessToken) router.replace("/auth/login");
  }, [accessToken, isAuthReady, router]);

  if (!isAuthReady) return <p>로그인 정보를 확인하고 있습니다...</p>;
  if (!accessToken) return <p>로그인 화면으로 이동하고 있습니다...</p>;

  // token이 있을 때만 보호할 화면을 보여 줍니다.
  // 단, 진짜 보안 검사는 화면이 아니라 백엔드 API에서도 반드시 해야 해요.
  return <>{children}</>;
}

// "use client";

// import { useRouter } from "next/navigation";
// import { useEffect } from "react";
// import { useAuth } from "@/src/contexts/AuthContext";

// export default function AuthGuard({ children }: { children: React.ReactNode }) {
//   const router = useRouter();
//   const { accessToken, isReady } = useAuth();

//   useEffect(() => {
//     // 저장된 token 확인이 끝났는데 token이 없으면 로그인 화면으로 이동해요.
//     if (isReady && !accessToken) router.replace("/auth/login");
//   }, [accessToken, isReady, router]);

//   if (!isReady) return <p>로그인 정보를 확인하고 있습니다...</p>;
//   if (!accessToken) return <p>로그인 화면으로 이동하고 있습니다...</p>;

//   // token이 있을 때만 보호할 화면을 보여 줍니다.
//   // 단, 진짜 보안 검사는 화면이 아니라 백엔드 API에서도 반드시 해야 해요.
//   return <>{children}</>;
// }
