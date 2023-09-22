import React, { useState } from 'react';
import { BsFillPersonFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';

export default function ProfileIcon() {
    // 리스트의 표시 여부를 제어할 상태 변수
    const [isListVisible, setListVisible] = useState(false);

    // 프로필 아이콘을 클릭하여 리스트 토글하는 함수
    const toggleList = () => {
        setListVisible(!isListVisible);
    };

    return (
        <div>
            <BsFillPersonFill onClick={toggleList} /> 
            {isListVisible && (  
                <ul>
                    <Link to="/profile">
                    <li>내 정보</li>
                    </Link>
                    <Link to="/">
                    <li>로그아웃</li>
                    </Link>
                </ul>
            )}
           
        </div>
    );
}
