import TripCard from "../TripCard";
import styles from "./04-grid-list.module.css";

const products = [
  { id: "1", title: "제주 여행", location: "제주", price: 78000 },
  { id: "2", title: "부산 여행", location: "부산", price: 55000 },
  { id: "3", title: "서울 여행", location: "서울", price: 42000 },
  { id: "4", title: "경주 여행", location: "경주", price: 63000 },
];

export default function GridListExample() {
  return (
    <div className={styles.grid}>
      {/* 화면 너비는 CSS가, 반복되는 데이터는 React가 담당해요. */}
      {products.map((product) => <TripCard key={product.id} {...product} />)}
    </div>
  );
}
