import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <Link className={styles.logo} href="/">
        NEXT STUDY
      </Link>

      <nav className={styles.menu}>
        <Link href="/">CSS Module</Link>
        <Link href="/tailwind">Tailwind CSS</Link>
        <Link href="/styled-components">styled-components</Link>
        <Link href="/07-http-async-cors">HTTP Async CORS</Link>
        <Link className={styles.apolloLink} href="/apollo">
          Apollo Client
        </Link>
      </nav>
    </header>
  );
}
