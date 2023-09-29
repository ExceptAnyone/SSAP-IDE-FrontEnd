import React from "react";
import { TreeMethods, TreeProps } from "./types";
declare function TreeInner<T>(props: TreeProps<T>, ref: React.ForwardedRef<TreeMethods>): JSX.Element;
declare const Tree: <T = unknown>(props: import("./types").TreeStateBase<T> & {
    extraAcceptTypes?: string[] | undefined;
    listComponent?: React.ElementType<any> | undefined;
    listItemComponent?: React.ElementType<any> | undefined;
    placeholderComponent?: React.ElementType<any> | undefined;
    sort?: boolean | import("./types").SortCallback<T> | undefined;
    insertDroppableFirst?: boolean | undefined;
    enableAnimateExpand?: boolean | undefined;
    dropTargetOffset?: number | undefined;
    initialOpen?: import("./types").InitialOpen | undefined;
    onChangeOpen?: import("./types").ChangeOpenHandler | undefined;
    onDrop: (tree: import("./types").NodeModel<T>[], options: import("./types").DropOptions<T>) => void;
    canDrop?: ((tree: import("./types").NodeModel<T>[], options: import("./types").DropOptions<T>) => boolean | void) | undefined;
    canDrag?: ((node: import("./types").NodeModel<T> | undefined) => boolean) | undefined;
} & {
    ref?: React.ForwardedRef<TreeMethods> | undefined;
}) => ReturnType<typeof TreeInner>;
export { Tree };
