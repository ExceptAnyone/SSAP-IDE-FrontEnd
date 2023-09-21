import React, { useState } from 'react';

function BigTextarea() {
  // 상태 변수를 사용하여 입력된 텍스트를 저장합니다.
  const [text, setText] = useState('');
  const [submittedText, setSubmittedText] = useState('');
  const [resultText, setResultText] = useState('');
  const [lastModifiedTime, setLastModifiedTime] = useState(null);

  // 텍스트 입력이 변경될 때마다 상태 변수를 업데이트합니다.
  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  // 입력 버튼을 클릭했을 때 호출되는 함수입니다.
  const handleSubmit = () => {
    // 입력된 텍스트를 제출합니다.
    setSubmittedText(text);

    // 여기에서 텍스트 처리 또는 실행 작업을 수행할 수 있습니다.
    // 이 예제에서는 입력된 텍스트를 그대로 표시하고 마지막 수정 시간을 계산합니다.
    setResultText(text);

    const currentTime = new Date();
    
    // 마지막 수정 시간을 현재 시간으로 설정합니다.
    setLastModifiedTime(currentTime);

    // 콘솔에 로그를 출력합니다.
    console.log('입력된 텍스트:', text);
    console.log('결과:', text);
    console.log('마지막 수정 시간:', currentTime);
  };

  // 마지막 수정 시간을 텍스트로 변환하는 함수
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
      <textarea
        rows="13"
        cols="16"
        value={text}
        onChange={handleTextChange}
        placeholder="test 내용"
      />
      <br />
      <button onClick={handleSubmit}>실행</button>
      <p>입력된 텍스트: {submittedText}</p>
      <p> {resultText}</p>
      <p>{formatLastModifiedTime(lastModifiedTime)}</p>
    </div>
  );
}

export default BigTextarea;
