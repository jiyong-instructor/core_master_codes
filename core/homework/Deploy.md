# Cloudflare Pages로 과제 배포하기

# 1부. 배포하기 전에 알아둘 개념

## 1. 지금까지 만든 페이지는 어디에 있었을까요?

지금까지 작성한 HTML 파일은 각자의 컴퓨터 안에 있었어요. 파일을 더블클릭하면 주소창에 다음과 같은 주소가 보였을 거예요.

```text
file:///Users/name/Desktop/homework/index.html
```

이 주소는 **내 컴퓨터 안의 파일 위치**예요. 다른 사람은 내 컴퓨터에 접근할 수 없기 때문에 이 주소를 보내도 페이지를 볼 수 없어요.

다른 사람이 페이지를 보게 하려면 다음 과정이 필요해요.

```text
내 컴퓨터의 파일
        ↓ 업로드
인터넷에 연결된 서버
        ↓ 주소 발급
https://프로젝트이름.pages.dev
        ↓ 접속
친구의 브라우저
```

## 2. 배포란 무엇인가요?

**배포(Deploy)**란 내가 만든 결과물을 다른 사람이 인터넷 주소로 접속할 수 있는 상태로 만드는 일이에요.

쉽게 비유하면 다음과 같아요.

- 개발: 내 방에서 작품을 만들어요.
- 배포: 완성한 작품을 전시장에 가져다 놓아요.
- URL: 전시장 주소예요.
- 브라우저: 관람객이 전시장에 들어가는 문이에요.

배포한다고 HTML 문법이 달라지는 것은 아니에요. 같은 파일을 인터넷의 컴퓨터에 올려서 누구나 요청할 수 있게 만드는 거예요.

## 3. 서버와 호스팅은 무엇인가요?

**서버(Server)**는 브라우저가 요청한 파일을 보내주는 컴퓨터 또는 프로그램이에요.

브라우저가 HTML을 요청하면 서버가 HTML을 보내고, HTML 안에 CSS나 JavaScript가 연결되어 있으면 브라우저가 그 파일도 이어서 요청해요.

**호스팅(Hosting)**은 이런 파일을 서버에 보관하고 인터넷으로 전달해주는 서비스예요.

이번에는 Cloudflare Pages가 우리 파일을 보관하고 전달하는 정적 사이트 호스팅 역할을 해요.

## 4. 정적 웹사이트란 무엇인가요?

이번 과제처럼 HTML, CSS, JavaScript 파일을 브라우저가 그대로 받아 실행하는 사이트를 **정적 웹사이트**라고 해요.

```text
HTML  → 화면의 구조
CSS   → 화면의 디자인
JS    → 클릭, 검색, 모달, MBTI 테스트 등의 동작
```

현재 과제는 별도의 로그인 서버나 데이터베이스 서버가 없기 때문에 정적 사이트 배포에 잘 맞아요.

강아지 사진은 브라우저의 JavaScript가 Dog API에 요청해 받아오고, 배너 동영상과 Pretendard 폰트도 외부 인터넷 주소에서 받아와요. 우리 HTML 자체는 정적이지만 외부 API와 CDN을 이용해 화면 일부가 동적으로 바뀌는 구조예요.

## 5. Cloudflare는 무엇인가요?

Cloudflare는 웹사이트를 인터넷에 제공하고, 더 빠르고 안전하게 전달하는 여러 서비스를 운영하는 회사예요.

Cloudflare에는 DNS, CDN, 보안, Workers, Pages 등 많은 기능이 있어요. 이번 수업에서는 그중 **Cloudflare Pages**만 사용해요.

**Cloudflare Pages**는 HTML, CSS, JavaScript 같은 정적 파일을 업로드하면 공개 주소를 만들어주는 서비스예요.

## 6. CDN은 무엇인가요?

**CDN(Content Delivery Network)**은 여러 지역에 있는 서버가 사용자와 가까운 곳에서 웹 파일을 전달하도록 돕는 네트워크예요.

한국에 있는 사용자는 가까운 서버에서, 다른 나라에 있는 사용자는 그 지역과 가까운 서버에서 파일을 받을 수 있어요. 그래서 한 대의 멀리 있는 서버에서만 받는 것보다 빠르고 안정적으로 전달하기 좋아요.

