import { gql } from "@apollo/client";

// 파일 업로드 api
export const UPLOAD_FILE = gql`
  mutation UploadFile($file: Upload!) {
    uploadFile(file: $file) {
      url
    }
  }
`;

// 수정 뒤 최신 상세 내용을 다시 받을 때 사용하는 query api
export const FETCH_TRAVELPRODUCT = gql`
  query FetchTravelproduct($travelproductId: ID!) {
    fetchTravelproduct(travelproductId: $travelproductId) {
      _id
      name
      remarks
      price
      contents
    }
  }
`;

// 등록 input을 보내고 새로 만들어진 상품 ID를 받는 api
export const CREATE_TRAVELPRODUCT = gql`
  mutation CreateTravelproduct($input: CreateTravelproductInput!) {
    createTravelproduct(createTravelproductInput: $input) {
      _id
    }
  }
`;

// 수정할 상품 ID와 바꿀 input을 함께 보내는 api
export const UPDATE_TRAVELPRODUCT = gql`
  mutation UpdateTravelproduct(
    $travelproductId: ID!
    $input: UpdateTravelproductInput!
  ) {
    updateTravelproduct(
      travelproductId: $travelproductId
      updateTravelproductInput: $input
    ) {
      _id
      name
    }
  }
`;
