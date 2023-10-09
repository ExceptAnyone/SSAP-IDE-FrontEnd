import React, { useState, useEffect } from "react";
import Test from "./Test";
import Header from "../../components/header/Header";
import { AiOutlineSearch } from "react-icons/ai";
import axios from "axios"; // Axios를 import 합니다.
import "./MainPage.css";
import Footer from "../../components/footer/Footer";
import "../../page/page.css";

export default function MainPage() {
  const [posts, setPosts] = useState([
    {
      containerId: "56583b9f-8127-40cf-9d31-2db4d57d1a5a",
    },
    // 추가 데이터를 필요한 만큼 넣어줍니다.
  ]);

  const addPost = (post) => {
    const updatedPosts = [...posts, post];
    setPosts(updatedPosts);

    // 서버에 새로운 게시물(post)을 저장하는 예시
    axios
      .post("https://fake-api-url.com/posts", post)
      .then((response) => {
        // POST 요청 성공 시의 처리
        console.log("새로운 게시물이 성공적으로 추가되었습니다.");
      })
      .catch((error) => {
        // 오류 처리
        console.error("게시물 추가 중 오류 발생:", error);
      });
  };

  const deletePost = (index) => {
    const updatedPosts = [...posts];
    updatedPosts.splice(index, 1);
    setPosts(updatedPosts);

    // 서버에서 해당 게시물을 삭제하는 예시
    const postIdToDelete = posts[index].containerId;
    axios
      .delete(
        `http://ide-env.eba-mhhgujuf.ap-northeast-2.elasticbeanstalk.com/containers/${postIdToDelete}`,
      )
      .then((response) => {
        // DELETE 요청 성공 시의 처리
        console.log("게시물이 성공적으로 삭제되었습니다.");
      })
      .catch((error) => {
        // 오류 처리
        console.error("게시물 삭제 중 오류 발생:", error);
      });
  };

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    const searchText = e.target.value;
    setSearchTerm(searchText);

    if (searchText === "") {
      // 검색어가 비어있을 때, 모든 데이터를 보여줍니다.
      // 이 부분에서 서버에서 모든 게시물을 다시 불러오는 것도 고려할 수 있습니다.
    } else {
      // 검색어에 해당하는 게시물만 필터링하여 업데이트합니다.
      const filteredPosts = posts.filter((post) =>
        post.containerId.includes(searchText),
      );
      setPosts(filteredPosts);
    }
  };

  return (
    <div>
      <Header
        link="/containers"
        name="새 컨테이너"
        icon="모든 컨테이너"
        MainPage={MainPage}
        addPost={addPost}
      />
      <div className="login-hd">
        <input
          className="search"
          type="text"
          placeholder="컨테이너 이름"
          onChange={handleSearch}
        ></input>
        <button>
          <AiOutlineSearch />
        </button>
      </div>
      <div className="test-list">
        {posts.map((post, index) => (
          <Test key={index} posts={[post]} onDelete={() => deletePost(index)} />
        ))}
      </div>
      <Footer />
    </div>
  );
}
