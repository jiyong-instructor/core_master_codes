// type을 사용하면 자주 사용할 타입에 이름을 붙일 수 있어요.
// ProductId는 문자열 또는 숫자라는 뜻이에요.
type ProductId = string | number;

// 리터럴 타입
// 리터럴 타입은 특정 값만 허용하는 타입이에요.
let loadingStatus: "loading" | "success" | "error" = "loading"; // loading, success, error 중 하나만 들어갈 수 있어요.

// Narrowing
// Narrowing은 union 타입에서 특정 타입으로 좁히는 것을 의미해요.
// 예를 들어, ProductId는 string 또는 number일 수 있지만, 실제로는 어떤 타입이 들어올지 알 수 없어요.
// 따라서 narrowing을 통해 타입을 좁혀야 해요.
function printProductId(productId: ProductId) {
    // 위 union 타입은 어떤 타입이 들어올지 알 수 없기 때문에, narrowing을 통해 타입을 좁혀야 해요.
    if (typeof productId === "string") {
        console.log(`Product ID is a string: ${productId}`);
        return;
    } else {
        console.log(`Product ID is a number: ${productId}`);
        return;
    }
}

// Narrowing을 통해 타입을 좁혀서 여러가지 작업을 할 수 있어요.
function makeProductPath(productId: ProductId) {
    // number일 때와 string일 때를 구분해서 다른 주소를 만들어요.
    if (typeof productId === "number") {
        return `/products/${productId}`;
    }
    // 여기에서 productId는 string이므로 toLowerCase를 사용할 수 있어요.
    return `/special-products/${productId.toLowerCase()}`;
}