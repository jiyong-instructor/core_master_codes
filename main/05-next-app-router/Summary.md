# day05 오늘 배운 내용 정리

안녕하세요 여러분! 오늘은 React로 만든 화면을 Next.js App Router 구조로 옮겼습니다. 폴더가 URL이 되는 규칙, `page.tsx`, `layout.tsx`, 동적 route, `Link`, loading과 not-found 화면을 확인하고 Server Component와 Client Component도 처음 구분해봤어요.

오늘 흐름은 이렇게 기억하면 좋아요.  
**Next 프로젝트 실행하기 → app 폴더에서 page 만들기 → layout으로 공통 영역 감싸기 → Link로 이동하기 → 동적 ID 읽기 → 필요한 부분만 Client Component로 만들기**

## 1. Next.js는 무엇을 더해줄까요?

React는 UI를 만드는 중심 도구입니다. Next.js는 React를 사용하면서 파일 기반 routing, 서버 렌더링, image/font 최적화, build 설정 같은 애플리케이션 기능을 함께 제공해요.

```text
React
→ 컴포넌트와 state로 UI 만들기

Next.js
→ React + route + server rendering + build 기능
```

## 2. App Router의 기본 파일

```text
src/app/
├── layout.tsx
├── page.tsx
├── loading.tsx
├── not-found.tsx
└── products/
    ├── page.tsx
    └── [productId]/page.tsx
```

- `page.tsx`: 접속 가능한 화면
- `layout.tsx`: 아래 페이지를 공통으로 감싸는 화면
- `loading.tsx`: 페이지가 준비되는 동안 보여주는 화면
- `not-found.tsx`: 찾을 수 없는 페이지
- `[productId]`: URL마다 달라지는 동적 값

## 3. 폴더가 URL이 되는 규칙

```text
app/page.tsx                         → /
app/login/page.tsx                   → /login
app/products/page.tsx                → /products
app/products/[productId]/page.tsx    → /products/1
```

폴더가 있어도 `page.tsx`가 없다면 사용자가 그 주소에 직접 접속하는 페이지가 되지 않습니다.

## 4. layout과 children

`examples/app/layout.tsx`에서는 공통 Header를 만들고 페이지 자리에 children을 넣었습니다.

```tsx
export default function RootLayout({ children }) {
  return (
    <html lang=\"ko\">
      <body>
        <Header />
        {children}
      </body>
    </html>
  )
}
```

주소가 바뀌면 children 자리에 들어오는 page가 달라지고 공통 Header는 유지됩니다.

## 5. Link로 이동하기

```tsx
<Link href=\"/products/1\">제주 여행 보기</Link>
```

Next의 `Link`는 앱 안에서 자연스럽게 페이지를 이동하도록 도와줘요. 단순 이동을 위해 button과 `router.push()`를 무조건 사용할 필요는 없습니다.

## 6. 동적 route와 params

상품 ID가 달라도 상세 페이지 모양은 같기 때문에 `[productId]` 폴더 하나를 사용합니다.

```tsx
type PageProps = {
  params: Promise<{ productId: string }>
}

const { productId } = await params
```

현재 예제의 Next 버전에서는 params를 Promise로 받아 `await`합니다. 다른 Next 버전의 예제와 모양이 다를 수 있으니 프로젝트 버전을 함께 확인해주세요.

## 7. Server Component

App Router의 컴포넌트는 기본적으로 Server Component입니다.

- 서버에서 JSX 결과를 준비할 수 있어요.
- 브라우저에 불필요한 JavaScript를 줄일 수 있어요.
- 브라우저 event와 state를 직접 사용할 수 없어요.
- server 전용 환경변수나 데이터 접근을 안전하게 둘 수 있어요.

정적인 제목, 목록, layout은 먼저 Server Component로 생각합니다.

## 8. Client Component

`components/ClientCounter.tsx`처럼 `useState`, `useEffect`, `onClick`이 필요하면 파일 맨 위에 선언합니다.

```tsx
\"use client\"

import { useState } from \"react\"
```

페이지 전체에 `use client`를 붙이는 것보다 클릭이 필요한 작은 컴포넌트만 분리하면 경계가 분명해져요.

```text
ServerProduct
└── ClientCounter
```

서버 컴포넌트 안에 클라이언트 컴포넌트를 넣을 수 있습니다.

## 9. loading과 not-found

`loading.tsx`는 route가 준비될 때 자동으로 사용될 수 있고, `not-found.tsx`는 없는 데이터나 주소에서 사용자가 돌아갈 길을 보여줘요.

```tsx
if (!product) notFound()
```

API를 배우고 나면 “상품 ID는 올바르지만 서버에 상품이 없음” 같은 상황에서도 not-found를 사용할 수 있습니다.

## 10. next/font와 next/image

`optional/font-image.tsx`에는 Next가 제공하는 font와 Image 예제가 있습니다.

- `next/font`: font 파일과 적용을 Next가 관리
- `next/image`: 이미지 크기와 최적화를 도와줌
- `alt`: 이미지를 볼 수 없을 때 내용을 설명
- width/height: 이미지가 들어갈 자리를 미리 계산

이 기능은 UI 기본 구조가 끝난 뒤 추가해도 괜찮습니다.

## 11. 오늘 자주 만난 오류

- `page.tsx` 이름이 다르면 route가 만들어지지 않아요.
- `Link`의 속성은 `to`가 아니라 `href`예요.
- Server Component에서 `useState`를 사용하면 오류가 나요.
- 모든 파일에 습관적으로 `use client`를 붙이면 서버 컴포넌트 장점을 잃어요.
- 동적 폴더의 대괄호와 params의 property 이름이 같아야 해요.

## 오늘의 핵심

1. Next.js는 React 애플리케이션 구조와 routing 기능을 제공해요.
2. `page.tsx`와 폴더가 URL을 만들어요.
3. `layout.tsx`는 아래 페이지의 공통 UI를 담당해요.
4. 동적 route 값은 params에서 읽어요.
5. App Router 컴포넌트는 기본 Server Component예요.
6. state, effect, event가 필요한 파일만 Client Component로 만들어요.
7. loading, error, not-found 화면도 페이지 구조의 일부예요.

## 한번 해보기

- `/about` 페이지를 추가해보세요.
- `/travelproducts` 목록과 `/travelproducts/[id]` 상세 주소를 만들어보세요.
- layout에 모든 페이지에서 보이는 Footer를 추가해보세요.
- 상세 페이지에서 params의 ID를 화면에 표시해보세요.
- Server Component 안에 작은 좋아요 Client Component를 넣어보세요.

Next 폴더가 많아 보여도 첫날에는 `layout`, `page`, `[id]` 세 가지부터 기억하면 충분합니다. 필요한 기능이 생길 때 loading과 not-found, provider 폴더를 하나씩 추가해요 ㅎㅎ
