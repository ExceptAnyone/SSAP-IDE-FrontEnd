import React from "react";
import BackButton from "./BackButton";
import ProfileIcon from "./ProfileIcon";
import "./Header.css"; // 헤더 스타일링을 위한 CSS 파일

export default function Header(props) {
  return (
    <div className="header">
      <div className="header-inner">
        <div className="header-top">
          <div className="profileicon-left">레인보우/모든 컨테이너</div>

          <div className="profileicon-right">
            <ProfileIcon />
          </div>
        </div>
        <div className="header-bottom">
          <BackButton icon={props.icon} />
        </div>
      </div>

      <hr />
    </div>
  );
}
