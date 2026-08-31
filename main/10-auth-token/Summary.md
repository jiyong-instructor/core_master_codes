# Day 10 오늘 배운 내용 정리 - 회원가입, 로그인, 인증

안녕하세요! 😊

오늘은 회원가입과 로그인을 만든 뒤, 로그인한 사용자만 들어갈 수 있는 화면까지 연결해봅니다.

처음에는 정규식, 비밀번호, 토큰, 헤더 같은 단어가 한꺼번에 나와서 복잡해 보일 수 있어요. 오늘은 아래 순서만 놓치지 않으면 됩니다.

```text
입력값 검사 → 회원가입 → 로그인 → access token 저장
→ Authorization 헤더에 토큰 추가 → 로그인 사용자 API 요청
```

---

## 1. 오늘의 수업 흐름

### 1교시 - 입력값 검사와 회원가입

1. 이메일과 비밀번호 정규식
2. 프론트엔드 검증과 백엔드 검증의 차이
3. `createUser` 회원가입 Mutation
4. 비밀번호를 서버에 어떻게 보관하는지 알아보기

### 2교시 - 로그인과 토큰

1. `loginUser` 로그인 Mutation
2. access token 받기
3. 브라우저 저장소에 토큰 저장하기
4. Apollo 요청 헤더에 토큰 넣기

### 3교시 - 로그인한 사용자만 사용하는 화면

1. `fetchUserLoggedIn`으로 내 정보 조회하기
2. 로그인하지 않으면 로그인 페이지로 이동시키기
3. 로그아웃하기
4. 화면을 숨기는 것과 실제 보안의 차이 알아보기

---

## 2. 인증과 인가는 무엇인가요?

두 단어를 먼저 구분해볼게요.

- 인증(Authentication): “당신은 누구인가요?”를 확인하는 과정
- 인가(Authorization): “이 기능을 사용할 권한이 있나요?”를 확인하는 과정

로그인은 인증입니다. 로그인한 사용자만 마이페이지에 들어가게 하는 것은 인가입니다.

```text
로그인 성공 → 사용자 확인 완료 → 인증
마이페이지 접근 허용 → 권한 확인 완료 → 인가
```

---

## 3. 정규식으로 이메일 검사하기

정규식은 문자열의 모양을 검사하는 규칙입니다.

```ts
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const isEmail = EMAIL_REGEX.test("student@example.com");
console.log(isEmail); // true
```

이 규칙은 아래 내용을 확인합니다.

- `@` 앞에 문자가 있는가?
- `@` 뒤에 문자가 있는가?
- 마지막에 `.`과 문자가 있는가?
- 중간에 공백이 없는가?

정규식은 이메일이 실제로 존재하는지 확인하지는 않습니다. 문자열 모양만 검사합니다.

---

## 4. 비밀번호 검사하기

처음부터 정규식 한 줄에 모든 조건을 넣으면 설명하기 어렵습니다. 수업에서는 조건을 나누어 확인하면 이해하기 쉽습니다.

```ts
const hasLetter = /[A-Za-z]/.test(password);
const hasNumber = /[0-9]/.test(password);
const isLongEnough = password.length >= 8;

if (!hasLetter || !hasNumber || !isLongEnough) {
  console.log("영문과 숫자를 포함하여 8자 이상 입력해 주세요.");
}
```

하나의 정규식으로 합치면 다음과 같이 쓸 수 있습니다.

```ts
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*]{8,}$/;
```

오늘 기준은 다음과 같습니다.

- 8자 이상
- 영문 1개 이상
- 숫자 1개 이상
- 특수문자는 선택

서비스의 비밀번호 규칙은 회사와 프로젝트 요구사항에 따라 달라질 수 있습니다.

---

## 5. 프론트엔드 검증만 믿으면 안 돼요

프론트엔드 검증은 사용자가 실수했을 때 빠르게 알려주기 위한 기능입니다.

```text
프론트엔드 검증 → 사용자에게 빠른 안내
백엔드 검증     → 데이터와 서비스 보호
```

브라우저 개발자 도구나 Postman을 사용하면 화면의 검사를 건너뛰고 API를 직접 호출할 수 있습니다. 따라서 같은 입력값 검사를 백엔드에서도 반드시 해야 합니다.

---

## 6. 회원가입 API 호출하기

회원가입은 새로운 사용자를 서버의 데이터베이스에 저장하는 기능입니다.

```graphql
mutation CreateUser($input: CreateUserInput!) {
  createUser(createUserInput: $input) {
    _id
    email
    name
  }
}
```

```tsx
const [createUser] = useMutation(CREATE_USER);

await createUser({
  variables: {
    input: {
      email,
      password,
      name,
    },
  },
  context: { apiName: "practice" },
});
```

회원가입 성공은 로그인 성공과 다릅니다. 회원가입 뒤에는 로그인 API를 다시 호출해야 access token을 받을 수 있습니다.

---

## 7. 비밀번호를 프론트엔드에서 암호화해야 하나요?

