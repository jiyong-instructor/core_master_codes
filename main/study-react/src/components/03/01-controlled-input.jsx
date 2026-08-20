// 중괄호가 있는 이유는, react에서 useState라는 함수를 export default로 내보내지 않고, 
// export로 여러가지를 내보냈기 때문에 중괄호를 사용하여 import해야 한다.
import { useState } from "react"; 

export default function ControlledInputExample() {

    const [email, setEmail] = useState(''); 

    function handleEmailChange(event) {
        setEmail(event.target.value);
    }
    
    function clearEmail() {
        setEmail('');
    }

    const hasEmail = email !== ""; // email이 빈 문자열이 아니면 true, 빈 문자열이면 false


    return (<>
    
        <main>
            <h1>이메일 입력 연습</h1>
            <p>입력한 값을 바로 아래에서 확인해요.</p>

            <section>
                <label htmlFor="email">이메일</label>

                {/* value와 onChange를 state에 연결한 input을 controlled input 이라고 합니다. */}
                <input 
                    id="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="이메일을 입력해주세요."
                />

                <p>입력한 글자수: {email.length}</p>
                <p>현재 입력값: {hasEmail ? email : "아직 비어 있어요."}</p>

                <button disabled={hasEmail === false}>다음</button>
                <button onClick={clearEmail} disabled={hasEmail === false} >지우기</button>
            </section>
        </main>
    
    </>)
}