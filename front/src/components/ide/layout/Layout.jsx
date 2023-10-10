import CodeEditor from "../codeEditor/CodeEditor";
import HeaderMenubar from "../ideUI/header/HeaderMenubar";
import Sidebar from "../ideUI/sideBar/Sidebar";

function Layout() {
  return (
    <div className="appContainer">
      <HeaderMenubar />
      <Sidebar />
      <CodeEditor />
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
