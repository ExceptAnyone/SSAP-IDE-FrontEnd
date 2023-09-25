import type { MultiBackendOptions } from "dnd-multi-backend";
import type { HTML5BackendOptions } from "react-dnd-html5-backend";
import type { TouchBackendOptions } from "react-dnd-touch-backend";
export declare const getBackendOptions: (options?: {
    html5?: Partial<HTML5BackendOptions>;
    touch?: Partial<TouchBackendOptions>;
}) => MultiBackendOptions;
