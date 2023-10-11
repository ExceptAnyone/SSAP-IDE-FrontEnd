import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "react-query";
import axios from "axios";
import "../../page/signup/SignupPage.css";
import { useNavigate } from "react-router-dom";
import "../../page/page.css";

// Redux Toolkit actions 및 리듀서를 가져옵니다.
import {
  setEmail,
  setPassword,
  setConfirmPassword,
  setName,
  setError,
  setIsLoading,
  setSuccess,
  setIsValidUsername,
  setIsValidPassword,
} from "../../redux/authSlice";

function SignUpForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { email, password, confirmPassword, name, error, isLoading, success } =
    useSelector((state) => state.auth);
  console.log(email, name);
  // 채팅에 사용할 유저 정보 저장
  const chatUser = {
    email: email,
    name: name,
  };
  const saveToLocalStorage = () => {
    localStorage.setItem("chatUser", JSON.stringify(chatUser));
    console.log(chatUser);
  };

  const handleUsernameBlur = () => {
    const isValid = validateUsername(email);
    dispatch(setIsValidUsername(isValid));
  };

  const handlePasswordBlur = () => {
    const isValid = validatePassword(password);
    dispatch(setIsValidPassword(isValid));
  };

  const validateUsername = (value) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    dispatch(setEmail(value));
    if (!emailRegex.test(value)) {
      dispatch(setError("이메일 형식으로 입력해주세요."));
    } else {
      dispatch(setError(""));
    }
  };

  const validatePassword = (value) => {
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,30}$/;
    dispatch(setPassword(value));
    if (!passwordRegex.test(value)) {
      dispatch(
        setError("비밀번호는 영문, 숫자, 특수문자를 포함한 8-30자여야 합니다."),
      );
    } else {
      dispatch(setError(""));
    }
  };
  const newUser = {
    email: email,
    password: password,
    passwordConfirm: confirmPassword,
    name: name,
  };
  const signupMutation = useMutation(
    async (newUser) => {
      const response = await axios.post(
        "http://ide-env.eba-mhhgujuf.ap-northeast-2.elasticbeanstalk.com/signup",

        newUser,
      );

      return console.log("data", newUser), response.data;
    },

    {
      onSuccess: () => {
        dispatch(setSuccess("가입에 성공했습니다."));
        dispatch(setIsLoading(false));
        saveToLocalStorage();
        navigate("/login"); // 가입 성공 시 로그인 페이지로 이동
      },
      onError: () => {
        dispatch(setError("가입 중 오류가 발생했습니다."));
        dispatch(setIsLoading(false));
      },
    },
  );

  // 회원가입 성공 또는 실패 시에 처리
  React.useEffect(() => {
    if (signupMutation.isError) {
      dispatch(
        setError(
          `가입 실패: ${signupMutation.error?.message || "알 수 없는 오류"}`,
        ),
      );
      dispatch(setIsLoading(false));
    } else if (signupMutation.isSuccess) {
      dispatch(setSuccess("가입 성공"));
      dispatch(setIsLoading(false));
      // 가입 성공 시 원하는 동작을 수행
    }
  }, [
    signupMutation.isError,
    signupMutation.isSuccess,
    signupMutation.error,
    dispatch,
  ]);

  return (
    <div className="form">
      <div className="form1">이메일</div>
      <input
        type="text"
        placeholder="abcd1234@ssap.com"
        value={email}
        onChange={(e) => dispatch(setEmail(e.target.value))}
        onBlur={handleUsernameBlur} // onBlur 이벤트 핸들러 추가
        className={error ? "invalid" : ""}
        style={{
          border: "none",
          outline: "none",
          borderBottom: "2px solid #000",
          marginBottom: 15,
          width: 300,
          padding: 10,
        }}
      />
      {error ? <p className="error">{error}</p> : null}

      <br />
      <div className="form2">비밀번호</div>
      <input
        type="password"
        placeholder="영문,숫자,특수문자 8-30자"
        value={password}
        onChange={(e) => dispatch(setPassword(e.target.value))}
        onBlur={handlePasswordBlur} // onBlur 이벤트 핸들러 추가
        className={error ? "invalid" : ""}
        style={{
          border: "none",
          outline: "none",
          borderBottom: "2px solid #000",
          marginBottom: 15,
          width: 300,
          padding: 10,
        }}
      />

      {error ? (
        <p className="error">
          비밀번호는 영문,숫자,특수문자 8-30자를 입력하세요{" "}
        </p>
      ) : null}

      <br />
      <div className="form3">비밀번호 확인</div>
      <input
        type="password"
        placeholder="영문,숫자,특수문자 8-30자"
        value={confirmPassword}
        onChange={(e) => dispatch(setConfirmPassword(e.target.value))}
        style={{
          border: "none",
          outline: "none",
          borderBottom: "2px solid #000",
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
        onChange={(e) => dispatch(setName(e.target.value))}
        style={{
          border: "none",
          outline: "none",
          borderBottom: "2px solid #000",
          marginBottom: 15,
          width: 300,
          padding: 10,
        }}
      />

      <br />
      <div className="form-text"> ***이메일과 이름은 변경 불가합니다.</div>
      <br />
      <button
        onClick={() => signupMutation.mutate(newUser)}
        className="login-bt"
        disabled={error || isLoading}
      >
        {isLoading ? "가입 중..." : success ? "가입 성공" : "가입하기"}
      </button>

      {error && <p className="error">비밀번호가 일치하지 않습니다</p>}
    </div>
  );
}

export default SignUpForm;
