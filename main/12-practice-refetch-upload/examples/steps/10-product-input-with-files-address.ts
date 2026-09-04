const name = "제주 바다 숙소";
const imageUrls = ["image-a.jpg", "image-b.jpg"];
const address = "제주특별자치도 제주시";
const addressDetail = "101호";
const lat = 33.4996;
const lng = 126.5312;

// 앞 단계에서 얻은 값을 상품 등록 input 하나로 합쳐요.
export const createTravelproductInput = {
  name,
  remarks: "바다가 보이는 숙소입니다.",
  contents: "편안하게 쉬어 갈 수 있는 숙소입니다.",
  price: 50000,
  tags: ["#제주", "#바다"],
  images: imageUrls,
  travelproductAddress: {
    address,
    addressDetail,
    lat,
    lng,
  },
};
