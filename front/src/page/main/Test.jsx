import React, { useState } from "react";
import { TfiMoreAlt } from "react-icons/tfi";
import { BsTrash, BsLink45Deg } from "react-icons/bs";
import { IoDocumentTextOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import clipboardCopy from "clipboard-copy";
import "../main/MainPage.css";

function Test({ posts, onDelete, deletePost }) {
  const [text, setText] = useState("");
  const [submittedText, setSubmittedText] = useState("");
  const [lastModifiedTime, setLastModifiedTime] = useState(null);
  const [isListVisible, setListVisible] = useState(false);
  const [isLastModifiedVisible, setLastModifiedVisible] = useState(false);
  const navigate = useNavigate();

  const toggleList = () => {
    setListVisible(!isListVisible);
  };

  const toggleLastModifiedTime = () => {
    setLastModifiedVisible(!isLastModifiedVisible);
  };

  const confirmDelete = () => {
    const isConfirmed = window.confirm("컨테이너를 삭제하시겠습니까?");

    if (isConfirmed) {
      deletePost();
    }
  };

  const handleSubmit = () => {
    setSubmittedText(text);

    const currentTime = new Date();
    setLastModifiedTime(currentTime); // Context에서 상태를 설정

    // 버튼 클릭 시 수정 시간을 표시하는 함수 호출
    toggleLastModifiedTime();

    // 실행 버튼을 눌렀을 때 링크로 이동
    navigate("/ide");
  };

  const formatLastModifiedTime = (lastModifiedTime) => {
    if (!lastModifiedTime) {
      return "";
    }

    const currentTime = new Date();
    const timeDifference = Math.floor((currentTime - lastModifiedTime) / 60000);

    if (timeDifference < 60) {
      return `${timeDifference} 분 전에 수정됨`;
    } else {
      const hoursDifference = Math.floor(timeDifference / 60);
      return `${hoursDifference} 시간 전에 수정됨`;
    }
  };

  const copyLinkToClipboard = () => {
    const currentURL = window.location.href;
    clipboardCopy(currentURL)
      .then(() => {
        alert("링크가 복사되었습니다.");
      })
      .catch((error) => {
        console.error("링크 복사 중 오류가 발생했습니다.", error);
      });
  };

  return (
    <div className="test-1">
      <TfiMoreAlt onClick={toggleList} />
      {isListVisible && (
        <ul className="list">
          <li>
            <button onClick={copyLinkToClipboard}>
              <BsLink45Deg />
              공유링크 복사
            </button>
          </li>
          <li>
            <Link to="/containers/{containerId}">
              <IoDocumentTextOutline />
              컨테이너 수정
            </Link>
          </li>
          <li>
            <button onClick={confirmDelete}>
              <BsTrash />
              컨테이너 삭제
            </button>
          </li>
        </ul>
      )}
      <div>
        <ul>
          {posts.map((post, index) => (
            <div key={index}>
              <h2>{post.title}</h2>
              <p>{post.description}</p>
            </div>
          ))}
        </ul>
      </div>

      {/* 수정 시간을 표시하는 요소를 추가 */}
      {isLastModifiedVisible && (
        <p>{formatLastModifiedTime(lastModifiedTime)}</p>
      )}

      <div
        className="start"
        style={{
          display: "flex",
          paddingTop: "30px",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "20px",
          alignSelf: "stretch",
          borderTop: "1px solid #E2E2E2",
          marginTop: "160px",
        }}
      >
        <button className="btn-test" onClick={handleSubmit}>
          실행
        </button>

        <p> {submittedText}</p>
      </div>
    </div>
  );
}

export default Test;
