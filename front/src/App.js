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

import PrivateRoute from "./PrivateRoute";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/users/{id}" element={<EditSignupPage />} />
          <Route path="/containers" element={<CreateContainerPage />} />
          <Route
            path="/containers/{containerId}"
            element={<EditContainerPage />}
          />
          <Route path="/ide" element={<IdePage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
