import CodeEditor from "../codeEditor/CodeEditor";
import HeaderMenubar from "../ideUI/header/HeaderMenubar";
import Sidebar from "../ideUI/sideBar/Sidebar";

function Layout() {
  return (
    <div className="appContainer">
      <div className="IDE-header">
        <HeaderMenubar />
      </div>
      <div className="IDE-container">
        <div className="IDE-aside">
          <Sidebar />
        </div>
        <CodeEditor />
      </div>
    </div>

    // <div className="Layout">
    //   <div className="Sidebar">
    //     <Sidebar />
    //   </div>
    //   <div className="Editor">
    //     <CodeEditor />
    //   </div>
    // </div>
  );
}

export default Layout;
