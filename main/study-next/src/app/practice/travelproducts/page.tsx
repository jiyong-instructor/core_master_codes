"use client";

import { useQuery } from "@apollo/client/react";
import Link from "next/link";
import { useState } from "react";
import type { FormEvent } from "react";
import styles from "../practice.module.css";
import { FetchTravelproductsDocument } from "@/src/gql/graphql";

const categories = ["전체", "아파트", "호텔", "캠핑", "룸 서비스"];

const getImageUrl = (path: string) => {
  if (path.startsWith("http")) return path;
  return `https://storage.googleapis.com/${path}`;
};

export default function PracticeTravelproductsPage() {
  const [keyword, setKeyword] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("전체");

  const { data, loading, error } = useQuery(FetchTravelproductsDocument, {
    // 과제 API에는 category 인자가 없어서 선택한 분류명을 search로 보내요.
    variables: { page: 1, search, isSoldout: false },
    context: { apiName: "practice" },
  });

  const onSubmitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCategory("전체");
    setSearch(keyword);
  };

  const onClickCategory = (selectedCategory: string) => {
    setCategory(selectedCategory);
    setKeyword("");
    setSearch(selectedCategory === "전체" ? "" : selectedCategory);
  };

  return (
    <main className={styles.page}>
      <div className={styles.titleArea}>
        <p>CATEGORY + SEARCH</p>
        <h1>숙박권 분류와 검색</h1>
        <span>카드를 누르면 기존 숙박권 상세·문의 예제로 이동해요.</span>
      </div>

      <form className={styles.searchRow} onSubmit={onSubmitSearch}>
        <input
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
          placeholder="숙박권 이름을 검색해 주세요."
        />
        <button type="submit">검색</button>
      </form>

      <div className={styles.categoryRow}>
        {categories.map((item) => (
          <button
            className={category === item ? styles.active : ""}
            type="button"
            key={item}
            onClick={() => onClickCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>

      {loading && <p className={styles.message}>숙박권을 불러오는 중...</p>}
      {error && <p className={styles.message}>{error.message}</p>}

      <section className={styles.productList}>
        {data?.fetchTravelproducts.map((product) => (
          <Link
            className={styles.productCard}
            href={`/practice/travelproducts/${product._id}`}
            key={product._id}
          >
            <div className={styles.imageBox}>
              {product.images?.[0] ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={getImageUrl(product.images[0])} alt={product.name} />
              ) : (
                <span>이미지 없음</span>
              )}
            </div>
            <div className={styles.productText}>
              <h2>{product.name}</h2>
              <p>{product.remarks}</p>
              <div className={styles.productBottom}>
                <span>{product.seller?.name ?? "판매자"}</span>
                <strong>{(product.price ?? 0).toLocaleString()}원</strong>
              </div>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}
