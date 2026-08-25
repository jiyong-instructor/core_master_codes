import TripCard from "./TripCard";

const products = [
  { id: "1", title: "제주 바다 산책", location: "제주", price: 35000 },
  { id: "2", title: "서울 야경 투어", location: "서울", price: 28000 },
];

export default function ProductList() {
  return (
    <section>
      <h1>추천 여행</h1>
      <div>
        {/* API 전에는 작은 임시 배열로 화면 자리를 먼저 만들어요. */}
        {products.map((product) => (
          <TripCard key={product.id} {...product} />
        ))}
      </div>
    </section>
  );
}
