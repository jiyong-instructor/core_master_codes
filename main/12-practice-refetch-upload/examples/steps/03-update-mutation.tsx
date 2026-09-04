"use client";

import { gql, useMutation } from "@apollo/client";

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
      name
      price
    }
  }
`;

export default function UpdateMutation() {
  const [updateTravel] = useMutation(UPDATE_TRAVEL);

  async function handleUpdate() {
    await updateTravel({
      variables: {
        // 수정할 상품의 ID와 바꿀 값을 함께 보내요.
        travelproductId: "상품_ID",
        input: {
          name: "수정한 여행 이름",
          price: 120000,
        },
      },
    });

    alert("수정이 완료되었어요.");

    // 페이지 새로고침만 해주면 수정된 글이 보이겟죠?
    // 또는 쿼리 재요청으로도 다시 업데이트 된 화면을 보여줄 수 있습니다.
  }

  return <button onClick={handleUpdate}>여행 수정</button>;
}
