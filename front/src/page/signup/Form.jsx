import React, { useState } from "react";
import "./SignupPage.css";

function Form() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [isValidUsername, setIsValidUsername] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);

  const validateUsername = (value) => {
    // 이메일 형식을 검사하는 정규표현식
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    setIsValidUsername(emailRegex.test(value));
  };

  const validatePassword = (value) => {
    // 비밀번호는 영문, 숫자, 특수문자를 포함한 8-30자여야 합니다.
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,30}$/;
    setIsValidPassword(passwordRegex.test(value));
  };

  const handleSignup = () => {
    // 여기에 실제 회원가입 로직을 구현할 수 있습니다.
    // 예: 서버로 회원가입 요청을 보내거나, 데이터베이스에 사용자 정보를 저장합니다.
    if (isValidUsername && isValidPassword && confirmPassword && name) {
      // 실제 로그인 로직을 구현하세요.
      console.log("로그인 성공");
      console.log("이메일:", username);
      console.log("비밀번호:", password);
      console.log("비밀번호 확인:", confirmPassword);
      console.log("이름:", name);
    } else {
      console.log("유효하지 않은 입력값이 있습니다.");
    }
  };

  return (
    <div className="form">
      <div className="form1">이메일</div>

      <input
        type="text"
        placeholder="abcd1234@ssap.com"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
          validateUsername(e.target.value);
        }}
        className={!isValidUsername ? "invalid" : ""}
        style={{
          /* 위, 아래, 양옆 선 없애기 */
          border: "none",
          outline: "none",
          borderBottom: "2px solid #000", // 수정된 부분
          marginBottom: 15,
          width: 300,
          padding: 10,
        }}
      />
      {isValidUsername ? null : <p className="error">이메일 형식으로.</p>}

      <br />
      <div className="form2">비밀번호</div>
      <input
        type="password"
        placeholder="영문,숫자,특수문자 8-30자"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          validatePassword(e.target.value);
        }}
        className={!isValidPassword ? "invalid" : ""}
        style={{
          /* 위, 아래, 양옆 선 없애기 */
          border: "none",
          outline: "none",
          borderBottom: "2px solid #000", // 수정된 부분
          marginBottom: 15,
          width: 300,
          padding: 10,
        }}
      />
      {isValidPassword ? null : (
        <p className="error">
          비밀번호는 영문, 숫자, 특수문자를 포함한 8-30자여야 합니다.
        </p>
      )}

      <br />
      <div className="form3">비밀번호 확인</div>
      <input
        type="password"
        placeholder="영문,숫자,특수문자 8-30자"
        value={confirmPassword}
        onChange={(e) => {
          setConfirmPassword(e.target.value);
        }}
        style={{
          /* 위, 아래, 양옆 선 없애기 */
          border: "none",
          outline: "none",
          borderBottom: "2px solid #000", // 수정된 부분
          marginBottom: 15,
          width: 300,
          padding: 10,
        }}
      />
      {password !== confirmPassword && (
        <p className="error">비밀번호가 일치하지 않습니다.</p>
      )}

      <br />
      <div className="form4">이름</div>
      <input
        type="text"
        placeholder="이름(2-30자)"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{
          /* 위, 아래, 양옆 선 없애기 */
          border: "none",
          outline: "none",
          borderBottom: "2px solid #000", // 수정된 부분
          marginBottom: 15,
          width: 300,
          padding: 10,
        }}
      />

      <br />
      <div className="form-text"> ***이메일과 이름은 변경 불가합니다.</div>
      <br />
      <button
        onClick={handleSignup}
        className="login-bt"
        disabled={
          !isValidUsername ||
          !isValidPassword ||
          !confirmPassword ||
          !name ||
          password !== confirmPassword
        }
      >
        <div>로그인</div>
      </button>
    </div>
  );
}

export default Form;
