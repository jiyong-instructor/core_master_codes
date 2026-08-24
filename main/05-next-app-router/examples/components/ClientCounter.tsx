"use client";

import { useState } from "react";

export default function ClientCounter() {
  const [count, setCount] = useState(1);

  // state와 click event가 필요해서 이 작은 파일만 Client Component예요.
  return <button onClick={() => setCount(count + 1)}>인원 {count}명</button>;
}
