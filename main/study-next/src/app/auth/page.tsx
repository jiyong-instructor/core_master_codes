import Link from "next/link";
import styles from "./auth.module.css";

export default function AuthHomePage() {
  return (
    <main className={styles.page}>
      <section className={styles.intro}>
        <p className={styles.eyebrow}>MAIN COURSE · DAY 10</p>
        <h1>회원가입 · 로그인 · 인증</h1>
        <p className={styles.description}>
          입력값 검사부터 accessToken을 넣은 내 정보 조회까지 순서대로 확인해요.
        </p>
      </section>

      <section className={styles.flow}>
        <Link className={styles.card} href="/auth/validation">
          <strong>1. 정규식 검사</strong>
          <span>이메일과 비밀번호 형식을 먼저 확인해요.</span>
        </Link>
        <Link className={styles.card} href="/auth/signup">
          <strong>2. 회원가입</strong>
          <span>검사를 통과한 입력값을 mutation으로 보내요.</span>
        </Link>
        <Link className={styles.card} href="/auth/login">
          <strong>3. 로그인</strong>
          <span>로그인하고 accessToken을 받아 저장해요.</span>
        </Link>
        <Link className={styles.card} href="/auth/mypage">
          <strong>4. 보호 페이지</strong>
          <span>token이 있을 때만 내 정보 화면에 들어가요.</span>
        </Link>
      </section>

      <section className={styles.noteBox}>
        <h2>비밀번호는 프론트엔드에서 암호화하나요?</h2>
        <p>
          프론트엔드는 형식을 검사한 뒤 HTTPS로 비밀번호를 전송합니다.
          비밀번호를 복원할 수 없는 값으로 만드는 해시는 백엔드가 담당하고,
          데이터베이스에는 원본 비밀번호가 아닌 해시 결과를 저장해요.
        </p>
      </section>
    </main>
  );
}
