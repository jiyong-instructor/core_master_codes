"use client";

import { useState } from "react";
import type { ChangeEvent } from "react";

export default function ImagePreview() {
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  function handleFiles(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.taget.files ?? []);

    // 선택한 File을 브라우저에서 잠깐 볼 수 있는 주소로 바꿔요.
    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls(urls);
  }

  return (
    <div>
      <input type="file" accept="image/*" multiple onChange={handleFiles} />
      {previewUrls.map((url) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img key={url} src={url} alt="미리보기" width={120} />
      ))}
    </div>
  );
}
