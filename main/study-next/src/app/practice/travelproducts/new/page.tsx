"use client";

import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { uploadImage } from "@/src/lib/upload-image";
import styles from "../travelproducts.module.css";

const CREATE_TRAVELPRODUCT = gql`
  mutation CreateTravelproduct($input: CreateTravelproductInput!) {
    createTravelproduct(createTravelproductInput: $input) {
      _id
    }
  }
`;

type DaumPostcode = new (options: {
  oncomplete: (data: { address: string }) => void;
}) => { open: () => void };

declare global {
  interface Window {
    daum?: { Postcode: DaumPostcode };
  }
}

type CreateData = {
  createTravelproduct: { _id: string };
};

const getImageUrl = (path: string) => {
  if (path.startsWith("http")) return path;
  return `https://storage.googleapis.com/${path}`;
};

export default function TravelproductNewPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [remarks, setRemarks] = useState("");
  const [contents, setContents] = useState("");
  const [price, setPrice] = useState(0);
  const [tags, setTags] = useState("");
  const [address, setAddress] = useState("");
  const [addressDetail, setAddressDetail] = useState("");
  const [lat, setLat] = useState("37.5665");
  const [lng, setLng] = useState("126.9780");
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [geocoding, setGeocoding] = useState(false);

  const [createTravelproduct, { loading }] =
    useMutation<CreateData>(CREATE_TRAVELPRODUCT);

  const onClickAddressSearch = () => {
    const Postcode = window.daum?.Postcode;

    if (!Postcode) {
      alert("주소 검색 스크립트를 불러오는 중입니다.");
      return;
    }

    new Postcode({
      oncomplete: async (data) => {
        setAddress(data.address);
        setGeocoding(true);

        try {
          // 선택한 주소를 좌표로 바꾼 뒤 위도·경도 state를 함께 갱신해요.
          const response = await fetch(
            `/api/geocode?address=${encodeURIComponent(data.address)}`,
          );
          const coordinate = (await response.json()) as {
            lat?: number;
            lng?: number;
            message?: string;
          };

          if (
            !response.ok ||
            coordinate.lat === undefined ||
            coordinate.lng === undefined
          ) {
            throw new Error(coordinate.message ?? "좌표를 찾지 못했어요.");
          }

          setLat(String(coordinate.lat));
          setLng(String(coordinate.lng));
        } catch (error) {
          alert(
            error instanceof Error ? error.message : "좌표 검색에 실패했어요.",
          );
        } finally {
          setGeocoding(false);
        }
      },
    }).open();
  };

  const onChangeFiles = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    if (files.length === 0) return;

    const validFiles = files.filter((file) => {
      if (!file.type.startsWith("image/")) return false;
      if (file.size > 5 * 1024 * 1024) return false;
      return true;
    });

    if (validFiles.length !== files.length) {
      alert("이미지 파일만 가능하며 파일당 5MB 이하여야 합니다.");
    }

    try {
      setUploading(true);

      // 여러 파일 업로드가 모두 끝나면 URL 배열을 state에 저장해요.
      const uploadedUrls = await Promise.all(
        validFiles.map((file) => uploadImage(file)),
      );
      setImageUrls((previous) => [...previous, ...uploadedUrls]);
    } catch (error) {
      alert(error instanceof Error ? error.message : "업로드에 실패했어요.");
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name || !remarks || !contents || price <= 0) {
      alert("숙박권 정보와 가격을 입력해 주세요.");
      return;
    }

    if (imageUrls.length === 0) {
      alert("이미지를 한 장 이상 업로드해 주세요.");
      return;
    }

    try {
      const result = await createTravelproduct({
        variables: {
          input: {
            name,
            remarks,
            contents,
            price,
            tags: tags
              .split(",")
              .map((tag) => tag.trim())
              .filter((tag) => tag !== ""),
            images: imageUrls,
            travelproductAddress: {
              address,
              addressDetail,
              lat: Number(lat),
              lng: Number(lng),
            },
          },
        },
        context: { apiName: "practice" },
      });

      const productId = result.data?.createTravelproduct._id;
      if (productId) router.push(`/practice/travelproducts/${productId}`);
    } catch (error) {
      alert(
        error instanceof Error ? error.message : "숙박권 등록에 실패했어요.",
      );
    }
  };

  const mapLat = Number(lat) || 37.5665;
  const mapLng = Number(lng) || 126.978;
  const mapUrl =
    `https://www.openstreetmap.org/export/embed.html?` +
    `bbox=${mapLng - 0.01}%2C${mapLat - 0.01}%2C${mapLng + 0.01}%2C${mapLat + 0.01}` +
    `&layer=mapnik&marker=${mapLat}%2C${mapLng}`;

  return (
    <main className={styles.page}>
      <Script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js" />

      <div className={styles.titleArea}>
        <p>DAY 12 · CREATE + UPLOAD + ADDRESS</p>
        <h1>숙박권 등록</h1>
        <span>입력값, 이미지 URL, 주소와 좌표를 하나의 input으로 합쳐요.</span>
      </div>

      <form className={styles.writeForm} onSubmit={onSubmit}>
        <label>
          숙박권명
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>

        <label>
          한 줄 설명
          <input
            value={remarks}
            onChange={(event) => setRemarks(event.target.value)}
          />
        </label>

        <label>
          상세 설명
          <textarea
            value={contents}
            onChange={(event) => setContents(event.target.value)}
          />
        </label>

        <div className={styles.twoColumns}>
          <label>
            가격
            <input
              type="number"
              value={price || ""}
              onChange={(event) => setPrice(Number(event.target.value))}
            />
          </label>
          <label>
            태그
            <input
              value={tags}
              onChange={(event) => setTags(event.target.value)}
              placeholder="#바다, #제주"
            />
          </label>
        </div>

        <fieldset>
          <legend>이미지 여러 장 업로드</legend>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={onChangeFiles}
          />
          <p>
            {uploading ? "업로드 중..." : `${imageUrls.length}장 업로드 완료`}
          </p>
          <div className={styles.previewList}>
            {imageUrls.map((url) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={url} src={getImageUrl(url)} alt="업로드 이미지" />
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend>주소와 지도</legend>
          <div className={styles.addressRow}>
            <input
              value={address}
              readOnly
              placeholder="주소를 검색해 주세요."
            />
            <button type="button" onClick={onClickAddressSearch}>
              주소 검색
            </button>
          </div>
          <input
            value={addressDetail}
            onChange={(event) => setAddressDetail(event.target.value)}
            placeholder="상세 주소"
          />

          <div className={styles.twoColumns}>
            <label>
              위도(lat) · 자동 입력
              <input value={lat} readOnly />
            </label>
            <label>
              경도(lng) · 자동 입력
              <input value={lng} readOnly />
            </label>
          </div>

          {geocoding && <p>선택한 주소의 좌표를 찾고 있어요...</p>}
          <iframe
            className={styles.map}
            title="입력한 좌표의 지도"
            src={mapUrl}
          />
        </fieldset>

        <button
          className={styles.submitButton}
          disabled={loading || uploading || geocoding}
        >
          {loading ? "등록 중..." : "숙박권 등록"}
        </button>
      </form>
    </main>
  );
}
