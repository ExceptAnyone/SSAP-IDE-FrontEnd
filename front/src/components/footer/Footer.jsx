import React from "react";
import "../../page/loginpage/LoginPage.css";

export default function Footer() {
  return (
    <div className="footer">
      <ul>
        <li>이용약관</li>
        <li>개인정보처리방침</li>
        <li>도움말</li>
      </ul>
      <span>SSAP IDE.ALL RIGHTS RESERVED.</span>

      {/* <nav>
        <Link to="/users/{id}">editsignup</Link>
        <br />
        <Link to="/containers">createcontainer</Link>
        <br />
        <Link to="/containers/{containerId}">editcontainer</Link>
        <br />
        <Link to="/ide/:containerId">ide/:containerId</Link>
        <br />
        <Link to="/login">loginpage</Link>
      </nav> */}
    </div>
  );
}
