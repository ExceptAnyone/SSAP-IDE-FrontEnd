import React, { useState } from "react";
import Header from "../../components/header/Header";
// import axios from "axios"; // Axios 라이브러리를 임포트합니다.
import "./EditContainerPage.css";

export default function Contain({ editPost }) {
  // 상태 값 초기화
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState("public"); // 공개범위 기본값 설정
  const [stack, setStack] = useState("stack");
  const [customControl, setCustomControl] = useState([]); // 체크박스로 선택한 모듈/패키지 목록

  // const [serverResponse, setServerResponse] = useState(null); // 서버 응답 상태를 저장할 상태 변수

  // 공개범위 라디오 버튼 변경 핸들러
  const handleVisibilityChange = (e) => {
    setVisibility(e.target.value);
  };

  const handleStacksChange = (e) => {
    setStack(e.target.value);
  };

  // 모듈/패키지 체크박스 변경 핸들러
  const handleModulesChange = (e) => {
    const moduleName = e.target.value;
    if (e.target.checked) {
      // 체크된 경우 목록에 추가
      setCustomControl([...customControl, moduleName]);
    } else {
      // 체크 해제된 경우 목록에서 제거
      setCustomControl(customControl.filter((module) => module !== moduleName));
    }
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    // 정규 표현식을 사용하여 영어와 숫자만 허용하도록 필터링합니다.
    const filteredValue = inputValue.replace(/[^A-Za-z0-9]/g, "");
    setTitle(filteredValue);
  };

  const handleInputChange2 = (e) => {
    const inputValue = e.target.value;
    // 정규 표현식을 사용하여 영어와 숫자만 허용하도록 필터링합니다.
    const filteredValue = inputValue.replace(/[^A-Za-z0-9]/g, "");
    setDescription(filteredValue);
  };

  return (
    <div>
      <Header name="수정하기" icon="컨테이너 수정하기" containnername={title} />

      <div></div>
      <form className="editcontain">
        <div>
          <div className="edit-1">
            이름
            <input
              type="text"
              value={title}
              onChange={handleInputChange}
              className="input"
            />
            {!title ? <p className="error">이름 입력</p> : null}
          </div>
        </div>
        <div>
          <div className="edit-1">
            설명(선택사항)
            <input
              type="text"
              value={description}
              onChange={handleInputChange2}
              className="input-2"
            />
          </div>
        </div>
        <div>
          <div className="edit-1">
            공개범위
            <div className="ckeckbox">
              <input
                type="radio"
                name="visibility"
                value="public"
                checked={visibility === "public"}
                onChange={handleVisibilityChange}
              />
              <label>Private</label>
            </div>
          </div>
        </div>
        <div>
          <div className="edit-1">
            스택
            <div className="ckeckbox1">
              <input
                type="radio"
                value="stack"
                checked={stack === "stack"}
                onChange={handleStacksChange}
              />
              <label>Java</label>
            </div>
          </div>
        </div>
        <div>
          <div className="edit-2">
            추가 모듈/패키지
            <div className="ckeckbox2">
              <input
                type="checkbox"
                value="customControl"
                checked={customControl.includes("customControl")}
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
