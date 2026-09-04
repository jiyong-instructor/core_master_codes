"use client";

import Link from "next/link";
import { useCountStore } from "@/src/stores/count-store";
import styles from "../final.module.css";

function CountViewer() {
  // 이 컴포넌트는 count 하나만 골라서 구독해요.
  const count = useCountStore((store) => store.count);

  return (
    <p className={styles.viewer}>
      다른 컴포넌트도 같은 숫자를 보고 있어요: <strong>{count}</strong>
    </p>
  );
}

export default function ZustandPage() {
  // 필요한 상태와 함수만 selector로 각각 가져와요.
  const count = useCountStore((store) => store.count);
  const increase = useCountStore((store) => store.increase);
  const decrease = useCountStore((store) => store.decrease);
  const reset = useCountStore((store) => store.reset);

  return (
    <main className={styles.page}>
      <p className={styles.eyebrow}>DAY 15 · 1단계</p>
      <h1>Zustand로 상태 공유하기</h1>
      <p className={styles.description}>
        props로 숫자를 전달하지 않아도 두 컴포넌트가 같은 store를 사용합니다.
      </p>

      <section className={styles.exampleBox}>
        <h2>공용 숫자</h2>
        <strong className={styles.count}>{count}</strong>

        <div className={styles.buttonRow}>
          <button className={styles.button} onClick={decrease}>
            -1
          </button>
          <button className={styles.button} onClick={increase}>
            +1
          </button>
          <button className={styles.subButton} onClick={reset}>
            초기화
          </button>
        </div>

        <CountViewer />

        <Link className={styles.moveLink} href="/final/zustand/other-page">
          다른 페이지에서도 같은 숫자 확인하기 →
        </Link>
      </section>

      <p className={styles.note}>
        이 숫자를 accessToken으로 바꾸면 로그인 페이지, 헤더, 마이페이지가 같은
        로그인 상태를 사용할 수 있습니다.
      </p>
    </main>
  );
}
