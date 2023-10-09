import React from "react";
import SignUpForm from "../../components/form/SignUpForm";
import "./SignupPage.css";
import { Link } from "react-router-dom";
import "../../page/page.css";

export default function SignUp() {
  return (
    <div className="ssapide">
      <Link to="/login">
        <h1 className="h1">SSAP IDE</h1>
      </Link>
      <p className="p">SSAP IDE서비스를 이용하기 위해 회원가입 해 주세요.</p>
      <SignUpForm />
    </div>
  );
}
