import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useMutation, useQueryClient } from "react-query";
import Header from "../../components/header/Header";
import "./EditSignupPage.css";
import { setPassword, setConfirmPassword } from "../../redux/authSlice";
import "../../page/page.css";
import Name from "../../components/form/Name";

async function changeUserinfo({ email, password, passwordConfirm, name }) {
  const response = await fetch("/api/change-user-info", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, passwordConfirm, name }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}

export default function EditSignupPage() {
  const [isValidPassword, setIsValidPassword] = useState(false);
  const dispatch = useDispatch();
  const { password, confirmPassword, email, name } = useSelector(
    (state) => state.auth,
  );
  const queryClient = useQueryClient();

  const mutation = useMutation(changeUserinfo, {
    onSuccess: () => {
      dispatch(setPassword(""));
      dispatch(setConfirmPassword(""));
    },
    onError: (error) => {
      console.error("회원 정보 수정 실패:", error);
    },
    onSettled: () => {
      queryClient.invalidateQueries("auth");
    },
  });

  const validatePassword = (value) => {
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,30}$/;
    setIsValidPassword(passwordRegex.test(value));
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    dispatch(setPassword(newPassword));
    validatePassword(newPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    dispatch(setConfirmPassword(newConfirmPassword));
  };

  const handleSubmit = () => {
    if (isValidPassword && password === confirmPassword) {
      mutation.mutate({
        email, // 이메일 값을 적절히 설정하세요.
        password,
        passwordConfirm: confirmPassword,
        name, // 이름 값을 적절히 설정하세요.
      });
    }
  };

  return (
    <div className="createSing">
      <div className="createSing-inner">
        <Header icon="회원정보 수정" />
        <Name
          name="수정하기"
          handleSubmit={handleSubmit}
          password={password}
          confirmPassword={confirmPassword}
        />

        <ul className="profile">
          <div>
            <div className="profile1">
              <h3>이메일</h3>
              <div className="email">{email}</div>
            </div>

            <br />

            <div className="profile2">
              <h3 htmlFor="password">비밀번호</h3>
              <div className="pass-2">
                <input
                  type="password"
                  placeholder="영문,숫자,특수문자 8-30자"
                  value={password}
                  onChange={handlePasswordChange}
                  className={`pass-0 ${!isValidPassword ? "invalid" : ""}`}
                />
              </div>
            </div>
            <br />
            <div className="profile3">
              <h3 htmlFor="password">비밀번호 확인</h3>
              <input
                className="pass-1"
                type="password"
                placeholder="영문,숫자,특수문자 8-30자"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />

              {password !== confirmPassword && (
                <p className="error">비밀번호가 일치하지 않습니다.</p>
              )}
            </div>
            <br />
            <div className="profile4">
              <h3>이름</h3> <div className="name-3"> {name}레인보우</div>
            </div>
            <br />
          </div>
        </ul>
      </div>
    </div>
  );
}
