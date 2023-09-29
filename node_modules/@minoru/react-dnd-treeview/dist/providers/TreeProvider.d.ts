import React, { PropsWithChildren, ReactElement } from "react";
import { TreeProps, TreeMethods } from "../types";
declare type Props<T> = PropsWithChildren<TreeProps<T> & {
    treeRef: React.ForwardedRef<TreeMethods>;
}>;
export declare const TreeContext: React.Context<{}>;
export declare const TreeProvider: <T>(props: Props<T>) => ReactElement;
export {};
