import { useState } from "react";
import { GripVertical } from "lucide-react";
import {
  SortableList,
  sortableListDragHandleClassName,
} from "@/components/ui";
import { GuideBox } from "./GuideBox";

type Task = { id: string; label: string };

const initialTasks: Task[] = [
  { id: "1", label: "디자인 시안 검토" },
  { id: "2", label: "API 연동" },
  { id: "3", label: "E2E 테스트" },
  { id: "4", label: "배포 체크리스트" },
];

function SampleSortableListPage() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  return (
    <div className="guide-layout">
      <h1 className="guide-title">SortableList</h1>
      <p className="text-muted-foreground mb-6 max-w-2xl text-sm">
        <code>@dnd-kit</code> 기반 목록입니다.{" "}
        <strong>그립 아이콘</strong>을 드래그해 순서를 바꿀 수 있으며, 모바일에서는
        짧게 누른 뒤 드래그하면 스크롤과 구분됩니다. 키보드 포커스 시 방향키로도
        이동할 수 있습니다.
      </p>

      <div className="guide-content">
        <GuideBox
          title="순서 변경 (드래그 핸들)"
          description="renderItem에서 dragHandleProps를 그립 버튼에 연결합니다."
          code={`
const [items, setItems] = useState<Task[]>([...]);

<SortableList
  items={items}
  onReorder={setItems}
  renderItem={({ item, dragHandleProps, isDragging }) => (
    <div className={cn("flex items-center gap-2 rounded border p-3", isDragging && "bg-muted")}>
      <button
        type="button"
        className={sortableListDragHandleClassName}
        {...dragHandleProps}
        aria-label="순서 변경"
      >
        <GripVertical size={18} />
      </button>
      <span>{item.label}</span>
    </div>
  )}
/>
          `}
        >
          <SortableList
            dndId="guide-sortable-tasks"
            items={tasks}
            onReorder={setTasks}
            renderItem={({ item, dragHandleProps, isDragging }) => (
              <div
                className={
                  "bg-card flex items-center gap-3 rounded-md border px-3 py-2.5 shadow-sm " +
                  (isDragging ? "ring-primary ring-2 ring-offset-2" : "")
                }
              >
                <button
                  type="button"
                  className={
                    sortableListDragHandleClassName +
                    " text-muted-foreground hover:text-foreground inline-flex shrink-0 rounded p-1"
                  }
                  {...dragHandleProps}
                  aria-label={`${item.label} 순서 변경`}
                >
                  <GripVertical size={18} aria-hidden />
                </button>
                <span className="text-sm font-medium">{item.label}</span>
              </div>
            )}
          />
        </GuideBox>

        <GuideBox
          title="현재 순서 (상태)"
          description="onReorder로 갱신된 배열입니다."
        >
          <ol className="text-muted-foreground list-decimal space-y-1 pl-5 text-sm">
            {tasks.map((t) => (
              <li key={t.id}>{t.label}</li>
            ))}
          </ol>
        </GuideBox>
      </div>
    </div>
  );
}

export default SampleSortableListPage;
