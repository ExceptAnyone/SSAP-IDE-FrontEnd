import React, { useState, useEffect } from "react";
import Test from "./Test";
import Header from "../../components/header/Header";
import { AiOutlineSearch } from "react-icons/ai";
import "./MainPage.css";
import Footer from "../../components/footer/Footer";
import Name from "../../components/form/Name";

export default function MainPage() {
  const [originalPosts, setOriginalPosts] = useState([]); // 초기 글 목록을 저장하는 상태 변수
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

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    const searchText = e.target.value.toLowerCase(); // 검색어를 소문자로 통일
    setSearchTerm(searchText);

    if (searchText === "") {
      // 검색어가 비어있을 때, 초기 글 목록을 보여줍니다.
      setPosts(originalPosts);
    } else {
      // 검색어에 해당하는 게시물만 필터링하여 업데이트합니다.
      const filteredPosts = originalPosts.filter(
        (post) => post.title.toLowerCase().includes(searchText), // 게시물의 title도 소문자로 통일하여 비교
      );
      setPosts(filteredPosts);
    }
  };

  useEffect(() => {
    // 페이지가 로드될 때 로컬 스토리지에서 데이터를 읽어와 originalPosts 상태에 설정합니다.
    const storedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    setPosts(storedPosts);
    setOriginalPosts(storedPosts); // 초기 글 목록을 설정합니다.
  }, []);

  return (
    <div className="main">
      <div className="main-inner">
        <Header icon="모든 컨테이너" />
        <div className="main-middle">
          <div className="login-hd">
            <button>
              <AiOutlineSearch />
            </button>
            <input
              className="search"
              type="text"
              placeholder="컨테이너 이름"
              onChange={handleSearch}
            ></input>
          </div>
          <Name
            link="/containers"
            name="새 컨테이너"
            MainPage={MainPage}
            addPost={addPost}
          />
        </div>
        <div className="test-list">
          {posts.map((post, index) => (
            <Test key={index} posts={[post]} deletePost={deletePost} />
          ))}
        </div>
        <Footer />
      </div>
    </div>
  );
}
