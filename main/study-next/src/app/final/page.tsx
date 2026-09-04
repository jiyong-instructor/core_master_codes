import Link from "next/link";
import styles from "./final.module.css";

export default function FinalPage() {
  return (
    <main className={styles.page}>
      <p className={styles.eyebrow}>MAIN COURSE · DAY 15</p>
      <h1>상태 관리 · 인증 복구 · React Query</h1>
      <p className={styles.description}>
        클라이언트 상태와 서버 상태를 구분하고, 새로고침 뒤 로그인 상태를
        복구하는 순서까지 확인합니다.
      </p>

      <section className={styles.cardList}>
        <Link className={styles.card} href="/final/zustand">
          <strong>1. Zustand</strong>
          <span>서로 다른 컴포넌트가 같은 전역 상태를 사용해요.</span>
        </Link>

        <Link className={styles.card} href="/final/auth-restore">
          <strong>2. refresh token</strong>
          <span>cookie로 access token을 다시 발급받아요.</span>
        </Link>

        <Link className={styles.card} href="/final/react-query">
          <strong>3. React Query</strong>
          <span>REST API의 로딩, 오류, 데이터와 cache를 관리해요.</span>
        </Link>

        <Link className={styles.card} href="/final/triptalk">
          <strong>4. TripTalk 적용</strong>
          <span>로그인 복구 코드를 실제 과제 구조와 연결해요.</span>
        </Link>
      </section>

      <section className={styles.flow}>
        <div className={styles.panel}>
          <strong>Zustand</strong>
          <p>token, 모달 열림 여부처럼 프론트에서 만든 상태</p>
        </div>
        <div className={styles.panel}>
          <strong>React Query</strong>
          <p>REST API에서 받은 목록처럼 서버가 원본인 상태</p>
        </div>
        <div className={styles.panel}>
          <strong>Apollo Client</strong>
          <p>TripTalk에서 사용한 GraphQL 요청과 cache</p>
        </div>
      </section>
    </main>
  );
}
