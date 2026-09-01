"use client";

import { gql } from "@apollo/client";
import { useMutation, useQuery } from "@apollo/client/react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import type { FormEvent } from "react";
import styles from "../travelproducts.module.css";

// 과제용 API에 등록된 숙박권 상세 정보 API.
const FETCH_TRAVELPRODUCT = gql`
  query FetchTravelproduct($travelproductId: ID!) {
    fetchTravelproduct(travelproductId: $travelproductId) {
      _id
      name
      remarks
      contents
      price
      images
      seller {
        name
      }
    }
  }
`;

// 과제용 API에 등록된 숙박권 문의 목록 API.
const FETCH_QUESTIONS = gql`
  query FetchQuestions($travelproductId: ID!) {
    fetchTravelproductQuestions(travelproductId: $travelproductId) {
      _id
      contents
      user {
        name
      }
    }
  }
`;

// 과제용 API에 등록된 숙박권 문의 답변 목록 API.
const FETCH_ANSWERS = gql`
  query FetchAnswers($questionId: ID!) {
    fetchTravelproductQuestionAnswers(travelproductQuestionId: $questionId) {
      _id
      contents
      user {
        name
      }
    }
  }
`;

// 과제용 API에 등록된 숙박권 문의 생성 API.
const CREATE_QUESTION = gql`
  mutation CreateQuestion($travelproductId: ID!, $contents: String!) {
    createTravelproductQuestion(
      travelproductId: $travelproductId
      createTravelproductQuestionInput: { contents: $contents }
    ) {
      _id
    }
  }
`;

// 과제용 API에 등록된 숙박권 문의 답변 생성 API.
const CREATE_ANSWER = gql`
  mutation CreateAnswer($questionId: ID!, $contents: String!) {
    createTravelproductQuestionAnswer(
      travelproductQuestionId: $questionId
      createTravelproductQuestionAnswerInput: { contents: $contents }
    ) {
      _id
    }
  }
`;

type User = { name: string };
type Question = {
  _id: string;
  contents: string;
  user: User;
};
type Answer = Question; // Answer 타입은 Question 타입과 동일하게 정의됨.
type Product = {
  _id: string;
  name: string;
  remarks: string;
  contents: string;
  price: number;
  images: string[]; // 숙박권 상세에서 여러 이미지가 있을 수 있기에 배열형태.
  seller: User;
};

type ProductData = {
  fetchTravelproduct: Product;
};
type QuestionsData = {
  fetchTravelproductQuestions: Question[];
};
type AnswersData = {
  fetchTravelproductQuestionAnswers: Answer[];
};

const getImageUrl = (path: string) => {
  if (path.startsWith("http")) return path;
  return `https://storage.googleapis.com/${path}`;
};

// 문의 한개의 답변 목록과 답변 입력창입니다.
function AnswerArea({ questionId }: { questionId: string }) {
  const [contents, setContents] = useState("");
  const { data, refetch } = useQuery<AnswersData>(FETCH_ANSWERS, {
    variables: { questionId },
    context: { apiName: "practice" },
  });
  const [createAnswer, { loading }] = useMutation(CREATE_ANSWER);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!contents.trim()) return; // 내용이 비어있으면 제출하지 않음.

    try {
      await createAnswer({
        variables: { questionId, contents },
        context: { apiName: "practice" },
      });
      setContents("");
      await refetch(); // 답변 목록을 다시 가져옴.
    } catch (error) {
      alert(error instanceof Error ? error.message : "답변 등록에 실패했어요.");
    }
  };

  return (
    <div className={styles.answerArea}>
      {data?.fetchTravelproductQuestionAnswers.map((answer) => (
        <p className={styles.answer} key={answer._id}>
          ↳ <b>{answer.user.name}</b> {answer.contents}
        </p>
      ))}

      <form className={styles.answerForm} onSubmit={onSubmit}>
        <input
          placeholder="실습 API에서는 로그인 사용자도 답변할 수 있습니다."
          value={contents}
          onChange={(event) => setContents(event.target.value)}
        />
        <button disabled={loading}>{loading ? "등록 중" : "답변 등록"}</button>
      </form>
    </div>
  );
}

export default function TravelProductDetailPage() {
  const params = useParams<{ travelproductId: string }>();
  const travelproductId = params.travelproductId;
  const [contents, setContents] = useState("");

  const productResult = useQuery<ProductData>(FETCH_TRAVELPRODUCT, {
    variables: { travelproductId },
    context: { apiName: "practice" },
  });

  const questionsResult = useQuery<QuestionsData>(FETCH_QUESTIONS, {
    variables: { travelproductId },
    context: { apiName: "practice" },
  });

  const [createQuestion, { loading: creating }] = useMutation(CREATE_QUESTION);

  const onSubmitQuestion = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!contents.trim()) return; // 내용이 비어있으면 제출하지 않음.

    try {
      await createQuestion({
        variables: { travelproductId, contents },
        context: { apiName: "practice" },
      });
      setContents("");
      await questionsResult.refetch(); // 질문 목록을 다시 가져옴.
    } catch (error) {
      alert(error instanceof Error ? error.message : "문의 등록에 실패했어요.");
    }
  };

  if (productResult.loading) {
    return <main className={styles.page}>상세 정보를 불러오는 중...</main>;
  }

  if (productResult.error || !productResult.data) {
    return (
      <main className={styles.error}>상세 정보를 불러오는 데 실패했어요.</main>
    );
  }

  const product = productResult.data.fetchTravelproduct;

  return (
    <main className={styles.page}>
      <Link className={styles.backLink} href="/practice/travelproducts">
        ← 숙박권 목록
      </Link>

      <section className={styles.detailBox}>
        <div className={styles.detailImage}>
          {product.images?.[0] ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img alt={product.name} src={getImageUrl(product.images[0])} />
          ) : (
            <span>이미지 없음</span>
          )}
        </div>
        <div className={styles.detailInfo}>
          <p>{product.seller?.name || "판매자 이름 없음"}</p>
          <h1>{product.name}</h1>
          <strong>{product.price.toLocaleString()}원</strong>
          <span>{product.remarks}</span>
        </div>
      </section>

      <section className={styles.contentsBox}>
        <h2>상세 설명</h2>
        <p>{product.contents || "등록된 상세 설명이 없습니다."}</p>
      </section>

      <section className={styles.questionSection}>
        <h2>숙박권 문의</h2>
        <p className={styles.guide}>
          실제 서비스라면 판매자만 답변하도록 서버에서 권한을 검사해야 합니다.
          현재 실습 API에서는 로그인 사용자도 답변할 수 있습니다.
        </p>

        <form className={styles.questionForm} onSubmit={onSubmitQuestion}>
          <textarea
            placeholder="숙박권에 관해 궁금한 내용을 입력해 주세요."
            value={contents}
            onChange={(event) => setContents(event.target.value)}
          />
          <button disabled={creating}>
            {creating ? "등록 중" : "문의 등록"}
          </button>
        </form>

        {questionsResult.loading && <p>문의를 불러오는 중...</p>}
        {questionsResult.error && (
          <p className={styles.error}>{questionsResult.error.message}</p>
        )}

        <div className={styles.questionList}>
          {questionsResult.data?.fetchTravelproductQuestions.map((question) => (
            <article className={styles.question} key={question._id}>
              <b>{question.user.name}</b>
              <p>{question.contents}</p>
              <AnswerArea questionId={question._id} />
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
