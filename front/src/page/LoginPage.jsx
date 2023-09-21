import React from 'react';
import Test from '../components/Test';


export default function LoginPage() {
    return (
        <div>
            레인보우
            <h3>모든 컨테이너</h3>
            <input type='text' placeholder='컨테이너 이름'></input>
            <div style={{ display: 'flex',  }}>
         < Test />
         < Test />
         < Test />
         < Test />
         </div>
        </div>
    );
}

