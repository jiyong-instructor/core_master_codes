"use client";

import { gql, useQuery } from "@apollo/client";

const FETCH_TRAVEL = gql`
  query FetchTravel($travelproductId: ID!) {
    fetchTravelproduct(travelproductId: $travelproductId) {
      _id
      name
      price
    }
  }
`;

type DetailQueryProps = {
  productId: string;
};

export default function DetailQuery({ productId }: DetailQueryProps) {
  const { data, loading, error } = useQuery(FETCH_TRAVEL, {
    // 쿼리에 필요한 변수를 전달합니다.
    variables: {
      travelproductId: productId,
    },
  });

  if (loading) return <p>불러오는 중이에요.</p>;

  return (
    <article>
      <h2>{data.fetchTravelproduct.name}</h2>
      <p>{data.fetchTravelproduct.price.toLocaleString()}원</p>
    </article>
  );
}
