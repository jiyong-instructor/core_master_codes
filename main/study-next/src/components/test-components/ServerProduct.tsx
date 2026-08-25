// 기본은 서버 컴포넌트에요

import ClientCount from "./ClientCounter"; // 이 컴포넌트는 클라이언트 컴포넌트 에요.

export default function ServerProduct() {
  return (
    <div>
      <h1>서버 컴포넌트</h1>
      <ClientCount />
    </div>
  );
}
