import React, { useState } from "react";
import { useQuery, useMutation } from "react-query";
import Header from "../../components/header/Header";
import "../editcontainer/EditContainerPage.css";
import "../../page/page.css";

export default function CreateContainerPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState("");
  const [stack, setStack] = useState("");
  const [customControl, setCustomControl] = useState("");

  const mutation = useMutation((newPost) => {
    return fetch(
      "http://ide-env.eba-mhhgujuf.ap-northeast-2.elasticbeanstalk.com/containers/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      },
    )
      .then((response) => response.json())
      .catch((error) => {
        console.error("데이터 업데이트 실패:", error);
        return [];
      });
  });

  const handleVisibilityChange = (e) => {
    setVisibility(e.target.value);
  };

  const handleStacksChange = (e) => {
    setStack(e.target.value);
  };

  const handleModulesChange = (e) => {
    setCustomControl(e.target.value);
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    const filteredValue = inputValue.replace(/[^A-Za-z0-9]/g, "");
    setTitle(filteredValue);
  };

  const handleInputChange2 = (e) => {
    const inputValue = e.target.value;
    const filteredValue = inputValue.replace(/[^A-Za-z0-9]/g, "");
    setDescription(filteredValue);
  };

  const updateContainer = () => {
    const newPost = {
      title,
      description,
      stack,
      customControl,
    };
    mutation.mutate(newPost, {
      onSuccess: (data) => {
        console.log("컨테이너 생성 성공:", data);
        setTitle("");
        setDescription("");
        // 성공한 경우 필요한 처리를 추가할 수 있습니다.
      },
    });
  };

  return (
    <div>
      <Header
        name="생성하기"
        icon="컨테이너 생성하기"
        containnername={title}
        updateContainer={updateContainer}
        link="/"
      />

      <form className="editcontain">
        <div>
          <div className="edit-1">
            이름
            <input
              type="text"
              value={title}
              onChange={(e) => handleInputChange(e)}
              className="input"
            />
            {!title ? <p className="error">이름 입력</p> : null}
          </div>
        </div>
        <div>
          <div className="edit-1">
            설명(선택사항)
            <input
              type="text"
              value={description}
              onChange={(e) => handleInputChange2(e)}
              className="input-2"
            />
          </div>
        </div>
        <div>
          <div className="edit-1">
            공개범위
            <div className="ckeckbox">
              <input
                type="radio"
                name="visibility"
                value="private"
                checked={visibility === "private"}
                onChange={handleVisibilityChange}
              />
              <label>Private</label>
            </div>
          </div>
        </div>
        <div>
          <div className="edit-1">
            스택
            <div className="ckeckbox1">
              <input
                type="radio"
                value="Java"
                checked={stack === "Java"}
                onChange={handleStacksChange}
              />
              <label>java</label>
            </div>
          </div>
        </div>
        <div>
          <div className="edit-2">
            추가 모듈/패키지
            <div className="ckeckbox2">
              <input
                type="checkbox"
                value="mysql"
                checked={customControl === "mysql"}
                onChange={handleModulesChange}
              />
              <label>MySQL</label>
              {/* 필요한 모듈/패키지에 대한 추가 체크박스 입력 */}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
