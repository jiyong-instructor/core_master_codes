"use client";

import { useMutation } from "@apollo/client/react";
import Link from "next/link";
import { useState } from "react";
import type { FormEvent } from "react";
import { CREATE_USER } from "@/src/graphql/auth";
import type { CreateUserData, CreateUserVariables } from "@/src/type/auth";
import { validateEmail, validatePassword } from "@/src/utils/validation";
import styles from "../auth.module.css";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [message, setMessage] = useState("");

  const [createUser, { loading }] = useMutation<
    CreateUserData,
    CreateUserVariables
  >(CREATE_USER);

  const onSubmitSignup = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (emailError || name.trim() === "" || passwordError) {
      setMessage(emailError || passwordError || "이름을 입력해 주세요.");
      return;
    }

    if (password !== passwordCheck) {
      setMessage("비밀번호 확인 값이 서로 다릅니다.");
      return;
    }

    try {
      const result = await createUser({
        variables: { input: { email, name, password } },
        context: { apiName: "practice" },
      });

      setMessage(
        `${result.data?.createUser.name ?? name}님, 회원가입을 완료했어요.`,
      );
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "회원가입에 실패했어요.",
      );
    }
  };

  return (
    <main className={styles.page}>
      <section className={styles.formBox}>
        <h1>회원가입</h1>
        <p className={styles.description}>
          입력값을 검사한 다음 createUser를 실행해요.
        </p>

        <form className={styles.form} onSubmit={onSubmitSignup}>
          <label htmlFor="email">이메일</label>
          <input
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="name">이름</label>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label htmlFor="password">비밀번호</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label htmlFor="passwordCheck">비밀번호 확인</label>
          <input
            id="passwordCheck"
            type="password"
            value={passwordCheck}
            onChange={(e) => setPasswordCheck(e.target.value)}
          />

          <p className={styles.error}>{message}</p>
          <button className={styles.button} disabled={loading}>
            {loading ? "가입 중..." : "회원가입"}
          </button>
        </form>

        <Link className={styles.moveLink} href="/auth/login">
          이미 가입했다면 로그인하기
        </Link>
      </section>
    </main>
  );
}
