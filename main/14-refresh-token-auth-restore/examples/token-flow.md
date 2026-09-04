# 두 토큰의 역할

```text
로그인
  → access token으로 일반 API 요청
  → access token 만료 또는 새로고침
  → cookie의 refresh token으로 재발급 요청
  → 새 access token을 전역 store에 저장
```

- access token: 자주 사용하는 짧은 출입증
- refresh token: 새 access token을 받기 위한 재발급 증명
- Apollo의 HTTP link에는 cookie를 주고받을 수 있도록 `credentials: "include"`를 설정해요.
- 화면에서 버튼을 숨기는 것만으로는 보안이 되지 않아요. 서버도 권한을 검사해야 해요.
