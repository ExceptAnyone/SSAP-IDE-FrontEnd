import React, { useState } from "react";
import Test from "./Test";
import Header from "../../components/header/Header";
import { AiOutlineSearch } from "react-icons/ai";
import "./MainPage.css";
import Footer from "../../components/footer/Footer";

export default function MainPage({ posts, deletePost }) {
  return (
    <div>
      <Header
        link="/containers"
        name="새 컨테이너"
        icon="모든 컨테이너"
        MainPage={MainPage}
      />
      <div className="login-hd">
        <AiOutlineSearch />
        <input
          className="search"
          type="text"
          placeholder="컨테이너 이름"
        ></input>
      </div>
      <div className="test-list">
        {posts.map((post, index) => (
          <Test key={index} posts={[post]} deletePost={deletePost} />
        ))}
      </div>
      <Footer />
    </div>
  );
}
