// 수업에서는 별도 상태 관리 라이브러리 없이 가장 작은 저장 함수부터 확인해요.
// sessionStorage는 현재 탭을 닫으면 사라지므로 학습 흐름을 확인하기 편합니다.

const ACCESS_TOKEN_KEY = "accessToken";

export function saveAccessToken(accessToken: string) {
  // 서버 렌더링일 경우에는 window가 없으므로 브라우저에서만 저장해야 해요.
  if (typeof window === "undefined") return; // Next.js 서버 환경에서는 window가 없으므로 저장하지 않음

  sessionStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
}

export function getAccessToken() {
  // 서버에서는 빈 문자열을 변환해서 하이드레이션 차이를 피합니다.
  if (typeof window === "undefined") return "";

  // 아직 로그인하지 않았다면 저장된 값이 없으므로 빈 문자열을 반환합니다.
  return sessionStorage.getItem(ACCESS_TOKEN_KEY) ?? "";
}

export function removeAccessToken() {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(ACCESS_TOKEN_KEY);
}