Cloudflare Pages에 올린 정적 파일은 Cloudflare의 네트워크를 통해 제공돼요.

## 7. URL, 도메인, DNS는 어떻게 다른가요?

다음 주소를 나눠볼게요.

```text
https://minji-diary.pages.dev/homework-detail.html?number=1
```

- `https`: 통신 방법인 프로토콜이에요.
- `minji-diary.pages.dev`: 사이트를 찾는 도메인이에요.
- `/homework-detail.html`: 서버 안에서 요청하는 파일 경로예요.
- `?number=1`: 상세페이지에 전달하는 추가 정보인 쿼리스트링이에요.

**도메인(Domain)**은 사람이 기억하기 쉬운 인터넷상의 이름이에요.

**DNS(Domain Name System)**는 도메인 이름을 실제 서버 위치와 연결해주는 인터넷의 전화번호부 같은 역할을 해요.

이번 실습에서는 도메인을 별도로 구매할 필요가 없어요. Cloudflare가 다음과 같은 무료 하위 도메인을 자동으로 만들어줘요.

```text
프로젝트이름.pages.dev
```

개인 도메인 연결은 나중에 포트폴리오 최종 배포 때 배워도 충분해요.

## 8. 배포 전과 배포 후의 차이

| 구분 | 배포 전 | 배포 후 |
| --- | --- | --- |
| 주소 | `file://...` 또는 `localhost` | `https://...pages.dev` |
| 접속 가능한 사람 | 내 컴퓨터를 사용하는 사람 | 주소를 아는 사람 |
| 파일 위치 | 내 컴퓨터 | Cloudflare Pages |
| HTTPS | 로컬 파일에는 없음 | 자동 적용 |
| 수정 반영 | 저장하고 새로고침 | 수정 파일을 다시 배포 |

---

# 2부. 가장 빠른 배포 방법

## 1. 왜 Direct Upload를 사용할까요?

Cloudflare Pages에는 GitHub 저장소를 연결하는 방법과 파일을 직접 올리는 방법이 있어요.

이번 수업에서는 다음 이유로 **Direct Upload의 드래그앤드롭 방식**을 사용해요.

- Git과 GitHub를 몰라도 돼요.
- 별도의 빌드 명령어가 필요하지 않아요.
- 폴더를 끌어다 놓는 것만으로 배포할 수 있어요.
- HTML, CSS, JavaScript 과제를 빠르게 공유하기 좋아요.

주의할 점도 있어요. Direct Upload로 만든 프로젝트는 나중에 같은 프로젝트를 Git 연동 방식으로 바꿀 수 없어요. Git 자동 배포를 배우게 되면 새로운 Pages 프로젝트를 만들면 돼요.

## 2. 배포할 폴더 확인하기

업로드하기 전에 **실제로 페이지에 필요한 파일만 한 폴더에 모여 있는지** 확인해요.

현재 강의 예시는 다음 구조예요.

```text
homework/
├── index.html              ← 메인페이지
├── homework-detail.html    ← 일기 상세페이지
└── homework-mbti.js        ← MBTI 컴포넌트
```

CSS가 별도 파일이라면 CSS 파일도, 이미지가 로컬 파일이라면 이미지 폴더도 반드시 함께 들어 있어야 해요.

예를 들어 아래처럼 작성했다면 `style.css`가 반드시 업로드 폴더 안에 있어야 해요.

```html
<link rel="stylesheet" href="./style.css" />
```

```html
<img src="./images/dog.jpg" alt="강아지" />
```

### 업로드 전 체크리스트

- [ ] 시작 HTML 파일이 있어요.
- [ ] 연결한 CSS 파일이 모두 들어 있어요.
- [ ] 연결한 JavaScript 파일이 모두 들어 있어요.
- [ ] 직접 사용한 이미지와 폰트 파일이 모두 들어 있어요.
- [ ] 파일 이름의 대문자와 소문자가 코드의 경로와 정확히 같아요.
- [ ] 비밀번호, 개인정보, 비밀 API 키가 들어 있지 않아요.
- [ ] Live Server에서 메인 → 상세 이동이 정상 동작해요.

