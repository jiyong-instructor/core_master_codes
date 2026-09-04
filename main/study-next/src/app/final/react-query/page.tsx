"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import type { FormEvent } from "react";
import styles from "../final.module.css";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

async function getTodos(): Promise<Todo[]> {
  // 외부 REST API의 할 일 6개를 GET 방식으로 요청해요.
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/todos?_limit=6",
  );

  // fetch는 404, 500에서도 자동으로 오류를 던지지 않아요.
  if (!response.ok) throw new Error("할 일 목록을 불러오지 못했습니다.");

  return response.json();
}

async function addTodo(title: string): Promise<Todo> {
  // 새 할 일을 POST 방식으로 보내요.
  const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, completed: false, userId: 1 }),
  });

  if (!response.ok) throw new Error("할 일을 등록하지 못했습니다.");
  return response.json();
}

export default function ReactQueryPage() {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");

  const { data, isPending, isError, isFetching } = useQuery({
    // queryKey는 이 데이터를 구분하는 cache 이름표예요.
    queryKey: ["todos"],
    // queryFn은 실제 API 요청 함수예요.
    queryFn: getTodos,
    // 30초 동안은 데이터를 최신 상태라고 판단해요.
    staleTime: 30 * 1000,
  });

  const createTodo = useMutation({
    mutationFn: addTodo,
  });

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!title.trim()) return;

    createTodo.mutate(title.trim(), {
      onSuccess: () => setTitle(""),
    });
  };

  return (
    <main className={styles.page}>
      <p className={styles.eyebrow}>DAY 15 · 3단계</p>
      <h1>React Query로 REST API 사용하기</h1>
      <p className={styles.description}>
        JSONPlaceholder API를 이용해 useQuery와 useMutation을 비교합니다.
      </p>

      <section className={styles.exampleBox}>
        <h2>할 일 목록</h2>

        <form className={styles.form} onSubmit={onSubmit}>
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="새 할 일을 입력해 보세요."
          />
          <button className={styles.button} disabled={createTodo.isPending}>
            {createTodo.isPending ? "등록 중..." : "POST 요청"}
          </button>
        </form>

        {createTodo.data && (
          <p className={styles.result}>
            서버 응답: {createTodo.data.title} (id: {createTodo.data.id})
          </p>
        )}

        <div className={styles.buttonRow}>
          <button
            className={styles.subButton}
            disabled={isFetching}
            onClick={() =>
              queryClient.invalidateQueries({ queryKey: ["todos"] })
            }
          >
            {isFetching ? "다시 확인 중..." : "cache 무효화 후 다시 조회"}
          </button>
        </div>

        {isPending && <p>처음 데이터를 불러오는 중입니다...</p>}
        {isError && <p className={styles.error}>요청에 실패했습니다.</p>}

        <ul className={styles.todoList}>
          {data?.map((todo) => (
            <li className={styles.todoItem} key={todo.id}>
              <span>{todo.completed ? "완료" : "진행"}</span>
              <span>{todo.title}</span>
            </li>
          ))}
        </ul>
      </section>

      <p className={styles.note}>
        JSONPlaceholder는 연습용 API라 POST 응답은 보내지만 실제 목록에 영구
        저장하지 않습니다. React Query는 데이터베이스가 아니라 API 응답 cache를
        관리하는 도구예요.
      </p>
    </main>
  );
}
