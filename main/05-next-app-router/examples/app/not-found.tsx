import Link from "next/link";

export default function NotFound() {
  return (
    <main>
      <h1>페이지를 찾을 수 없어요.</h1>
      {/* 없는 주소에서는 사용자가 돌아갈 길도 함께 보여줘요. */}
      <Link href="/">메인으로 돌아가기</Link>
    </main>
  );
}
