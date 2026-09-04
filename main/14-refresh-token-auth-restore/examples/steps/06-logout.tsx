"use client";

import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../auth-store";

const LOGOUT_USER = gql`
  mutation LogoutUser {
    logoutUser
  }
`;

export default function LogoutButton() {
  const router = useRouter();
  const [logoutUser] = useMutation(LOGOUT_USER);
  const setAccessToken = useAuthStore((store) => store.setAccessToken);

  async function handleLogout() {
    // 서버가 refreash token cookie를 정리할 수 있도록 로그아웃 API를 먼저 실행해요.
    await logoutUser();
    setAccessToken("");
    router.replace("/login");
  }
  return <button onClick={handleLogout}>로그아웃</button>;
}
