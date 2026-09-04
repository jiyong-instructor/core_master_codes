"use client";

import { useMutation } from "@apollo/client/react";
import { useState } from "react";
import { CREATE_TRAVELPRODUCT, UPLOAD_FILE } from "./operations";

export default function TRavelProductWriteComplete() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [lat, setLat] = useState(37.3466);
  const [lng, setLng] = useState(126.978);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [uploadFile] = useMutation(UPLOAD_FILE);
  const [createTravelproduct] = useMutation(CREATE_TRAVELPRODUCT);

  // 이미지 업로드 하는 함수
  async function handleFiles(files: File[]) {
    const results = await Promise.all(
      files.map((file) => uploadFile({ variables: { file } })),
    );
    setImageUrls(results.map((result) => result.data.uploadFile.url));
  }

  // 주소 좌표 받아오는 함수
  async function handleAddress(selectedAddress: string) {
    const response = await fetch(
      `/api/geocode?address=${encodeURIComponent(selectedAddress)}`,
    );
    const coordinate = (await response.json()) as { lat: number; lng: number };

    setAddress(selectedAddress);
    setLat(coordinate.lat);
    setLng(coordinate.lng);
  }

  async function handleSubmit() {
    await createTravelproduct({
      variables: {
        input: {
          name,
          remarks: "한 줄 설명",
          contents: "상세 설명",
          price: 50000,
          images: imageUrls,
          travelproductAddress: { address, lat, lng },
        },
      },
    });
  }

  return (
    <div>
      <input value={name} onChange={(event) => setName(event.target.value)} />
      <button onClick={() => handleAddress("서울특별시 중구 세종대로 110")}>
        주소 선택 예시
      </button>
      <input value={address} readOnly />
      <input type="number" value={lat} readOnly />
      <input type="number" value={lng} readOnly />
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={(event) => handleFiles(Array.from(event.target.files ?? []))}
      />
      <button onClick={handleSubmit}>숙박권 등록</button>
    </div>
  );
}
