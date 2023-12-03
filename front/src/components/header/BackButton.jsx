import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Header.css";

export default function BackButton(props) {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // 뒤로 가기 기능을 수행하는 navigate 함수
  };

  return (
    <div className="back">
      <FaArrowLeft
        onClick={goBack}
        style={{ margin: "0" }}
        className="backbutton-icon"
      />

      <h2> {props.icon}</h2>
    </div>
  );
}
