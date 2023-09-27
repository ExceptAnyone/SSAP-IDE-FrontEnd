import React, { useState } from "react";
import Header from "../../components/header/Header";
import "./EditContainerPage.css";

export default function Contain() {
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

  // 이름 입력 필드가 비어있는지 확인하는 함수
  const isNameEmpty = name.trim() === "";

  // "생성하기" 버튼 클릭 핸들러
  const handleCreateClick = (e) => {
    e.preventDefault(); // 기본 동작(페이지 리프레시)을 막음

    // 여기에서 생성 작업을 수행하거나 다른 작업을 수행할 수 있습니다.
    // 예: API 호출, 상태 업데이트 등
  };

  return (
    <div>
      <Header name="수정하기" icon="컨테이너 수정하기" />

      <div>
        {/* "생성하기" 버튼 클릭 시 handleCreateClick 함수 실행 */}
        <button onClick={handleCreateClick} disabled={isNameEmpty}>
          생성하기
        </button>
      </div>
      <form className="editcontain">
        <div>
          <div className="edit-1">
            이름
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input"
            />
          </div>
        </div>
        <div>
          <div className="edit-1">
            설명(선택사항)
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
                value="stack1"
                checked={selectedStacks === "stack1"}
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
                value="module2"
                checked={modules.includes("module2")}
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
