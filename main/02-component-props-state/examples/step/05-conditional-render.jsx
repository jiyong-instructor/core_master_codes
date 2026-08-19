import { useState } from 'react';

function GuestMessage() {
    return (
        <div>
            <h2>로그인이 필요합니다.</h2>
            <p>로그인 후에 여행 계획을 작성할 수 있어요.</p>
        </div>
    )
}

function UserMessage() {
    return (
        <div>
            <h2>지용님 반갑습니다.</h2>
            <p>저장한 여행 글이 3개 있어요</p>
            <button>저장한 글 보기</button>
        </div>
    )
}

export default function ConditionalRenderExample() {
    const [isLoggedin, setIsLoggedin] = useState(false);
    const [isNoticeOpen, setIsNoticeOpen] = useState(false);

    function toggleLogin() {
        // 아래 처럼 setIsLoggedin(!isLoggedin);도 가능하지만, 이전 상태값을 기반으로 새로운 상태값을 계산할 때는 아래와 같이 콜백 함수를 사용하는 것이 안전합니다.
        setIsLoggedin((previousValue) => !previousValue);
    }
    
    function closeNotice() {
        setIsNoticeOpen(false);
    }

    return(
        <main>
            <h1>🦄 우리여행 회원 화면</h1>

            {isNoticeOpen && (
                <aside>
                    <span>이번 주 제주 여행 글이 새로 올라왔어요.</span>
                    <button onClick={closeNotice} >닫기</button>
                </aside>
            )}

            <section>
                {/* 조건에 따라서 서로 다른 컴포넌트도 보여줄 수 있어요. */}
                {isLoggedin ? <UserMessage /> : <GuestMessage />}

                <button onClick={toggleLogin}>
                    {isLoggedin ? '로그아웃' : '간단 로그인'}
                </button>
            </section>

            <footer>
                <p>현재 상태: {isLoggedin ? '로그인 중' : '로그인 전'}</p>
            </footer>

        </main>
    )
}