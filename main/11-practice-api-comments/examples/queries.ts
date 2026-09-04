import { gql } from "@apollo/client";

// 목록 화면에서는 카드에 필요한 필드만 먼저 요청해요.
export const FETCH_TRAVELPRODUCTS = gql`
  query FetchTravelproducts {
    fetchTravelproducts {
      _id
      name
      price
      remarks
    }
  }
`;

// 상세 화면은 상품 ID를 변수로 받아 데이터 한 개를 요청해요.
export const FETCH_TRAVELPRODUCT = gql`
  query FetchTravelproduct($travelproductId: ID!) {
    fetchTravelproduct(travelproductId: $travelproductId) {
      _id
      name
      price
      remarks
      contents
    }
  }
`;
