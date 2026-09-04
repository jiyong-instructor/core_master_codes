"use client";

import { gql, useMutation } from "apollo/client";

const FETCH_TRAVEL = gql`
  query FetchTravel($travelproductId: ID!) {
    fetchTravelproduct(travelproductId: $travelproductId) {
      _id
      name
      price
    }
  }
`;

const UPDATE_TRAVEL = gql`
  mutation UpdateTravel(
    $travelproductId: ID!
    $input: UpdateTravelproductInput!
  ) {
    updateTravelproduct(
      travelproductId: $travelproductId
      updateTravelproductInput: $input
    ) {
      _id
    }
  }
`;

export default function RefetchDetail() {
  const productId = "상품 ID";
  const [updateTravel] = useMutation(UPDATE_TRAVEL);

  async function handleUpdate() {
    await updateTravel({
      variables: {
        travelproductId: productId,
        input: {
          name: "새로운 여행 이름",
        },
      },
      // mutation 뒤에 상세 query를 다시 실행해서 최신 화면을 만들어요.
      refetchQueries: [
        {
          query: FETCH_TRAVEL,
          variables: { travelproductId: productId },
        },
      ],
    });
  }

  return <button onClick={handleUpdate}>수정 후 다시 조회</button>;
}
