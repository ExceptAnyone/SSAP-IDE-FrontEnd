import { useState } from "react";
import { Editor } from "@monaco-editor/react";
import "./CodeEditor.css";

function CodeEditor() {
  const [code, setCode] = useState(""); //TODO 'code'state로 나중에 다른 파일 클릭했을 때 상태관리 ?

  function onChange(newValue) {
    setCode(newValue);
  }

  return (
    <div className="CodeEditor">
      <div className="container">
        {/* <aside></aside> */}
        <div className="editor-wrap">
          <Editor
            height="100vh" //TODO 사이즈조절
            defaultLanguage="javascript"
            defaultValue="// 코드를 입력해주세요"
            theme="vs-dark"
            value={code}
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
}

export default CodeEditor;
