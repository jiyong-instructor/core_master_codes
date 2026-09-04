"use client";

import { useMutation } from "@apollo/client";
import type { ChangeEvent } from "react";
import { UPLOAD_FILE } from "../operations";

export default function UploadMultiplUe() {
  const [uploadFile] = useMutation(UPLOAD_FILE);

  async function handleFiles(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);

    // map 반복문을 이용해서 파일의 업로드 Promise를 만들어요.
    const uploadPromises = files.map((file) =>
      uploadFile({ variables: { file } }),
    );

    // Promise.all은 여러 업로드가 모두 끝날 때까지 기다립니다.
    const results = await Promise.all(uploadPromises);
    const imageUrls = results.map((result) => result.data.uploadFile.url);

    console.log("상품 등록에 넣을 이미지 주소", imageUrls);
  }

  return <input type="file" accept="image/*" multiple onChange={handleFiles} />;
}
