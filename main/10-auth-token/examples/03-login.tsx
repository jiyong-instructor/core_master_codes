"use client";

import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import { useState } from "react";
import { saveAccessToken } from "../auth-store";
import { validateEmail } from "./00-validation";

const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      accessToken
    }
  }
`;

export default function LoginExample() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loginUser] = useMutation(LOGIN_USER);

  async function handleLogin() {
    const emailError = validateEmail(email);

    if (emailError || password === "") {
      setMessage(emailError || "비밀번호를 입력해 주세요.");
      return;
    }

    try {
      // 서버는 저장된 비밀번호 해시와 입력한 비밀번호를 비교합니다.
      const result = await loginUser({ variables: { email, password } });
      const accessToken = result.data?.loginUser.accessToken;

      if (!accessToken) {
        setMessage("access token을 받지 못했습니다.");
        return;
      }

      // 이후 인증 API 요청에 사용할 access token을 저장합니다.
      saveAccessToken(accessToken);
      setMessage("로그인했습니다.");
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "로그인에 실패했습니다.",
      );
    }
  }

  return (
    <div>
      <input
        placeholder="이메일"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <button onClick={handleLogin}>로그인</button>
      <p>{message}</p>
    </div>
  );
}
