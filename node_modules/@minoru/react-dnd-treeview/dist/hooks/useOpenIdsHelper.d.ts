import { NodeModel, ToggleHandler, OpenHandler, CloseHandler, ChangeOpenHandler, InitialOpen } from "../types";
export declare const useOpenIdsHelper: (tree: NodeModel[], initialOpen?: InitialOpen) => [(string | number)[], {
    handleToggle: ToggleHandler;
    handleCloseAll: (callback?: ChangeOpenHandler) => void;
    handleOpenAll: (callback?: ChangeOpenHandler) => void;
    handleOpen: OpenHandler;
    handleClose: CloseHandler;
}];
