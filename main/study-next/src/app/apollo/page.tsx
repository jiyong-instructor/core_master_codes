import Link from "next/link";
import styles from "./apollo.module.css";

export default function ApolloPage() {
  const steps = [
    {
      title: "1. gql로 요청 작성",
      description:
        "플레이그라운드에서 작성했던 Query와 Mutation을 코드로 옮깁니다.",
    },
    {
      title: "2. Apollo 훅 선택",
      description:
        "조회는 useQuery, 등록·수정·삭제는 useMutation을 사용합니다.",
    },
    {
      title: "3. 상태 확인",
      description: "loading, error, data를 확인해서 화면을 나누어 보여 줍니다.",
    },
    {
      title: "4. 결과를 화면에 출력",
      description: "받아온 data를 map으로 반복하거나 상세 화면에 출력합니다.",
    },
  ];

  return (
    <main className={styles.page}>
      <p className={styles.eyebrow}>APOLLO CLIENT</p>
      <h1>GraphQL을 React에서 사용해 봅시다</h1>
      <p className={styles.description}>
        플레이그라운드에서 직접 보내던 요청을 이제 화면의 버튼과 연결합니다.
      </p>

      <section className={styles.steps}>
        {steps.map((step) => (
          <article className={styles.step} key={step.title}>
            <h2>{step.title}</h2>
            <p>{step.description}</p>
          </article>
        ))}
      </section>

      <section className={styles.compare}>
        <h2>오늘 기억할 두 가지</h2>
        <div>
          <p>
            <strong>useQuery</strong>
            페이지가 열리면 데이터를 조회합니다.
          </p>
          <p>
            <strong>useMutation</strong>
            버튼을 눌렀을 때 등록, 수정, 삭제를 실행합니다.
          </p>
        </div>
      </section>

      <div className={styles.buttons}>
        <Link href="/apollo/boards">게시글 목록부터 보기</Link>
        <Link href="/apollo/boards/new">게시글 등록부터 보기</Link>
      </div>
    </main>
  );
}
