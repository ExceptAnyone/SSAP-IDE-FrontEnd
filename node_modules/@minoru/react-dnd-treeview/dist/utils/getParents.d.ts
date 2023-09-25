import { NodeModel } from "../types";
/** Get all parental nodes of the given node id. */
export declare function getParents<T = unknown>(treeData: NodeModel<T>[], id: NodeModel["id"]): NodeModel<T>[];
