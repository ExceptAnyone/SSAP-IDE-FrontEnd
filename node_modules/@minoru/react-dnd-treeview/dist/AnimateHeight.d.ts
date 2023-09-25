import type { Target, Tween } from "framer-motion";
import React from "react";
interface AnimateHeightProps {
    isVisible: boolean;
    ease?: Tween["ease"];
    duration?: number;
    variants?: {
        open: Target;
        close: Target;
    };
    children: React.ReactNode;
}
export declare function AnimateHeight(props: AnimateHeightProps): JSX.Element;
export {};
