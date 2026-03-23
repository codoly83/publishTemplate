import * as React from "react";
import {
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import clsx from "clsx";
import styles from "./SortableList.module.css";

export type SortableListItemId = string;

/** 최소 요구: 고유 id (SortableContext / useSortable 연동) */
export interface SortableListItemShape {
  id: SortableListItemId;
}

export interface SortableListRenderArgs<T extends SortableListItemShape> {
  item: T;
  index: number;
  /** 드래그 핸들(그립 등)에만 붙이세요. 전체 행에 붙이면 스크롤과 충돌할 수 있습니다. */
  dragHandleProps: React.HTMLAttributes<HTMLElement>;
  isDragging: boolean;
}

export interface SortableListProps<T extends SortableListItemShape> {
  items: T[];
  onReorder: (items: T[]) => void;
  renderItem: (args: SortableListRenderArgs<T>) => React.ReactNode;
  className?: string;
  /** DndContext id (한 페이지에 여러 리스트가 있을 때 구분) */
  dndId?: string;
}

function SortableRow<T extends SortableListItemShape>({
  item,
  index,
  renderItem,
}: {
  item: T;
  index: number;
  renderItem: SortableListProps<T>["renderItem"];
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const dragHandleProps = {
    ...attributes,
    ...listeners,
    ref: setActivatorNodeRef,
  } as React.HTMLAttributes<HTMLElement> & {
    ref: typeof setActivatorNodeRef;
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      className={clsx(styles.row, isDragging && styles.rowDragging)}
    >
      {renderItem({ item, index, dragHandleProps, isDragging })}
    </li>
  );
}

/**
 * 세로 목록에서 드래그 앤 드롭으로 순서를 바꿉니다.
 * - 마우스: `@dnd-kit` PointerSensor
 * - 터치(모바일): TouchSensor (짧은 딜레이 후 드래그 시작 → 스크롤과 구분)
 * - 키보드: 방향키로 이동 (접근성)
 */
export function SortableList<T extends SortableListItemShape>({
  items,
  onReorder,
  renderItem,
  className,
  dndId = "sortable-list",
}: SortableListProps<T>) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 200, tolerance: 5 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const ids = React.useMemo(() => items.map((i) => i.id), [items]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = ids.indexOf(String(active.id));
    const newIndex = ids.indexOf(String(over.id));
    if (oldIndex === -1 || newIndex === -1) return;

    onReorder(arrayMove(items, oldIndex, newIndex));
  };

  return (
    <DndContext
      id={dndId}
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={ids} strategy={verticalListSortingStrategy}>
        <ul className={clsx(styles.list, className)}>
          {items.map((item, index) => (
            <SortableRow
              key={item.id}
              item={item}
              index={index}
              renderItem={renderItem}
            />
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  );
}