결론부터 말하면 프론트엔드에서 임의로 비밀번호를 해시해서 보내는 구조를 만들지 않습니다.

비밀번호 처리에는 서로 다른 두 구간이 있습니다.

```text
브라우저 ── HTTPS ──> 백엔드 ── 단방향 해시 ──> 데이터베이스
```

### 전송할 때

브라우저와 서버 사이에서는 HTTPS가 통신 전체를 암호화합니다. 프론트엔드는 비밀번호 입력값을 HTTPS 요청에 담아 서버로 보냅니다.

### 저장할 때

백엔드는 비밀번호 원문을 데이터베이스에 저장하지 않습니다. 비밀번호 전용 단방향 해시 알고리즘으로 변환한 결과를 저장합니다.

---

## 8. 인코딩, 암호화, 해시는 서로 달라요

| 구분 | 다시 원래 값으로 되돌릴 수 있나요? | 예시 |
| --- | --- | --- |
| 인코딩 | 가능 | Base64 |
| 암호화 | 열쇠가 있으면 가능 | AES |
| 해시 | 원칙적으로 되돌리지 않음 | Argon2id, bcrypt |

비밀번호 저장에는 복호화가 필요한 암호화보다 단방향 해시를 사용합니다.

새 시스템에서는 Argon2id가 우선 권장되고, bcrypt도 기존 시스템과 교육 예제에서 널리 사용됩니다. 오늘 `bcrypt` 코드는 백엔드 개념을 보여주기 위한 별도 예제입니다.

```js
const hashedPassword = await bcrypt.hash(password, 10);

const isCorrect = await bcrypt.compare(password, hashedPassword);
```

회원가입할 때는 `hash`, 로그인할 때는 `compare`를 사용합니다.

---

## 9. Salt는 무엇인가요?

같은 비밀번호라도 서로 다른 해시 결과가 나오게 추가하는 임의의 값입니다.

```text
철수의 password123 → 서로 다른 해시 A
영희의 password123 → 서로 다른 해시 B
```

`bcrypt.hash()` 같은 비밀번호 전용 라이브러리가 salt 생성과 적용을 함께 처리합니다. 프론트엔드에서 salt를 직접 만들 필요는 없습니다.

---

## 10. 로그인하고 access token 받기

로그인은 이메일과 비밀번호를 서버에 보내 사용자가 맞는지 확인하는 과정입니다.

```graphql
mutation LoginUser($email: String!, $password: String!) {
  loginUser(email: $email, password: $password) {
    accessToken
  }
}
```

```tsx
const result = await loginUser({
  variables: { email, password },
  context: { apiName: "practice" },
});

const accessToken = result.data?.loginUser.accessToken;
```

서버는 저장된 해시와 입력한 비밀번호를 비교합니다. 일치하면 access token을 발급합니다.

---

## 11. access token은 무엇인가요?

access token은 서버가 발급한 짧은 수명의 로그인 확인표입니다.

- 이메일과 비밀번호를 API 요청마다 다시 보내지 않아도 됩니다.
- 서버는 토큰을 검사하여 로그인한 사용자인지 확인합니다.
- 토큰이 필요한 API와 누구나 쓸 수 있는 API가 나뉩니다.

JWT 형태의 토큰은 서명되어 있지만 내용 자체가 비밀로 암호화된 것은 아닐 수 있습니다. 따라서 비밀번호나 주민등록번호 같은 민감한 정보를 토큰 안에 넣으면 안 됩니다.

---

## 12. 오늘 예제에서 토큰을 보관하는 곳

수업 예제에서는 흐름이 눈에 보이도록 `sessionStorage`에 저장합니다.

```ts
sessionStorage.setItem("accessToken", accessToken);
```

```ts
const accessToken = sessionStorage.getItem("accessToken");
```

`sessionStorage`는 같은 탭을 새로고침해도 값이 남고, 탭을 닫으면 사라집니다.

다만 이것은 교육용으로 단순화한 구조입니다. 실제 서비스의 토큰 저장 방식은 보안 요구사항과 백엔드 구조를 함께 검토해야 합니다. refresh token은 보통 JavaScript에서 읽기 어려운 `HttpOnly`, `Secure`, `SameSite` 쿠키와 함께 설계합니다.

---

## 13. Apollo 요청 헤더에 토큰 넣기

로그인한 사용자의 API 요청에는 다음 헤더가 필요합니다.

```text
Authorization: Bearer access_token
```

`Bearer` 뒤에는 반드시 한 칸을 띄웁니다.

```tsx
const authLink = new SetContextLink((previousContext) => {
  const accessToken = sessionStorage.getItem("accessToken");

  return {
    headers: {
      ...previousContext.headers,
      authorization: accessToken ? `Bearer ${accessToken}` : "",
    },
  };
});
```

이 설정을 한 번 해두면 Query와 Mutation마다 토큰을 반복해서 작성하지 않아도 됩니다.

---

## 14. 로그인한 사용자 정보 조회하기

토큰이 잘 전달되는지 확인하기 좋은 API입니다.

```graphql
query FetchUserLoggedIn {
  fetchUserLoggedIn {
    _id
    email
    name
  }
}
```

