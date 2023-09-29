import React, { PropsWithChildren, ReactElement } from "react";
import { TreeContext } from "./TreeProvider";
import { DragControlContext } from "./DragControlProvider";
import { PlaceholderContext } from "./PlaceholderProvider";
import { TreeProps, TreeMethods } from "../types";
declare type Props<T> = PropsWithChildren<TreeProps<T> & {
    treeRef: React.ForwardedRef<TreeMethods>;
}>;
export declare const Providers: <T>(props: Props<T>) => ReactElement;
export { TreeContext, DragControlContext, PlaceholderContext };
