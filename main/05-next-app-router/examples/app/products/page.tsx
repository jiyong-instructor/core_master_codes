import Link from "next/link";

const products = [
  { id: "1", name: "제주 여행" },
  { id: "2", name: "부산 여행" },
];

export default function ProductsPage() {
  return (
    <main>
      <h1>여행상품 목록</h1>
      {products.map((product) => (
        // Link는 문서 전체를 새로 받지 않고 Next 안에서 화면을 이동해요.
        <Link key={product.id} href={`/products/${product.id}`}>{product.name}</Link>
      ))}
    </main>
  );
}
