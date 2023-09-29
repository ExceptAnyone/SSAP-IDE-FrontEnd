import React, { useState, useEffect, createContext, useImperativeHandle, useContext, useRef, useMemo, forwardRef } from 'react';
import { HTML5Backend, getEmptyImage } from 'react-dnd-html5-backend';
import { ResizeObserver } from '@juggle/resize-observer';
import { motion } from 'framer-motion';
import useMeasure from 'react-use-measure';
import { useDragDropManager, useDrag, useDrop, useDragLayer } from 'react-dnd';
export { DndProvider } from 'react-dnd';
import { PointerTransition, TouchTransition } from 'dnd-multi-backend';
export { MultiBackend } from 'dnd-multi-backend';
import { TouchBackend } from 'react-dnd-touch-backend';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

function AnimateHeight(props) {
    var isVisible = props.isVisible, _a = props.ease, ease = _a === void 0 ? "easeIn" : _a, duration = props.duration, _b = props.variants, variants = _b === void 0 ? {
        open: { opacity: 1, height: "auto" },
        close: { opacity: 0, height: 0 },
    } : _b, children = props.children;
    var _c = useMeasure({ polyfill: ResizeObserver }), ref = _c[0], height = _c[1].height;
    var _d = useState(isVisible), isVisibleChildren = _d[0], setIsVisibleChildren = _d[1];
    var _e = useState(isVisible), isVisibleContainer = _e[0], setIsVisibleContainer = _e[1];
    var _f = useState(false), transition = _f[0], setTransition = _f[1];
    var onAnimationComplete = function () {
        setTransition(false);
        if (!isVisible) {
            setIsVisibleChildren(false);
        }
    };
    useEffect(function () {
        setTransition(true);
        if (isVisible) {
            setIsVisibleChildren(true);
        }
        else {
            setIsVisibleContainer(false);
        }
    }, [isVisible]);
    useEffect(function () {
        if (isVisibleChildren) {
            setIsVisibleContainer(true);
        }
    }, [height]);
    return (React.createElement(motion.div, { style: transition ? { overflow: "hidden" } : undefined, onAnimationComplete: onAnimationComplete, initial: isVisibleContainer ? "open" : "close", animate: isVisibleContainer ? "open" : "close", inherit: false, variants: variants, transition: { ease: ease, duration: computeDuration(height, duration) } },
        React.createElement("div", { ref: ref }, isVisibleChildren && children)));
}
function computeDuration(height, fixedDuration) {
    if (fixedDuration) {
        return fixedDuration;
    }
    if (!height) {
        return 0;
    }
    var constant = height / 36;
    // ??? don't know why use below computed expression (just copy it from somewhere)
    return Math.round((4 + 10 * Math.pow(constant, 0.25) + constant / 5) * 10) / 1500;
}

var compareItems = function (a, b) {
    if (a.text > b.text) {
        return 1;
    }
    else if (a.text < b.text) {
        return -1;
    }
    return 0;
};

var getTreeItem = function (tree, id) { return tree.find(function (n) { return n.id === id; }); };

var isAncestor = function (tree, sourceId, targetId) {
    if (targetId === 0) {
        return false;
    }
    var targetNode = tree.find(function (node) { return node.id === targetId; });
    if (targetNode === undefined) {
        return false;
    }
    if (targetNode.parent === sourceId) {
        return true;
    }
    return isAncestor(tree, sourceId, targetNode.parent);
};

var isNodeModel = function (arg) {
    return (arg.id !== undefined && arg.parent !== undefined && arg.text !== undefined);
};

var isDroppable = function (dragSource, dropTargetId, treeContext) {
    var tree = treeContext.tree, rootId = treeContext.rootId, canDrop = treeContext.canDrop;
    if (dragSource === null) {
        // Dropability judgment of each node in the undragged state.
        // Without this process, the newly mounted node will not be able to be dropped unless it is re-rendered
        if (dropTargetId === rootId) {
            return true;
        }
        var dropTargetNode = tree.find(function (node) { return node.id === dropTargetId; });
        if (dropTargetNode && dropTargetNode.droppable) {
            return true;
        }
        return false;
    }
    else {
        var dragSourceId_1 = isNodeModel(dragSource) ? dragSource.id : null;
        if (canDrop) {
            var result = canDrop(dragSourceId_1, dropTargetId);
            if (result !== undefined) {
                return result;
            }
        }
        if (dragSourceId_1 === dropTargetId) {
            return false;
        }
        var dragSourceNode = tree.find(function (node) { return node.id === dragSourceId_1; });
        var dropTargetNode = tree.find(function (node) { return node.id === dropTargetId; });
        // dragSource is external node
        if (dragSourceNode === undefined || dragSourceId_1 === null) {
            return dropTargetId === rootId || !!(dropTargetNode === null || dropTargetNode === void 0 ? void 0 : dropTargetNode.droppable);
        }
        // dropTarget is root node
        if (dropTargetNode === undefined) {
            return dragSourceNode.parent !== 0;
        }
        if (dragSourceNode.parent === dropTargetId || !dropTargetNode.droppable) {
            return false;
        }
        return !isAncestor(tree, dragSourceId_1, dropTargetId);
    }
};

