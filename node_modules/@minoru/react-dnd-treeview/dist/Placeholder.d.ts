import { ReactElement } from "react";
import { NodeModel } from "./types";
declare type Props = {
    depth: number;
    listCount: number;
    dropTargetId: NodeModel["id"];
    index?: number;
};
export declare const Placeholder: <T>(props: Props) => ReactElement | null;
export {};
