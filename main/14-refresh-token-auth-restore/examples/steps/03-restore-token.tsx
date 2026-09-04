"use client";

import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import { useEffect } from "react";
import { useAuthStore } from "../auth-store";

const RESTORE_ACCESS_TOKEN = gql`
  mutation RestoreAccessToken {
    restoreAccessToken {
      accessToken
    }
  }
`;

export default function RestoreToken() {
  const [restoreAccessToken] = useMutation(RESTORE_ACCESS_TOKEN);
  const setAccessToken = useAuthStore((store) => store.setAccessToken);
  const setIsAuthReady = useAuthStore((store) => store.setIsAuthReady);

  useEffect(() => {
    async function restore() {
      try {
        // cookie의 refresh token은 브라우저가 자동으로 보내요.
        const result = await restoreAccessToken();
        setAccessToken(result.data.restoreAccessToken.accessToken);
      } catch {
        setAccessToken("");
      } finally {
        // 성공과 실패 모두 로그인 확인이 끝났다고 표시해요.
        setIsAuthReady(true);
      }
    }

    restore();
  }, [restoreAccessToken, setAccessToken, setIsAuthReady]);

  return null;
}
