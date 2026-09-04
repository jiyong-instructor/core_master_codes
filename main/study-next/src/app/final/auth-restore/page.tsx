"use client";

import { useMutation } from "@apollo/client/react";
import Link from "next/link";
import { RESTORE_ACCESS_TOKEN } from "@/src/graphql/auth";
import { useAuthStore } from "@/src/stores/auth-store";
import type { RestoreTokenData } from "@/src/type/auth";
import styles from "../final.module.css";

export default function AuthRestorePage() {
  const accessToken = useAuthStore((store) => store.accessToken);
  const isAuthReady = useAuthStore((store) => store.isAuthReady);
  const setAccessToken = useAuthStore((store) => store.setAccessToken);

  const [restoreAccessToken, { loading, error }] =
    useMutation<RestoreTokenData>(RESTORE_ACCESS_TOKEN);

  const onClickRestore = async () => {
    try {
      // 변수로 refresh token을 보내지 않아도 cookie가 자동으로 전달돼요.
      const result = await restoreAccessToken({
        context: { apiName: "practice" },
      });

      setAccessToken(result.data?.restoreAccessToken.accessToken ?? "");
    } catch {
      setAccessToken("");
    }
  };

  return (
    <main className={styles.page}>
      <p className={styles.eyebrow}>DAY 15 · 2단계</p>
      <h1>refresh token으로 로그인 복구하기</h1>
      <p className={styles.description}>
        앱 시작 시 전역 AuthRestore 컴포넌트가 한 번 재발급을 시도합니다.
      </p>

      <section className={styles.flow}>
        <div className={styles.panel}>
          <strong>1. cookie</strong>
          <p>브라우저가 refresh token cookie를 요청에 함께 보냅니다.</p>
        </div>
        <div className={styles.panel}>
          <strong>2. restore API</strong>
          <p>서버가 cookie를 확인하고 새 access token을 발급합니다.</p>
        </div>
        <div className={styles.panel}>
          <strong>3. Zustand</strong>
          <p>받은 access token을 메모리 store에 다시 저장합니다.</p>
        </div>
      </section>

      <section className={styles.exampleBox}>
        <h2>현재 인증 상태</h2>

        <p className={styles.status}>
          {!isAuthReady
            ? "로그인 확인 중"
            : accessToken
              ? "로그인 상태"
              : "로그아웃 상태"}
        </p>

        <p className={styles.description}>
          access token:{" "}
          {accessToken ? `${accessToken.slice(0, 24)}...` : "없음"}
        </p>

        <div className={styles.buttonRow}>
          <button
            className={styles.button}
            disabled={loading}
            onClick={onClickRestore}
          >
            {loading ? "재발급 중..." : "수동으로 다시 발급"}
          </button>
          <Link className={styles.button} href="/auth/login">
            로그인하기
          </Link>
          <Link className={styles.subButton} href="/auth/mypage">
            보호 페이지 확인
          </Link>
        </div>

        {error && (
          <p className={styles.error}>
            재발급 실패: cookie가 없거나 만료되었을 수 있습니다.
          </p>
        )}
      </section>
    </main>
  );
}
