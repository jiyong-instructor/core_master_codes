// @ 앞뒤에 글자가 있고, 마지막에 .도메인이 있는지 확인하는 쉬운 이메일 정규식입니다.
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// 8자 이상이며 영문과 숫자를 각각 하나 이상 포함하는지 확인합니다.
// !@#$%^&* 특수문자는 선택해서 사용할 수 있어요.
export const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*]{8,}$/;

export function validateEmail(email: string) {
  if (email.trim() === "") return "이메일을 입력해 주세요.";
  if (!EMAIL_REGEX.test(email)) return "이메일 형식을 확인해 주세요.";
  return "";
}

export function validatePassword(password: string) {
  if (password === "") return "비밀번호를 입력해 주세요.";
  if (!PASSWORD_REGEX.test(password)) {
    return "비밀번호는 영문과 숫자를 포함해 8자 이상 입력해 주세요.";
  }
  return "";
}
