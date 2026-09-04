"use client";

import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import { useAuthStore } from "../auth-store";

const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      accessToken
    }
  }
`;

export default function LoginSave() {
  const [loginUser] = useMutation(LOGIN_USER);
  const setAccessToken = useAuthStore((store) => store.setAccessToken);

  async function handleLogin() {
    const result = await loginUser({
      variables: {
        email: "student@example.com",
        password: "1234",
      },
    });

    // 로그인 응답의 access token은 전역 store에 저장해요.
    setAccessToken(result.data.loginUser.accessToken);
  }

  return <button onClick={handleLogin}>로그인</button>;
}
