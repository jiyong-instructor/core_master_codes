import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import Image from "next/image";
import "./globals.css";

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "지용이의 여행 상품 목록",
  description: "여행 상품 목록을 보여주는 페이지입니다.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={notoSansKr.className}>
      <div>
        <h1>이 사이트의 배너</h1>
        <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
      </div>
      <body>{children}</body>
    </html>
  );
}
