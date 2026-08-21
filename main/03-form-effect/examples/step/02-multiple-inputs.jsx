import { useState } from "react";

export default function MultipleInputsExample() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nickname, setNickname] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    function handleEmailChange(event) {
        setEmail(event.target.value);
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

    function handleNicknameChange(event) {
        setNickname(event.target.value);
    }

    function togglePasswordVisibility() {
        setShowPassword((previousValue) => !previousValue);
    }

    const hasEmail = email !== "";
    const hasPassword = password.length >= 8;
    const hasNickname = nickname.trim() !== "";
    const isActive = hasEmail && hasPassword && hasNickname;


    return (<>
        <main>
            <h1>회원 정보 입력</h1>

            <section>
                <label htmlFor="email">이메일</label>
                <input id="email" value={email} onChange={handleEmailChange} />
                <br/>
                <label htmlFor="password">비밀번호</label>
                <input 
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={handlePasswordChange}
                />
                <button type="button" onClick={togglePasswordVisibility}>
                    {showPassword ? "🔒 비밀번호 숨기기" : "👁️ 비밀번호 보기"}
                </button>
                <br/>

                <label htmlFor="nickname">닉네임</label>
                <input id="nickname" value={nickname} onChange={handleNicknameChange} />

                {/* 세 조건이 모두 true일 때만 아래 버튼을 사용할 수 있게 만들어줘요 */}
                <button
                    disabled={!isActive}
                >회원가입</button>

                <section>
                    <h2>입력 상태</h2>
                    <p>이메일: {hasEmail ? "✅" : "이메일을 입력해주세요"}</p>
                    <p>비밀번호: {hasPassword ? "✅" : "8글자 이상 입력해주세요"}</p>
                    <p>닉네임: {hasNickname ? "✅" : "닉네임을 입력해주세요"}</p>
                </section>
            </section>
        </main>
    </>)
}