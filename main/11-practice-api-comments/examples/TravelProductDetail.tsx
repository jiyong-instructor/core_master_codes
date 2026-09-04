"use client";

import { useQuery } from "@apollo/client";
import { FETCH_TRAVELPRODUCT } from "./stpes/01-fetch-travelproducts";

type TravelProductDetailProps = {
  productId: string;
};

export default function TravelProductDetail({
  productId,
}: TravelProductDetailProps) {
  const { data, loading, error } = useQuery(FETCH_TRAVELPRODUCT, {
    variables: { travelproductId: productId },
  });

  if (loading) return <p>여행 상품 정보를 불러오는 중이에요...</p>;
  if (error)
    return (
      <p>여행 상품 정보를 불러오는 중에 에러가 발생했어요: {error.message}</p>
    );

  return (
    <article>
      <h1>{data?.fetchTravelproduct?.name}</h1>
      <p>가격: {data?.fetchTravelproduct?.price.toLocaleString()}원</p>
      <p>설명: {data?.fetchTravelproduct?.description}</p>
    </article>
  );
}
