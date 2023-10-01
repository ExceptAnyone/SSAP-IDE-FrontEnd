import React from "react";
import BackButton from "./BackButton";
import ProfileIcon from "./ProfileIcon";
import "./Header.css"; // 헤더 스타일링을 위한 CSS 파일

export default function Header(props) {
  const password = props.password;
  const confirmPassword = props.confirmPassword;
  const containnername = props.containnername;
  const MainPage = props.MainPage;

  return (
    <div className="header">
      <div className="header-inner">
        <div className="header-top">
          <div className="profileicon-left">레인보우/모든 컨테이너</div>

          <div className="profileicon-right">
            <ProfileIcon />
          </div>
          <button
            className="edit-btn"
            disabled={
              password !== confirmPassword ||
              (!password && !containnername && !MainPage)
            }
          >
            {props.name}
          </button>
          {/* isValidPassword 값에 따라 버튼의 disabled 속성을 설정하여 활성화/비활성화 조절 */}
        </div>
        <div className="header-bottom">
          <BackButton icon={props.icon} />
        </div>
      </div>

      <hr />
    </div>
  );
}
