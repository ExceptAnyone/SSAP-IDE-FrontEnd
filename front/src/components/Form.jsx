import React, { useState } from 'react';

function Form() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
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

  const handleSignup = () => {
    // 여기에 실제 회원가입 로직을 구현할 수 있습니다.
    // 예: 서버로 회원가입 요청을 보내거나, 데이터베이스에 사용자 정보를 저장합니다.
    if (isValidUsername && isValidPassword && confirmPassword && name) {
        // 실제 로그인 로직을 구현하세요.
        console.log('로그인 성공');
         console.log('이메일:', username);
      console.log('비밀번호:', password);
      console.log('비밀번호 확인:', confirmPassword);
      console.log('이름:', name);
      } else {
        console.log('유효하지 않은 입력값이 있습니다.');
      }
    };

  return (
    <div>
      <h2>회원가입</h2>
      <p>새로운 계정을 생성하세요.</p>
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

      <br />
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

      <br />
      비밀번호 확인
      <input
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

      <br />
      이름
      <input
        type="text"
        placeholder="이름(2-30자)"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br />
      ***이메일과 이름은 변경 불가합니다.
      <br />
      <button onClick={handleSignup} disabled={!isValidUsername || !isValidPassword || !confirmPassword || !name || password !== confirmPassword}>
        가입하기
      </button>
    </div>
  );
}

export default Form;
