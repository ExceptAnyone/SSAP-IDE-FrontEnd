import { NodeModel, NativeDragItem, TreeState } from "../types";
export declare const isDroppable: <T>(dragSource: NodeModel<T> | NativeDragItem | null, dropTargetId: NodeModel["id"], treeContext: TreeState<T>) => boolean;
