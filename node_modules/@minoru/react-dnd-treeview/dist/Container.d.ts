import { PropsWithChildren, ReactElement } from "react";
import { NodeModel } from "./types";
declare type Props = PropsWithChildren<{
    parentId: NodeModel["id"];
    depth: number;
}>;
export declare const Container: <T>(props: Props) => ReactElement;
export {};
