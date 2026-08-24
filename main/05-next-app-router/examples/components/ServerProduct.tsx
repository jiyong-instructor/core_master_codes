import ClientCounter from "./ClientCounter";

export default function ServerProduct() {
  // 이 컴포넌트는 useState가 없어서 기본 Server Component로 둘 수 있어요.
  return (
    <article>
      <h2>제주 바다 여행</h2>
      <ClientCounter />
    </article>
  );
}
