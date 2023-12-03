import React, { useState } from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { AiFillSetting } from "react-icons/ai";
import { SlLogout } from "react-icons/sl";

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
    <div className="userInfo">
      <BsFillPersonFill onClick={toggleList} />
      {isListVisible && (
        <ul className="profileicon">
          <Link to="/users/{id}" className="link-sty">
            <li className="profileicon-1">
              <AiFillSetting />
              <span>내 정보</span>
            </li>
          </Link>

          <li className="profileicon-1">
            <SlLogout />
            <span>
              <LogoutButton />
            </span>
          </li>
        </ul>
      )}
    </div>
  );
}
