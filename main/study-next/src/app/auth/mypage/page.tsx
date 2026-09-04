"use client";

import { useApolloClient, useMutation, useQuery } from "@apollo/client/react";
import { useRouter } from "next/navigation";
import AuthGuard from "@/src/components/auth/AuthGuard";
import { FETCH_USER_LOGGED_IN, LOGOUT_USER } from "@/src/graphql/auth";
import { useAuthStore } from "@/src/stores/auth-store";
import type { LoggedInUserData } from "@/src/type/auth";
import styles from "../auth.module.css";

function MyPageContent() {
  const router = useRouter();
  const apolloClient = useApolloClient();
  const accessToken = useAuthStore((store) => store.accessToken);
  const clearAuth = useAuthStore((store) => store.clearAuth);
  const [logoutUser] = useMutation(LOGOUT_USER);

  const { data, loading, error } = useQuery<LoggedInUserData>(
    FETCH_USER_LOGGED_IN,
    {
      skip: !accessToken,
      context: { apiName: "practice" },
      fetchPolicy: "network-only",
    },
  );

  const onClickLogout = async () => {
    try {
      // 서버의 refresh token cookie부터 지워요.
      await logoutUser({ context: { apiName: "practice" } });
    } finally {
      // 서버 요청이 실패해도 현재 브라우저의 로그인 화면은 정리해요.
      clearAuth();
      await apolloClient.clearStore();
      router.replace("/auth/login");
    }
  };

  if (loading) return <p>내 정보를 불러오는 중입니다...</p>;
  if (error) return <p>내 정보 조회 오류: {error.message}</p>;

  const user = data?.fetchUserLoggedIn;

  return (
    <section className={styles.profileBox}>
      <h1>로그인한 사용자의 페이지</h1>
      <p className={styles.description}>
        Authorization 헤더의 accessToken을 확인한 서버가 내 정보를 보내 줬어요.
      </p>

      <div className={styles.profileList}>
        <div className={styles.profileRow}>
          <span>이름</span>
          <strong>{user?.name}</strong>
        </div>
        <div className={styles.profileRow}>
          <span>이메일</span>
          <strong>{user?.email}</strong>
        </div>
        <div className={styles.profileRow}>
          <span>포인트</span>
          <strong>{user?.userPoint?.amount ?? 0} P</strong>
        </div>
      </div>

      <button className={styles.subButton} onClick={onClickLogout}>
        로그아웃
      </button>
    </section>
  );
}

export default function MyPage() {
  return (
    <main className={styles.page}>
      <AuthGuard>
        <MyPageContent />
      </AuthGuard>
    </main>
  );
}
