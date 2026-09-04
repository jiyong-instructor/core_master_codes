"use client";

export default function PageButtons() {
  const pages = [1, 2, 3, 4, 5];

  function handleClick(page: number) {
    console.log("selected page", page);
  }

  return (
    <div>
      {pages.map((page) => (
        <button key={page} onClick={() => handleClick(page)}>
          {page}
        </button>
      ))}
    </div>
  );
}
