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

function SampleUseRemainingHeight() {
  return (
    <div className="guide-layout">
      <h1 className="guide-title">useRemainingHeight</h1>
      <div className="guide-content">
        <p className="text-sm text-font-g mb-4">
          컨테이너 기준과 뷰포트 기준 케이스를 함께 확인합니다.
        </p>
        <div className="mb-6">
          <p className="text-xs text-font-g mb-2">컨테이너 기준</p>
          <HooksSampleRemainingHeightContainerPanel />
        </div>
        <p className="text-xs text-font-g mb-2">뷰포트(100vh) 기준</p>
        <HooksSampleRemainingHeightViewportPanel />
      </div>
    </div>
  );
}

export { SampleUseRemainingHeight };
export default SampleUseRemainingHeight;
