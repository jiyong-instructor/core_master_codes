export function makeAuthHeaders(accessToken: string) {
  return {
    // Authorization 헤더를 설정합니다. accessToken이 없으면 빈 문자열을 사용합니다.
    authorization: accessToken ? `Bearer ${accessToken}` : "",
  };
}

// JWT (JSON Web Token) access token의 payload는 서명되어 있지만 기본적으로 암호화된 비밀 상자가 아니에요.
// 따라서 누구나 payload를 디코딩해서 내용을 확인할 수 있습니다. 민감한 정보는 payload에 넣지 마세요.
