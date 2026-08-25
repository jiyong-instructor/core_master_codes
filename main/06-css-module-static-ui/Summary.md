# day06 오늘 배운 내용 정리

안녕하세요 여러분! 오늘은 API를 연결하기 전에 Next.js 프로젝트의 폴더를 정리하고, 정적인 여행 UI를 여러 가지 스타일링 방법으로 만들어보았습니다.

오늘의 주인공은 **CSS Module**이에요. Tailwind CSS와 styled-components도 짧게 비교하지만, 세 가지를 모두 외우는 날은 아닙니다. 같은 카드가 서로 다른 문법으로 어떻게 표현되는지만 보고, 이번 TripTalk 과제는 가장 익숙한 CSS Module을 중심으로 진행해요.

오늘 흐름은 이렇게 기억하면 좋아요.

```text
src 폴더 구조 확인
→ 화면을 Header, Section, Card로 나누기
→ CSS Module로 정적인 UI 만들기
→ Tailwind CSS로 같은 UI 비교하기
→ styled-components와 클라이언트 컴포넌트 관계 보기
```

## 1. 왜 이번 프로젝트에는 src 폴더가 있나요?

Next.js 프로젝트를 만들 때 `src` 폴더 사용 여부를 선택할 수 있어요. `src`를 선택해도 기능은 똑같습니다. 소스 코드를 한곳에 모아두기 때문에 프로젝트가 커졌을 때 찾기 편하다는 차이가 있어요.

```text
study-next
├── public
│   └── 이미지와 아이콘
├── src
│   ├── app
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── page.module.css
│   │   ├── tailwind
│   │   │   └── page.tsx
│   │   └── styled-components
│   │       └── page.tsx
│   ├── components
│   │   ├── common
│   │   │   ├── Header.tsx
│   │   │   └── Header.module.css
│   │   └── travel
│   │       ├── TripCard.tsx
│   │       └── TripCard.module.css
│   └── lib
│       └── StyledComponentsRegistry.tsx
├── package.json
└── next.config.ts
```

- `src/app`: 주소와 연결되는 페이지를 만들어요.
- `src/components`: 여러 페이지에서 다시 사용할 조각을 만들어요.
- `src/lib`: 라이브러리 설정이나 공통 기능을 모아요.
- `public`: 로고, 이미지, 아이콘처럼 브라우저에 보여줄 파일을 넣어요.

TripTalk도 비슷한 구조를 사용해요. 폴더 이름이 많아 보여도 처음에는 `app`, `components`, `public` 세 곳만 잘 찾으면 됩니다.

## 2. app 폴더와 주소의 관계

App Router에서는 폴더가 주소가 되고 `page.tsx`가 실제 화면이 됩니다.

```text
src/app/page.tsx                         → /
src/app/tailwind/page.tsx                → /tailwind
src/app/styled-components/page.tsx       → /styled-components
src/app/products/page.tsx                → /products
src/app/products/[productId]/page.tsx    → /products/1
```

`src`는 코드를 정리하는 폴더일 뿐 주소에는 포함되지 않아요.

## 3. 정적인 UI란 무엇인가요?

정적인 UI는 아직 API를 연결하지 않고 화면의 모양과 구조를 먼저 만든 상태예요.

```tsx
const trips = [
  { id: 1, title: "제주 바다 여행", price: "78,000원" },
  { id: 2, title: "강원 숲 여행", price: "65,000원" },
];
```

임시 배열로 카드가 들어갈 자리를 먼저 만들면 CSS 문제와 API 문제를 나누어 확인할 수 있어요. 다음에 GraphQL을 배우면 이 배열 대신 서버에서 받은 `data`를 사용하게 됩니다.

## 4. 화면을 컴포넌트로 나누기

Figma를 보자마자 작은 글자부터 만들지 말고 큰 상자부터 찾아요.

```text
메인 페이지
├── Header
├── Hero
└── 추천 여행 Section
    └── TripCard 반복
```

`TripCard`처럼 모양은 같고 내용만 바뀌는 부분은 컴포넌트로 만들기 좋아요.

```tsx
type TripCardProps = {
  title: string;
  price: string;
};

export default function TripCard({ title, price }: TripCardProps) {
  return (
    <article>
      <h3>{title}</h3>
      <p>{price}</p>
    </article>
  );
}
```

