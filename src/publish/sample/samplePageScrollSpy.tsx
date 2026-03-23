import { useRef } from "react";
import clsx from "clsx";
import {
  Tabs,
  TabsList,
  TabsScrollSpyPanel,
  TabsTrigger,
} from "@/components/ui";
import { scrollElementIntoViewInContainer } from "@/hooks/useScrollSpy";
import { GuideBox } from "./GuideBox";

const SECTIONS = [
  {
    id: "pps-intro",
    label: "소개",
    title: "페이지 스크롤 네비란?",
    body: "긴 단일 페이지에서 섹션별로 이동할 때, 스크롤 위치에 맞춰 메뉴 항목이 활성화되고(ScrollSpy), 메뉴를 누르면 해당 영역으로 부드럽게 스크롤됩니다. 오른쪽 영역 전체가 스크롤 컨테이너이며, 상단 메뉴는 sticky로 고정됩니다.",
  },
  {
    id: "pps-behavior",
    label: "동작 방식",
    title: "활성 메뉴는 어떻게 정해지나요?",
    body: "스크롤 컨테이너의 뷰포트 안에서 기준선(대략 상단 쪽)을 기준으로, 그 선을 지나는 마지막 섹션 id를 활성으로 둡니다. 리사이즈 시에도 다시 계산합니다.",
  },
  {
    id: "pps-accessibility",
    label: "접근성",
    title: "키보드·스크린리더",
    body: '메뉴는 button으로 두어 Enter/Space로 이동할 수 있게 했습니다. 실제 서비스에서는 aria-current="location" 등으로 현재 구역을 보조 기술에 알려 주면 좋습니다.',
  },
  {
    id: "pps-extend",
    label: "확장",
    title: "URL 해시·히스토리",
    body: "필요하면 클릭 시 location.hash를 갱신하거나, IntersectionObserver 기반으로 로직을 바꿀 수 있습니다. 이 샘플은 구현을 단순하게 유지하기 위해 스크롤 이벤트 + 기준선 방식을 사용합니다.",
  },
] as const;

const SECTION_IDS = SECTIONS.map((s) => s.id);

const SECTION_SCROLL_MARGIN = "scroll-mt-[5.5rem]";
/** sticky 탭 높이에 맞춘 scrollTo 오프셋 (scroll-mt와 동일 계열) */
const SCROLL_SPY_STICKY_OFFSET_PX = 88;

function SamplePageScrollSpy() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const handleJumpToSection = (id: string) => {
    const root = scrollRef.current;
    if (!root) return;

    scrollElementIntoViewInContainer(root, id, {
      offsetTop: SCROLL_SPY_STICKY_OFFSET_PX,
    });
  };

  return (
    <div className="guide-layout">
      <h1 className="guide-title">페이지 스크롤 네비 (ScrollSpy)</h1>

      <div ref={scrollRef} className="guide-content">
        <GuideBox
          title="일반 버튼으로 특정 id 이동"
          description="TabsTrigger가 아니어도 같은 컨테이너 기준으로 원하는 섹션 id로 이동할 수 있습니다."
          code={`
const scrollRef = useRef<HTMLDivElement>(null);

const handleJumpToSection = (id: string) => {
  const root = scrollRef.current;
  if (!root) return;
  scrollElementIntoViewInContainer(root, id, {
    offsetTop: 88,
  });
};

<div className="flex flex-wrap gap-2">
  {SECTIONS.map((s) => (
    <button
      key={s.id}
      type="button"
      onClick={() => handleJumpToSection(s.id)}
    >
      {s.label}으로 이동
    </button>
  ))}
</div>
            `}
        >
          <div className="rounded-lg border border-line02 bg-container/50 p-3">
            <div className="flex flex-wrap gap-2">
              {SECTIONS.map((s) => (
                <button
                  key={`jump-${s.id}`}
                  type="button"
                  className="rounded-md border border-line02 bg-base px-2.5 py-1 text-xs text-font-b hover:bg-line01"
                  onClick={() => handleJumpToSection(s.id)}
                >
                  {s.label}으로 이동
                </button>
              ))}
            </div>
          </div>
        </GuideBox>
        <Tabs
          scrollSpy={{
            scrollContainerRef: scrollRef,
            sectionIds: SECTION_IDS,
            scrollOffsetPx: SCROLL_SPY_STICKY_OFFSET_PX,
            activeLineRatio: 0.2,
          }}
          variant="default"
          size="sm"
        >
          <TabsList className="sticky top-0 bg-base mb-4 pt-2">
            {SECTIONS.map((s) => (
              <TabsTrigger key={s.id} value={s.id}>
                <span>{s.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {SECTIONS.map((s, i) => (
            <TabsScrollSpyPanel
              key={s.id}
              value={s.id}
              panelId={s.id}
              className={clsx(
                SECTION_SCROLL_MARGIN,
                "rounded-xl border border-line02 bg-container/40 p-6",
                i < SECTIONS.length - 1 ? "mb-16" : "pb-24",
              )}
              aria-labelledby={`${s.id}-heading`}
            >
              <h2
                id={`${s.id}-heading`}
                className="text-font-b mb-3 text-lg font-bold"
              >
                {s.title}
              </h2>
              <p className="text-font-b/90 leading-relaxed">{s.body}</p>
              <div className="bg-line01/60 mt-6 h-40 rounded-lg" aria-hidden />
            </TabsScrollSpyPanel>
          ))}
        </Tabs>
      </div>
    </div>
  );
}

export default SamplePageScrollSpy;
