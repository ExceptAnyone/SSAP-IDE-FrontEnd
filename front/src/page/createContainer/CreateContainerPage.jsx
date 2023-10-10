import React, { useState, useEffect } from "react";
import Header from "../../components/header/Header";
import "../editcontainer/EditContainerPage.css";
import "../../page/page.css";
import MainPage from "../main/MainPage";
import Name from "../../components/form/Name";

export default function CreateContainerPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState("");
  const [stack, setStack] = useState("");
  const [customControl, setCustomControl] = useState("");

  const [posts, setPosts] = useState([]); // 글 목록을 상태로 관리

  const handleVisibilityChange = (e) => {
    setVisibility(e.target.value);
  };

  const handleStacksChange = (e) => {
    setStack(e.target.value);
  };

  const handleModulesChange = (e) => {
    setCustomControl(e.target.value);
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    const filteredValue = inputValue.replace(/[^A-Za-z0-9]/g, "");
    setTitle(filteredValue);
  };

  const handleInputChange2 = (e) => {
    const inputValue = e.target.value;
    const filteredValue = inputValue.replace(/[^A-Za-z0-9]/g, "");
    setDescription(filteredValue);
  };

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

  const updateContainer = () => {
    // 글 작성 로직: 여기서 글을 저장하거나 서버에 전송할 수 있습니다.
    const newPost = { title, description };
    addPost(newPost); // 글을 목록에 추가
    console.log("작성된 글:", newPost);
    setTitle("");
    setDescription(""); // setDescription 함수를 사용하여 description을 초기화
  };

  return (
    <div>
      <Header icon="컨테이너 생성하기" containnername={title} link="/" />
      <Name
        name="생성하기"
        handleSubmit={updateContainer}
        containnername={title}
        link="/"
      />

      <form className="editcontain">
        <div>
          <div className="edit-1">
            <h3 className="name-1">이름</h3>
            <input
              type="text"
              value={title}
              onChange={(e) => handleInputChange(e)}
              className="input"
            />
          </div>
        </div>
        <div>
          <div className="edit-1">
            <h3>설명(선택사항)</h3>
            <input
              type="text"
              value={description}
              onChange={(e) => handleInputChange2(e)}
              className="input-2"
            />
          </div>
        </div>
        <div>
          <div className="edit-1">
            <h3>공개범위</h3>
            <div className="ckeckbox">
              <input
                type="radio"
                name="visibility"
                value="private"
                checked={visibility === "private"}
                onChange={handleVisibilityChange}
              />
              <label>Private</label>
            </div>
          </div>
        </div>
        <div>
          <div className="edit-1">
            <h3>스택</h3>
            <div className="ckeckbox1">
              <input
                type="radio"
                value="javaScript"
                checked={stack === "javaScript"}
                onChange={handleStacksChange}
              />
              <label>javaScript</label>
            </div>
          </div>
        </div>
        <div>
          <div className="edit-2">
            <h3 className="add-pkg">추가 모듈/패키지</h3>
            <div className="ckeckbox2">
              <input
                type="checkbox"
                value="mysql"
                checked={customControl === "mysql"}
                onChange={handleModulesChange}
              />
              <label>MySQL</label>
              {/* 필요한 모듈/패키지에 대한 추가 체크박스 입력 */}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
