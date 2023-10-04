import React from "react";
import "../../page/login/LoginPage.css";

import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="footer">
      이용약관 개인정보처리방침 도움말
      <br />
      SSAP IDE.ALL RIGHTS RESERVED.
      <nav>
        <Link to="/editsignup">editsignup</Link>
        <br />
        <Link to="/createcontainer">createcontainer</Link>
        <br />
        <Link to="/editcontainer">editcontainer</Link>
        <br />
        <Link to="/ide/:containerId">ide/:containerId</Link>
        <br />
        <Link to="/login">loginpage</Link>
      </nav>
    </div>
  );
}
