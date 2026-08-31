"use client";

import { removeAccessToken } from "../auth-store";

export default function LogoutExample() {
  function handleLogout() {
    removeAccessToken();
    alert("로그아웃했습니다.");
    window.location.reload();
  }

  return <button onClick={handleLogout}>로그아웃</button>;
}
