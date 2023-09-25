import CodeEditor from "../codeEditor/CodeEditor";
import SideCollapsible from "../ideUI/sideBar/SideCollapsible";

function Layout() {
  return (
    <div className="Layout">
      <div className="Sidebar">
        <SideCollapsible />
      </div>
      <div className="Editor">
        <CodeEditor />
      </div>
    </div>
  );
}

export default Layout;
