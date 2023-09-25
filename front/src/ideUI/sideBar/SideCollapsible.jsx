import { useState } from "react";
import {
  Tree,
  getBackendOptions,
  MultiBackend,
} from "@minoru/react-dnd-treeview";
import { DndProvider } from "react-dnd";
import initialData from "./sample-default.json";
import "./SideCollapsible.css";

function SideCollapsible() {
  const [treeData, setTreeData] = useState(initialData);
  const handleDrop = (newTreeData) => setTreeData(newTreeData);

  return (
    <div className="SideCollapsible">
      <DndProvider backend={MultiBackend} options={getBackendOptions()}>
        <Tree
          tree={treeData}
          rootId={0}
          onDrop={handleDrop}
          render={(node, { depth, isOpen, onToggle }) => (
            <div style={{ marginLeft: depth * 10 }}>
              {node.droppable && (
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

export default SideCollapsible;
