import React, { useState } from "react";
import Header from "../../components/header/Header";
import "./CreateContainerPage.css";

export default function CreateContainerPage() {
  // 상태 값 초기화
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState("public"); // 공개범위 기본값 설정
  const [selectedStacks, setSelectedStacks] = useState("stack1");
  const [modules, setModules] = useState([]); // 체크박스로 선택한 모듈/패키지 목록

  // 공개범위 라디오 버튼 변경 핸들러
  const handleVisibilityChange = (e) => {
    setVisibility(e.target.value);
  };

  const handleStacksChange = (e) => {
    setSelectedStacks(e.target.value);
  };

  // 모듈/패키지 체크박스 변경 핸들러
  const handleModulesChange = (e) => {
    const moduleName = e.target.value;
    if (e.target.checked) {
      // 체크된 경우 목록에 추가
      setModules([...modules, moduleName]);
    } else {
      // 체크 해제된 경우 목록에서 제거
      setModules(modules.filter((module) => module !== moduleName));
    }
  };

  return (
    <div>
      <Header name="생성하기" icon="컨테이너 생성하기" containnername={name} />

      <form className="contain">
        <div className="edit-1">
          <label>이름</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input"
          />
          {!name ? <p className="error">이름 입력</p> : null}
        </div>
        <div className="edit-1">
          <label>설명(선택사항)</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="input-2"
          />
        </div>
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
        <div className="edit-2">
          스택
          <div className="ckeckbox1">
            <input
              type="radio"
              value="stack1"
              checked={selectedStacks === "stack1"}
              onChange={handleStacksChange}
            />
            <label>Java</label>
          </div>
        </div>
        <div className="edit-2">
          추가 모듈/패키지
          <div className="ckeckbox2">
            <input
              type="checkbox"
              value="module2"
              checked={modules.includes("module2")}
              onChange={handleModulesChange}
            />
            {/* 필요한 모듈/패키지에 대한 추가 체크박스 입력 */}
          </div>
          <label>MySQL</label>
        </div>
      </form>
    </div>
  );
}
