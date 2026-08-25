import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import Header from "@/src/components/common/Header";
import StyledComponentsRegistry from "@/src/lib/StyledComponentsRegisty";

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next 스터디",
  description: "넥스트를 공부해요",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={notoSansKr.className}>
      {/*
        HOC로 StyledComponentsRegistry를 감싸서, styled-components를 사용할 수 있도록 설정합니다.
        HOC는 Higher Order Component의 약자로, 컴포넌트를 감싸서 기능을 확장하는 패턴입니다.
      */}
      <StyledComponentsRegistry>
        <Header />
        <body>{children}</body>
      </StyledComponentsRegistry>
    </html>
  );
}
