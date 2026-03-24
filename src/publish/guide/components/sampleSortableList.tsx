import { useCallback, useState } from "react";
import { arrayMove } from "@dnd-kit/sortable";
import { ArrowDown, ArrowUp, GripVertical } from "lucide-react";
import {
  Button,
  SortableList,
  sortableListDragHandleClassName,
} from "@/components/ui";
import { GuideBox } from "@/publish/guide/GuideBox";

type Task = { id: string; label: string };

const initialTasks: Task[] = [
  { id: "1", label: "디자인 시안 검토" },
  { id: "2", label: "API 연동" },
  { id: "3", label: "E2E 테스트" },
  { id: "4", label: "배포 체크리스트" },
];

function SampleSortableListPage() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedIndex = selectedId
    ? tasks.findIndex((t) => t.id === selectedId)
    : -1;
  const canMoveUp = selectedIndex > 0;
  const canMoveDown = selectedIndex >= 0 && selectedIndex < tasks.length - 1;

  const moveSelectedUp = useCallback(() => {
    if (!selectedId) return;
    setTasks((prev) => {
      const idx = prev.findIndex((t) => t.id === selectedId);
      if (idx <= 0) return prev;
      return arrayMove(prev, idx, idx - 1);
    });
  }, [selectedId]);

  const moveSelectedDown = useCallback(() => {
    if (!selectedId) return;
    setTasks((prev) => {
      const idx = prev.findIndex((t) => t.id === selectedId);
      if (idx === -1 || idx >= prev.length - 1) return prev;
      return arrayMove(prev, idx, idx + 1);
    });
  }, [selectedId]);

  return (
    <div className="guide-layout">
      <h1 className="guide-title">SortableList</h1>

      <div className="guide-content">
        <p className="text-muted-foreground mb-6 max-w-2xl text-sm">
          <code>@dnd-kit</code> 기반 목록입니다. <strong>그립 아이콘</strong>을
          드래그해 순서를 바꿀 수 있으며, 모바일에서는 짧게 누른 뒤 드래그하면
          스크롤과 구분됩니다. 키보드 포커스 시 방향키로도 이동할 수 있습니다.
          항목 <strong>텍스트 영역</strong>을 클릭해 선택한 뒤, 목록 밖의{" "}
          <strong>위로 / 아래로</strong> 버튼으로도 순서를 바꿀 수 있습니다.
        </p>
        <GuideBox
          title="순서 변경 (드래그 핸들 + 선택 후 버튼 이동)"
          description="dragHandleProps는 그립에만 연결하고, 라벨은 클릭 시 selectedId를 설정합니다. 외부 버튼에서 arrayMove로 onReorder와 동일하게 배열을 갱신합니다."
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
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="text-muted-foreground text-xs">
              선택된 항목 이동
            </span>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={moveSelectedUp}
              disabled={!canMoveUp}
              aria-label="선택 항목 위로 이동"
            >
              <ArrowUp size={16} aria-hidden className="shrink-0" />
              <span>위로</span>
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={moveSelectedDown}
              disabled={!canMoveDown}
              aria-label="선택 항목 아래로 이동"
            >
              <ArrowDown size={16} aria-hidden className="shrink-0" />
              <span>아래로</span>
            </Button>
          </div>
          <SortableList
            dndId="guide-sortable-tasks"
            items={tasks}
            onReorder={setTasks}
            renderItem={({ item, dragHandleProps, isDragging }) => {
              const isSelected = selectedId === item.id;
              return (
                <div
                  className={
                    "bg-card flex items-center gap-3 rounded-md border px-3 py-2.5 shadow-sm " +
                    (isDragging ? "ring-primary ring-2 ring-offset-2 " : "") +
                    (isSelected && !isDragging
                      ? "bg-muted/60 ring-primary ring-2 ring-offset-2 "
                      : "")
                  }
                  aria-selected={isSelected}
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
                  <button
                    type="button"
                    className="hover:bg-muted/80 flex items-center min-h-9 min-w-0 flex-1 rounded px-1 py-0.5 text-left text-sm font-medium"
                    onClick={() => setSelectedId(item.id)}
                    aria-pressed={isSelected}
                    aria-label={`${item.label} 선택`}
                  >
                    {item.label}
                  </button>
                </div>
              );
            }}
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
