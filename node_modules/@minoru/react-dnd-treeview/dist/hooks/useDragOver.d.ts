import { NodeModel, DragOverProps } from "../types";
export declare const useDragOver: (id: NodeModel["id"], isOpen: boolean, dragOverHandler: (id: NodeModel["id"]) => void) => DragOverProps;
