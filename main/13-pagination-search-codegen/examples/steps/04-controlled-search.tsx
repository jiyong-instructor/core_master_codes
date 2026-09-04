"use client";

import { useState } from "react";

export default function ControlledSearch() {
  const [keyword, setKeyword] = useState("");

  function handleSearch() {
    console.log("검색할 단어", keyword);
  }

  return (
    <div>
      <input
        value={keyword}
        placeholder="여행 이름 검색"
        onChange={(event) => setKeyword(event.target.value)}
      />
      <button onClick={handleSearch}>검색</button>
    </div>
  );
}
