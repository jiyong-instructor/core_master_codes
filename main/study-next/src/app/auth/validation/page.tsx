"use client";

import { useState } from "react";
import { validateEmail, validatePassword } from "@/src/utils/validation";
import styles from "../auth.module.css";

export default function ValidationPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailMessage = email
    ? validateEmail(email) || "올바른 이메일입니다."
    : "";
  const passwordMessage = password
    ? validatePassword(password) || "사용할 수 있는 비밀번호입니다."
    : "";

  return (
    <main className={styles.page}>
      <section className={styles.formBox}>
        <h1>정규식으로 입력값 검사하기</h1>
        <p className={styles.description}>
          정규식은 문자열이 우리가 정한 모양과 맞는지 검사하는 규칙이에요.
        </p>

        <div className={styles.form}>
          <label htmlFor="email">이메일</label>
          <input
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="student@example.com"
          />
          <p className={styles.error}>{emailMessage}</p>

          <label htmlFor="password">비밀번호</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="영문 + 숫자, 8자 이상"
          />
          <p className={styles.error}>{passwordMessage}</p>
        </div>
      </section>
    </main>
  );
}
