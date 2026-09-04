"use client";

import { useMutation } from "@apollo/client/react";
import { useEffect, useRef } from "react";
import { RESTORE_ACCESS_TOKEN } from "@/src/graphql/auth";
import { useAuthStore } from "@/src/stores/auth-store";
import type { RestoreTokenData } from "@/src/type/auth";

export default function AuthRestore() {
  const hasRestored = useRef(false);
  const setAccessToken = useAuthStore((store) => store.setAccessToken);
  const finishAuth = useAuthStore((store) => store.finishAuth);

  const [restoreAccessToken] =
    useMutation<RestoreTokenData>(RESTORE_ACCESS_TOKEN);

  useEffect(() => {
    // 개발 모드에서 effect가 두 번 확인되더라도 재발급은 한 번만 실행해요.
    if (hasRestored.current) return;
    hasRestored.current = true;

    async function restoreLogin() {
      try {
        // refresh token은 브라우저의 cookie에 담겨 자동으로 전달돼요.
        const result = await restoreAccessToken({
          context: { apiName: "practice" },
        });

        // 서버가 새로 발급한 access token을 Zustand store에 저장해요.
        const newToken = result.data?.restoreAccessToken.accessToken ?? "";
        setAccessToken(newToken);
      } catch {
        // cookie가 없거나 만료된 경우는 정상적인 로그아웃 상태예요.
        setAccessToken("");
      } finally {
        // 성공과 실패 모두 인증 확인이 끝났다고 표시해야 해요.
        finishAuth();
      }
    }

    restoreLogin();
  }, [finishAuth, restoreAccessToken, setAccessToken]);

  // 화면을 그리는 컴포넌트가 아니라 인증 복구만 담당해요.
  return null;
}