var mutateTree = function (tree, dragSourceId, dropTargetId) {
    return tree.map(function (node) {
        if (node.id === dragSourceId) {
            return __assign(__assign({}, node), { parent: dropTargetId });
        }
        return node;
    });
};

var getDestIndex = function (tree, dropTargetId, index) {
    if (index === 0) {
        return 0;
    }
    var siblings = tree.filter(function (node) { return node.parent === dropTargetId; });
    if (siblings[index]) {
        return tree.findIndex(function (node) { return node.id === siblings[index].id; });
    }
    return tree.findIndex(function (node) { return node.id === siblings[index - 1].id; }) + 1;
};

var getSrcIndex = function (tree, dragSourceId) {
    return tree.findIndex(function (node) { return node.id === dragSourceId; });
};
var getModifiedIndex = function (tree, dragSourceId, dropTargetId, index) {
    var srcIndex = getSrcIndex(tree, dragSourceId);
    var destIndex = getDestIndex(tree, dropTargetId, index);
    destIndex = destIndex > srcIndex ? destIndex - 1 : destIndex;
    return [srcIndex, destIndex];
};

var arrayMoveMutable = function (array, fromIndex, toIndex) {
    var startIndex = fromIndex < 0 ? array.length + fromIndex : fromIndex;
    if (startIndex >= 0 && startIndex < array.length) {
        var endIndex = toIndex < 0 ? array.length + toIndex : toIndex;
        var item = array.splice(fromIndex, 1)[0];
        array.splice(endIndex, 0, item);
    }
};
var mutateTreeWithIndex = function (tree, dragSourceId, dropTargetId, index) {
    var _a = getModifiedIndex(tree, dragSourceId, dropTargetId, index), srcIndex = _a[0], destIndex = _a[1];
    var newTree = __spreadArray([], tree, true);
    arrayMoveMutable(newTree, srcIndex, destIndex);
    return newTree.map(function (node) {
        if (node.id === dragSourceId) {
            return __assign(__assign({}, node), { parent: dropTargetId });
        }
        return node;
    });
};

var compareYCoord = function (el, pointerY) {
    var bbox = el.getBoundingClientRect();
    var centerY = bbox.top + bbox.height / 2;
    return pointerY > centerY ? "down" : "up";
};
var getInnerIndex = function (listItems, monitor) {
    var pos = "";
    var index = 0;
    listItems.forEach(function (el, key) {
        var _a;
        var flag = compareYCoord(el, ((_a = monitor.getClientOffset()) === null || _a === void 0 ? void 0 : _a.y) || 0);
        if (pos === "") {
            pos = flag;
        }
        else if (pos !== flag) {
            pos = flag;
            index = key;
        }
        if (key === listItems.length - 1 && flag === "down") {
            index = key + 1;
        }
    });
    return index;
};
var getOuterIndex = function (node, nodeEl, monitor) {
    var parentList = nodeEl.closest('[role="list"]');
    var parentListItems = parentList === null || parentList === void 0 ? void 0 : parentList.querySelectorAll(':scope > [role="listitem"]');
    if (!parentListItems) {
        return null;
    }
    return getInnerIndex(parentListItems, monitor);
};
var getHoverPosition = function (el, pointerY, context) {
    var bbox = el.getBoundingClientRect();
    var offsetY = context.dropTargetOffset;
    var upSideY = bbox.top + offsetY;
    var lowerSideY = bbox.bottom - offsetY;
    if (pointerY > lowerSideY) {
        return "lower";
    }
    else if (pointerY < upSideY) {
        return "upper";
    }
    return "middle";
};
var getDropTarget = function (node, nodeEl, monitor, context) {
    var _a;
    if (!nodeEl) {
        return null;
    }
    if (node === null) {
        var listItems = nodeEl.querySelectorAll(':scope > [role="listitem"]');
        return {
            id: context.rootId,
            index: getInnerIndex(listItems, monitor),
        };
    }
    var dragSource = monitor.getItem();
    var list = nodeEl.querySelector('[role="list"]');
    var hoverPosition = getHoverPosition(nodeEl, ((_a = monitor.getClientOffset()) === null || _a === void 0 ? void 0 : _a.y) || 0, context);
    if (!list) {
        if (hoverPosition === "middle") {
            return {
                id: node.id,
                index: 0,
            };
        }
        if (isDroppable(dragSource, node.parent, context)) {
            var outerIndex = getOuterIndex(node, nodeEl, monitor);
            if (outerIndex === null) {
                return null;
            }
            return {
                id: node.parent,
                index: outerIndex,
            };
        }
        return null;
    }
    else {
        if (hoverPosition === "upper") {
            if (isDroppable(dragSource, node.parent, context)) {
                var outerIndex = getOuterIndex(node, nodeEl, monitor);
                if (outerIndex === null) {
                    return null;
                }
                return {
                    id: node.parent,
                    index: outerIndex,
                };
            }
            else {
                return {
                    id: node.id,
                    index: 0,
                };
            }
        }
        var listItems = list.querySelectorAll(':scope > [role="listitem"]');
        return {
            id: node.id,
            index: getInnerIndex(listItems, monitor),
        };
    }
};

