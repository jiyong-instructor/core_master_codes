"use client";

import { useState } from "react";

export default function AddressCoordinateMap() {
  const [address, setAddress] = useState("");
  const [lat, setLat] = useState("37.5665");
  const [lng, setLng] = useState("126.9768");

  async function selectAddress(selectedAddress: string) {
    setAddress(selectAddress);

    // 주소 검색에서 선택한 순간에만 좌표 API를 한번 호출해요
    const response = await fetch(
      `/api/geocode?address=${encodeURIComponent(selectAddress)}`,
    );
    const coordinate = (await response.json()) as { lat: number; lng: number };

    setLat(String(coordinate.lat));
    setLng(String(coordinate.lng));
  }

  return (
    <div>
      <button onClick={() => selectAddress("서울특별시 중구 세종대로 110")}>
        주소 선택 예시
      </button>
      <input value={address} readOnly />
      <input value={lat} readOnly />
      <input value={lng} readOnly />

      <p>선택한 주소: {address}</p>
      <p>
        지도에 표시할 좌표: {lat}, {lng}
      </p>
    </div>
  );
}
