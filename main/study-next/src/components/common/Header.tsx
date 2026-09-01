import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <Link className={styles.logo} href="/">
        NEXT STUDY
      </Link>

      <nav className={styles.menu}>
        <Link href="/">예제목록</Link>
      </nav>
    </header>
  );
}
