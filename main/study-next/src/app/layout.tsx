import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import Header from "@/src/components/common/Header";
import StyledComponentsRegistry from "@/src/lib/StyledComponentsRegisty";
import ApolloSetting from "@/src/lib/ApolloSetting";
// import { AuthProvider } from "@/src/contexts/AuthContext";
import AuthRestore from "../components/auth/AuthRestore";
import ReactQuerySetting from "../lib/ReactQuerySetting";

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
      <body>
        {/*
          HOC로 StyledComponentsRegistry를 감싸서, styled-components를 사용할 수 있도록 설정합니다.
          HOC는 Higher Order Component의 약자로, 컴포넌트를 감싸서 기능을 확장하는 패턴입니다.
        */}
        {/*
          서버에서 내려온 HTML과 브라우저의 첫 화면 구조가 같아야 합니다.
          그래서 body를 html 바로 아래에 두고, Provider와 Header는 body 안에서 감쌉니다.
        */}
        <StyledComponentsRegistry>
          <ReactQuerySetting>
            <ApolloSetting>
              <AuthRestore />
              <Header />
              {children}
            </ApolloSetting>
          </ReactQuerySetting>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
