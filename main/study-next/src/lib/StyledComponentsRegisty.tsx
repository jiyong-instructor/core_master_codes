"use client";

import { useState } from "react";
import { useServerInsertedHTML } from "next/navigation";
import { ServerStyleSheet, StyleSheetManager } from "styled-components";

type StyledComponentsRegistryProps = {
  children: React.ReactNode;
};

// Next.js 16에서 styled-components를 사용하기 위해서는, 서버 컴포넌트에서 스타일을 렌더링할 수 있도록 설정해야 합니다.
// 이 파일은 외우실 필요가 없고, styled-components를 사용하기 위해서 "처음 한번 만 준비하는 설정" 이라고 이해하시면 됩니다.
export default function StyledComponentsRegistry({
  children,
}: StyledComponentsRegistryProps) {
  const [sheet] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    const styles = sheet.getStyleElement();
    sheet.instance.clearTag();
    return <>{styles}</>;
  });

  if (typeof window !== "undefined") {
    return <>{children}</>;
  }

  return (
    <StyleSheetManager sheet={sheet.instance}>{children}</StyleSheetManager>
  );
}
