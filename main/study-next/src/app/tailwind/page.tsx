const trips = [
  { id: 1, emoji: "🏝️", title: "제주 바다 여행", price: "78,000원" },
  { id: 2, emoji: "⛰️", title: "강원 숲 여행", price: "65,000원" },
  { id: 3, emoji: "🌉", title: "부산 야경 여행", price: "82,000원" },
];

export default function TailwindPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-16">
      <section className="mx-auto max-w-5xl rounded-2xl bg-white p-8 shadow-lg">
        <p className="text-lg font-semibold text-blue-600">Tailwind CSS</p>
        <h1>같은 화면을 다른 방법, 다른 CSS 스타일로 변경해요</h1>
        <p className="mt-4 text-slate-600">
          테일윈드는 별도의 module.css 파일을 만들지 않고, HTML 태그에 바로
          className 속성을 이용해 스타일을 적용할 수 있어요.
        </p>
        <div className="mt-10 flex gap-5 max-md:flex-col">
          {trips.map((trip) => (
            <article
              className="flex-1 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg"
              key={trip.id}
            >
              <div className="flex h-36 items-center justify-center bg-blue-50 text-6xl">
                {trip.emoji}
              </div>
              <div className="p-5">
                <p className="text-sm font-bold text-blue-600">주말 추천</p>
                <h2 className="mt-2 text-xl font-bold">{trip.title}</h2>
                <p className="mt-4 font-bold">{trip.price}</p>
                <button
                  className="mt-5 w-full rounded-lg bg-blue-600 px-4 py-3 font-bold text-white transition-colors hover:bg-blue-700 
                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white max-md:mt-3
                "
                >
                  자세히 보기
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
