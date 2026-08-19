export default function ExpressionExample() {
    
    const price = 30000;
    const count = 2;
    const isSoldOut = false;

    return (
        <>
            {/* 계산식과 삼항 연산자도 중괄호 안에서 사용할 수 있어요. */}
            <h1>상품 가격: {price}원</h1>
            <h2>구매 수량: {count}개</h2>
            <h3>총 가격: {price * count}원</h3>
            <p>{isSoldOut ? "품절" : "판매중"}</p>
        </>
    )

}