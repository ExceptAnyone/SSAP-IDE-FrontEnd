import React from "react";

const ChatUserList = (userName) => {
  return (
    <div className="userList">
      <div className="userList-top">
        <h4>접속자</h4>
      </div>
      <div className="userList-inner">
        <p className="userItem">{userName.userName}</p>
        {/* {userName.map((name, index) => ( */}
        {/* <div key={index}> */}
        {/* </div> */}
        {/* ))} */}
      </div>
    </div>
  );
};

export default ChatUserList;
