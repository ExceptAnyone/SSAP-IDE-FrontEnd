import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { ThemeProvider, CssBaseline } from "@mui/material";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import {
  Tree,
  MultiBackend,
  getDescendants,
  getBackendOptions,
} from "@minoru/react-dnd-treeview";
import { CustomNode } from "./customNode/CustomNode";
import { CustomDragPreview } from "./customDragPreview/CustomDragPreview";
import { AddDialog } from "./addDialog/AddDialog";
import { theme } from "./theme";
import styles from "./Sidebar.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addFile,
  addFolder,
  deleteFileOrFolder,
  setCurrentEditingFile,
  setTreeData,
} from "../../fileSlice/FileSlice";

function Sidebar() {
  const filesAndFolders = useSelector((state) => state.file.data);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleFileClick = (node) => {
    // 클릭한 파일의 ID와 내용
    const clickedFileId = node.id;
    const clickedFileContent = node.content || ""; // 예: 초기 파일 내용 설정

    // 편집 중인 파일 정보를 업데이트
    dispatch(
      setCurrentEditingFile({ id: clickedFileId, content: clickedFileContent }),
    );
  };

  const handleDrop = (newTree) => {
    dispatch(setTreeData(newTree));
  };
  const handleDelete = (id) => {
    dispatch(deleteFileOrFolder(id));
  };

  const handleCopy = (id) => {
    // Handle node copy logic
    // TODO
  };

  const handleOpenDialog = () => {
    // Handle open dialog logic
    // TODO
  };

  const handleCloseDialog = () => {
    // Handle close dialog logic
    // TODO
  };

  const handleSubmit = (newNode) => {
    // newNode의 type에 따라 addFile 또는 addFolder 액션을 dispatch
    if (newNode.type === "file") {
      dispatch(addFile(newNode));
    } else {
      dispatch(addFolder(newNode));
    }
  };
  // const [treeData, setTreeData] = useState(filesAndFolders);
  // const handleDrop = (newTree) => setTreeData(newTree);

  // const handleDelete = (id) => {
  //   const deleteIds = [
  //     id,
  //     ...getDescendants(treeData, id).map((node) => node.id),
  //   ];
  //   const newTree = treeData.filter((node) => !deleteIds.includes(node.id));

  //   setTreeData(newTree);
  // };

  // const handleCopy = (id) => {
  //   const lastId = getLastId(treeData);
  //   const targetNode = treeData.find((n) => n.id === id);
  //   const descendants = getDescendants(treeData, id);
  //   const partialTree = descendants.map((node) => ({
  //     ...node,
  //     id: node.id + lastId,
  //     parent: node.parent + lastId,
  //   }));

  //   setTreeData([
  //     ...treeData,
  //     {
  //       ...targetNode,
  //       id: targetNode.id + lastId,
  //     },
  //     ...partialTree,
  //   ]);
  // };

  // const handleOpenDialog = () => {
  //   setOpen(true);
  // };

  // const handleCloseDialog = () => {
  //   setOpen(false);
  // };

  // const handleSubmit = (newNode) => {
  //   const lastId = getLastId(treeData) + 1;

  //   setTreeData([
  //     ...treeData,
  //     {
  //       ...newNode,
  //       id: lastId,
  //     },
  //   ]);

  //   setOpen(false);
  // };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DndProvider backend={MultiBackend} options={getBackendOptions()}>
        <div className={styles.app}>
          <div>
            {open && (
              <AddDialog
                tree={filesAndFolders}
                onClose={handleCloseDialog}
                onSubmit={handleSubmit}
              />
            )}
          </div>
          <Tree
            tree={filesAndFolders}
            rootId={0}
            render={(node, options) => (
              <CustomNode
                node={node}
                {...options}
                onDelete={handleDelete}
                onCopy={handleCopy}
                onClick={() => handleFileClick(node)}
              />
            )}
            dragPreviewRender={(monitorProps) => (
              <CustomDragPreview monitorProps={monitorProps} />
            )}
            onDrop={handleDrop}
            classes={{
              root: styles.treeRoot,
              draggingSource: styles.draggingSource,
              dropTarget: styles.dropTarget,
            }}
          />
        </div>
      </DndProvider>
    </ThemeProvider>
  );
}

export default Sidebar;
