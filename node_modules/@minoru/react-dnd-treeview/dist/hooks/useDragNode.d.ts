import { DragElementWrapper, DragSourceOptions, DragPreviewOptions } from "react-dnd";
import { NodeModel } from "../types";
export declare const useDragNode: <T>(item: NodeModel<T>, ref: React.RefObject<HTMLElement>) => [
    boolean,
    DragElementWrapper<DragSourceOptions>,
    DragElementWrapper<DragPreviewOptions>
];
