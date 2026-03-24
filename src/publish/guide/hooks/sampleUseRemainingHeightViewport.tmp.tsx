import { useRemainingHeight } from "@/hooks/useRemainingHeight";
import { GuideBox } from "@/publish/guide/GuideBox";

export function HooksSampleRemainingHeightViewportPanel() {
  const { topRef: viewportTopRef, remainingHeight: viewportRemainingHeight } =
    useRemainingHeight({ gap: 24, useViewport: true });

  return (
    <GuideBox
      title="useRemainingHeight — 뷰포트(100vh) 기준"
      description="useViewport: true이면 기준 높이가 window.innerHeight입니다. 레이아웃 샘플의 상하 분할·메인 영역 높이에 쓰인 패턴과 동일합니다."
      code={`
import { useRemainingHeight } from "@/hooks/useRemainingHeight";

const {
  topRef: viewportTopRef,
  remainingHeight: viewportRemainingHeight,
} = useRemainingHeight({ gap: 24, useViewport: true });

<div className="rounded-lg border border-line overflow-hidden flex flex-col bg-base">
  <div
    ref={viewportTopRef}
    className="shrink-0 border-b border-line px-3 py-3 text-sm text-font-b bg-surface"
  >
    뷰포트 기준 상단 (remainingHeight: {Math.round(viewportRemainingHeight)}px)
  </div>
  <div
    className="min-h-0 overflow-auto p-3 text-sm text-font-g"
    style={{ height: viewportRemainingHeight }}
  >
    {/* 메인 스크롤 영역 */}
  </div>
</div>
      `}
    >
      <div className="rounded-lg border border-line overflow-hidden flex flex-col bg-base">
        <div
          ref={viewportTopRef}
          className="shrink-0 border-b border-line px-3 py-3 text-sm text-font-b bg-surface"
        >
          뷰포트 기준 상단 (remainingHeight:{" "}
          {Math.round(viewportRemainingHeight)}px)
        </div>
        <div
          className="min-h-0 overflow-auto p-3 text-sm text-font-g"
          style={{ height: viewportRemainingHeight }}
        >
          {Array.from({ length: 30 }, (_, i) => (
            <p key={i} className="mb-2">
              창 높이에 맞춰 본문 영역 높이가 잡힙니다. {i + 1}
            </p>
          ))}
        </div>
      </div>
    </GuideBox>
  );
}
