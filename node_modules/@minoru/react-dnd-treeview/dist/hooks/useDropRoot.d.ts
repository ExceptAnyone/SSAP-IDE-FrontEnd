import { DragElementWrapper } from "react-dnd";
import { NodeModel } from "../types";
export declare const useDropRoot: <T>(ref: React.RefObject<HTMLElement>) => [boolean, NodeModel<T>, DragElementWrapper<HTMLElement>];
