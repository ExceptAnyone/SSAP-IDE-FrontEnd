import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "react-query"; // React Query에서 useMutation을 가져옵니다.
import "./LoginPage.css";

// 로그인 요청 함수
async function loginUser({ username, password }) {
  // 실제 로그인 요청을 수행하고 응답을 반환합니다.
  // 이 부분은 실제 API 호출 또는 서버 요청으로 대체되어야 합니다.
  // 여기서는 간단한 예제를 보여주기 위해 setTimeout으로 가상의 응답을 반환합니다.
  await new Promise((resolve) => setTimeout(resolve, 1000));
  // 가상의 응답 데이터
  return { success: true };
}

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isValidUsername, setIsValidUsername] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);

  const { mutate, isLoading, isError, isSuccess } = useMutation(loginUser);

  const handleUsernameBlur = (e) => {
    setIsValidUsername(validateUsername(e.target.value));
  };

  const handlePasswordBlur = (e) => {
    setIsValidPassword(validatePassword(e.target.value));
  };

  const validateUsername = (value) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(value);
  };

  const validatePassword = (value) => {
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,30}$/;
    return passwordRegex.test(value);
  };

  const handleLogin = () => {
    if (isValidUsername && isValidPassword) {
      // 로그인 요청을 보냅니다.
      mutate({ username, password });
    } else {
      console.log("유효하지 않은 입력값이 있습니다.");
    }
  };

  return (
    <div className="login">
      <div className="flex login-flex">
        <h2 className="login-title">통합 로그인</h2>
        <p className="login-title-sub">
          SSAP IDE 서비스를 이용하기 위해 로그인 해 주세요.
        </p>
      </div>
      <div className="login-tilte-mp">이메일</div>
      <input
        type="text"
        placeholder="abcd1234@ssap.com"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        onBlur={handleUsernameBlur} // onBlur 이벤트 핸들러 추가
        className={!isValidUsername ? "invalid" : ""}
        style={{
          border: "none",
          outline: "none",
          borderBottom: "2px solid #000",
          marginBottom: 15,
          width: 500,
          padding: 10,
        }}
      />
      {isValidUsername ? null : <p className="error">이메일 형식으로.</p>}
      <div className="login-tilte-mp">비밀번호</div>
      <input
        type="password"
        placeholder="영문,숫자,특수문자 8-30자"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onBlur={handlePasswordBlur} // onBlur 이벤트 핸들러 추가
        className={!isValidPassword ? "invalid" : ""}
        style={{
          border: "none",
          outline: "none",
          borderBottom: "2px solid #000",
          width: 500,
          padding: 10,
        }}
      />
      {isValidPassword ? null : (
        <p className="error">
          비밀번호는 영문, 숫자, 특수문자를 포함한 8-30자여야 합니다.
        </p>
      )}
      <div className="flex-coll flex">
        <Link to="/loginpage">
          <button
            className="login-bt"
            onClick={handleLogin}
            disabled={!isValidUsername || !isValidPassword || isLoading}
            style={{ marginLeft: "0px" }}
          >
            {isLoading ? "로그인 중..." : isSuccess ? "로그인 성공" : "로그인"}
          </button>
          {isError && <p className="error">로그인 실패</p>}
        </Link>
        <nav className="sign-up-bt">
          <Link to="/signup" className="sign-up-bt-link">
            회원가입하러 가기
          </Link>
        </nav>
      </div>
    </div>
  );
}

export default LoginForm;
