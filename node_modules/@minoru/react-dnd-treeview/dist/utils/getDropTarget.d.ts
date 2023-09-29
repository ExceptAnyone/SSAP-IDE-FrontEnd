import { DropTargetMonitor } from "react-dnd";
import { NodeModel, TreeState } from "../types";
declare type DropTarget = {
    id: NodeModel["id"];
    index: number;
} | null;
export declare const getDropTarget: <T>(node: NodeModel<T> | null, nodeEl: HTMLElement | null, monitor: DropTargetMonitor, context: TreeState<T>) => DropTarget;
export {};
