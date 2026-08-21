// generic은 사용하는 순간에 안쪽 타입을 정할 수 있는 빈칸과 비슷해요.
// Data라는 이름의 빈칸을 만들어서 ApiResponse를 사용할 때 Data에 들어갈 타입을 정할 수 있어요.
type ApiResponse<Data> = {
    // 실제 data의 타입은 ApiResponse를 사용할 때 정해져요.
    data: Data;
    message: string;
};

// 첫 번째 응답에서 사용할 상품 타입이에요.
type Product = {
    id: string;
    name: string;
};
// 두 번째 응답에서 사용할 회원 타입이에요.
type ApiUser = {
    id: string;
    nickname: string;
};

// Data 자리에 Product를 넣어서 ApiResponse<Product> 타입을 만들었어요.
// 즉 response.data는 Product 타입 모양입니다.
const response: ApiResponse<Product> = {
    data: { id: "product-1", name: "Apple iPhone Ultra"},
    message: "Success"
};

// Data 자리에 ApiUser[]를 넣어서 ApiResponse<ApiUser[]> 타입을 만들었어요.
const userResponse: ApiResponse<ApiUser[]> = {
    data: [
        { id: "user-1", nickname: "Alice" },
        { id: "user-2", nickname: "Bob" },
        { id: "user-3", nickname: "Charlie" }
    ],
    message: "Success"
};

// 함수에서도 generic을 사용할 수 있어요.
// 백엔드에서 어떤 데이터가 오더라도 message를 가진 ApiResponse 타입으로 감싸서 반환할 수 있어요.
function printResponseMessage<Data>(apiResponse: ApiResponse<Data>) {
    console.log(apiResponse.message);
}

// 같은 ApiResponse 타입이지만, Data 자리에 들어가는 타입이 달라요.
console.log(response.data.name); // Product 타입이므로 name 속성을 사용할 수 있어요.
console.log(userResponse.data[0].nickname); // User[] 타입이므로 배열의 첫 번째 요소의 nickname 속성을 사용할 수 있어요.