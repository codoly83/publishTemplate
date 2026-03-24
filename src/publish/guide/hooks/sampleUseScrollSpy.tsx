import { Button } from "@/components/ui";
import {
  scrollElementIntoViewInContainer,
  useScrollSpy,
} from "@/hooks/useScrollSpy";
import { useRef } from "react";
import { GuideBox } from "@/publish/guide/GuideBox";

const INNER_SCROLL_SPY_IDS = [
  "hooks-spy-inner-a",
  "hooks-spy-inner-b",
  "hooks-spy-inner-c",
] as const;

function UseScrollSpyDemo() {
  const innerScrollRef = useRef<HTMLDivElement>(null);
  const activeId = useScrollSpy(innerScrollRef, INNER_SCROLL_SPY_IDS, {
    activeLineRatio: 0.25,
  });

  const handleMove = (id: (typeof INNER_SCROLL_SPY_IDS)[number]) => {
    const root = innerScrollRef.current;
    if (!root) return;
    scrollElementIntoViewInContainer(root, id, { offsetTop: 40 });
  };

  return (
    <div className="rounded-lg border border-line02 bg-base p-3">
      <div className="mb-3 flex flex-wrap gap-2">
        {INNER_SCROLL_SPY_IDS.map((id, index) => {
          const isActive = activeId === id;
          return (
            <Button
              key={id}
              type="button"
              size="sm"
              variant={isActive ? "default" : "outline"}
              onClick={() => handleMove(id)}
            >
              구역 {index + 1}
            </Button>
          );
        })}
      </div>

      <div
        ref={innerScrollRef}
        className="max-h-[260px] overflow-y-auto rounded-md border border-line p-3"
      >
        {INNER_SCROLL_SPY_IDS.map((id, index) => (
          <section
            key={id}
            id={id}
            className="scroll-mt-10 mb-10 rounded-md border border-line02 bg-container/40 p-4 last:mb-0"
          >
            <h3 className="mb-2 text-sm font-semibold text-font-b">
              스크롤 구역 {index + 1}
            </h3>
            {Array.from({ length: 7 }, (_, i) => (
              <p key={i} className="mb-2 text-sm text-font-g">
                useScrollSpy 데모 콘텐츠 {index + 1}-{i + 1}
              </p>
            ))}
          </section>
        ))}
      </div>

      <p className="mt-3 text-xs text-font-g">
        현재 활성 id:{" "}
        <code className="text-font-b">{activeId || "(none)"}</code>
      </p>
    </div>
  );
}

export function HooksSampleScrollSpyPanel() {
  return (
    <GuideBox
      title="useScrollSpy"
      description="지정한 스크롤 컨테이너 안에서 현재 활성 섹션 id를 계산합니다. 아래 예시는 버튼으로 구역 이동하고, 스크롤 위치에 따라 활성 버튼이 자동 변경됩니다."
      code={`
const containerRef = useRef<HTMLDivElement>(null);
const sectionIds = ["a", "b", "c"] as const;
const activeId = useScrollSpy(containerRef, sectionIds, {
  activeLineRatio: 0.25,
});

const move = (id: string) => {
  const root = containerRef.current;
  if (!root) return;
  scrollElementIntoViewInContainer(root, id, { offsetTop: 40 });
};
      `}
    >
      <UseScrollSpyDemo />
    </GuideBox>
  );
}

function SampleUseScrollSpy() {
  return (
    <div className="guide-layout">
      <h1 className="guide-title">useScrollSpy</h1>
      <div className="guide-content">
        <HooksSampleScrollSpyPanel />
      </div>
    </div>
  );
}

export { SampleUseScrollSpy };
export default SampleUseScrollSpy;
