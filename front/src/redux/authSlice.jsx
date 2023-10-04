import { createSlice } from "@reduxjs/toolkit";

// Redux 슬라이스 생성
const authSlice = createSlice({
  name: "auth",
  initialState: {
    registeredUsers: [], // 회원가입 정보를 저장할 배열
    username: "", // 사용자 이름
    password: "", // 비밀번호
    confirmPassword: "", // 비밀번호 확인
    name: "", // 이름
    error: "", // 에러 메시지
    isValidUsername: true, // 유효한 사용자 이름 여부
    isValidPassword: true, // 유효한 비밀번호 여부
    isLoading: false, // 로딩 중 여부
    isError: false, // 에러 발생 여부
    isSuccess: false, // 성공 여부
  },
  reducers: {
    // 사용자 등록 정보를 배열에 추가
    registerUser: (state, action) => {
      state.registeredUsers.push(action.payload);
      console.log(state);
    },
    // 사용자 이름 업데이트
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    // 비밀번호 업데이트
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    // 비밀번호 확인 업데이트
    setConfirmPassword: (state, action) => {
      state.confirmPassword = action.payload;
    },
    // 이름 업데이트
    setName: (state, action) => {
      state.name = action.payload;
    },
    // 에러 메시지 업데이트
    setError: (state, action) => {
      state.error = action.payload;
    },
    // 유효한 사용자 이름 여부 업데이트
    setIsValidUsername: (state, action) => {
      state.isValidUsername = action.payload;
    },
    // 유효한 비밀번호 여부 업데이트
    setIsValidPassword: (state, action) => {
      state.isValidPassword = action.payload;
    },
    // 로딩 중 여부 업데이트
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    // 에러 발생 여부 업데이트
    setIsError: (state, action) => {
      state.isError = action.payload;
    },
    // 성공 여부 업데이트
    setIsSuccess: (state, action) => {
      state.isSuccess = action.payload;
    },
    // 성공 메시지 업데이트
    setSuccess: (state, action) => {
      state.isSuccess = action.payload;
    },
    // 사용자 데이터 초기화
    clearUserData: (state) => {
      // clearUserData 액션을 추가합니다.
      state.username = "";
      state.password = "";
      state.confirmPassword = "";
      state.name = "";
      state.error = "";
      state.isValidUsername = true;
      state.isValidPassword = true;
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
    },
  },
});

// 액션 생성자들을 내보내기
export const {
  setUsername,
  setPassword,
  setConfirmPassword,
  setName,
  setError,
  setIsValidUsername,
  setIsValidPassword,
  setIsLoading,
  setIsError,
  setIsSuccess,
  registerUser,
  setSuccess,
  clearUserData,
} = authSlice.actions;

// 리듀서를 내보내기
export default authSlice.reducer;
