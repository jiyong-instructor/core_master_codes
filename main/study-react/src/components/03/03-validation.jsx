import { useState } from 'react';

export default function ValidationExample() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    function handleEmailChange(event) {
        setEmail(event.target.value);
        setErrorMessage('');
        setSuccessMessage('');
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
        setErrorMessage('');
        setSuccessMessage('');
    }

    function handleSubmit(event) {
        // html에서, form element의 기본 동작은 원래 페이지를 새로고침하므로 먼저 기본 동작을 막아주도록 합니다.
        event.preventDefault();

        if (email.trim() === '') {
            setErrorMessage('이메일을 입력해주세요.');
        }

        if (email.includes("@") === false) {
            setErrorMessage('이메일에 @가 포함되어야 합니다.');
        }

        // 이메일 검증 정규식
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setErrorMessage("이메일 형식이 올바르지 않습니다.");
            return;
        }

        // 비밀번호 검증 정규식
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            setErrorMessage(
                "비밀번호는 최소 8자 이상이어야 하며, 최소 하나의 문자, 숫자 및 특수 문자를 포함해야 합니다."
            );
            return;
        }

        setErrorMessage('');
        setSuccessMessage('검사를 통과했습니다. 이제 서버로 보낼 수 있어요.');

    }


    return (<>
        <main>
            <h1>로그인 입력 검사</h1>

            <form onSubmit={handleSubmit}>
                <label htmlFor="email">이메일</label>
                <input 
                    type="email"
                    id="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="ex) example@example.com"
                />

                <label htmlFor="password">비밀번호</label>
                <input 
                    id="password"
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="8글자 이상, 문자, 숫자, 특수문자 포함"
                />

                {/** 오류나 성공 문장이 있을 때만 화면에 보여줘요. */}
                {errorMessage && <p>{errorMessage}</p>}
                {successMessage && <p>{successMessage}</p>}

                <button type="submit">로그인 확인</button>
            </form>
        </main>
    </>)
    
}