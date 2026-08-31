"use client";

import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import { useState } from "react";
import { validateEmail, validatePassword } from "./00-validation"; // custom 함수 가져다 써요

const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(createUserInput: $input) {
      _id
      email
      name
    }
  }
`;

export default function SignupExample() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [message, setMessage] = useState("");
  const [createUser] = useMutation(CREATE_USER);

  async function handleSignup() {
    // API 요청 전에 각 입력값을 프론트엔드에서 먼저 검사합니다.
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (emailError || passwordError || name.trim() === "") {
      setMessage(emailError || passwordError || "이름을 입력해 주세요.");
      return;
    }

    if (password !== passwordCheck) {
      setMessage("비밀번호와 비밀번호 확인이 다릅니다.");
      return;
    }

    try {
      // 회원가입 API에 서버가 요구하는 input 모양으로 값을 전달합니다.
      // 프론트엔드는 비밀번호를 직접 해시하지 않고 HTTPS로 백엔드에 전달해요.
      await createUser({ variables: { input: { email, password, name } } });
      setMessage("회원가입을 완료했습니다. 이제 로그인해 주세요.");
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "회원가입에 실패했습니다.",
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
        placeholder="이름"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <input
        type="password"
        placeholder="비밀번호 확인"
        value={passwordCheck}
        onChange={(event) => setPasswordCheck(event.target.value)}
      />
      <button onClick={handleSignup}>회원가입</button>
      <p>{message}</p>
    </div>
  );
}
