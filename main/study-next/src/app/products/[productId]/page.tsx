import ServerProduct from "@/src/components/test-components/ServerProduct"; // src/components 파일을 절대경로로 불러와요.
import ClientCount from "@/src/components/test-components/ClientCounter"; // src/components 파일을 절대경로로 불러와요.

type ProductDetailPageProps = {
  params: Promise<{ productId: string }>;
};

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { productId } = await params;

  return (
    <div>
      <h1>상품 상세 페이지 - 상품 ID: {productId}</h1>
      <ServerProduct />
      <ClientCount />
    </div>
  );
}
