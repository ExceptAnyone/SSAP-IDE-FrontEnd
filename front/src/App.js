import { BrowserRouter, Routes } from "react-router-dom";
import HeaderMenubar from "./ideUI/header/HeaderMenubar";
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
