import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "react-query";
import axios from "axios";
import "../../page/signup/SignupPage.css";
import { useNavigate } from "react-router-dom";

// Redux Toolkit actions 및 리듀서를 가져옵니다.
import {
  setUsername,
  setPassword,
  setConfirmPassword,
  setName,
  setError,
  setIsLoading,
  setSuccess,
  registerUser,
} from "../../redux/authSlice";

function SignUpForm() {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.auth.username);
  const password = useSelector((state) => state.auth.password);
  const confirmPassword = useSelector((state) => state.auth.confirmPassword);
  const name = useSelector((state) => state.auth.name);
  const error = useSelector((state) => state.auth.error);
  const isLoading = useSelector((state) => state.auth.isLoading);
  const success = useSelector((state) => state.auth.success);
  const navigate = useNavigate(); // useHistory 훅을 추가해서 페이지 이동 가능

  const validateUsername = (value) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    dispatch(setUsername(value));
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

  const signupMutation = useMutation(
    (newUser) => {
      return axios.post("/", newUser);
    },

    {
      onSuccess: (data) => {
        dispatch(setSuccess("가입에 성공했습니다."));
        dispatch(setIsLoading(false));
        console.log(" onSuccess 가입 성공"); // "가입 성공" 로그 추가

        // 원하는 동작 수행
        navigate("/login"); // "/login"은 로그인 페이지 경로에 맞게 수정
        console.log("로그인 성공");
      },
      onError: (error) => {
        dispatch(setError(`가입 실패: ${error.message}`));
        dispatch(setIsLoading(false));
      },
    },
  );

  const handleSignup = () => {
    if (username && password && confirmPassword && name) {
      //Todo:Test진행 추후 삭제 예정
      const userData = {
        username,
        password,
        confirmPassword,
        name,
      };
      dispatch(registerUser(userData));
      console.log("dispatch userData: ", userData);

      // 상태 업데이트
      dispatch(setSuccess("가입에 성공했습니다."));
      dispatch(setIsLoading(false));
      dispatch(setSuccess(true));
      signupMutation.mutate({
        username,
        password,
        confirmPassword,
        name,
      });
      if (signupMutation.isSuccess) {
        // 가입 성공 시 로그인 페이지로 이동
        navigate.push("/"); // "/login"은 로그인 페이지 경로에 맞게 수정
        console.log("로그인 성공");
      }
    } else {
      dispatch(setError("모든 필드를 입력해주세요."));
    }
  };

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
      console.log(" useEffect 가입 성공");
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
        value={username}
        onChange={(e) => {
          validateUsername(e.target.value);
        }}
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
        onChange={(e) => {
          validatePassword(e.target.value);
        }}
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
        onChange={(e) => {
          dispatch(setConfirmPassword(e.target.value));
        }}
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
        onClick={handleSignup}
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
