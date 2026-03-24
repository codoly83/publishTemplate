import { Button } from "@/components/ui";
import { useRemainingHeight } from "@/hooks/useRemainingHeight";
import { useState } from "react";
import { GuideBox } from "@/publish/guide/GuideBox";

export function HooksSampleRemainingHeightContainerPanel() {
  const [tallHeader, setTallHeader] = useState(false);

  const {
    containerRef: remainingContainerRef,
    topRef: remainingTopRef,
    remainingHeight,
  } = useRemainingHeight({ gap: 16 });

  return (
    <GuideBox
      title="useRemainingHeight — 컨테이너 기준"
      description="부모 박스 높이에서 상단 영역과 gap을 뺀 나머지를 px로 돌려줍니다. 상단 높이를 바꿔도 ResizeObserver로 다시 계산됩니다."
      code={`
import { useState } from "react";
import { useRemainingHeight } from "@/hooks/useRemainingHeight";

const [tallHeader, setTallHeader] = useState(false);

const {
  containerRef: remainingContainerRef,
  topRef: remainingTopRef,
  remainingHeight,
} = useRemainingHeight({ gap: 16 });

<button type="button" onClick={() => setTallHeader((v) => !v)}>
  상단 영역 높이 토글
</button>
<div
  ref={remainingContainerRef}
  className="rounded-lg border border-line overflow-hidden flex flex-col bg-base"
  style={{ height: 320 }}
>
  <div
    ref={remainingTopRef}
    className="shrink-0 border-b border-line px-3 flex items-center text-sm text-font-b bg-surface"
    style={{ height: tallHeader ? 72 : 40 }}
  >
    상단 (remainingHeight: {Math.round(remainingHeight)}px)
  </div>
  <div
    className="min-h-0 overflow-auto p-3 text-sm text-font-g"
    style={{ height: remainingHeight }}
  >
    {/* 스크롤 본문 */}
  </div>
</div>
      `}
    >
      <div className="flex flex-col gap-4">
        <Button
          variant="outline"
          size="sm"
          type="button"
          onClick={() => setTallHeader((v) => !v)}
        >
          상단 영역 높이 토글
        </Button>
        <div
          ref={remainingContainerRef}
          className="rounded-lg border border-line overflow-hidden flex flex-col bg-base"
          style={{ height: 320 }}
        >
          <div
            ref={remainingTopRef}
            className="shrink-0 border-b border-line px-3 flex items-center text-sm text-font-b bg-surface"
            style={{ height: tallHeader ? 72 : 40 }}
          >
            상단 (remainingHeight: {Math.round(remainingHeight)}px)
          </div>
          <div
            className="min-h-0 overflow-auto p-3 text-sm text-font-g"
            style={{ height: remainingHeight }}
          >
            {Array.from({ length: 40 }, (_, i) => (
              <p key={i} className="mb-2">
                스크롤 테스트 줄 {i + 1}
              </p>
            ))}
          </div>
        </div>
      </div>
    </GuideBox>
  );
}
