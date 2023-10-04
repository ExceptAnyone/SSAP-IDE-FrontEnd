import React, { useState } from "react";
import { BsFillPersonFill } from "react-icons/bs";

import "./Header.css";
import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";

export default function ProfileIcon() {
  // 리스트의 표시 여부를 제어할 상태 변수
  const [isListVisible, setListVisible] = useState(false);

  // 프로필 아이콘을 클릭하여 리스트 토글하는 함수
  const toggleList = () => {
    setListVisible(!isListVisible);
  };

  return (
    <div className="profileicon">
      <BsFillPersonFill onClick={toggleList} />
      {isListVisible && (
        <ul>
          <Link to="/editsignup">
            <li>내 정보</li>
          </Link>

          <li>
            <LogoutButton />
          </li>
        </ul>
      )}
    </div>
  );
}
