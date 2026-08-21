// 여러 컴포넌트가 함께 사용할 여행 상품 모양을 type으로 정해요.
export type TravelProduct = {
    id: string;
    title: string;
    price: number;
    location: string;
    description?: string;
    isPopular: boolean;
}