- 토큰이 올바르면 현재 로그인한 사용자 정보가 옵니다.
- 토큰이 없거나 만료되면 인증 오류가 발생합니다.

---

## 15. 로그인한 사용자만 페이지에 들어오게 하기

오늘 예제의 `AuthGuard`는 토큰이 없으면 로그인 페이지로 이동시킵니다.

```tsx
useEffect(() => {
  if (isReady && !accessToken) {
    router.replace("/auth/login");
  }
}, [accessToken, isReady, router]);
```

하지만 이 코드는 사용자 경험을 위한 화면 제어입니다. 개발자 도구로 화면 코드를 바꿀 수 있기 때문에 이것만으로 보안을 완성할 수는 없습니다.

```text
프론트엔드 AuthGuard → 페이지 이동과 화면 제어
백엔드 토큰 검사      → 실제 데이터와 기능 보호
```

진짜 권한 검사는 API 서버가 토큰을 확인하여 결정합니다.

---

## 16. 왜 isReady가 필요한가요?

Next.js는 서버에서 먼저 HTML을 만들 수 있습니다. 서버에는 `window`와 `sessionStorage`가 없습니다.

브라우저가 준비되기 전에 저장소를 바로 읽으면 서버 화면과 브라우저 첫 화면이 달라져 하이드레이션 문제가 생길 수 있습니다.

```text
서버 렌더링 → 브라우저 연결 → sessionStorage 확인 → 화면 결정
```

예제에서는 `useEffect`에서 저장소를 읽고 `isReady`가 된 뒤 화면을 보여줍니다.

---

## 17. 로그아웃하기

로그아웃할 때는 저장한 access token을 제거합니다.

```ts
sessionStorage.removeItem("accessToken");
```

백엔드가 `logoutUser` API를 제공한다면 해당 API도 호출합니다. 이후 요청에는 Authorization 헤더가 들어가지 않습니다.

---

## 18. access token과 refresh token

- access token: API를 사용할 때 보내는 짧은 수명의 토큰
- refresh token: access token이 만료되었을 때 새 access token을 받기 위한 토큰

오늘은 로그인 흐름을 먼저 이해하기 위해 access token만 직접 다룹니다. refresh token 재발급은 로그인 복원 흐름에서 다시 배웁니다.

---

## 19. CORS와 Next.js 프록시

브라우저에서 과제 API를 직접 호출하면 서버의 CORS 설정 때문에 오류가 날 수 있습니다.

```text
브라우저 → Next.js /api/graphql → 과제 GraphQL API
```

오늘 `study-next`에는 `/api/graphql` Route Handler를 두어 요청을 중간에서 전달합니다. 이것은 비밀번호 오류를 고치는 코드가 아니라 브라우저와 API 서버 사이의 출처 문제를 우회하기 위한 구조입니다.

---

## 20. 예제 파일 순서

```text
examples
├── steps
│   ├── 00-validation.ts
│   ├── 01-signup.tsx
│   ├── 02-login.tsx
│   ├── 03-password-hashing-server.js
│   ├── 03-fetch-user.tsx
│   ├── 04-auth-header.ts
│   ├── 05-logout.tsx
│   ├── 06-auth-screen.tsx
│   └── 07-auth-guard.tsx
├── auth-store.ts
├── apollo-provider.tsx
└── LoginForm.tsx
```

브라우저 예제와 백엔드 해시 설명 예제를 구분해서 살펴보세요.

---

## 자주 만나는 실수

1. 회원가입만 하고 로그인 API를 실행하지 않은 경우
2. 프론트엔드 정규식 검사만으로 보안이 완성됐다고 생각한 경우
3. 비밀번호를 프론트엔드에서 직접 해시해서 보내려고 한 경우
4. `Bearer` 뒤에 띄어쓰기를 하지 않은 경우
5. access token이 `undefined`인데 저장한 경우
6. 토큰이 필요한 API를 로그인 전에 실행한 경우
7. 버튼만 숨기면 권한 검사가 끝난다고 생각한 경우
8. 서버 렌더링 중에 `sessionStorage`를 읽은 경우
9. 인증 오류와 CORS 오류를 같은 문제로 생각한 경우

---

## 오늘의 핵심

1. 정규식은 입력값의 모양을 검사합니다.
2. 프론트엔드 검증과 백엔드 검증은 모두 필요합니다.
3. 비밀번호 전송은 HTTPS, 저장은 서버의 단방향 해시가 담당합니다.
4. 회원가입과 로그인은 서로 다른 API입니다.
5. 로그인에 성공하면 access token을 받습니다.
6. 인증 API 요청에는 `Bearer access_token` 헤더가 필요합니다.
7. 프론트엔드의 페이지 가드는 화면 제어이고, 실제 보안은 백엔드가 담당합니다.

코드 한 줄씩 외우기보다 전체 여행 경로를 먼저 기억해 주세요.

```text
검증 → 회원가입 → 로그인 → 토큰 → 헤더 → 내 정보 → 로그아웃
```
