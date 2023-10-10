import React, { useState } from "react";
import Header from "../../components/header/Header";
import axios from "axios";
import "./EditContainerPage.css";
import "../../page/page.css";
import Name from "../../components/form/Name";

export default function EditContainerPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState("public");
  const [stack, setStack] = useState("Java");
  const [customControl, setCustomControl] = useState([]);
  const [posts, setPosts] = useState([
    {
      containerId: "0a6569d7-213a-49c9-bdc2-c728abaae3fc",
    },
    // 추가 데이터를 필요한 만큼 넣어줍니다.
  ]);

  const [serverResponse, setServerResponse] = useState(null);

  const handleVisibilityChange = (e) => {
    setVisibility(e.target.value);
  };

  const handleStacksChange = (e) => {
    setStack(e.target.value);
  };

  const handleModulesChange = (e) => {
    const moduleName = e.target.value;
    if (e.target.checked) {
      setCustomControl([...customControl, moduleName]);
    } else {
      setCustomControl(customControl.filter((module) => module !== moduleName));
    }
  };

  const editPost = (index, updatedPostData) => {
    const updatedPosts = [...posts];
    updatedPosts[index] = updatedPostData;
    setPosts(updatedPosts);

    const postIdToUpdate = posts[index].containerId;
    axios
      .patch(
        `http://ide-env.eba-mhhgujuf.ap-northeast-2.elasticbeanstalk.com/containers/${postIdToUpdate}`,
        updatedPostData,
      )
      .then((response) => {
        console.log("게시물이 성공적으로 수정되었습니다.");
        setServerResponse("게시물이 성공적으로 수정되었습니다.");
      })
      .catch((error) => {
        console.error("게시물 수정 중 오류 발생:", error);
        setServerResponse("게시물 수정 중 오류 발생");
      });
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

  const handleEditButtonClick = () => {
    editPost(0, {
      description,
    });
  };
  return (
    <div>
      <Header icon="컨테이너 수정하기" />
      <Name
        containnername={title}
        handleEditButtonClick={handleEditButtonClick}
        description={description}
        name="수정하기"
      />

      <form className="editcontain">
        <div>
          <div className="edit-1">
            <h3 className="name-1">이름</h3>
            <div className="rainbow">rainbow</div>
          </div>
        </div>

        <div>
          <div className="edit-1">
            <h3>설명(선택사항)</h3>
            <input
              type="text"
              value={description}
              onChange={handleInputChange2}
              className="input-2"
            />
          </div>
        </div>
        <div>
          <div className="edit-1">
            <h3>공개범위</h3>
            <div className="ckeckbox">
              <input
                type="radio"
                name="visibility"
                value="public"
                checked={visibility === "public"}
                onChange={handleVisibilityChange}
              />
              <label>Private</label>
            </div>
          </div>
        </div>
        <div>
          <div className="edit-1">
            <h3>스택</h3>
            <div className="ckeckbox1">
              <input
                type="radio"
                value="javaScript"
                checked={stack === "javaScript"}
                onChange={handleStacksChange}
              />
              <label>javaScript</label>
            </div>
          </div>
        </div>
        <div>
          <div className="edit-2">
            <h3 className="add-pkg">추가 모듈/패키지</h3>
            <div className="ckeckbox2">
              <input
                type="checkbox"
                value="MySQL"
                checked={customControl.includes("MySQL")}
                onChange={handleModulesChange}
              />
              <label>MySQL</label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
