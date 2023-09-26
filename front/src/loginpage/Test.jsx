import React, { useState } from 'react';

function Test() {
  const [text, setText] = useState('');
  const [submittedText, setSubmittedText] = useState('');
 
  const [lastModifiedTime, setLastModifiedTime] = useState(null);

  const handleTextChange = (e) => {
    // input 요소의 값이 변경될 때마다 text 상태 업데이트
    setText(e.target.value);
  };

  const handleSubmit = () => {
    setSubmittedText(text);

    // 여기에서 텍스트 처리 또는 실행 작업을 수행할 수 있습니다.
    // 이 예제에서는 입력된 텍스트를 그대로 표시하고 마지막 수정 시간을 계산합니다.
  

    const currentTime = new Date();
    
    // 마지막 수정 시간을 현재 시간으로 설정합니다.
    setLastModifiedTime(currentTime);

    // 콘솔에 로그를 출력합니다.
    console.log('입력된 텍스트:', text);
    console.log('결과:', text);
    console.log('마지막 수정 시간:', currentTime);
  };

  const formatLastModifiedTime = (lastModifiedTime) => {
    if (!lastModifiedTime) {
      return '';
    }

    const currentTime = new Date();
    const timeDifference = Math.floor((currentTime - lastModifiedTime) / 60000); // 밀리초를 분 단위로 변환

    if (timeDifference < 60) {
      return `${timeDifference} 분 전에 추가됨`;
    } else {
      const hoursDifference = Math.floor(timeDifference / 60); // 분을 시간 단위로 변환
      return `${hoursDifference} 시간 전에 추가됨`;
    }
  };

  return (
    <div>
      <h2>test</h2>
      <input
        type="text"
        value={text}
        onChange={handleTextChange}
        placeholder="텍스트 입력"
        style={{ border: 'none' }}
      />
      <br />
      <div className='start'
        style={{
          display: 'flex',
          paddingTop: '30px',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '20px',
          alignSelf: 'stretch',
          borderTop: '1px solid #E2E2E2',
          marginTop: '160px'
        }}>
       
        <button onClick={handleSubmit}>실행</button>
        <p> {submittedText}</p>

        <p>{formatLastModifiedTime(lastModifiedTime)}</p>
      </div>
    </div>
  );
}

export default Test;