var getDescendants = function (treeData, id) {
    var descendants = [];
    var search = function (tree, ids) {
        var children = tree.filter(function (node) { return ids.includes(node.parent); });
        if (children.length > 0) {
            descendants = __spreadArray(__spreadArray([], descendants, true), children, true);
            search(tree, children.map(function (node) { return node.id; }));
        }
    };
    search(treeData, [id]);
    return descendants;
};

/** Get all parental nodes of the given node id. */
function getParents(treeData, id) {
    var parents = [];
    var node = treeData.find(function (el) { return el.id === id; });
    while (node) {
        node = treeData.find(function (el) { return el.id === node.parent; });
        if (node)
            parents.push(node);
    }
    return parents;
}

var getBackendOptions = function (options) {
    if (options === void 0) { options = {}; }
    return {
        backends: [
            {
                id: "html5",
                backend: HTML5Backend,
                options: options.html5,
                transition: PointerTransition,
            },
            {
                id: "touch",
                backend: TouchBackend,
                options: options.touch || { enableMouseEvents: true },
                preview: true,
                transition: TouchTransition,
            },
        ],
    };
};

var hasChildNodes = function (tree, nodeId) {
    return tree.some(function (node) { return node.parent === nodeId; });
};

var TreeContext = createContext({});
var TreeProvider = function (props) {
    var _a = useOpenIdsHelper(props.tree, props.initialOpen), openIds = _a[0], _b = _a[1], handleToggle = _b.handleToggle, handleCloseAll = _b.handleCloseAll, handleOpenAll = _b.handleOpenAll, handleOpen = _b.handleOpen, handleClose = _b.handleClose;
    useImperativeHandle(props.treeRef, function () { return ({
        open: function (targetIds) { return handleOpen(targetIds, props.onChangeOpen); },
        close: function (targetIds) { return handleClose(targetIds, props.onChangeOpen); },
        openAll: function () { return handleOpenAll(props.onChangeOpen); },
        closeAll: function () { return handleCloseAll(props.onChangeOpen); },
    }); });
    var monitor = useDragDropManager().getMonitor();
    var canDropCallback = props.canDrop;
    var canDragCallback = props.canDrag;
    var value = __assign(__assign({ extraAcceptTypes: [], listComponent: "ul", listItemComponent: "li", placeholderComponent: "li", sort: true, insertDroppableFirst: true, enableAnimateExpand: false, dropTargetOffset: 0, initialOpen: false }, props), { openIds: openIds, onDrop: function (dragSource, dropTargetId, placeholderIndex) {
            // if dragSource is null,
            // it means that the drop is from the outside of the react-dnd.
            if (!dragSource) {
                var options = {
                    dropTargetId: dropTargetId,
                    dropTarget: getTreeItem(props.tree, dropTargetId),
                    monitor: monitor,
                };
                if (props.sort === false) {
                    options.destinationIndex = getDestIndex(props.tree, dropTargetId, placeholderIndex);
                    options.relativeIndex = placeholderIndex;
                }
                props.onDrop(props.tree, options);
            }
            else {
                var options = {
                    dragSourceId: dragSource.id,
                    dropTargetId: dropTargetId,
                    dragSource: dragSource,
                    dropTarget: getTreeItem(props.tree, dropTargetId),
                    monitor: monitor,
                };
                var tree = props.tree;
                // If the dragSource does not exist in the tree,
                // it is an external node, so add it to the tree
                if (!getTreeItem(tree, dragSource.id)) {
                    tree = __spreadArray(__spreadArray([], tree, true), [dragSource], false);
                }
                if (props.sort === false) {
                    var _a = getModifiedIndex(tree, dragSource.id, dropTargetId, placeholderIndex), destIndex = _a[1];
                    options.destinationIndex = destIndex;
                    options.relativeIndex = placeholderIndex;
                    props.onDrop(mutateTreeWithIndex(tree, dragSource.id, dropTargetId, placeholderIndex), options);
                    return;
                }
                props.onDrop(mutateTree(tree, dragSource.id, dropTargetId), options);
            }
        }, canDrop: canDropCallback
            ? function (dragSourceId, dropTargetId) {
                return canDropCallback(props.tree, {
                    dragSourceId: dragSourceId !== null && dragSourceId !== void 0 ? dragSourceId : undefined,
                    dropTargetId: dropTargetId,
                    dragSource: monitor.getItem(),
                    dropTarget: getTreeItem(props.tree, dropTargetId),
                    monitor: monitor,
                });
            }
            : undefined, canDrag: canDragCallback
            ? function (id) { return canDragCallback(getTreeItem(props.tree, id)); }
            : undefined, onToggle: function (id) { return handleToggle(id, props.onChangeOpen); } });
    return (React.createElement(TreeContext.Provider, { value: value }, props.children));
};

