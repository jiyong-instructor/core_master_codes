import styles from "./03-flex-layout.module.css";

export default function FlexLayoutExample() {
  return (
    <header className={styles.header}>
      <strong>TripTalk</strong>
      <nav className={styles.navigation}>
        <span>여행상품</span>
        <span>여행커뮤니티</span>
      </nav>
      <div className={styles.account}>로그인</div>
    </header>
  );
}
