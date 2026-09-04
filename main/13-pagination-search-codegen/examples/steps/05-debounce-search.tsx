"use client";

import { useEffect, useState } from "react";

export default function DebounceSearch() {
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    // 글자를 입력할 때마다 즉시 검색하지 않고 500ms를 기다려요.
    const timerId = window.setTimeout(() => {
      console.log("API에 보낼 검색어:", keyword);
    }, 500);

    // 기다리는 중에 새 글자를 입력하면 이전 타이머를 지워요.
    return () => window.clearInterval(timerId);
  }, [keyword]);

  return (
    <input
      value={keyword}
      onChange={(event) => setKeyword(event.target.value)}
    />
  );
}
