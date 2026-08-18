function Logo () {
    return <strong>로고</strong>
}

function WelcomeText () {
    return <h1>환영합니다</h1>
}

// 위에 만들어진 컴포넌트들을 조합해서 하나의 컴포넌트를 만들어보겠습니다.
export default function ComponentExample() {
    return (
        <header>
            <Logo />
            <WelcomeText />
        </header>
    )
}