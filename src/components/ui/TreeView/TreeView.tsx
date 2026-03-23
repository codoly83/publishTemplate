import { DndProvider } from "react-dnd";
import {
  MultiBackend,
  getBackendOptions,
  Tree,
  type NodeModel,
} from "@minoru/react-dnd-treeview";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { ReactElement, ReactNode, RefObject } from "react";
import "./TreeView.scss";

export type TreeViewNodeId = string | number;

export type TreeViewNode = {
  id: TreeViewNodeId;
  parent: TreeViewNodeId;
  droppable?: boolean;
  text: string;
  [key: string]: unknown;
};

export type TreeViewRenderContext = {
  depth: number;
  isOpen: boolean;
  onToggle: () => void;
  draggable: boolean;
  isDragging: boolean;
  isDropTarget: boolean;
  handleRef: RefObject<HTMLDivElement | null>;
  isChecked: boolean;
  onCheckToggle: () => void;
};

export type TreeViewProps = {
  treeData: TreeViewNode[];
  rootId?: TreeViewNodeId;
  onTreeDataChange?: (nextTreeData: TreeViewNode[]) => void;
  /**
   * 기본값은 드래그 재정렬 비활성입니다.
   * true일 때 사용자가 노드를 드래그로 이동할 수 있습니다.
   */
  dragEnabled?: boolean;
  /** true면 Tree 내부에서 DndProvider를 생성합니다. (기본) */
  withDndProvider?: boolean;
  /** 드래그 중 이동 위치를 placeholder로 미리 표시합니다. */
  enablePlaceholder?: boolean;
  /** placeholder/드롭 오프셋(px) */
  dropTargetOffsetPx?: number;
  /** 체크 상태(제어형) */
  checkedIds?: TreeViewNodeId[];
  /** 체크 상태(비제어형 초기값) */
  defaultCheckedIds?: TreeViewNodeId[];
  /** 체크 상태 변경 콜백 */
  onCheckedIdsChange?: (nextCheckedIds: TreeViewNodeId[]) => void;
  /** 부모-자식 체크 연동 */
  checkCascade?: boolean;
  indentPerDepthPx?: number;
  className?: string;
  renderNode?: (node: TreeViewNode, ctx: TreeViewRenderContext) => ReactNode;
};

