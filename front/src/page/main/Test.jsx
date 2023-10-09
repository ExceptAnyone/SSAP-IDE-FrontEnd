import React, { useState } from "react";
import { TfiMoreAlt } from "react-icons/tfi";
import { BsTrash, BsLink45Deg } from "react-icons/bs";
import { IoDocumentTextOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import clipboardCopy from "clipboard-copy";
import "../main/MainPage.css";

function Test({ posts, onDelete }) {
  const [text, setText] = useState("");
  const [submittedText, setSubmittedText] = useState("");
  const [lastModifiedTime, setLastModifiedTime] = useState(null);
  const [isListVisible, setListVisible] = useState(false);

  const toggleList = () => {
    setListVisible(!isListVisible);
  };

  const confirmDelete = () => {
    // 컨테이너 삭제를 확인하는 알림 창을 띄웁니다.
    const isConfirmed = window.confirm("컨테이너를 삭제하시겠습니까?");

    if (isConfirmed) {
      // 확인 버튼을 누르면 컨테이너 삭제 함수를 호출합니다.
      onDelete();
    }
  };

  const handleSubmit = () => {
    setSubmittedText(text);

    const currentTime = new Date();
    setLastModifiedTime(currentTime);

    console.log("입력된 텍스트:", text);
    console.log("결과:", text);
    console.log("마지막 수정 시간:", currentTime);
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
            {/* 삭제 버튼을 누를 때 confirmDelete 함수를 호출합니다. */}
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

      {setText}

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
        <Link style={{ textDecoration: "none" }} to="containers/{containerId}">
          <button className="btn-test" onClick={handleSubmit}>
            실행
          </button>

          <p> {submittedText}</p>
        </Link>

        <p>{formatLastModifiedTime(lastModifiedTime)}</p>
      </div>
    </div>
  );
}

export default Test;
