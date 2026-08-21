// price와 count를 매개변수(인자)로 받아서 총합을 계산하는 함수에요. 반환 타입은 number로 지정했어요.
function calculateTotal(price: number, count: number): number {
    return price * count;
}

// discountRate 뒤의 = 0은 값을 생략했을 때 사용할 기본값이에요.
function calculateDiscount(totalPrice: number, discountRate: number = 0): number {
  return totalPrice - totalPrice * discountRate;
}

// 함수의 모양 자체에도 타입 이름을 붙일 수 있어요.
// Formatter는 숫자 하나를 받아 문자열을 반환하는 함수예요.
type Formatter = (price: number) => string;

// formatPrice가 Formatter의 약속을 지키는지 TypeScript가 확인해요.
const formatPrice: Formatter = (price) => {
    return `${price.toLocaleString()}원`;
}

// 함수에 전달한 값도 매개변수에서 정한 타입과 같아야 해요.
const totalPrice = calculateTotal(78000, 2);
const discountedPrice = calculateDiscount(totalPrice, 0.1);

// 원하는 값을 안전하게 얻어서 출력할 수 있게되요.
console.log(`할인 전: ${formatPrice(totalPrice)}`);
console.log(`할인 후: ${formatPrice(discountedPrice)}`);
