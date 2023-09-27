import CodeEditor from "../codeEditor/CodeEditor";
import Sidebar from "../ideUI/sideBar/Sidebar";

function Layout() {
  return (
    <div className="Layout">
      <div className="Sidebar">
        <Sidebar />
      </div>
      <div className="Editor">
        <CodeEditor />
      </div>
    </div>
  );
}

export default Layout;
