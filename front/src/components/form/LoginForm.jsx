import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setEmail,
  setPassword,
  setIsValidUsername,
  setIsValidPassword,
  setIsError,
  setIsSuccess,
} from "../../redux/authSlice";
import "../../page/loginpage/LoginPage.css";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { getCookie, setCookie } from "../../cookie/cookieUtils";

function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const {
    email,
    password,
    isValidUsername,
    isValidPassword,
    isLoading,
    isError,
  } = useSelector((state) => state.auth);

  useEffect(() => {
    const userID = getCookie("userID");
    if (userID) {
      dispatch(setIsSuccess(true));
    }
  }, [dispatch]);

  const newUsers = {
    email: email,
    password: password,
  };

  const { mutate: loginMutation, isError: loginError } = useMutation(
    async () => {
      try {
        const response = await axios.post(
          "http://ide-env.eba-mhhgujuf.ap-northeast-2.elasticbeanstalk.com/login",
          newUsers,
          {
            withCredentials: false,
          },
        );
        const responseData = response.data;

        if (responseData.status === 200) {
          dispatch(setIsSuccess(true));
          setCookie("token", responseData.data.accessToken, 30);
          navigate("/");
          queryClient.invalidateQueries("userData");
        } else if (responseData.status === 401) {
          dispatch(setIsError(true));
        } else {
          console.error("음", responseData.message);
          dispatch(setIsError(true));
          navigate("/");
        }
      } catch (error) {
        console.error("로그인 요청 중 오류 발생:", error);
        dispatch(setIsError(true));
      }
    },
    {
      onError: () => {
        dispatch(setIsError(true));
      },
    },
  );
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
    return emailRegex.test(value);
  };

  const validatePassword = (value) => {
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,30}$/;
    return passwordRegex.test(value);
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
        value={email}
        onChange={(e) => dispatch(setEmail(e.target.value))}
        onBlur={handleUsernameBlur}
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
        onChange={(e) => dispatch(setPassword(e.target.value))}
        onBlur={handlePasswordBlur}
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
        <button
          className="login-bt"
          onClick={loginMutation}
          disabled={
            !isValidUsername ||
            !isValidPassword ||
            isLoading ||
            !password ||
            isError
          }
          style={{ marginLeft: "0px" }}
        >
          로그인
        </button>

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
