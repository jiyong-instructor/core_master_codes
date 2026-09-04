"use client";

import Link from "next/link";
import { useAuthStore } from "@/src/stores/auth-store";
import styles from "../final.module.css";

const steps = [
  {
    title: "1. 로그인",
    description: "loginUser 응답의 access token을 Zustand store에 저장해요.",
  },
  {
    title: "2. 인증 API 요청",
    description:
      "Apollo authLink가 store의 token을 Authorization 헤더에 넣어요.",
  },
  {
    title: "3. 새로고침",
    description: "메모리 store가 초기화되어 access token이 사라져요.",
  },
  {
    title: "4. 로그인 복구",
    description: "AuthRestore가 cookie를 보내 새 access token을 받아요.",
  },
  {
    title: "5. 보호 페이지",
    description: "복구 확인이 끝난 뒤 AuthGuard가 로그인 여부를 판단해요.",
  },
  {
    title: "6. 로그아웃",
    description: "서버 cookie, Zustand 상태와 Apollo cache를 함께 정리해요.",
  },
];

export default function TripTalkAuthGuidePage() {
  const accessToken = useAuthStore((store) => store.accessToken);
  const isAuthReady = useAuthStore((store) => store.isAuthReady);

  return (
    <main className={styles.page}>
      <p className={styles.eyebrow}>FINAL · TRIPTALK 적용</p>
      <h1>TripTalk 인증에 적용하는 순서</h1>
      <p className={styles.description}>
        별개의 새 예제가 아니라 현재 로그인·마이페이지 코드에 Day14 내용을
        연결한 모습입니다.
      </p>

      <section className={styles.flow}>
        {steps.map((step) => (
          <div className={styles.panel} key={step.title}>
            <strong>{step.title}</strong>
            <p>{step.description}</p>
          </div>
        ))}
      </section>

      <section className={styles.exampleBox}>
        <h2>현재 상태로 직접 확인하기</h2>
        <p className={styles.status}>
          {!isAuthReady
            ? "cookie 확인 중"
            : accessToken
              ? "access token 복구 완료"
              : "로그아웃 상태"}
        </p>

        <div className={styles.buttonRow}>
          <Link className={styles.button} href="/auth/login">
            1. 로그인
          </Link>
          <Link className={styles.subButton} href="/final/auth-restore">
            2. 복구 상태 확인
          </Link>
          <Link className={styles.subButton} href="/auth/mypage">
            3. 보호 페이지
          </Link>
        </div>
      </section>

      <section className={styles.fileGuide}>
        <h2>TripTalk에서 연결할 파일</h2>
        <ol>
          <li>
            <code>stores/auth-store.ts</code> — token과 준비 상태
          </li>
          <li>
            <code>graphql/auth.ts</code> — restoreAccessToken mutation
          </li>
          <li>
            <code>lib/ApolloSetting.tsx</code> — cookie와 인증 header
          </li>
          <li>
            <code>components/auth/AuthRestore.tsx</code> — 앱 시작 시 복구
          </li>
          <li>
            <code>components/auth/AuthGuard.tsx</code> — 보호 페이지
          </li>
          <li>
            <code>app/layout.tsx</code> — AuthRestore를 앱에 한 번 연결
          </li>
        </ol>
      </section>
    </main>
  );
}
