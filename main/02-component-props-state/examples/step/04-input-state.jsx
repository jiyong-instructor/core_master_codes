import { useState } from 'react';

export default function InputStateComponent() {


    const [keyword, setKeyword] = useState('');
    const [message, setMessage] = useState('');

    function handleKeywordChange(event) {
        console.log("사용자 입력: ",event);
        // 사용자가 입력한 값은 event.target.value에 들어있습니다.
        setKeyword(event.target.value);
    }

    function handleMessageChange(event) {
        setMessage(event.target.value);
    }

    function clearForm() {
        setKeyword('');
        setMessage('');
    }

    const isEmpty = keyword === '' || message === '';

    return(
        <main>
            <h1>🛫 여행 계획 미리보기</h1>

            <section>
                <label htmlFor="keyword">여행지</label>
                <input
                    id="keyword"
                    value={keyword}
                    onChange={handleKeywordChange}
                    placeholder="여행지를 입력하세요"
                />

                <label htmlFor="message">하고 싶은 일</label>
                <textarea 
                    id="message"
                    value={message}
                    onChange={handleMessageChange}
                    placeholder="하고 싶은 일을 입력하세요 예) 바다를 보며 산책하고 싶어요."
                    maxLength={50}
                />
                <p>{message.length} / 50자</p>

                <button onClick={clearForm} disabled={isEmpty}>
                    모두 지우기
                </button>
            </section>

            <section>
                <h2>입력한 내용</h2>
                <p>
                    찾고 싶은 여행지: { keyword || '아직 입력하지 않았어요.' }
                </p>
                <p>
                    하고 싶은 일: { message || '아직 입력하지 않았어요.' }
                </p>
            </section>

        </main>
    )

}