import { NodeModel } from "../types";
export declare const mutateTreeWithIndex: <T>(tree: NodeModel<T>[], dragSourceId: NodeModel["id"], dropTargetId: NodeModel["id"], index: number) => NodeModel<T>[];
