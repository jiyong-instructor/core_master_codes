// Tailwind CSS는 CSS 파일 대신 className 안에 스타일을 조합해요.
// 오늘은 문법을 외우기보다 "이런 방식도 있구나" 정도로 비교합니다.
export default function TailwindCard() {
  return (
    <article className="w-80 rounded-2xl bg-white p-5 shadow-lg">
      <div className="flex h-32 items-center justify-center rounded-xl bg-blue-50 text-5xl">
        🏝️
      </div>

      <p className="mt-4 text-sm font-bold text-blue-600">주말 추천</p>
      <h2 className="mt-2 text-xl font-bold">제주 바다 여행</h2>
      <p className="mt-3">78,000원</p>

      <button className="mt-5 w-full rounded-lg bg-blue-600 px-4 py-3 text-white">
        자세히 보기
      </button>
    </article>
  );
}
