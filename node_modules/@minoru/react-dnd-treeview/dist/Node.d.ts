import { ReactElement } from "react";
import { NodeModel } from "./types";
declare type Props = {
    id: NodeModel["id"];
    depth: number;
};
export declare const Node: <T>(props: Props) => ReactElement | null;
export {};
