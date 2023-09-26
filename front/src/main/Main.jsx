import React from 'react';
import Login from './Login';
import './Main.css';

import Footer from '../components/footer/Footer'
import { Link } from 'react-router-dom';



export default function Main() {
    return (
        // 컨테이너
        <div className="con1" >
            <div className='con2'>
                    {/* 로고 */}
                    <nav  >
                    <Link to="/" style={{ textDecoration: 'none' }}>
                    <h1 className='top-logo'>SSAP IDE</h1>
                </Link>
                    </nav>
                    {/* 메인 컨텐츠 flex */}
                    <div className='flexcon'>
                        {/* 왼쪽에 배치/ 메인 컨텐츠 */}
                        <div className="child1">
                            <h1 className='title-1'>CONST RAINBOW<br />='GITHUB'</h1>
                            <div className='title-2'>
                                레인보우는 깃헙과 같이 협업 도구로 자리매김 할 것입니다.<br />
                                우리에게 있어 협업이란, <br />
                                단순 비지니스 관계를 넘어 순간의 인연을 소중히 여기고,<br />
                                같은 목적을 가진 동료들끼리 역경을 극복하는 것입니다.
                            </div>
                        </div>
                        {/* 오른쪽에 배치/ 로그인 */}
                        <div className="child2"> 
                        <Login />
                        </div>
                    </div>
                    {/* 페이지 하단에 고정/ 푸터바 */}
                    <Footer /> 
            </div>
        </div>
    );
}
