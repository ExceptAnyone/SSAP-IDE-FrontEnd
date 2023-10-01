import React from "react";
import "./App.css";
import MainPage from "./page/main/MainPage";
import LoginPage from "./page/loginpage/LoginPage";
import SignupPage from "./page/signup/SignupPage";
import EditSignupPage from "./page/editSignupPage/EditSignupPage";
import CreateContainerPage from "./page/createContainer/CreateContainerPage";
import EditContainerPage from "./page/editcontainer/EditContainerPage";
import IdePage from "./page/ide/IdePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => (
  <div>
    <BrowserRouter>
      <Routes>
        <Route index element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/editsignup" element={<EditSignupPage />} />
        <Route path="/createcontainer" element={<CreateContainerPage />} />
        <Route path="/editcontainer" element={<EditContainerPage />} />
        <Route path="/ide" element={<IdePage />} />
        {/* IDE 컨테이너마다 고유 라우터 처리 필요 */}
      </Routes>
    </BrowserRouter>
  </div>
);

export default App;
