import React, { useState, useEffect } from "react";
import "./App.css";
import SignupPage from "./page/signup/SignupPage";
import EditSignupPage from "./page/editSignupPage/EditSignupPage";
import CreateContainerPage from "./page/createContainer/CreateContainerPage";
import EditContainerPage from "./page/editcontainer/EditContainerPage";
import IdePage from "./page/ide/IdePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./page/main/MainPage";
import LoginPage from "./page/login/LoginPage";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import PrivateRoute from "./PrivateRoute";

const queryClient = new QueryClient();

function App() {
  const [posts, setPosts] = useState([]); // 글 목록을 상태로 관리
  const addPost = (post) => {
    const updatedPosts = [...posts, post];
    setPosts(updatedPosts);

    // 로컬 스토리지에 데이터 저장
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
  };
  useEffect(() => {
    // 페이지가 로드될 때 로컬 스토리지에서 데이터를 읽어옴
    const storedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    setPosts(storedPosts);
  }, []);

  const deletePost = (index) => {
    // 해당 인덱스의 글을 삭제
    const updatedPosts = [...posts];
    updatedPosts.splice(index, 1);
    setPosts(updatedPosts);

    // 로컬 스토리지에 데이터 저장
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
  };

  const editPost = (index, updatedPost) => {
    // 해당 인덱스의 글을 수정
    const updatedPosts = [...posts];
    updatedPosts[index] = updatedPost;
    setPosts(updatedPosts);

    // 로컬 스토리지에 데이터 저장
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
  };

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<MainPage posts={posts} deletePost={deletePost} />}
          />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="users/{id}" element={<EditSignupPage />} />
          <Route
            path="containers"
            element={<CreateContainerPage addPost={addPost} posts={posts} />}
          />
          <Route
            path="containers/{containerId}"
            element={<EditContainerPage editPost={editPost} />}
          />
          <Route
            path="ide/:containerId"
            element={<PrivateRoute component={IdePage} />}
          />
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
