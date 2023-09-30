import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { ArrowRight, Delete, FileCopy } from "@mui/icons-material";
import { useDragOver } from "@minoru/react-dnd-treeview";
import { TypeIcon } from "../TypeIcon";
import styles from "./CustomNode.module.css";
import { useDispatch } from "react-redux";
import { updateFileName } from "../../../fileSlice/FileSlice";

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

  const handleEndEditing = () => {
    setIsEditing(false);
    // TODO: editedName을 백엔드에 업데이트하는 API 호출
  };

  const handleSave = () => {
    if (editedName) {
      dispatch(updateFileName({ id: props.node.id, newName: editedName }));
      setIsEditing(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleEndEditing();
    }
  };

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