## 3. `index.html`이 왜 자꾸 등장할까요?

웹 서버는 파일 이름이 없는 주소로 접속했을 때 일반적으로 `index.html`을 첫 화면으로 찾아요.

```text
https://minji-diary.pages.dev
                         ↓
                  index.html을 찾음
```

따라서 일반적인 프로젝트는 메인 파일을 `index.html`로 만들어요.

### 현재 강의 예제는 이미 준비되어 있어요

현재 메인 파일은 `index.html`이고, 상세페이지의 홈 링크도 `index.html`을 가리키도록 정리되어 있어요. `homework` 폴더를 그대로 배포하면 다음의 짧은 주소로 접속할 수 있어요.

```text
https://프로젝트이름.pages.dev
```

내일은 이 기본 주소를 공유 엑셀에 올리면 돼요.

### 다른 프로젝트의 메인 파일 이름이 다르다면

예를 들어 메인 파일 이름이 `main.html`이라면 기본 주소에서 404가 나올 수 있어요. 메인 파일을 `index.html`로 바꾸면 짧은 주소를 사용할 수 있어요.

```text
https://프로젝트이름.pages.dev
```

단, 파일 이름만 바꾸면 끝이 아니에요. HTML과 JavaScript 안에서 예전 메인 파일을 가리키는 링크도 `index.html`로 함께 고쳐야 해요. 그렇지 않으면 상세페이지의 홈 버튼이 404로 이동할 수 있어요.

현재 강의 예제는 이 작업까지 완료되어 있으므로 추가로 수정할 필요가 없어요.

## 4. Cloudflare에 로그인하기

