function Header () {
    return (
        <header>
            <h1>TripTalk</h1>
            <nav>
                <a href="#recommend">추천 여행지</a>
                <a href="#review">여행 후기</a>
                <a href="#community">커뮤니티</a>
            </nav>
        </header>
    )
}

function WelcomeText () {
    return (
        <section>
            <h2>환영합니다</h2>
            <p>TripTalk에 오신 것을 환영합니다.</p>
        </section>
    )
}

function RecommendSection () {
    return (
        <section id="recommend">
            <h2>추천 여행지</h2>
            <ul>
                <li>제주도</li>
                <li>부산</li>
                <li>강릉</li>
            </ul>
        </section>
    )
}

function ReviewSection () {
    return (
        <section id="review">
            <h2>여행 후기</h2>
            <p>여행 후기를 작성해보세요.</p>
        </section>
    )
}

function CommunitySection () {
    return (
        <section id="community">
            <h2>커뮤니티</h2>
            <p>커뮤니티에 참여해보세요.</p>
        </section>
    )
}

function Footer () {
    return (
        <footer>
            <p>&copy; 2027 TripTalk. All rights reserved.</p>
            <small>
                Contact: <a href="mailto:test@test.com">test@test.com</a>
            </small>
        </footer>
    )
}

// 위에서 만든 작은 컴포넌트들을 조합해서 하나의 큰 컴포넌트를 만들어 내보내는 것이 가능해요.
export default function FirstPageComponent () {
    return (
        <>
            <Header />
            <WelcomeText />
            <RecommendSection />
            <ReviewSection />
            <CommunitySection />
            <Footer />
        </>
    )
}