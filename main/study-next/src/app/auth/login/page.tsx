"use client";

import { useMutation } from "@apollo/client/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { FormEvent } from "react";
import { useAuth } from "@/src/contexts/AuthContext";
import { LOGIN_USER } from "@/src/graphql/auth";
import type { LoginData, LoginVariables } from "@/src/type/auth";
import { validateEmail } from "@/src/utils/validation";
import styles from "../auth.module.css";

export default function LoginPage() {
  const router = useRouter();
  const { saveAccessToken } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const [loginUser, { loading }] = useMutation<LoginData, LoginVariables>(
    LOGIN_USER,
  );

  const onSubmitLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const emailError = validateEmail(email);
    if (emailError || password === "") {
      setMessage(emailError || "비밀번호를 입력해 주세요.");
      return;
    }

    try {
      const result = await loginUser({
        variables: { email, password },
        context: { apiName: "practice" },
      });
      const accessToken = result.data?.loginUser.accessToken;

      if (!accessToken) {
        setMessage("accessToken을 받지 못했습니다.");
        return;
      }

      saveAccessToken(accessToken);
      router.push("/auth/mypage");
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "로그인에 실패했어요.",
      );
    }
  };

  return (
    <main className={styles.page}>
      <section className={styles.formBox}>
        <h1>로그인</h1>
        <p className={styles.description}>
          로그인에 성공하면 accessToken을 받아요.
        </p>

        <form className={styles.form} onSubmit={onSubmitLogin}>
          <label htmlFor="email">이메일</label>
          <input
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">비밀번호</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <p className={styles.error}>{message}</p>
          <button className={styles.button} disabled={loading}>
            {loading ? "로그인 중..." : "로그인"}
          </button>
        </form>

        <Link className={styles.moveLink} href="/auth/signup">
          회원가입 화면으로 이동
        </Link>
      </section>
    </main>
  );
}
