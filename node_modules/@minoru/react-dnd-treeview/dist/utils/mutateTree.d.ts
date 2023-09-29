import { NodeModel } from "../types";
export declare const mutateTree: <T>(tree: NodeModel<T>[], dragSourceId: NodeModel["id"], dropTargetId: NodeModel["id"]) => NodeModel<T>[];