var DragControlContext = createContext({});
var initialState$1 = {
    isLock: false,
};
var DragControlProvider = function (props) {
    var _a = useState(initialState$1.isLock), isLock = _a[0], setIsLock = _a[1];
    return (React.createElement(DragControlContext.Provider, { value: {
            isLock: isLock,
            lock: function () { return setIsLock(true); },
            unlock: function () { return setIsLock(false); },
        } }, props.children));
};

var PlaceholderContext = createContext({});
var initialState = {
    dropTargetId: undefined,
    index: undefined,
};
var PlaceholderProvider = function (props) {
    var _a = useState(initialState.dropTargetId), dropTargetId = _a[0], setDropTargetId = _a[1];
    var _b = useState(initialState.index), index = _b[0], setIndex = _b[1];
    var showPlaceholder = function (dropTargetId, index) {
        setDropTargetId(dropTargetId);
        setIndex(index);
    };
    var hidePlaceholder = function () {
        setDropTargetId(initialState.dropTargetId);
        setIndex(initialState.index);
    };
    return (React.createElement(PlaceholderContext.Provider, { value: {
            dropTargetId: dropTargetId,
            index: index,
            showPlaceholder: showPlaceholder,
            hidePlaceholder: hidePlaceholder,
        } }, props.children));
};

var Providers = function (props) { return (React.createElement(TreeProvider, __assign({}, props),
    React.createElement(DragControlProvider, null,
        React.createElement(PlaceholderProvider, null, props.children)))); };

/**
 * This is a hook to allow text selection by mouse in the text input area in a node.
 * Temporarily disables node dragging while the pointer is over the text input area.
 */
var useDragControl = function (ref) {
    var dragControlContext = useContext(DragControlContext);
    useEffect(function () {
        if (!ref.current)
            return;
        var node = ref.current;
        var lock = function (e) {
            var target = e.target;
            if (target instanceof HTMLInputElement ||
                target instanceof HTMLTextAreaElement) {
                dragControlContext.lock();
            }
        };
        var unlock = function (e) {
            var target = e.target;
            if (target instanceof HTMLInputElement ||
                target instanceof HTMLTextAreaElement) {
                dragControlContext.unlock();
            }
        };
        var handleMouseOver = function (e) { return lock(e); };
        var handleMouseOut = function (e) { return unlock(e); };
        var handleFocusIn = function (e) { return lock(e); };
        var handleFocusOut = function (e) { return unlock(e); };
        // In Firefox or Safari,
        // the focusout event is not fired when the focused element is unmounted.
        // Therefore, it detects the unmounting of a child element
        // and unlocks tree if the focus is on the body element after unmounting.
        var observer = new MutationObserver(function () {
            if (document.activeElement === document.body) {
                dragControlContext.unlock();
            }
        });
        observer.observe(node, {
            subtree: true,
            childList: true,
        });
        node.addEventListener("mouseover", handleMouseOver);
        node.addEventListener("mouseout", handleMouseOut);
        node.addEventListener("focusin", handleFocusIn);
        node.addEventListener("focusout", handleFocusOut);
        return function () {
            observer.disconnect();
            node.removeEventListener("mouseover", handleMouseOver);
            node.removeEventListener("mouseout", handleMouseOut);
            node.removeEventListener("focusin", handleFocusIn);
            node.removeEventListener("focusout", handleFocusOut);
        };
    }, [ref, dragControlContext]);
    useEffect(function () {
        var _a;
        (_a = ref.current) === null || _a === void 0 ? void 0 : _a.setAttribute("draggable", dragControlContext.isLock ? "false" : "true");
    }, [ref, dragControlContext.isLock]);
};

