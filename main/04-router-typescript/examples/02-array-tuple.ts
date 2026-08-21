// 같은 종류의 값이 여러 개라면 배열 타입을 사용해요.
// string[]은 문자열이 여러 개 들어 있는 배열 이라고 읽어요. 배열 안에는 문자열만 들어갈 수 있어요.
const cities: string[] = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"];

// number[]에는 숫자만 넣을 수 있어요.
const prices: number[] = [10, 20, 30, 40, 50];

// 두 종류 이상의 값을 허용할 때 union 타입을 사용해요. (string | number)[]은 문자열 또는 숫자가 들어 있는 배열이라고 읽어요.
// 괄호로 string | number를 묶고 []를 붙여서 배열 타입을 만들어야 해요. 
// 괄호를 빼면 string[] | number[]로 해석되어 문자열 배열 또는 숫자 배열이 들어 있는 배열이라고 읽혀요.
const productIds: (string | number)[] = [1, 2, "special-5", "CDOSXKE"];


// tuple은 위치마다 타입과 개수가 정해진 배열이에요.
// 예를 들어 [string, number]는 첫 번째 요소는 문자열, 두 번째 요소는 숫자여야 하는 배열이에요.
// 그리고 들어가야 하는 갯수도 정해져 있어요. 예를 들어 [number, number]는 두 개의 요소만 들어갈 수 있어요.
const coordinates: [number, number] = [40.7128, -74.0060]; // 위도와 경도를 나타내는 튜플


// 객체 배열은 객체의 모양도 함께 적어줄 수 있어요.
// 배열 안의 모든 객체는 id와 title이라는 속성을 가지고 있어야 하고, id는 숫자, title은 문자열이어야 해요.
const tripTitles: {id: number; title: string}[] = [
    { id: 1, title: "Trip to New York" },
    { id: 2, title: "Trip to Los Angeles" },
    { id: 3, title: "Trip to Chicago" }
];

// 배열의 타입과 같은 값은 push로 추가할 수 있어요.
cities.push("San Francisco"); // 가능
prices.push(60); // 가능


tripTitles.forEach((trip)=>{
    // trip은 위에서 정한 객체 타입 {id: number; title: string}이기 때문에 id와 title 속성을 사용할 수 있어요.
    console.log(`${trip.id}번 여행: ${trip.title}`);
})
