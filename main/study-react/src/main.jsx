import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  // 개발 환경에서만 StrictMode를 활성화하고, 배포 환경에서는 비활성화 되요. 이건 개발하면서 React의 잠재적인 문제를 조기에 발견하기 위해서에요.
  // 모든 리액트 페이지들, 기능들, 전부 이곳에서 가상의 Dom으로 렌더링 됩니다. 그것이 여기보다 더 최상위인 index.html의 <div id="root"></div>에 렌더링 되는 것이죠.
  <StrictMode>
    <App />
  </StrictMode>,
)