var ItemTypes = {
    TREE_ITEM: Symbol(),
};

var dragSourceElement = null;
var register = function (e) {
    var target = e.target;
    if (target instanceof HTMLElement) {
        var source = target.closest('[role="listitem"]');
        if (e.currentTarget === source) {
            dragSourceElement = source;
        }
    }
};
var handleDragStart = function (e) { return register(e); };
var handleTouchStart = function (e) { return register(e); };
var useDragNode = function (item, ref) {
    var treeContext = useTreeContext();
    useEffect(function () {
        var node = ref.current;
        node === null || node === void 0 ? void 0 : node.addEventListener("dragstart", handleDragStart);
        node === null || node === void 0 ? void 0 : node.addEventListener("touchstart", handleTouchStart, {
            passive: true,
        });
        return function () {
            node === null || node === void 0 ? void 0 : node.removeEventListener("dragstart", handleDragStart);
            node === null || node === void 0 ? void 0 : node.removeEventListener("touchstart", handleTouchStart);
        };
    }, [ref]);
    var _a = useDrag({
        type: ItemTypes.TREE_ITEM,
        item: function (monitor) {
            var dragItem = __assign({ ref: ref }, item);
            if (treeContext.onDragStart) {
                treeContext.onDragStart(dragItem, monitor);
            }
            return dragItem;
        },
        end: function (item, monitor) {
            var dragItem = item;
            if (treeContext.onDragEnd) {
                treeContext.onDragEnd(dragItem, monitor);
            }
        },
        canDrag: function () {
            var canDrag = treeContext.canDrag;
            if (dragSourceElement !== ref.current) {
                return false;
            }
            if (canDrag) {
                return canDrag(item.id);
            }
            return true;
        },
        collect: function (monitor) { return ({
            isDragging: monitor.isDragging(),
        }); },
    }), isDragging = _a[0].isDragging, drag = _a[1], preview = _a[2];
    return [isDragging, drag, preview];
};

var useDragOver = function (id, isOpen, dragOverHandler) {
    var stack = useRef(0);
    var timer = useRef(0);
    var onDragEnter = function () {
        stack.current += 1;
        if (stack.current === 1 && !isOpen) {
            timer.current = window.setTimeout(function () { return dragOverHandler(id); }, 500);
        }
    };
    var onDragLeave = function () {
        stack.current -= 1;
        if (stack.current === 0) {
            window.clearTimeout(timer.current);
        }
    };
    var onDrop = function () {
        if (timer.current > 0) {
            window.clearTimeout(timer.current);
        }
        stack.current = 0;
        timer.current = 0;
    };
    return {
        onDragEnter: onDragEnter,
        onDragLeave: onDragLeave,
        onDrop: onDrop,
    };
};

var useDropRoot = function (ref) {
    var treeContext = useTreeContext();
    var placeholderContext = useContext(PlaceholderContext);
    var _a = useDrop({
        accept: __spreadArray([ItemTypes.TREE_ITEM], treeContext.extraAcceptTypes, true),
        drop: function (dragItem, monitor) {
            var rootId = treeContext.rootId, onDrop = treeContext.onDrop;
            var dropTargetId = placeholderContext.dropTargetId, index = placeholderContext.index;
            if (monitor.isOver({ shallow: true }) &&
                dropTargetId !== undefined &&
                index !== undefined) {
                // If the drag source is outside the react-dnd,
                // a different object is passed than the NodeModel.
                onDrop(isNodeModel(dragItem) ? dragItem : null, rootId, index);
            }
            placeholderContext.hidePlaceholder();
        },
        canDrop: function (dragItem, monitor) {
            var rootId = treeContext.rootId;
            if (monitor.isOver({ shallow: true })) {
                if (dragItem === undefined) {
                    return false;
                }
                return isDroppable(dragItem, rootId, treeContext);
            }
            return false;
        },
        hover: function (dragItem, monitor) {
            if (monitor.isOver({ shallow: true })) {
                var rootId = treeContext.rootId;
                var dropTargetId = placeholderContext.dropTargetId, index = placeholderContext.index, showPlaceholder = placeholderContext.showPlaceholder, hidePlaceholder = placeholderContext.hidePlaceholder;
                var dropTarget = getDropTarget(null, ref.current, monitor, treeContext);
                if (dropTarget === null ||
                    !isDroppable(dragItem, rootId, treeContext)) {
                    hidePlaceholder();
                    return;
                }
                if (dropTarget.id !== dropTargetId || dropTarget.index !== index) {
                    showPlaceholder(dropTarget.id, dropTarget.index);
                }
            }
        },
        collect: function (monitor) {
            var dragSource = monitor.getItem();
            return {
                isOver: monitor.isOver({ shallow: true }) && monitor.canDrop(),
                dragSource: dragSource,
            };
        },
    }), _b = _a[0], isOver = _b.isOver, dragSource = _b.dragSource, drop = _a[1];
    return [isOver, dragSource, drop];
};

