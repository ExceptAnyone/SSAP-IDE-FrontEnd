import React from "react";
import { useDispatch } from "react-redux";
import { clearUserData } from "../../redux/authSlice";
import axios from "axios"; // axios import 추가
import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 로그아웃 처리 함수
  const handleLogout = async () => {
    try {
      // 서버에 로그아웃 요청을 보냅니다.
      await axios.post(
        "http://ide-env.eba-mhhgujuf.ap-northeast-2.elasticbeanstalk.com/logout",
      );

      // 로그아웃이 성공한 경우 클라이언트 상태를 초기화합니다.
      dispatch(clearUserData());

      // 로그아웃 후 홈 페이지로 리디렉션합니다.
      navigate("/login");

      // 성공 메시지를 콘솔에 출력합니다.
      console.log("로그아웃 성공");

      // 필요한 추가 처리를 여기에 추가하세요.
    } catch (error) {
      // 로그아웃 실패 또는 오류 처리
      console.error("로그아웃 오류:", error);
    }
  };

  return <button onClick={handleLogout}>로그아웃</button>;
}

export default LogoutButton;
