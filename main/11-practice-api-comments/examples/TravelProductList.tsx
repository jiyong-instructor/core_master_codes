"use client";

import { useQuery } from "@apollo/client";
import Link from "next/link";
import { FETCH_TRAVELPRODUCTS } from "./stpes/01-fetch-travelproducts";

type TravelProduct = {
  _id: string;
  name: string;
  price: number;
};

export default function TravelProductList() {
  const { data, loading, error } = useQuery(FETCH_TRAVELPRODUCTS);

  if (loading) return <p>여행을 불러오는 중이에요...</p>;
  if (error)
    return <p>여행을 불러오는 중에 에러가 발생했어요: {error.message}</p>;
  if (!data) return <p>등록된 여행 상품 정보가 없어요.</p>;

  return (
    <ul>
      {data.fetchTravelproducts.map((product: TravelProduct) => (
        <li key={product._id}>
          {/* 클릭한 상품의 ID를 다음 주소에 넣어요. */}
          <Link href={`/travelproducts/${product._id}`}>
            {product.name} / {product.price.toLocaleString()}원
          </Link>
        </li>
      ))}
    </ul>
  );
}
