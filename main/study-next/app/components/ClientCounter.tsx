// next.js 16 version의 기본 컴포넌트는 서버 컴포넌트입니다.
// 따라서 클라이언트 컴포넌트로 만들고 싶다면, 아래와 같이 "use client"를 선언해야 합니다.
"use client";

import { useState } from "react";

export default function ClientCounter() {
  const [count, setCount] = useState(1);

  // state 변경 시, 컴포넌트가 다시 렌더링됩니다.
  return (
    <div>
      <h1>클라이언트 카운터</h1>
      <p>현재 카운트: {count}</p>
      <button onClick={() => setCount(count + 1)}>카운트 증가</button>
    </div>
  );
}
