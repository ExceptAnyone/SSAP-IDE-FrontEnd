import React from "react";
import "./App.css";
import SignupPage from "./page/signup/SignupPage";
import EditSignupPage from "./page/editSignupPage/EditSignupPage";
import CreateContainerPage from "./page/createContainer/CreateContainerPage";
import EditContainerPage from "./page/editcontainer/EditContainerPage";
import IdePage from "./page/ide/IdePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./page/main/MainPage";
import LoginPage from "./page/loginpage/LoginPage";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

const App = () => (
  <div>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route index element={<MainPage />} />
          <Route path="loginpage/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/editsignup" element={<EditSignupPage />} />
          <Route path="/createcontainer" element={<CreateContainerPage />} />
          <Route path="/editcontainer" element={<EditContainerPage />} />
          <Route path="/ide/:containerId" element={<IdePage />} />
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools />
    </QueryClientProvider>
  </div>
);

export default App;
