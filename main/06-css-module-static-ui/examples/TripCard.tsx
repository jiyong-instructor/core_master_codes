import styles from "./TripCard.module.css";

type TripCardProps = {
  title: string;
  location: string;
  price: number;
};

export default function TripCard({ title, location, price }: TripCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.image}>여행 사진</div>
      <p className={styles.location}>{location}</p>
      <h2 className={styles.title}>{title}</h2>
      <strong>{price.toLocaleString()}원</strong>
    </article>
  );
}
