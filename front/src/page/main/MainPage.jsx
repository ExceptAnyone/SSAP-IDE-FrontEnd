import React , {useState, useEffect} from "react";
import Test from "./Test";
import Header from "../../components/header/Header";
import { AiOutlineSearch } from "react-icons/ai";
import "./MainPage.css";
import Footer from "../../components/footer/Footer";



  


export default function MainPage() {
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
    <div>
      <Header
        link="/containers"
        name="새 컨테이너"
        icon="모든 컨테이너"
        MainPage={MainPage}
      />
      <div className="login-hd">
        <AiOutlineSearch />
        <input
          className="search"
          type="text"
          placeholder="컨테이너 이름"
        ></input>
      </div>
      <div className="test-list">
        {posts.map((post, index) => (
          <Test key={index} posts={[post]} deletePost={deletePost} />
        ))}
      </div>
      <Footer />
    </div>
  );
}
