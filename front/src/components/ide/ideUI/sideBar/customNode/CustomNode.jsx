import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { ArrowRight, Delete, FileCopy } from "@mui/icons-material";
import { useDragOver } from "@minoru/react-dnd-treeview";
import { TypeIcon } from "../TypeIcon";
import styles from "./CustomNode.module.css";
import { useDispatch } from "react-redux";
import { updateFileName } from "../../../fileSlice/FileSlice";
import { updateFolderNameAPI } from "../../../../../api/ideAPI/folderEditAPI";
import { editFileNameAPI } from "../../../../../api/ideAPI/editFileNameAPI";

export const CustomNode = (props) => {
  const [hover, setHover] = useState(false);
  const { id, droppable, data } = props.node;
  const indent = props.depth * 24;
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(props.node.text);
  const dispatch = useDispatch();

  const handleStartEditing = () => {
    setIsEditing(true);
  };

  const handleNameChange = (e) => {
    setEditedName(e.target.value);
  };

  //TODO 기존 코드 수정 -> handleEndEditing은 enter키로 이름을 편집했을 때, handleSave는 편집 입력 상자 바깥으 클릭했을 때 호출되어서 중복되기 때문에 함수 분리
  // const handleEndEditing = async () => {
  //   if (editedName && editedName !== props.node.text) {
  //     // 수정된 이름이 현재 이름과 다른 경우만 API 호출
  //     try {
  //       const data = {
  //         containerId: "containerId", // 실제 containerId로 변경
  //         fileId: props.node.id, // or 해당 파일의 실제 id
  //         path: "path", // 실제 path로 변경
  //         fileName: editedName,
  //       };
  //       await editFileNameAPI(data);
  //       setIsEditing(false);
  //       // TODO: 상태 업데이트나 다른 후속 조치
  //     } catch (error) {
  //       console.error("파일명 수정 오류:", error);
  //       // TODO: 사용자에게 오류 메시지 표시 등의 에러 핸들링
  //     }
  //   } else {
  //     setIsEditing(false);
  //   }
  // };

  const prepareApiData = () => {
    return {
      // containerId: "containerId", // 실제 containerId로 교체 필요 TODO
      // fileId: props.node.id, // 해당 파일/폴더의 실제 id
      // path: "path", // 실제 path로 교체 필요
      newFolderName: editedName,
    };
  };

  const handleSave = async () => {
    if (editedName && editedName !== props.node.text) {
      // 추가: 수정된 이름이 현재 이름과 다른 경우만 처리
      const data = prepareApiData();

      try {
        switch (props.node.type) {
          case "file":
            await editFileNameAPI(data);
            break;
          case "folder":
            await updateFolderNameAPI(data);
            break;
          default:
            throw new Error("알 수 없는 타입");
        }

        dispatch(updateFileName({ id: props.node.id, newName: editedName }));
        setIsEditing(false);
      } catch (error) {
        console.error("이름 변경 실패:", error.message);
        // 필요한 경우 사용자에게 오류 메시지 표시
      }
    } else {
      setIsEditing(false);
    }
  };
  // //TODO 백엔드 쪽과 통신되면 테스트 필수!! (기존코드)
  // const handleSave = async () => {
  //   if (editedName) {
  //     try {
  //       await updateFolderNameAPI({
  //         containerId: "exampleContainerId", // TODO: 실제 containerId로 교체
  //         folderId: id, // 현재 폴더의 ID
  //         newPath: data?.path, // 현재 폴더의 경로
  //         newFolderName: editedName, // 수정된 폴더 이름
  //       });
  //       dispatch(updateFileName({ id: props.node.id, newName: editedName }));
  //       setIsEditing(false);
  //     } catch (error) {
  //       console.error("폴더 이름 변경 실패:", error.message);
  //       // 필요한 경우 사용자에게 오류 메시지 표시
  //     }
  //   } else {
  //     setIsEditing(false);
  //   }
  // };

  // TODO 기존 코드
  // const handleSave = () => {
  //   if (editedName) {
  //     dispatch(updateFileName({ id: props.node.id, newName: editedName }));
  //     setIsEditing(false);
  //   }
  // };

  // const handleKeyPress = (e) => {
  //   if (e.key === "Enter") {
  //     handleEndEditing();
  //   }
  // };

  const handleToggle = (e) => {
    e.stopPropagation();
    props.onToggle(props.node.id);
  };

  const handleNodeClick = (e) => {
    e.stopPropagation(); // 이벤트 버블링을 중지
    if (props.onClick) {
      // props로 전달받은 onClick 핸들러가 있는 경우에만 호출
      props.onClick(e);
    }
  };

  const dragOverProps = useDragOver(id, props.isOpen, props.onToggle);

  return (
    <div
      className={`tree-node ${styles.root}`}
      style={{ paddingInlineStart: indent }}
      {...dragOverProps}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={handleNodeClick}
    >
      <div
        className={`${styles.expandIconWrapper} ${
          props.isOpen ? styles.isOpen : ""
        }`}
      >
        {props.node.droppable && (
          <div onClick={handleToggle}>
            <ArrowRight />
          </div>
        )}
      </div>
      <div>
        <TypeIcon droppable={droppable} fileType={data?.fileType} />
      </div>
      <div className={styles.labelGridItem}>
        {isEditing ? (
          <input
            value={editedName}
            onChange={handleNameChange}
            onBlur={handleSave}
            onKeyDown={(e) => e.key === "Enter" && handleSave()}
            autoFocus
          />
        ) : (
          <Typography variant="body2" onClick={handleStartEditing}>
            {props.node.text}
          </Typography>
        )}
      </div>
      {hover && (
        <>
          <div className={styles.actionButton}>
            <IconButton size="small" onClick={() => props.onDelete(id)}>
              <Delete fontSize="small" />
            </IconButton>
          </div>
          <div className={styles.actionButton}>
            <IconButton size="small" onClick={() => props.onCopy(id)}>
              <FileCopy fontSize="small" />
            </IconButton>
          </div>
        </>
      )}
    </div>
  );
};