타입은 컴포넌트가 어떤 값을 받아야 하는지 알려주는 작은 안내문이라고 생각하면 됩니다.

## 5. global CSS

`src/app/globals.css`에는 모든 화면이 함께 사용할 기본값을 넣어요.

```css
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  min-height: 100vh;
  font-family: Arial, sans-serif;
}
```

global CSS에 넣기 좋은 것:

- 기본 글꼴과 배경색
- 브라우저의 기본 margin 제거
- 모든 요소에 적용할 `box-sizing`
- 여러 페이지가 함께 사용하는 CSS 변수

특정 카드의 너비나 로그인 폼의 여백은 해당 컴포넌트의 CSS Module에 두는 편이 안전해요.

## 6. CSS Module

CSS Module 파일은 `이름.module.css`로 만들고 컴포넌트에서 import합니다.

```tsx
import styles from "./TripCard.module.css";

export default function TripCard() {
  return <article className={styles.card}>여행 카드</article>;
}
```

```css
.card {
  padding: 20px;
  border-radius: 16px;
  background: white;
}
```

`styles.card`는 `TripCard.module.css` 안의 `.card`를 의미해요. 다른 파일에도 `.card`가 있어도 서로 충돌하지 않습니다.

## 7. CSS 파일은 컴포넌트 옆에 두기

오늘 예제는 관련 파일을 가까이 두었습니다.

```text
components/travel
├── TripCard.tsx
└── TripCard.module.css
```

컴포넌트를 수정할 때 TSX와 CSS를 바로 찾을 수 있고, 나중에 컴포넌트를 옮길 때도 두 파일을 함께 옮기기 쉬워요.

## 8. Flex로 쉬운 레이아웃 만들기

Header나 카드 목록처럼 한 방향으로 나열할 때 Flex가 편리해요.

```css
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.cardList {
  display: flex;
  gap: 20px;
}
```

- `display: flex`: 자식 요소를 한 줄로 나열해요.
- `align-items: center`: 세로 가운데로 맞춰요.
- `justify-content: space-between`: 양쪽 끝으로 나눠요.
- `gap`: 자식 요소 사이에 간격을 만들어요.

Grid가 꼭 필요한 화면이 아니라면 익숙한 Flex부터 사용해도 괜찮아요.

## 9. 화면이 좁아졌을 때 세로로 바꾸기

```css
@media (max-width: 760px) {
  .cardList {
    flex-direction: column;
  }
}
```

브라우저 너비가 760px 이하가 되면 카드가 가로에서 세로로 바뀝니다. 처음에는 복잡한 반응형보다 한 번만 방향을 바꾸는 예제로 시작해도 충분해요.

## 10. 기본 class와 종류 class 함께 사용하기

버튼의 공통 모양과 색상 종류를 나눌 수 있어요.

```tsx
const className = `${styles.button} ${styles.primary}`;

return <button className={className}>로그인</button>;
```

```css
.button {
  height: 48px;
  border: 0;
  border-radius: 8px;
}

.primary {
  color: white;
  background: #2f80ed;
}
```

기본 모양은 `.button`, 역할에 따른 색은 `.primary`처럼 나누면 같은 버튼을 다시 사용하기 쉬워요.

## 11. state에 따라 class 바꾸기

```tsx
const statusClass = isSuccess ? styles.success : styles.error;

return <p className={statusClass}>저장 상태</p>;
```

React는 어떤 상태인지 결정하고 CSS는 실제 색상과 간격을 담당해요. 역할을 나누면 코드를 읽기 쉬워집니다.

## 12. Tailwind CSS란 무엇인가요?

Tailwind CSS는 별도의 class 이름을 만들기보다 이미 준비된 작은 class를 조합하는 방식이에요.

```tsx
export default function TailwindCard() {
  return (
    <article className="rounded-2xl bg-white p-5 shadow-lg">
      <h2 className="text-xl font-bold text-blue-600">제주 바다 여행</h2>
      <button className="mt-5 w-full rounded-lg bg-blue-600 px-4 py-3 text-white">
        자세히 보기
      </button>
    </article>
  );
}
```

