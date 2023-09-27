import { useState } from "react";
import {
  Tree,
  getBackendOptions,
  MultiBackend,
} from "@minoru/react-dnd-treeview";
import { DndProvider } from "react-dnd";
import initialData from "./sample-default.json";
import "./Sidebar.css";
import { useDispatch, useSelector } from "react-redux";
import { selectFile } from "../../fileSlice/FileSlice";

function Sidebar() {
  const [treeData, setTreeData] = useState(initialData);
  const handleDrop = (newTreeData) => setTreeData(newTreeData);
  const files = useSelector((state) => state.files);
  // TODO : files 배열을 treeData 형태로 변환하는 로직이 필요합니다.
  // 여기서는 간단히 files를 바로 사용하였습니다.
  const dispatch = useDispatch();
  return (
    <div className="SideCollapsible">
      <DndProvider backend={MultiBackend} options={getBackendOptions()}>
        <Tree
          tree={files.data}
          rootId={0}
          onDrop={handleDrop}
          render={(node, { depth, isOpen, onToggle }) => (
            <div
              style={{ marginLeft: depth * 10 }}
              onClick={() => dispatch(selectFile(node.id))}
            >
              {node.type === "folder" && (
                <span onClick={onToggle}>{isOpen ? "[-]" : "[+]"}</span>
              )}
              {node.text}
            </div>
          )}
        />
      </DndProvider>
    </div>
  );
}

export default Sidebar;