var useDropNode = function (item, ref) {
    var treeContext = useTreeContext();
    var placeholderContext = useContext(PlaceholderContext);
    var _a = useDrop({
        accept: __spreadArray([ItemTypes.TREE_ITEM], treeContext.extraAcceptTypes, true),
        drop: function (dragItem, monitor) {
            var dropTargetId = placeholderContext.dropTargetId, index = placeholderContext.index;
            if (monitor.isOver({ shallow: true }) &&
                dropTargetId !== undefined &&
                index !== undefined) {
                // If the drag source is outside the react-dnd,
                // a different object is passed than the NodeModel.
                treeContext.onDrop(isNodeModel(dragItem) ? dragItem : null, dropTargetId, index);
            }
            placeholderContext.hidePlaceholder();
        },
        canDrop: function (dragItem, monitor) {
            if (monitor.isOver({ shallow: true })) {
                var dropTarget = getDropTarget(item, ref.current, monitor, treeContext);
                if (dropTarget === null) {
                    return false;
                }
                return isDroppable(dragItem, dropTarget.id, treeContext);
            }
            return false;
        },
        hover: function (dragItem, monitor) {
            if (monitor.isOver({ shallow: true })) {
                var dropTargetId = placeholderContext.dropTargetId, index = placeholderContext.index, showPlaceholder = placeholderContext.showPlaceholder, hidePlaceholder = placeholderContext.hidePlaceholder;
                var dropTarget = getDropTarget(item, ref.current, monitor, treeContext);
                if (dropTarget === null ||
                    !isDroppable(dragItem, dropTarget.id, treeContext)) {
                    hidePlaceholder();
                    return;
                }
                if (dropTarget.id !== dropTargetId || dropTarget.index !== index) {
                    showPlaceholder(dropTarget.id, dropTarget.index);
                }
            }
        },
        collect: function (monitor) {
            var dragSource = monitor.getItem();
            return {
                isOver: monitor.isOver({ shallow: true }) && monitor.canDrop(),
                dragSource: dragSource,
            };
        },
    }), _b = _a[0], isOver = _b.isOver, dragSource = _b.dragSource, drop = _a[1];
    return [isOver, dragSource, drop];
};

var useOpenIdsHelper = function (tree, initialOpen) {
    // Only a parent node with a child node can be opened.
    // The droppable property has no effect.
    // However, if an ID is specified, It is applied unconditionally.
    var initialOpenIds = useMemo(function () {
        if (initialOpen === true) {
            return tree
                .filter(function (node) { return hasChildNodes(tree, node.id); })
                .map(function (node) { return node.id; });
        }
        else if (Array.isArray(initialOpen)) {
            return initialOpen;
        }
        return [];
    }, [initialOpen]);
    var _a = useState(initialOpenIds), openIds = _a[0], setOpenIds = _a[1];
    useEffect(function () { return setOpenIds(initialOpenIds); }, [initialOpen]);
    var handleToggle = function (targetId, callback) {
        var newOpenIds = openIds.includes(targetId)
            ? openIds.filter(function (id) { return id !== targetId; })
            : __spreadArray(__spreadArray([], openIds, true), [targetId], false);
        setOpenIds(newOpenIds);
        if (callback) {
            callback(newOpenIds);
        }
    };
    var handleCloseAll = function (callback) {
        setOpenIds([]);
        if (callback) {
            callback([]);
        }
    };
    var handleOpenAll = function (callback) {
        var newOpenIds = tree
            .filter(function (node) { return hasChildNodes(tree, node.id); })
            .map(function (node) { return node.id; });
        setOpenIds(newOpenIds);
        if (callback) {
            callback(newOpenIds);
        }
    };
    var handleOpen = function (targetIds, callback) {
        var newOpenIds = [];
        if (Array.isArray(targetIds)) {
            var targetNodes = tree.filter(function (node) { return targetIds.includes(node.id) && hasChildNodes(tree, node.id); });
            newOpenIds = __spreadArray(__spreadArray([], openIds, true), targetNodes.map(function (node) { return node.id; }), true).filter(function (value, index, self) { return self.indexOf(value) === index; });
        }
        else {
            newOpenIds = openIds.includes(targetIds)
                ? openIds
                : __spreadArray(__spreadArray([], openIds, true), [targetIds], false);
        }
        setOpenIds(newOpenIds);
        if (callback) {
            callback(newOpenIds);
        }
    };
    var handleClose = function (targetIds, callback) {
        var newOpenIds = openIds.filter(function (id) {
            return Array.isArray(targetIds) ? !targetIds.includes(id) : id !== targetIds;
        });
        setOpenIds(newOpenIds);
        if (callback) {
            callback(newOpenIds);
        }
    };
    return [
        openIds,
        { handleToggle: handleToggle, handleCloseAll: handleCloseAll, handleOpenAll: handleOpenAll, handleOpen: handleOpen, handleClose: handleClose },
    ];
};

