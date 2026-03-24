import { Button } from "@/components/ui";
import { useRemainingHeight } from "@/hooks/useRemainingHeight";
import {
  scrollElementIntoViewInContainer,
  useScrollSpy,
} from "@/hooks/useScrollSpy";
import { useMemo, useRef, useState } from "react";
import { GuideBox } from "@/publish/guide/GuideBox";
import { GuideQuickMenu } from "@/publish/guide/components";

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
  const contentRef = useRef<HTMLDivElement | null>(null);
  const sections = useMemo(
    () => [
      {
        id: "section-use-remaining-height-container",
        label: "컨테이너 기준",
      },
      {
        id: "section-use-remaining-height-viewport",
        label: "뷰포트 기준",
      },
    ],
    [],
  );
  const sectionIds = useMemo(
    () => sections.map((section) => section.id),
    [sections],
  );
  const activeSectionId = useScrollSpy(contentRef, sectionIds, {
    activeLineRatio: 0.22,
  });

  const scrollToSection = (id: string) => {
    const root = contentRef.current;
    if (!root) return;
    scrollElementIntoViewInContainer(root, id, {
      behavior: "smooth",
      offsetTop: 8,
    });
  };

  const scrollToTop = () => {
    contentRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="guide-layout">
      <h1 className="guide-title">useRemainingHeight</h1>
      <div
        ref={contentRef}
        className="guide-content relative"
        data-guide-quick-menu="off"
      >
        <section id="section-use-remaining-height-container">
          <HooksSampleRemainingHeightContainerPanel />
        </section>
        <section id="section-use-remaining-height-viewport">
          <HooksSampleRemainingHeightViewportPanel />
        </section>
      </div>
      <GuideQuickMenu
        sections={sections}
        activeSectionId={activeSectionId}
        onSelectSection={scrollToSection}
        onScrollTop={scrollToTop}
      />
    </div>
  );
}

export { SampleUseRemainingHeight };
export default SampleUseRemainingHeight;
