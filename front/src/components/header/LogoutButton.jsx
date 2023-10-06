import React from "react";
import { useDispatch } from "react-redux";
import { clearUserData } from "../../redux/authSlice"; // 사용자 데이터 초기화 액션

function LogoutButton() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    // 로그아웃 처리
    // 여기서는 Redux 상태를 초기화하고, 토큰을 삭제한다고 가정합니다.
    dispatch(clearUserData()); // Redux 상태 초기화 액션 호출
    localStorage.removeItem("token"); // 로컬 스토리지에서 토큰 삭제 (예: JWT)

    // 로그아웃 후 리디렉션 (예: 로그인 페이지로)
    window.location.href = "/login"; // 로그인 페이지 경로로 이동
    // 로그아웃이 성공했을 때 콘솔에 메시지 출력
    console.log("로그아웃 되었습니다.");
  };

  return <button onClick={handleLogout}>로그아웃</button>;
}

export default LogoutButton;
