import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isValidUsername, setIsValidUsername] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);

  const validateUsername = (value) => {
    // 이메일 형식을 검사하는 정규표현식
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    setIsValidUsername(emailRegex.test(value));
  };

  const validatePassword = (value) => {
    // 비밀번호는 영문, 숫자, 특수문자를 포함한 8-30자여야 합니다.
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,30}$/;
    setIsValidPassword(passwordRegex.test(value));
  };

  const handleLogin = () => {
    // 유효성 검사를 추가하여 로그인 로직을 실행합니다.
    if (isValidUsername && isValidPassword) {
      // 실제 로그인 로직을 구현하세요.
      console.log('로그인 성공');
      console.log('Username:', username);
      console.log('Password:', password);
    } else {
      console.log('유효하지 않은 입력값이 있습니다.');
    }
  };


  
  return (
    <div>
      <h2>통합 로그인</h2>
      <p>SSAP IDE 서비스를 이용하기 위해 로그인 해 주세요.</p>
      이메일
      <input
        type="text"
        placeholder="abcd1234@ssap.com"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
          validateUsername(e.target.value);
        }}
        className={!isValidUsername ? 'invalid' : ''}
      />
      {isValidUsername ? null : (
        <p className="error">이메일 형식으로.</p>
      )}
      비밀번호
      <input
        type="password"
        placeholder="영문,숫자,특수문자 8-30자"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          validatePassword(e.target.value);
        }}
        className={!isValidPassword ? 'invalid' : ''}
      />
      {isValidPassword ? null : (
        <p className="error">
          비밀번호는 영문, 숫자, 특수문자를 포함한 8-30자여야 합니다.
        </p>
      )}
       <Link to="/loginpage">
      <button onClick={handleLogin} disabled={!isValidUsername || !isValidPassword}>
        로그인
      </button>
      </Link>

      <nav>
        <Link to="/signup">회원가입하러 가기</Link>
      </nav>
    </div>
  );
}

export default Login;