var useTreeDragLayer = function () {
    return useDragLayer(function (monitor) {
        var itemType = monitor.getItemType();
        return {
            item: monitor.getItem(),
            clientOffset: monitor.getClientOffset(),
            isDragging: monitor.isDragging() && itemType === ItemTypes.TREE_ITEM,
        };
    });
};

var useTreeContext = function () {
    var treeContext = useContext(TreeContext);
    if (!treeContext) {
        throw new Error("useTreeContext must be used under TreeProvider");
    }
    return treeContext;
};

var useContainerClassName = function (parentId, isOver) {
    var _a = useTreeContext(), rootId = _a.rootId, rootProps = _a.rootProps, classes = _a.classes;
    var className = (classes === null || classes === void 0 ? void 0 : classes.container) || "";
    if (isOver && (classes === null || classes === void 0 ? void 0 : classes.dropTarget)) {
        className = "".concat(className, " ").concat(classes.dropTarget);
    }
    if (parentId === rootId && (classes === null || classes === void 0 ? void 0 : classes.root)) {
        className = "".concat(className, " ").concat(classes.root);
    }
    if (parentId === rootId && (rootProps === null || rootProps === void 0 ? void 0 : rootProps.className)) {
        className = "".concat(className, " ").concat(rootProps.className);
    }
    className = className.trim();
    return className;
};

var useDragHandle = function (containerRef, handleRef, drag) {
    if (handleRef.current) {
        drag(handleRef);
    }
    else {
        drag(containerRef);
    }
    useEffect(function () {
        if (handleRef.current) {
            drag(handleRef);
        }
        else {
            drag(containerRef);
        }
    }, [handleRef.current]);
};

var Node = function (props) {
    var treeContext = useTreeContext();
    var placeholderContext = useContext(PlaceholderContext);
    var containerRef = useRef(null);
    var handleRef = useRef(null);
    var item = treeContext.tree.find(function (node) { return node.id === props.id; });
    var openIds = treeContext.openIds, classes = treeContext.classes, enableAnimateExpand = treeContext.enableAnimateExpand;
    var open = openIds.includes(props.id);
    var _a = useDragNode(item, containerRef), isDragging = _a[0], drag = _a[1], preview = _a[2];
    var _b = useDropNode(item, containerRef), isOver = _b[0], dragSource = _b[1], drop = _b[2];
    useDragHandle(containerRef, handleRef, drag);
    if (isDroppable(dragSource, props.id, treeContext)) {
        drop(containerRef);
    }
    useEffect(function () {
        if (treeContext.dragPreviewRender) {
            preview(getEmptyImage(), { captureDraggingState: true });
        }
        else if (handleRef.current) {
            preview(containerRef);
        }
    }, [preview, treeContext.dragPreviewRender]);
    useDragControl(containerRef);
    var handleToggle = function () { return treeContext.onToggle(item.id); };
    var Component = treeContext.listItemComponent;
    var className = (classes === null || classes === void 0 ? void 0 : classes.listItem) || "";
    if (isOver && (classes === null || classes === void 0 ? void 0 : classes.dropTarget)) {
        className = "".concat(className, " ").concat(classes.dropTarget);
    }
    if (isDragging && (classes === null || classes === void 0 ? void 0 : classes.draggingSource)) {
        className = "".concat(className, " ").concat(classes.draggingSource);
    }
    var draggable = treeContext.canDrag ? treeContext.canDrag(props.id) : true;
    var isDropTarget = placeholderContext.dropTargetId === props.id;
    var params = {
        depth: props.depth,
        isOpen: open,
        isDragging: isDragging,
        isDropTarget: isDropTarget,
        draggable: draggable,
        hasChild: hasChildNodes(treeContext.tree, props.id),
        containerRef: containerRef,
        handleRef: handleRef,
        onToggle: handleToggle,
    };
    return (React.createElement(Component, { ref: containerRef, className: className, role: "listitem" },
        treeContext.render(item, params),
        enableAnimateExpand && params.hasChild && (React.createElement(AnimateHeight, { isVisible: open },
            React.createElement(Container, { parentId: props.id, depth: props.depth + 1 }))),
        !enableAnimateExpand && params.hasChild && open && (React.createElement(Container, { parentId: props.id, depth: props.depth + 1 }))));
};

