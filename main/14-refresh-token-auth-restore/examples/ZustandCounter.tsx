"use client";

import { useCountSotre } from "./zustand-counter-store";

function CountView() {
  const count = useCountStore((store) => store.count);

  return <p>다른 페이지 또는 컴포넌트에서 나타나는 숫자: {count}</p>;
}

export default function ZustandCounter() {
  const count = useCountStore((store) => store.count);
  const increase = useCountStore((store) => store.increase);
  const decrease = useCountStore((store) => store.decrease);
  const reset = useCountStore((store) => store.reset);

  return (
    <section>
      <h1>Zustand 전역 상태</h1>
      <strong>{count}</strong>

      <button onClick={decrease}>-1</button>
      <button onClick={increase}>+1</button>
      <button onClick={reset}>초기화</button>

      {/* 서로 다른 컴포넌트지만 같은 store의 count를 읽어요. */}
      <CountView />
    </section>
  );
}
