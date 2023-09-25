import { DragElementWrapper } from "react-dnd";
import { NodeModel } from "../types";
export declare const useDropNode: <T>(item: NodeModel<T>, ref: React.RefObject<HTMLElement>) => [boolean, NodeModel<T>, DragElementWrapper<HTMLElement>];