var Placeholder = function (props) {
    var _a = useTreeContext(), placeholderRender = _a.placeholderRender, Component = _a.placeholderComponent, classes = _a.classes;
    var placeholderContext = useContext(PlaceholderContext);
    var manager = useDragDropManager();
    var monitor = manager.getMonitor();
    var dragSource = monitor.getItem();
    if (!placeholderRender || !dragSource) {
        return null;
    }
    var visible = props.dropTargetId === placeholderContext.dropTargetId &&
        (props.index === placeholderContext.index ||
            (props.index === undefined &&
                props.listCount === placeholderContext.index));
    if (!visible) {
        return null;
    }
    return (React.createElement(Component, { className: (classes === null || classes === void 0 ? void 0 : classes.placeholder) || "" }, placeholderRender(dragSource, { depth: props.depth })));
};

var Container = function (props) {
    var treeContext = useTreeContext();
    var ref = useRef(null);
    var nodes = treeContext.tree.filter(function (l) { return l.parent === props.parentId; });
    var view = nodes;
    var sortCallback = typeof treeContext.sort === "function" ? treeContext.sort : compareItems;
    if (treeContext.insertDroppableFirst) {
        var droppableNodes = nodes.filter(function (n) { return n.droppable; });
        var nonDroppableNodes = nodes.filter(function (n) { return !n.droppable; });
        if (treeContext.sort === false) {
            view = __spreadArray(__spreadArray([], droppableNodes, true), nonDroppableNodes, true);
        }
        else {
            droppableNodes = droppableNodes.sort(sortCallback);
            nonDroppableNodes = nonDroppableNodes.sort(sortCallback);
            view = __spreadArray(__spreadArray([], droppableNodes, true), nonDroppableNodes, true);
        }
    }
    else {
        if (treeContext.sort !== false) {
            view = nodes.sort(sortCallback);
        }
    }
    var _a = useDropRoot(ref), isOver = _a[0], dragSource = _a[1], drop = _a[2];
    if (props.parentId === treeContext.rootId &&
        isDroppable(dragSource, treeContext.rootId, treeContext)) {
        drop(ref);
    }
    var className = useContainerClassName(props.parentId, isOver);
    var rootProps = treeContext.rootProps || {};
    var Component = treeContext.listComponent;
    return (React.createElement(Component, __assign({ ref: ref, role: "list" }, rootProps, { className: className }),
        view.map(function (node, index) { return (React.createElement(React.Fragment, { key: node.id },
            React.createElement(Placeholder, { depth: props.depth, listCount: view.length, dropTargetId: props.parentId, index: index }),
            React.createElement(Node, { id: node.id, depth: props.depth }))); }),
        React.createElement(Placeholder, { depth: props.depth, listCount: view.length, dropTargetId: props.parentId })));
};

var rootStyle = {
    height: "100%",
    left: 0,
    pointerEvents: "none",
    position: "fixed",
    top: 0,
    width: "100%",
    zIndex: 100,
};
var getItemStyles = function (monitorProps) {
    var offset = monitorProps.clientOffset;
    if (!offset) {
        return {};
    }
    var x = offset.x, y = offset.y;
    var transform = "translate(".concat(x, "px, ").concat(y, "px)");
    return {
        pointerEvents: "none",
        transform: transform,
    };
};
var DragLayer = function () {
    var context = useTreeContext();
    var monitorProps = useTreeDragLayer();
    var isDragging = monitorProps.isDragging, clientOffset = monitorProps.clientOffset;
    if (!isDragging || !clientOffset) {
        return null;
    }
    return (React.createElement("div", { style: rootStyle },
        React.createElement("div", { style: getItemStyles(monitorProps) }, context.dragPreviewRender && context.dragPreviewRender(monitorProps))));
};

function TreeInner(props, ref) {
    return (React.createElement(Providers, __assign({}, props, { treeRef: ref }),
        props.dragPreviewRender && React.createElement(DragLayer, null),
        React.createElement(Container, { parentId: props.rootId, depth: 0 })));
}
var Tree = forwardRef(TreeInner);

export { Container, DragLayer, ItemTypes, Node, Tree, compareItems, getBackendOptions, getDescendants, getDestIndex, getDropTarget, getModifiedIndex, getParents, getTreeItem, hasChildNodes, isAncestor, isDroppable, isNodeModel, mutateTree, mutateTreeWithIndex, useContainerClassName, useDragControl, useDragHandle, useDragNode, useDragOver, useDropNode, useDropRoot, useOpenIdsHelper, useTreeContext, useTreeDragLayer };
//# sourceMappingURL=index.js.map
