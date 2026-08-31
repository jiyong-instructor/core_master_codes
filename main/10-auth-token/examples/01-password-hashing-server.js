// 이 파일은 브라우저 코드가 아니라 백엔드에서 실행하는 개념 예제
import bcrypt from "bcrypt";

// 회원가입 때 실행할 체크함수 예시
async function signup(inputPassword) {
  // 숫자가 커질수록 계산이 느려져 공격은 어려워지지만 서버 부담도 커집니다.
  const saltRounds = 12;

  // hash()함수는 원래 비밀번호로 되돌릴 수 없는 문자열을 만들어줍니다.
  const passwordHash = await bcrypt.hash(inputPassword, saltRounds);

  // 실제 프로덕트 레벨에선 password 대신 passwordHash만 데이터베이스에 저장합니다.
  console.log("DB에 저장할 해시된 비밀번호:", passwordHash);
  return passwordHash;
}

// 회원가입을 했다고 가정해 해시를 만들고 로그인 비교까지 확인합니다.
const savedHash = await signup("myPassword123");
await login("myPassword123", savedHash); // 그 기업입장에선 해쉬값만 저장하면 되요

// 핵심: 클라이언트가 해시해서 보내는 것이 아닙니다.
// 브라우저 > 서버 구간은 HTTPS로 암호화되어 전송됩니다.
// https일 경우 CORS 처리 클라이언트와 백엔드 전부 해줘야합니다.
