import type { RefObject, ElementType, ReactElement } from "react";
import type { XYCoord, DragSourceMonitor } from "react-dnd";
import type { DragDropMonitor } from "dnd-core";
import React from "react";
export declare type NodeModel<T = unknown> = {
    id: number | string;
    parent: number | string;
    text: string;
    droppable?: boolean;
    data?: T;
};
export declare type DragItem<T> = NodeModel<T> & {
    ref: RefObject<HTMLElement>;
};
export declare type NativeDragItem = {
    dataTransfer: DataTransfer;
};
export declare type RenderParams = {
    depth: number;
    isOpen: boolean;
    isDragging: boolean;
    isDropTarget: boolean;
    draggable: boolean;
    hasChild: boolean;
    containerRef: RefObject<HTMLElement>;
    handleRef: RefObject<any>;
    onToggle(): void;
};
export declare type NodeRender<T> = (node: NodeModel<T>, params: RenderParams) => ReactElement;
export declare type ClickHandler = (data: NodeModel) => void;
export declare type DropHandler<T> = (dragSource: NodeModel<T> | null, dropTargetId: NodeModel["id"], index: number) => void;
export declare type CanDropHandler = (dragSourceId: NodeModel["id"] | null, dropTargetId: NodeModel["id"]) => boolean | void;
export declare type CanDragHandler = (id: NodeModel["id"]) => boolean;
export declare type Classes = {
    root?: string;
    container?: string;
    listItem?: string;
    dropTarget?: string;
    draggingSource?: string;
    placeholder?: string;
};
export declare type SortCallback<T = unknown> = (a: NodeModel<T>, b: NodeModel<T>) => number;
export declare type DragLayerMonitorProps<T> = {
    item: DragItem<T>;
    clientOffset: XYCoord | null;
    isDragging: boolean;
};
export declare type DragPreviewRender<T> = (monitorProps: DragLayerMonitorProps<T>) => ReactElement;
export declare type PlaceholderRenderParams = {
    depth: number;
};
export declare type PlaceholderRender<T> = (node: NodeModel<T>, params: PlaceholderRenderParams) => ReactElement;
export declare type DragOverProps = {
    onDragEnter: () => void;
    onDragLeave: () => void;
    onDrop: () => void;
};
export declare type OpenHandler = (targetIds: NodeModel["id"] | NodeModel["id"][], callback?: ChangeOpenHandler) => void;
export declare type CloseHandler = (targetIds: NodeModel["id"] | NodeModel["id"][], callback?: ChangeOpenHandler) => void;
export declare type ToggleHandler = (id: NodeModel["id"], callback?: ChangeOpenHandler) => void;
export declare type ChangeOpenHandler = (newOpenIds: NodeModel["id"][]) => void;
export declare type InitialOpen = boolean | NodeModel["id"][];
export declare type DragSourceElement = EventTarget | null;
export declare type DragControlState = {
    isLock: boolean;
    lock: () => void;
    unlock: () => void;
};
export declare type PlaceholderState = {
    dropTargetId: NodeModel["id"] | undefined;
    index: number | undefined;
    showPlaceholder: (parentId: NodeModel["id"], index: number) => void;
    hidePlaceholder: () => void;
};
export declare type RootProps = Omit<React.HtmlHTMLAttributes<HTMLElement>, "ref" | "role">;
export declare type TreeStateBase<T> = {
    tree: NodeModel<T>[];
    rootId: NodeModel["id"];
    classes?: Classes;
    rootProps?: RootProps;
    render: NodeRender<T>;
    dragPreviewRender?: DragPreviewRender<T>;
    placeholderRender?: PlaceholderRender<T>;
    onDragStart?: (node: NodeModel<T>, monitor: DragSourceMonitor) => void;
    onDragEnd?: (node: NodeModel<T>, monitor: DragSourceMonitor) => void;
};
export declare type TreeState<T> = TreeStateBase<T> & {
    extraAcceptTypes: string[];
    listComponent: ElementType;
    listItemComponent: ElementType;
    placeholderComponent: ElementType;
    sort: SortCallback<T> | boolean;
    insertDroppableFirst: boolean;
    enableAnimateExpand: boolean;
    dropTargetOffset: number;
    initialOpen: InitialOpen;
    openIds: NodeModel["id"][];
    onDrop: DropHandler<T>;
    canDrop?: CanDropHandler;
    canDrag?: CanDragHandler;
    onToggle: ToggleHandler;
};
export declare type DropOptions<T = unknown> = {
    dragSourceId?: NodeModel["id"];
    dropTargetId: NodeModel["id"];
    dragSource?: NodeModel<T>;
    dropTarget?: NodeModel<T>;
    destinationIndex?: number;
    relativeIndex?: number;
    monitor: DragDropMonitor;
};
export declare type TreeProps<T = unknown> = TreeStateBase<T> & {
    extraAcceptTypes?: string[];
    listComponent?: ElementType;
    listItemComponent?: ElementType;
    placeholderComponent?: ElementType;
    sort?: SortCallback<T> | boolean;
    insertDroppableFirst?: boolean;
    enableAnimateExpand?: boolean;
    dropTargetOffset?: number;
    initialOpen?: InitialOpen;
    onChangeOpen?: ChangeOpenHandler;
    onDrop: (tree: NodeModel<T>[], options: DropOptions<T>) => void;
    canDrop?: (tree: NodeModel<T>[], options: DropOptions<T>) => boolean | void;
    canDrag?: (node: NodeModel<T> | undefined) => boolean;
};
export declare type TreeMethods = {
    open: OpenHandler;
    close: CloseHandler;
    openAll(): void;
    closeAll(): void;
};
