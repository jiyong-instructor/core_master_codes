"use client";

import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import Link from "next/link";
import styles from "./travelproducts.module.css";

// 과제용 API에 등록된 숙박권 목록을 가져옵니다.
const FETCH_TRAVELPRODUCTS = gql`
  query FetchTravelproducts($page: Int) {
    fetchTravelproducts(page: $page) {
      _id
      name
      remarks
      price
      images
      seller {
        name
      }
    }
  }
`;

type Travelproduct = {
  _id: string;
  name: string;
  remarks: string;
  price: number;
  images: string[];
  seller: {
    name: string;
  };
};

type FetchTravelproductsData = {
  fetchTravelproducts: Travelproduct[];
};

// API는 이미지의 전체 주소가 아니라 저장 경로만 주므로 앞 주소를 붙입니다.
const getImageUrl = (path: string) => {
  if (path.startsWith("http")) return path;
  return `https://storage.googleapis.com/${path}`;
};

export default function TravelproductsPage() {
  const { data, loading, error } = useQuery<FetchTravelproductsData>(
    FETCH_TRAVELPRODUCTS,
    {
      variables: { page: 1 },
      context: { apiName: "practice" }, // 과제용 API 선택을 위해서 지정
    },
  );

  if (loading)
    return <main className={styles.page}>숙박권을 불러오는 중...</main>;
  if (error) return;
  <main className={styles.error}>
    숙박권을 불러오는 중 오류가 발생했습니다.
  </main>;

  return (
    <main className={styles.page}>
      <div className={styles.titleArea}>
        <p>과제용 API</p>
        <h1>숙박권 목록</h1>
        <span>카드를 누르면 상세 페이지와 문의 영역으로 이동합니다.</span>
      </div>

      <section className={styles.productList}>
        {data?.fetchTravelproducts.map((product) => (
          <Link
            className={styles.productCard}
            href={`/practice/travelproducts/${product._id}`}
            key={product._id}
          >
            <div className={styles.imageBox}>
              {product.images?.[0] ? (
                // 외부 이미지 주소도 바로 확인할 수 있도록 기본 img 태그를 사용합니다. <Image> 대신 <img> 사용
                // eslint-disable-next-line @next/next/no-img-element
                <img alt={product.name} src={getImageUrl(product.images[0])} />
              ) : (
                <span>이미지 없음</span>
              )}
            </div>
            <h2>{product.name}</h2>
            <p>{product.remarks || "숙박권 소개가 없습니다."}</p>
            <div className={styles.cardBottom}>
              <span>{product.seller?.name || "판매자 정보 없음"}</span>
              <b>{product.price.toLocaleString()}원</b>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}
