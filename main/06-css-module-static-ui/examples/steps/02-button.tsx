import styles from "./02-button.module.css";

type ButtonProps = {
  children: string;
  variant?: "primary" | "secondary";
};

export default function Button({ children, variant = "primary" }: ButtonProps) {
  // CSS Module의 class 이름은 styles 객체에서 꺼내 사용해요.
  const className = `${styles.button} ${styles[variant]}`;
  return <button className={className}>{children}</button>;
}
