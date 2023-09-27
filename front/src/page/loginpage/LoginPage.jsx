import React from "react";
import Test from "./Test";
import Header from "../../components/header/Header";
import { AiOutlineSearch } from "react-icons/ai";
import "./LoginPage.css";

export default function LoginPage() {
  return (
    <div>
      <Header name="새 컨테이너" icon="모든 컨테이너" />
      <div className="login-hd">
        <AiOutlineSearch />
        <input
          className="search"
          type="text"
          placeholder="컨테이너 이름"
        ></input>
        <button className="btn">새 컨테이너</button>
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
    </div>
  );
}