- 장점: TSX만 보고 간격과 색상을 바로 확인할 수 있어요.
- 주의점: class가 길어지면 처음 보는 사람에게 복잡해 보일 수 있어요.
- 오늘 목표: 자주 보게 될 문법의 모양만 알아두기

현재 Next.js 예제에는 다음 패키지와 설정이 들어 있어요.

```bash
npm install tailwindcss @tailwindcss/postcss postcss
```

`postcss.config.mjs`에서 플러그인을 연결하고 `globals.css` 위쪽에서 Tailwind를 불러옵니다.

```css
@import "tailwindcss";
```

## 13. styled-components란 무엇인가요?

styled-components는 JavaScript 또는 TypeScript 파일 안에서 스타일이 적용된 컴포넌트를 만들어요.

```tsx
"use client";

import styled from "styled-components";

const BlueButton = styled.button`
  padding: 12px 20px;
  border: 0;
  border-radius: 8px;
  color: white;
  background: #2563eb;
`;

export default function StyledButtonPage() {
  return <BlueButton>여행 선택</BlueButton>;
}
```

App Router에서 styled-components의 styled 요소는 클라이언트 컴포넌트에서 사용해요. 그래서 페이지 위에 `"use client"`가 들어갑니다.

예제의 `src/lib/StyledComponentsRegistry.tsx`는 처음 화면에도 스타일이 들어가도록 도와주는 준비 파일이에요. 지금 이 설정을 외울 필요는 없고, styled-components를 Next.js에서 사용할 때 필요한 프로젝트 설정이라고만 이해해도 괜찮아요.

## 14. 세 가지 방법 비교

| 방법 | 스타일을 적는 곳 | 오늘의 사용 범위 |
|---|---|---|
| CSS Module | `컴포넌트이름.module.css` | 메인 실습 |
| Tailwind CSS | TSX의 `className` | 같은 UI 비교 |
| styled-components | TSX 안의 ``styled.tag`...` `` | 클라이언트 컴포넌트 예시 |

어떤 방법이 무조건 더 좋은 것은 아니에요. 회사의 프로젝트 규칙과 팀이 선택한 도구에 맞추어 사용합니다. 이번 TripTalk 화면은 CSS Module을 기준으로 천천히 만들어요.

## 15. 오늘 자주 만나는 오류

- `src`를 사용하면서 `@/` 경로가 여전히 프로젝트 최상위를 가리키면 import 오류가 생겨요.
- CSS Module을 import해 놓고 `className="card"`라고 적으면 Module class가 적용되지 않아요.
- `styles.card`와 CSS의 `.card` 철자가 다르면 스타일을 찾지 못해요.
- `display: flex`는 부모에게 작성해야 자식들이 정렬돼요.
- Tailwind 설치 후 `@import "tailwindcss";`를 빼면 utility class가 적용되지 않아요.
- styled-components 페이지에서 `"use client"`를 빼면 App Router에서 오류가 날 수 있어요.
- 고정 width만 사용하면 작은 화면에서 가로 스크롤이 생길 수 있어요.

## 오늘의 핵심

1. `src`는 소스 코드를 정리하는 폴더이며 주소에는 포함되지 않아요.
2. `app`은 페이지, `components`는 재사용할 UI, `public`은 이미지 파일을 담당해요.
3. API 전에는 작은 임시 배열로 정적인 화면을 먼저 만들 수 있어요.
4. 이번 프로젝트의 기본 스타일링 방법은 CSS Module이에요.
5. Flex와 간단한 media query만으로도 많은 화면을 만들 수 있어요.
6. Tailwind CSS는 준비된 class를 조합하는 방법이에요.
7. styled-components는 TSX 안에서 스타일 컴포넌트를 만들며 클라이언트 컴포넌트에서 사용해요.
8. 세 문법을 전부 외우기보다 같은 UI가 어떻게 달라지는지 비교해보면 됩니다.

처음에는 `src/app/page.tsx`와 `src/app/page.module.css` 두 파일부터 열어보세요. 그다음 `TripCard`를 찾고, 마지막에 Tailwind와 styled-components 페이지를 비교하면 폴더가 훨씬 덜 복잡하게 보일 거예요 ㅎㅎ
