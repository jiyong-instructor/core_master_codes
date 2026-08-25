import styles from "./05-state-class.module.css";

export default function StateClassExample({ isSuccess }: { isSuccess: boolean }) {
  const statusClass = isSuccess ? styles.success : styles.error;

  // 기본 class와 상태 class를 문자열로 함께 연결해요.
  return (
    <p className={`${styles.message} ${statusClass}`}>
      {isSuccess ? "저장했습니다." : "저장하지 못했습니다."}
    </p>
  );
}
