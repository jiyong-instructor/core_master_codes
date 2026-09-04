"use client";

import { useQuery } from "@tanstack/react-query";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

async function getTodos(): Promise<Todo[]> {
  // JSONPlaceholder의 할 일 5개를 요청해요.
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/todos?_limit=5",
  );

  // fetch는 404나 500에서도 자동으로 throw하지 않아 직접 확인해요.
  if (!response.ok) throw new Error("할 일 목록을 불러오지 못했습니다.");

  // JSON 문자열을 JavaScript 데이터로 바꿔서 반환해요.
  return response.json();
}

export default function ReactQeuryTodos() {
  const { data, isPending, isError, isFetching, refetch } = useQuery({
    // queryKey는 이 서버 데이터를 구분하는 cache 이름표예요.
    queryKey: ["todos"],
    // queryFn은 실제 API 요청을 실행하는 함수예요.
    queryFn: getTodos,
  });

  if (isPending) return <p>처음 데이터를 불러오는 중...</p>;
  if (isError) return <p>요청에 실패했습니다.</p>;

  return (
    <section>
      <h1>React Query로 REST API 조회</h1>

      <button onClick={() => refetch()} disabled={isFetching}>
        {isFetching ? "확인 중..." : "다시 불러오기"}
      </button>

      <ul>
        {data.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </section>
  );
}
