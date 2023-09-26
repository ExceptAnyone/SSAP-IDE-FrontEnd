import React from 'react';
import Form from './Form';
import './SignUp.css';

export default function SignUp() {
    return (
        <div className='ssapide'>
            <h1 className='h1'>SSAP IDE</h1>
            <p className='p'>SSAP IDE서비스를 이용하기 위해 회원가입 해 주세요.</p>
            <Form />
        </div>
    );
}

