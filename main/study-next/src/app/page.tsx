import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.page}>
      <section className={styles.intro}>
        <p className={styles.eyebrow}>MAIN COURSE · DAY 09–10</p>
        <h1>Apollo Client + 로그인 인증</h1>
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

      <section>
        <h2>Day10 회원가입 · 로그인 · 인증</h2>
        <div className={styles.cardList}>
          <Link className={styles.authCard} href="/auth/validation">
            <strong>1. 정규식 검사</strong>
            <span>이메일과 비밀번호 입력값 확인하기</span>
          </Link>
          <Link className={styles.authCard} href="/auth/signup">
            <strong>2. 회원가입과 로그인</strong>
            <span>mutation 실행하고 accessToken 받기</span>
          </Link>
          <Link className={styles.authCard} href="/auth/mypage">
            <strong>3. 보호 페이지</strong>
            <span>로그인하지 않았다면 로그인 화면으로 이동하기</span>
          </Link>
        </div>
      </section>

      <section>
        <h2>Day11 숙박권 문의 · 답변</h2>
        <div className={styles.cardList}>
          <Link className={styles.questionCard} href="/practice/travelproducts">
            <strong>문의와 답변 실습</strong>
            <span>숙박권 목록에서 상세로 이동해 문의·답변 등록하기</span>
          </Link>
        </div>
      </section>

      <section>
        <h2>Day12 숙박권 등록 · 업로드 · 주소</h2>
        <div className={styles.cardList}>
          <Link
            className={styles.questionCard}
            href="/practice/travelproducts/new"
          >
            <strong>숙박권 등록 완성 예제</strong>
            <span>
              다중 이미지, 주소 검색, 좌표와 지도까지 한 번에 연결하기
            </span>
          </Link>
        </div>
      </section>
    </main>
  );
}
