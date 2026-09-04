"use client";

import { useState } from "react";

export default function PageGroup() {
  const [startPage, setStartPage] = useState(1);
  const pages = [
    startPage,
    startPage + 1,
    startPage + 2,
    startPage + 3,
    startPage + 4,
  ];

  return (
    <div>
      <button
        disabled={startPage === 1}
        onClick={() => setStartPage((previous) => previous - 5)}
      >
        이전
      </button>

      {pages.map((page) => (
        <button key={page}>{page}</button>
      ))}

      {/* 다음을 누르면 1~5가 6~10으로 바뀌어요. */}
      <button onClick={() => setStartPage((previous) => previous + 5)}>
        다음
      </button>
    </div>
  );
}
