"use client";

import Link from "next/link";
import { useCountStore } from "@/src/stores/count-store";
import styles from "../../final.module.css";

export default function ZustandOtherPage() {
  // 앞 페이지와 같은 count-store에서 값을 가져와요.
  const count = useCountStore((store) => store.count);
  const increase = useCountStore((store) => store.increase);

  return (
    <main className={styles.page}>
      <p className={styles.eyebrow}>ZUSTAND · 다른 페이지</p>
      <h1>페이지가 달라도 같은 상태</h1>
      <p className={styles.description}>
        이전 페이지에서 변경한 숫자가 그대로 보이면 두 페이지가 같은 store를
        사용하고 있다는 뜻입니다.
      </p>

      <section className={styles.exampleBox}>
        <h2>현재 store의 숫자</h2>
        <strong className={styles.count}>{count}</strong>

        <div className={styles.buttonRow}>
          <button className={styles.button} onClick={increase}>
            이 페이지에서 +1
          </button>
          <Link className={styles.subButton} href="/final/zustand">
            이전 페이지로 돌아가기
          </Link>
        </div>
      </section>

      <p className={styles.note}>
        새로고침하면 메모리에 있던 숫자는 다시 0이 됩니다. access token도 같은
        이유로 새로고침하면 사라지므로 refresh token을 이용해 복구합니다.
      </p>
    </main>
  );
}
