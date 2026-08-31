// 정규식은 문자열이 정해 둔 모양과 같은지 검사하는 방식입니다.
// 예를 들어 이메일 주소나 전화번호 형식을 검증할 때 사용할 수 있습니다.
// 정규식은 자바스크립트에서 /패턴/ 형태로 작성하며, test 메서드를 사용해 문자열이 패턴과 일치하는지 확인할 수 있습니다.

// 이메일 검증
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// 비밀번호 숫자가 하나 이상 있는지도 따로 확인할수도 있어요
const HAS_NUMBER_REGEX = /[0-9]/;

// 비밀번호에 영문이 하나 이상 있는지 확인할 수 있어요
const HAS_LETTER_REGEX = /[a-zA-Z]/;

// 비밀번호에 특수문자가 하나 이상 있는지 확인할 수 있어요
const HAS_SPECIAL_CHAR_REGEX = /[!@#$%^&*(),.?":{}|<>]/;

// 비밀번호에 최소 8자 이상, 숫자, 영문, 특수문자가 하나 이상 포함되어 있는지 확인할 수 있어요.
const STRONG_PASSWORD_REGEX =
  /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

// 이메일과 비밀번호를 확인 하는 함수
export function validateEmail(email: string) {
  if (email.trim() === "") return "이메일을 입력해주세요."; // 빈 문자열 체크
  // test()는 문자열이 정규식과 일치하는지 확인하는 메서드입니다.
  if (!EMAIL_REGEX.test(email)) return "유효한 이메일을 입력해주세요."; // 이메일 형식 체크
  return "";
}

// 비밀번호 검증 함수
export function validatePassword(password: string) {
  if (password.trim() === "") return "비밀번호를 입력해주세요."; // 빈 문자열 체크
  if (!HAS_NUMBER_REGEX.test(password))
    return "비밀번호에 숫자가 하나 이상 포함되어야 합니다."; // 숫자 체크
  if (!HAS_LETTER_REGEX.test(password))
    return "비밀번호에 영문이 하나 이상 포함되어야 합니다."; // 영문 체크
  if (!HAS_SPECIAL_CHAR_REGEX.test(password))
    return "비밀번호에 특수문자가 하나 이상 포함되어야 합니다."; // 특수문자 체크
  if (!STRONG_PASSWORD_REGEX.test(password))
    return "비밀번호는 최소 8자 이상이어야 하며, 숫자, 영문, 특수문자가 하나 이상 포함되어야 합니다."; // 강력한 비밀번호 체크
  return "";
}
// ISO 27001은 정보 보안 관리 시스템(ISMS)에 대한 국제 표준입니다.
// 이 표준은 조직이 정보 보안을 체계적으로 관리하고 보호할 수 있도록 요구사항을 정의하고 있습니다.
