import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import Header from "@/src/components/common/Header";

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
      <Header />
      <body>{children}</body>
    </html>
  );
}
