import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.page}>
      <section className={styles.intro}>
        <p className={styles.eyebrow}>MAIN COURSE · DAY 09</p>
        <h1>Next.js + Apollo Client</h1>
        <p>
          앞에서 만든 테스트 페이지를 다시 확인하고, Apollo 게시판 예제를
          순서대로 열어 보세요.
        </p>
      </section>

      <section>
        <h2>이전 테스트 페이지</h2>
        <div className={styles.cardList}>
          <Link className={styles.card} href="/tailwind">
            <strong>Tailwind CSS</strong>
            <span>클래스 이름으로 스타일 적용하기</span>
          </Link>
          <Link className={styles.card} href="/styled-components">
            <strong>styled-components</strong>
            <span>클라이언트 컴포넌트에서 스타일 적용하기</span>
          </Link>
          <Link className={styles.card} href="/products">
            <strong>동적 라우팅</strong>
            <span>목록에서 상품 상세 페이지로 이동하기</span>
          </Link>
        </div>
      </section>

      <section>
        <h2>Apollo 게시판 실습</h2>
        <div className={styles.cardList}>
          <Link className={styles.apolloCard} href="/apollo">
            <strong>1. Apollo 시작</strong>
            <span>Query, Mutation과 Apollo 훅의 역할 알아보기</span>
          </Link>
          <Link className={styles.apolloCard} href="/apollo/boards">
            <strong>2. 게시글 목록 조회</strong>
            <span>useQuery로 fetchBoards 실행하기</span>
          </Link>
          <Link className={styles.apolloCard} href="/apollo/boards/new">
            <strong>3. 게시글 등록</strong>
            <span>useMutation으로 createBoard 실행하기</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
