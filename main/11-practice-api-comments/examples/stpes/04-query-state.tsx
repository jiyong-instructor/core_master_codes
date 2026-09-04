"use client";
// 서버 컴포넌트가 아닌 클라이언트 컴포넌트에서 쿼리 상태를 관리하기 위해 "use client"를 사용합니다.

import { gql, useQuery } from "@apollo/client";

// GraphQL 쿼리를 정의합니다. 여기서는 여행 상품 목록을 가져오는 쿼리를 작성합니다.
const FETCH_TRAVELS = gql`
  query FetchTravels {
    travels {
      id
      name
      description
    }
  }
`;

export default function QueryState() {
  const { data, loading, error } = useQuery(FETCH_TRAVELS);

  // 서버의 응답을 기다리는 동안 먼저 보여주는 화면이에요.
  if (loading) return <p>불러오는 중이에요.</p>;

  // 요청이 실패했을 때 빈 화면 대신 안내 문구를 보여줘요.
  if (error) return <p>목록을 불러오지 못했어요.</p>;

  // 목록이 비어 있는 경우도 따로 처리하면 사용자가 덜 헷갈려요.
  //   if (data.fetchTravelproducts.length === 0) {
  //     return <p>등록된 여행이 없어요.</p>;
  //   }
  // 또는 옵셔널 체이닝을 사용해서 안전하게 접근할 수도 있어요.
  if (data?.fetchTravelproducts?.length === 0) {
    return <p>등록된 여행이 없어요.</p>;
  }

  return <p>첫 번째 여행 상품: {data?.fetchTravelproducts?.[0]?.name}</p>;
}
