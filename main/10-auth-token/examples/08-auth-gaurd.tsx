"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { getAccessToken } from "../auth-store";

type AuthGuardProps = {
  children: ReactNode;
};

export default function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // sessionStorage는 브라우저에서만 읽을 수 있으므로 useEffect 안에서 확인합니다.
    const accessToken = getAccessToken();

    // token이 없다면 로그인 페이지로 이동시킵니다.
    if (!accessToken) {
      router.replace("/login");
      return;
    }

    // token이 있으면 검사를 끝내고 보호된 화면을 보여 줍니다.
    setIsChecking(false);
  }, [router]);

  // 확인하기 전 보호된 화면이 잠깐 보이는 일을 막습니다.
  if (isChecking) return <p>로그인 상태를 확인하고 있습니다...</p>;

  return <>{children}</>;
}

// 사용 예시
// <AuthGuard> // 부모컴포넌트 HOC
//   <MyPage />
// </AuthGuard>

// 주의: 이 Guard는 사용 경험을 위한 프론트엔드 문지기입니다.
// 실제 데이터 보호는 백엔드가 Authorization token을 다시 검사해서 수행해야 합니다.
