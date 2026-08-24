import Link from "next/link";

const products = [
  { id: 1, name: "제주 여행", description: "제주도에서 즐기는 힐링 여행" },
  {
    id: 2,
    name: "서울 여행",
    description: "서울의 다양한 명소를 탐방하는 여행",
  },
  { id: 3, name: "부산 여행", description: "부산의 해변과 맛집을 즐기는 여행" },
];

export default function ProductsPage() {
  return (
    <main>
      <h1>여행 상품 목록</h1>
      {products.map((product) => (
        <div key={product.id}>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <Link href={`/products/${product.id}`}>상품 상세보기</Link>
        </div>
      ))}
    </main>
  );
}
