import React from "react";
import BackButton from "./BackButton";
import ProfileIcon from "./ProfileIcon";
import "./Header.css"; // 헤더 스타일링을 위한 CSS 파일
import { Link } from "react-router-dom";

export default function Header(props) {
  const password = props.password;
  const confirmPassword = props.confirmPassword;
  const containnername = props.containnername;
  const MainPage = props.MainPage;
  const handleSubmit = props.handleSubmit;
  const updateContainer = props.updateContainer;
  const handleEditButtonClick = props.handleEditButtonClick;
  const description = props.description;

  return (
    <div className="header">
      <div className="header-inner">
        <div className="header-top">
          <div className="profileicon-left">레인보우/모든 컨테이너</div>

          <div className="profileicon-right">
            <ProfileIcon />
          </div>
        </div>
        <Link style={{ textDecoration: "none" }} to={props.link}>
          <button
            className="edit-btn"
            disabled={
              password !== confirmPassword ||
              (!password && !containnername && !MainPage && !description)
            }
            onClick={updateContainer || handleSubmit || handleEditButtonClick}
          >
            {props.name}
          </button>
        </Link>

        <h3>
          <BackButton icon={props.icon} />
        </h3>
      </div>

      <hr />
    </div>
  );
}
