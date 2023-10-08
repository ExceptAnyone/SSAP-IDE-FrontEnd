import React, { useState } from "react";
import Header from "../../components/header/Header";
import "./EditSignupPage.css";
// import { Link } from "react-router-dom";

export default function EditSignupPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isValidPassword, setIsValidPassword] = useState(false);

  const validatePassword = (value) => {
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,30}$/;
    setIsValidPassword(passwordRegex.test(value));
  };

  const handlePasswordBlur = () => {
    validatePassword(password);
  };

  return (
    <div>
      <Header
        name="수정하기"
        icon="회원정보 수정"
        password={password}
        confirmPassword={confirmPassword}
      />
      {/* isValidPassword 값을 Header 컴포넌트로 전달 */}

      <ul className="profile">
        <div>
          <div className="profile1">
            이메일
            <div className="email">abcd1234@ssap.com</div>
          </div>

          <br />

          <div className="profile2">
            <label htmlFor="password">비밀번호</label>
            <div className="pass-2">
              <input
                type="password"
                placeholder="영문,숫자,특수문자 8-30자"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                onBlur={handlePasswordBlur} // onBlur 이벤트 추가
                className={`pass-0 ${!isValidPassword ? "invalid" : ""}`}
              />
            </div>
            {!isValidPassword ? (
              <p className="error">
                비밀번호는 영문, 숫자, 특수문자를 포함한 8-30자여야 합니다.
              </p>
            ) : null}
          </div>
          <br />
          <div className="profile3">
            <label htmlFor="password">비밀번호 확인</label>
            <input
              className="pass-1"
              type="password"
              placeholder="영문,숫자,특수문자 8-30자"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />

            {password !== confirmPassword && (
              <p className="error">비밀번호가 일치하지 않습니다.</p>
            )}
          </div>
          <br />
          <div className="profile4">
            이름 <div className="name"> 레인보우</div>
          </div>
        </div>
      </ul>
    </div>
  );
}
