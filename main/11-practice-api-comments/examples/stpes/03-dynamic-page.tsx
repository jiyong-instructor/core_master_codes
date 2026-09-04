type DetailPageProps = {
  params: Promise<{
    productId: string;
  }>;
};

export default function DetailPage({ params }: DetailPageProps) {
  // [productId]의 폴더의 이름과 params의 productId를 동일하게 맞춥니다.
  const { productId } = await params;

  return (
    <main>
      <h1>여행상품 상세 페이지</h1>
      <p>상품 ID: {productId}</p>
    </main>
  );
}
