import React from 'react';
import Login from '../components/Login';
import '../App.css';

import { Link } from 'react-router-dom';


export default function Main() {
    return (
     <div>
    <h1>SSAP IDE</h1>
    <h2>CONST RAINBOW<br />='GITHUB'</h2>

    <div>
    레인보우는 깃헙과 같이 협업 도구로 자리매김 할 것입니다.<br />
    우리에게 있어 협업이란, <br />
    단순 비지니스 관계를 넘어 순간의 인연을 소중히 여기고,<br />
    같은 목적을 가진 동료들끼리 역경을 극복하는 것입니다.</ div>
        
        <Login />

        <hr />
        이용약관 개인정보처리방침 도움말
        <br />
        SSAP IDE.ALL RIGHTS RESERVED.
        <nav>
        <Link to="/contain">contain</Link>
        <br />
        <Link to="/loginpage">loginpage</Link>
        <br />
        <Link to="/profile">profile</Link>
        </nav>
        </div>
    );
}

