import Link from "next/link";
import type { ReactNode } from "react";

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ko">
      <body>
        {/* 모든 페이지가 함께 사용하는 부분은 layout에 둬요. */}
        <header>
          <Link href="/">TripTalk</Link>
          <Link href="/login">로그인</Link>
        </header>
        {children}
      </body>
    </html>
  );
}
