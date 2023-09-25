import CodeEditor from "./codeEditor/CodeEditor";
import HeaderMenubar from "./ideUI/header/HeaderMenubar";
import SideCollapsible from "./ideUI/sideBar/SideCollapsible";
import Layout from "./layout/Layout";

function App() {
  return (
    <div>
      <HeaderMenubar />
      <Layout />
    </div>
  );
}

export default App;