function TreeView({
  treeData,
  rootId = 0,
  onTreeDataChange,
  dragEnabled = false,
  withDndProvider = true,
  checkedIds,
  defaultCheckedIds = [],
  onCheckedIdsChange,
  checkCascade = false,
  indentPerDepthPx = 10,
  className,
  renderNode,
}: TreeViewProps) {
  const isControlled = typeof onTreeDataChange === "function";
  const [uncontrolledTree, setUncontrolledTree] = useState<TreeViewNode[]>(
    () => [...treeData],
  );
  const isCheckedControlled = checkedIds !== undefined;
  const [uncontrolledCheckedIds, setUncontrolledCheckedIds] = useState<
    TreeViewNodeId[]
  >(() => [...defaultCheckedIds]);
  const handleDrop = (newTree: NodeModel[]) => {
    onTreeDataChange?.(newTree as TreeViewNode[]);
  };

  // Controlled 모드가 아니면 props 변경 시 내부 트리도 동기화합니다.
  useEffect(() => {
    if (!isControlled) setUncontrolledTree([...treeData]);
  }, [treeData, isControlled]);

  const renderedTree = isControlled ? treeData : uncontrolledTree;
  const resolvedCheckedIds = isCheckedControlled
    ? checkedIds
    : uncontrolledCheckedIds;
  const checkedSet = useMemo(
    () => new Set<TreeViewNodeId>(resolvedCheckedIds ?? []),
    [resolvedCheckedIds],
  );

  const nodeById = useMemo(
    () => new Map(renderedTree.map((n) => [n.id, n] as const)),
    [renderedTree],
  );

  const childrenByParent = useMemo(() => {
    const map = new Map<TreeViewNodeId, TreeViewNode[]>();
    for (const n of renderedTree) {
      const arr = map.get(n.parent) ?? [];
      arr.push(n);
      map.set(n.parent, arr);
    }
    return map;
  }, [renderedTree]);

  const emitCheckedChange = useCallback(
    (next: Set<TreeViewNodeId>) => {
      const nextArr = Array.from(next);
      if (!isCheckedControlled) setUncontrolledCheckedIds(nextArr);
      onCheckedIdsChange?.(nextArr);
    },
    [isCheckedControlled, onCheckedIdsChange],
  );

  const handleCheckToggle = useCallback(
    (id: TreeViewNodeId) => {
      const next = new Set<TreeViewNodeId>(checkedSet);
      const isChecked = next.has(id);

      if (!checkCascade) {
        if (isChecked) next.delete(id);
        else next.add(id);
        emitCheckedChange(next);
        return;
      }

      const collectDescendants = (startId: TreeViewNodeId) => {
        const ids: TreeViewNodeId[] = [];
        const stack: TreeViewNodeId[] = [startId];
        while (stack.length) {
          const current = stack.pop()!;
          const children = childrenByParent.get(current) ?? [];
          for (const child of children) {
            ids.push(child.id);
            stack.push(child.id);
          }
        }
        return ids;
      };

      const getParentId = (nodeId: TreeViewNodeId): TreeViewNodeId | null => {
        const node = nodeById.get(nodeId);
        if (!node) return null;
        if (node.parent === rootId) return null;
        return node.parent;
      };

      const descendants = collectDescendants(id);

      if (isChecked) {
        next.delete(id);
        descendants.forEach((childId) => next.delete(childId));

        let parentId = getParentId(id);
        while (parentId != null) {
          next.delete(parentId);
          parentId = getParentId(parentId);
        }
      } else {
        next.add(id);
        descendants.forEach((childId) => next.add(childId));

        let parentId = getParentId(id);
        while (parentId != null) {
          const siblings = childrenByParent.get(parentId) ?? [];
          const allChecked = siblings.every((s) => next.has(s.id));
          if (!allChecked) break;
          next.add(parentId);
          parentId = getParentId(parentId);
        }
      }

      emitCheckedChange(next);
    },
    [
      checkedSet,
      checkCascade,
      emitCheckedChange,
      childrenByParent,
      nodeById,
      rootId,
    ],
  );

  const tree = (
    <Tree
      tree={renderedTree as any}
      rootId={rootId as any}
      canDrag={dragEnabled ? undefined : () => false}
      onDrop={handleDrop}
      render={(node: any, ctx: any): ReactElement => {
        const typedCtx: TreeViewRenderContext = {
          depth: ctx.depth,
          isOpen: ctx.isOpen,
          onToggle: ctx.onToggle,
          draggable: ctx.draggable,
          isDragging: ctx.isDragging,
          isDropTarget: ctx.isDropTarget,
          handleRef: ctx.handleRef,
          isChecked: checkedSet.has(node.id),
          onCheckToggle: () => handleCheckToggle(node.id),
        };

        // 드래그 상태 전환 중 node lookup이 실패할 수 있으니 방어합니다.
        if (!node) return <div />;

        const custom = renderNode?.(node as TreeViewNode, typedCtx);
        if (custom !== undefined && custom !== null) {
          // 라이브러리는 ReactElement를 기대하므로 ReactNode를 Fragment로 감쌉니다.
          return <>{custom}</>;
        }

        return (
          <div style={{ marginLeft: typedCtx.depth * indentPerDepthPx }}>
            {node.droppable ? (
              <span onClick={typedCtx.onToggle} style={{ cursor: "pointer" }}>
                {typedCtx.isOpen ? "[-]" : "[+]"}{" "}
              </span>
            ) : null}
            {node.text}
          </div>
        );
      }}
    />
  );

  return (
    <div className={`treeView ${className}`}>
      {withDndProvider ? (
        <DndProvider backend={MultiBackend} options={getBackendOptions()}>
          {tree}
        </DndProvider>
      ) : (
        tree
      )}
    </div>
  );
}

export { TreeView };
export default TreeView;