1. [Cloudflare 대시보드](https://dash.cloudflare.com/)에 접속해요.
2. 가입한 이메일로 로그인해요.
3. 이메일 인증 안내가 남아 있다면 먼저 인증해요.
4. 계정 또는 팀 선택 화면이 나오면 본인의 계정을 선택해요.

카드 등록이나 개인 도메인 구매는 이번 실습에 필요하지 않아요.

## 5. Pages 프로젝트 만들기

Cloudflare 화면의 메뉴 이름은 시기에 따라 조금씩 바뀔 수 있지만 흐름은 같아요.

1. 왼쪽 메뉴에서 **Workers & Pages**를 눌러요.
2. **Create application**을 눌러요.
3. **Get started**를 눌러요.
4. **Drag and drop your files**를 선택해요.
5. 프로젝트 이름을 입력해요.

프로젝트 이름은 영문 소문자, 숫자, 하이픈을 이용하면 안전해요.

```text
좋은 예: gd5-minji-diary
좋은 예: jihoon-emotion-log
피할 예: homework
피할 예: final-final-real-final
```

반 전체가 동시에 만들기 때문에 이름이나 영어 닉네임을 넣어 중복을 피해주세요.

프로젝트 이름은 배포 주소의 일부가 돼요.

```text
프로젝트 이름: gd5-minji-diary
배포 주소: https://gd5-minji-diary.pages.dev
```

이미 사용 중인 이름이면 Cloudflare가 뒤에 문자를 붙이거나 다른 이름을 요청할 수 있어요.

## 6. 폴더 업로드하기

1. Finder 또는 파일 탐색기에서 과제 폴더를 찾아요.
2. `Lecture` 전체가 아니라 **페이지에 필요한 파일이 들어 있는 과제 폴더**를 업로드 영역에 끌어다 놓아요.
3. 화면에 HTML과 JavaScript 파일이 표시되는지 확인해요.
4. **Deploy site**를 눌러요.
5. 업로드가 끝나면 **Save and Deploy** 또는 완료 버튼을 눌러요.

드래그앤드롭 방식은 폴더 또는 ZIP 파일을 받을 수 있어요. 초보자에게는 ZIP을 만들기보다 폴더 자체를 올리는 방법이 더 알아보기 쉬워요.

현재 공식 제한은 드래그앤드롭 한 번에 최대 1,000개 파일이고, 파일 하나의 최대 크기는 25 MiB예요. 현재 과제는 이보다 훨씬 작아서 문제없어요.

## 7. 배포된 주소 확인하기

배포가 성공하면 Cloudflare가 다음과 같은 주소를 보여줘요.

```text
https://gd5-minji-diary.pages.dev
```

현재 예제에는 `index.html`이 있으므로 다음 기본 주소로 접속해요.

```text
https://gd5-minji-diary.pages.dev
```

주소창에서 `.html`이 사라진 주소로 자동 이동해도 정상이에요.

## 8. 공유하기 전에 반드시 확인할 것

배포 완료 문구만 보고 바로 제출하지 말고 다음 순서로 검사해요.

1. 배포 주소를 새 탭에서 열어요.
2. 일기 카드가 보이는지 확인해요.
3. 일기 카드를 눌러 상세페이지로 이동해요.
4. 상세페이지에서 다시 메인으로 이동해요.
5. 사진보관함에서 강아지 사진이 불러와지는지 확인해요.
6. MBTI 테스트를 끝까지 진행해요.
7. 다크모드와 모바일 화면을 확인해요.
8. 시크릿 창 또는 다른 브라우저에서도 주소를 열어봐요.
9. 가능하면 휴대폰 데이터로도 한 번 열어봐요.

내 컴퓨터에서만 열리는지 확인하는 것이 아니라, **처음 방문하는 다른 사람의 브라우저에서도 열리는지** 확인하는 과정이에요.


# 3부. 코드를 수정한 뒤 다시 배포하기

Direct Upload는 코드를 저장한다고 자동으로 인터넷 사이트가 바뀌지 않아요. 수정된 폴더를 다시 올려야 해요.

1. 내 컴퓨터에서 코드를 수정하고 저장해요.
2. Live Server로 수정 결과를 확인해요.
3. Cloudflare 대시보드에서 **Workers & Pages**로 이동해요.
4. 기존에 만든 Pages 프로젝트를 선택해요.
5. **Create a new deployment**를 눌러요.
6. Production 배포를 선택해요.
7. 수정된 과제 폴더 전체를 다시 드래그해요.
8. **Save and Deploy**를 눌러요.

기존 프로젝트에 새 배포를 만들면 기본 `pages.dev` 주소는 그대로 유지돼요. 따라서 공유 엑셀의 주소를 매번 바꿀 필요가 없어요.

수정 사항이 바로 보이지 않으면 다음을 확인해요.

- 새 배포의 상태가 성공인지 확인해요.
- Preview 주소가 아니라 Production 주소를 보고 있는지 확인해요.
- 브라우저에서 강력 새로고침을 해요.
- 시크릿 창에서 다시 열어봐요.

---

# 4부. 이번 과제에서 꼭 알아야 할 데이터 이야기

## localStorage 데이터도 친구에게 전달될까요?

아니요. **배포되는 것은 HTML, CSS, JavaScript 파일이고 각 브라우저의 localStorage 내용은 배포되지 않아요.**

현재 감정일기 과제는 일기 목록을 `localStorage`에 저장해요. localStorage는 다음처럼 동작해요.

- 같은 사이트 주소와 같은 브라우저에서는 새로고침해도 남아 있어요.
- Chrome에 작성한 일기가 Firefox에 자동으로 복사되지 않아요.
- 내 컴퓨터에 작성한 일기가 친구 컴퓨터에 보이지 않아요.
- 친구가 작성한 일기도 내 컴퓨터에는 보이지 않아요.
- 브라우저의 사이트 데이터를 지우면 저장한 일기가 사라질 수 있어요.

즉, 모든 사람이 같은 기본 예시 코드로 시작하지만 이후 등록하는 일기는 각자의 브라우저에 따로 저장돼요.

모두가 같은 일기 데이터를 실시간으로 공유하려면 나중에 데이터베이스와 서버 API가 필요해요. 현재 과제의 범위는 아니에요.

## 배포하면 Firefox의 로컬 파일 문제가 왜 사라질까요?

HTML을 더블클릭하면 `file://` 주소로 열려요. `file://` 환경의 localStorage 처리는 브라우저마다 달라질 수 있어 메인과 상세가 데이터를 공유하지 못할 수 있어요.

Cloudflare Pages로 배포하면 두 페이지가 다음처럼 동일한 출처에서 열려요.

```text
https://gd5-minji-diary.pages.dev
https://gd5-minji-diary.pages.dev/homework-detail.html?number=1
```

프로토콜, 도메인, 포트가 같기 때문에 같은 사이트의 localStorage를 사용해요. 그래서 배포 후에는 Chrome과 Firefox에서 더 일관되게 동작해요.

## 외부 API와 외부 파일은 무엇을 확인해야 할까요?

현재 프로젝트는 다음 외부 주소를 사용해요.

- Dog API: 강아지 사진
- Pexels: 배너 동영상
- jsDelivr CDN: Pretendard 폰트

이 파일들은 Cloudflare에 함께 업로드되는 것이 아니라 방문자의 브라우저가 각 서비스에 다시 요청해요.

외부 서비스가 잠시 느리거나, 학교 네트워크가 해당 주소를 차단하거나, 서비스 정책이 바뀌면 일부 화면이 늦게 나오거나 보이지 않을 수 있어요.

API 키가 필요한 다른 서비스를 사용할 때는 비밀 키를 HTML이나 공개 JavaScript에 넣으면 안 돼요. 브라우저에서 실행되는 코드는 방문자가 확인할 수 있기 때문이에요.

---

# 5부. 자주 발생하는 문제와 해결 방법

## 1. 기본 주소에서 404가 나와요

### 원인

업로드한 최상위 위치에 `index.html`이 없을 가능성이 커요.

### 현재 예제에서 확인할 것

현재 예제에는 `index.html`이 포함되어 있어야 해요. 업로드한 폴더의 최상위에서 다음 세 파일이 나란히 보이는지 확인해요.

```text
index.html
homework-detail.html
homework-mbti.js
```

### 표준적인 해결

메인 파일을 `index.html`로 만들고, 기존 메인 파일을 가리키던 내부 링크도 함께 수정한 뒤 다시 배포해요.

## 2. 메인은 열리지만 상세페이지가 404예요

다음을 확인해요.

- `homework-detail.html`도 함께 업로드했나요?
- HTML에 작성한 파일 이름과 실제 파일 이름이 같은가요?
- 파일이 다른 폴더 안으로 이동하지 않았나요?
- 대문자와 소문자가 정확히 같은가요?

macOS나 Windows에서는 우연히 열리던 경로가 배포 서버에서는 실패할 수 있어요. 웹 서버에서는 보통 대소문자를 구분한다고 생각하는 것이 안전해요.

```text
homework-detail.html ≠ Homework-Detail.html
```

## 3. 화면은 열리는데 MBTI 탭이 작동하지 않아요

`homework-mbti.js`가 업로드 폴더에 포함되었는지 확인해요.

개발자 도구의 Console 또는 Network 탭에서 `404` 오류가 난 JavaScript 파일이 있는지도 확인해요.

## 4. CSS 또는 이미지가 안 나와요

대부분 경로 문제예요.

```text
./images/dog.jpg
```

위 경로를 사용했다면 HTML 파일을 기준으로 `images` 폴더 안에 `dog.jpg`가 실제로 있어야 해요.

내 컴퓨터의 절대 경로를 작성하면 다른 사람의 컴퓨터에서는 열리지 않아요.

```text
잘못된 예: /Users/minji/Desktop/dog.jpg
올바른 예: ./images/dog.jpg
```

## 5. 강아지 사진이나 영상만 보이지 않아요

페이지 전체가 정상이라면 외부 API 또는 외부 미디어 요청 문제일 수 있어요.

- 인터넷 연결 상태를 확인해요.
- 광고 차단 확장 프로그램을 잠시 확인해요.
- 개발자 도구의 Console과 Network에서 오류를 확인해요.
- HTTPS 페이지에서 HTTP 자료를 요청하고 있지 않은지 확인해요.

## 6. 수정했는데 예전 화면이 보여요

- 수정 파일을 저장했는지 확인해요.
- 기존 프로젝트에 새 Production 배포를 했는지 확인해요.
- 업로드한 폴더가 정말 수정한 폴더인지 확인해요.
- 강력 새로고침 또는 시크릿 창을 사용해요.

## 7. 친구가 등록한 일기가 내 화면에는 없어요

정상이에요. 등록한 일기는 각 브라우저의 localStorage에 저장되며 공유 데이터베이스가 아니에요.

## 8. 업로드했는데 파일 옆에 빨간 경고가 나와요

드래그앤드롭 제한을 넘었을 수 있어요. 현재 공식 제한은 다음과 같아요.

- 최대 1,000개 파일
- 파일 하나당 최대 25 MiB

불필요하게 큰 원본 동영상이나 이미지가 있다면 크기를 줄이거나 외부 미디어 서비스를 이용해요. 현재 강의 예제는 외부 동영상 주소를 사용하므로 폴더 크기가 작아요.

## 9. 프로젝트 이름이 이미 있다고 나와요

이름이나 숫자를 더해 고유하게 만들어요.

```text
gd5-minji-diary
gd5-minji-diary-01
emotion-diary-minji
```


# 9부. 자주 묻는 질문

## Q. 개인 도메인을 구매해야 하나요?

아니요. 이번 수업에서는 Cloudflare가 자동으로 제공하는 `pages.dev` 주소를 사용해요.

## Q. GitHub 계정도 필요한가요?

아니요. Direct Upload 방식은 GitHub 없이 폴더를 직접 올릴 수 있어요.

## Q. HTML 파일 하나만 올리면 되나요?

외부 CSS, JavaScript, 이미지 파일을 연결했다면 전부 함께 올려야 해요. 가장 안전한 방법은 필요한 파일이 들어 있는 프로젝트 폴더 전체를 올리는 거예요.

## Q. 배포할 때 npm이나 build 명령어가 필요한가요?

현재 과제는 순수 HTML, CSS, JavaScript이므로 필요하지 않아요.

## Q. 배포한 뒤 코드를 수정할 수 있나요?

네. 로컬 코드를 수정한 뒤 기존 Pages 프로젝트에서 새 Production 배포를 만들면 돼요.

## Q. 다시 배포하면 주소가 바뀌나요?

같은 프로젝트의 Production 배포라면 기본 주소는 유지돼요. 배포별 Preview 주소는 따로 생길 수 있어요.

## Q. 다른 사람이 내 localStorage 일기를 볼 수 있나요?

아니요. localStorage 데이터는 각 방문자의 브라우저에 따로 저장돼요. 배포한 소스 코드와 기본 예시 데이터는 볼 수 있지만, 내 브라우저에서 새로 등록한 일기가 다른 사람에게 자동 공유되지는 않아요.

## Q. 무료로 사용할 수 있나요?

Cloudflare Pages는 무료 플랜으로 시작할 수 있어요. 다만 서비스의 정책과 제한은 바뀔 수 있으므로 실제 프로젝트에서는 공식 문서를 확인해요.

## Q. 나중에 개인 도메인을 연결할 수 있나요?

네. 구매한 도메인을 Pages 프로젝트에 연결할 수 있어요. 하지만 오늘은 배포의 기본 흐름을 익히는 것이 목표이므로 `pages.dev` 주소만 사용해요.

---

# 10부. 공식 참고 자료

- [Cloudflare Pages Direct Upload 공식 문서](https://developers.cloudflare.com/pages/get-started/direct-upload/)
- [Cloudflare Pages 정적 HTML 배포 문서](https://developers.cloudflare.com/pages/framework-guides/deploy-anything/)
- [Cloudflare Pages 파일 제공 방식](https://developers.cloudflare.com/pages/configuration/serving-pages/)
- [Cloudflare란 무엇인가요?](https://www.cloudflare.com/learning/security/what-is-cloudflare/)
- [CDN이란 무엇인가요?](https://www.cloudflare.com/learning/cdn/what-is-a-cdn/)
- [DNS란 무엇인가요?](https://www.cloudflare.com/learning/dns/what-is-dns/)
- [MDN localStorage 설명](https://developer.mozilla.org/ko/docs/Web/API/Window/localStorage)

> 이 문서는 2026년 8월 기준 Cloudflare 공식 문서를 바탕으로 작성했어요. 대시보드 버튼 이름은 업데이트에 따라 조금 달라질 수 있지만 `Workers & Pages → Direct Upload → Drag and drop` 흐름을 찾으면 돼요.
