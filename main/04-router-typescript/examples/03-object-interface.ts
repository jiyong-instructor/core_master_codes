// interface는 객체가 어떤 property를 가지고 있는지, 그리고 각 property의 타입이 무엇인지 정의할 수 있어요.
interface TravelProduct {
    // 각 property 이름 뒤에 들어갈 값의 타입을 적어주면 되요.
    id: string;
    name: string;
    price: number;
    location: string;

    description?: string; // description 속성은 선택적(optional) 속성이에요. 있어도 되고 없어도 돼요.

    tags: string[]; // tags 속성은 문자열 배열이에요. 여러 개의 문자열을 담을 수 있어요.
}

// product 객체는 TravelProduct 인터페이스를 따르기 때문에, TravelProduct에서 정의한 모든 속성을 가지고 있어야 해요.
const product: TravelProduct = {
    id: "TP001",
    name: "Trip to New York",
    price: 1000,
    location: "New York",
    tags: ["city", "sightseeing", "culture"]
};

// descriptiondms 옵셔널 이기 때문에 나중에 추가해 줄 수도 있어요.
product.description = "A wonderful trip to the city that never sleeps."; // 선택적 속성이기 때문에 나중에 추가할 수도 있어요.


// 매개변수에도 interface를 붙이면 함수 안에서 객체의 모양을 알 수 있어요.
function printProduct(productData: TravelProduct) {
    console.log(`Product ID: ${productData.description ?? '아직 설명이 없어요'}`);
}