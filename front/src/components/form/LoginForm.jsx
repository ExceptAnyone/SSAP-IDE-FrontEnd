import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setUsername,
  setPassword,
  setIsValidUsername,
  setIsValidPassword,
  setIsLoading,
  setIsError,
  setIsSuccess,
} from "../../redux/authSlice";
import "../../page/login/LoginPage.css";
import { useMutation } from "react-query";
import axios from "axios";
import { getCookie, setCookie } from "../../cookie/cookieUtils";

function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    username,
    password,
    isValidUsername,
    isValidPassword,
    isLoading,
    isError,
    isSuccess,
    registeredUsers,
  } = useSelector((state) => state.auth);

  // 로그인 상태 확인
  useEffect(() => {
    const userID = getCookie("userID");
    if (userID) {
      dispatch(setIsSuccess(true)); // 로그인 상태로 표시
    }
  }, [dispatch]);

  const { mutate: loginMutation } = useMutation(
    async ({ username, password }) => {
      const response = await axios.post("/api/login", { username, password });
      return response.data; // 로그인 결과를 반환 (예: 토큰)
    },
    {
      onSuccess: (data) => {
        dispatch(setIsSuccess(true)); // 로그인 성공 시 상태 업데이트
        setCookie("token", data.token, 30); // 쿠키에 토큰 저장 (30일 동안 유지)
        navigate.push("/"); // 로그인 성공 후 메인 페이지로 이동
      },
      onError: () => {
        dispatch(setIsError(true)); // 로그인 실패 시 상태 업데이트
        // 에러 처리 로직을 추가할 수 있습니다.
      },
    },
  );
  // 서버 요청에 JWT 토큰 추가
  // const headers = {
  //   Authorization: `Bearer ${yourJwtToken}`, // 여기에 JWT 토큰을 추가
  // };

  // axios.get("/api/some-protected-endpoint", { headers })
  //   .then((response) => {
  //     // 서버 응답 처리
  //   })
  //   .catch((error) => {
  //     // 에러 처리
  //   });

  const handleUsernameBlur = () => {
    const isValid = validateUsername(username);
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

  const handleLogin = () => {
    if (isValidUsername && isValidPassword) {
      const userData = {
        username,
        password,
      };

      const userFound = registeredUsers.some((user) => {
        return (
          user.username === userData.username &&
          user.password === userData.password
        );
      });
      console.log("userFound:", userFound);
      if (userFound) {
        // 로그인 성공 시 쿠키 설정
        setCookie("userID", username, 30); // 30일 동안 유지
        dispatch(setIsLoading(true));
        dispatch(setIsSuccess(true)); // 로그인 성공
        navigate("/"); // "/dashboard" 경로로 이동
      } else {
        dispatch(setIsError(true)); // 로그인 실패
      }

      // dispatch(setIsLoading(true));
      // loginMutation({ username, password }); // 로그인 요청을 보냅니다.
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
        onChange={(e) => dispatch(setUsername(e.target.value))}
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
        onChange={(e) => dispatch(setPassword(e.target.value))}
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
        <Link to="/">
          <button
            className="login-bt"
            onClick={handleLogin}
            disabled={
              !isValidUsername || !isValidPassword || isLoading || !password
            }
            style={{ marginLeft: "0px" }}
          >
            {isSuccess ? "로그인 성공" : "로그인"}
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
