import type { TravelProduct } from "./types";

type ProductCardProps = {
    product: TravelProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
    return(
    <article>
      {product.isPopular && <strong>인기 여행</strong>}
      <p>{product.location}</p>
      <h2>{product.title}</h2>
      <p>{product.description ?? "여행 설명을 준비하고 있어요."}</p>
      <p>{product.price.toLocaleString()}원</p>
      <button>{product.title} 자세히 보기</button>
    </article>
    )
}