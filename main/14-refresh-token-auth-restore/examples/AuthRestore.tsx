"use client";

import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import { useEffect } from "react";
import { useAuthStore } from "./auth-store";

const RESTORE_ACCESS_TOKEN = gql`
  mutation RestoreAccessToken {
    restoreAccessToken {
      accessToken
    }
  }
`;

export default function AuthRestore() {
  const [restoreAccessToken] = useMutation(RESTORE_ACCESS_TOKEN);
  const setAccessToken = useAuthStore((store) => store.setAccessToken);
  const setIsAuthReady = useAuthStore((store) => store.setIsAuthReady);

  useEffect(() => {
    async function restoreLogin() {
      try {
        // refresh token은 cookie로 전송되고 새 access token만 응답으로 받아요.
        const result = await restoreAccessToken();
        setAccessToken(result.data.restoreAccessToken.accessToken);
      } catch {
        setAccessToken("");
      } finally {
        setIsAuthReady(true);
      }
    }

    restoreLogin();
  }, [restoreAccessToken, setAccessToken, setIsAuthReady]);

  return null;
}
