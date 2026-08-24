import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <h1>여행 상품 목록</h1>
      <Link href="/products/1">제주 여행 보기</Link>
    </main>
  );
}
