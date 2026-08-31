type AuthScreeneProps = {
  accessToken: string;
};

export default function AuthScreen({ accessToken }: AuthScreeneProps) {
  // token이 있으면 로그인한 사용자용 메뉴를 보여 줍니다.
  // 이것은 화면을 나누는 UI 처리이며 서버 권한 검사를 대신하지 않아요.
  return accessToken ? <p>마이페이지 | 로그아웃</p> : <p>로그인 | 회원가입</p>;
}
