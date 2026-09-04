import Link from "next/link";

type TravelLinkProps = {
  id: string;
  name: string;
};

export default function TravelLink({ id, name }: TravelLinkProps) {
  return (
    //상품 ID를 주소에 넣으면 상품마다 서로 다른 상세 주소를 만들어 줘요
    <Link href={`/travelproducts/${id}`}>{name}</Link>
  );
}
