import { useState } from "react";

export default function FormExample() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [resultMessage, setResultMessage] = useState("");

  function handleEmailChange(event) {
    setEmail(event.target.value);
    setResultMessage("");
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
    setResultMessage("");
  }

  function handleNicknameChange(event) {
    setNickname(event.target.value);
    setResultMessage("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    // 서버로 보내기 전에 가장 간단한 규칙부터 확인해요.
    if (email.includes("@") === false) {
      setErrorMessage("이메일에 @를 넣어주세요.");
      return;
    }

    if (password.length < 4) {
      setErrorMessage("비밀번호는 4글자 이상 입력해주세요.");
      return;
    }

    if (nickname.trim() === "") {
      setErrorMessage("닉네임을 입력해주세요.");
      return;
    }

    setErrorMessage("");
    setResultMessage(`${nickname}님, 입력을 확인했어요!`);
  }

  function resetForm() {
    setEmail("");
    setPassword("");
    setNickname("");
    setErrorMessage("");
    setResultMessage("");
  }

  return (
    <main>
      <h1>TripTalk 회원가입 연습</h1>
      <p>입력값을 state에 저장하고 제출 전에 검사해요.</p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="email">이메일</label>
        <input
          id="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="hello@triptalk.com"
        />

        <label htmlFor="password">비밀번호</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="4글자 이상 입력"
        />

        <label htmlFor="nickname">닉네임</label>
        <input
          id="nickname"
          value={nickname}
          onChange={handleNicknameChange}
          placeholder="여행자 이름"
        />

        {errorMessage && <p>{errorMessage}</p>}
        {resultMessage && <p>{resultMessage}</p>}

        <button type="submit">입력 확인</button>
        <button type="button" onClick={resetForm}>
          다시 작성
        </button>
      </form>
    </main>
  );
}
