// 1. 로컬 스토리지에 데이터를 저장하고 빼내는 방법
localStorage.setItem("아이디", 1234)
localStorage.getItem("아이디") // => 1234 라는 값을 꺼내올수 있습니다.

// 2. 세션 스토리지에 데이터를 저장하고 빼내는 방법
sessionStorage.setItem("비밀번호", 1234)
sessionStorage.getItem("비밀번호") // => 1234 라는 값을 꺼내올수 있습니다.