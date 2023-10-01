import React from "react";
import Test from "./Test";
import Header from "../../components/header/Header";
import { AiOutlineSearch } from "react-icons/ai";
import "./MainPage.css";
import Footer from "../../components/footer/Footer";

export default function MainPage() {
  return (
    <div>
      <Header name="새 컨테이너" icon="모든 컨테이너" MainPage={MainPage} />
      <div className="login-hd">
        <AiOutlineSearch />
        <input
          className="search"
          type="text"
          placeholder="컨테이너 이름"
        ></input>
      </div>
      <div style={{ display: "flex" }}>
        <div className="test">
          <div className="Loginpage-1">
            <Test />
          </div>
          <div className="Loginpage-2">
            <Test />
          </div>
          <div className="Loginpage-3">
            <Test />
          </div>
          <div className="Loginpage-4">
            <Test />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
