import React from 'react';
import '../../main/Main.css';

import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <div className='footer'>
          
        이용약관 개인정보처리방침 도움말
        <br />
        SSAP IDE.ALL RIGHTS RESERVED.
        <nav>
        <Link to="/loginpage">loginpage</Link>
        <br />
        <Link to="/profile">profile</Link>
        <br />
        <Link to="/contain">contain</Link>
        <br />
        <Link to="/editcontain">editcontain</Link>
        </nav>
        </div>
    );
}

