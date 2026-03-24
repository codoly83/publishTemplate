import { Button } from "@/components/ui";
import { useEffect, useRef, useState } from "react";
import { GuideBox } from "@/publish/guide/GuideBox";

const SHOW_THRESHOLD_PX = 180;

type ScrollTopMode = "threshold" | "upwardOnly";

function ScrollTopDemo({
  mode,
  footerSafe = false,
}: {
  mode: ScrollTopMode;
  footerSafe?: boolean;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const lastScrollTopRef = useRef(0);
  const [showTopButton, setShowTopButton] = useState(false);
  const [footerHeight, setFooterHeight] = useState(0);

  useEffect(() => {
    if (!footerSafe) return;
    const footerEl = footerRef.current;
    if (!footerEl) return;

    const updateFooterHeight = () => setFooterHeight(footerEl.offsetHeight);
    updateFooterHeight();

    const ro = new ResizeObserver(updateFooterHeight);
    ro.observe(footerEl);
    return () => ro.disconnect();
  }, [footerSafe]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const onScroll = () => {
      const currentTop = el.scrollTop;
      const hasPassedThreshold = currentTop > SHOW_THRESHOLD_PX;

      if (mode === "threshold") {
        setShowTopButton(hasPassedThreshold);
      } else {
        const isScrollingUp = currentTop < lastScrollTopRef.current - 1;
        const isScrollingDown = currentTop > lastScrollTopRef.current + 1;

        if (!hasPassedThreshold) setShowTopButton(false);
        else if (isScrollingUp) setShowTopButton(true);
        else if (isScrollingDown) setShowTopButton(false);
      }

      lastScrollTopRef.current = currentTop;
    };

    onScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [mode]);

  const handleScrollTop = () => {
    scrollerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative rounded-lg border border-line02 bg-base">
      <div
        ref={scrollerRef}
        className="max-h-[360px] overflow-y-auto p-4 pb-20 text-sm text-font-b/90"
      >
        {Array.from({ length: 36 }, (_, i) => (
          <p key={i} className="mb-3">
            스크롤 예시 콘텐츠 {i + 1} — 아래로 충분히 내려 버튼 노출을
            확인하세요.
          </p>
        ))}
      </div>

      {footerSafe ? (
        <div
          ref={footerRef}
          className="border-t border-line02 bg-surface px-4 py-3 text-xs text-font-g"
        >
          Footer 영역 (Top 버튼은 이 영역 아래로 내려가지 않음)
        </div>
      ) : null}

      {showTopButton ? (
        <Button
          type="button"
          size="sm"
          className="absolute right-3 bottom-3 shadow-md"
          style={footerSafe ? { bottom: footerHeight + 12 } : undefined}
          onClick={handleScrollTop}
        >
          Top
        </Button>
      ) : null}
    </div>
  );
}

function SampleScrollTopButtonPage() {
  return (
    <div className="guide-layout">
      <h1 className="guide-title">Scroll Top Button</h1>
      <div className="guide-content">
        <GuideBox
          title="기준 높이 이상에서 Top 버튼 노출"
          description="스크롤이 일정 픽셀 이상 내려가면 우측 하단 Top 버튼을 보여줍니다."
          code={`
const SHOW_THRESHOLD_PX = 180;
const [showTopButton, setShowTopButton] = useState(false);

const onScroll = () => {
  const currentTop = scroller.scrollTop;
  setShowTopButton(currentTop > SHOW_THRESHOLD_PX);
};
          `}
        >
          <ScrollTopDemo mode="threshold" />
        </GuideBox>

        <GuideBox
          title="위로 스크롤할 때만 Top 버튼 노출"
          description="아래로 내릴 때는 숨기고, 충분히 내려간 상태에서 위로 올릴 때만 Top 버튼을 보여줍니다."
          code={`
const onScroll = () => {
  const currentTop = scroller.scrollTop;
  const passed = currentTop > SHOW_THRESHOLD_PX;
  const isUp = currentTop < lastTop - 1;
  const isDown = currentTop > lastTop + 1;

  if (!passed) setShowTopButton(false);
  else if (isUp) setShowTopButton(true);
  else if (isDown) setShowTopButton(false);
};
          `}
        >
          <ScrollTopDemo mode="upwardOnly" />
        </GuideBox>

        <GuideBox
          title="Footer 존재 시 Footer 위까지만 고정"
          description="Footer가 있을 때 Top 버튼이 Footer 아래 영역으로 내려가지 않고 Footer 위에서만 고정되도록 처리합니다. (노출 조건은 기준 높이 이상)"
          code={`
const footerRef = useRef<HTMLDivElement>(null);
const [footerHeight, setFooterHeight] = useState(0);

useEffect(() => {
  const footerEl = footerRef.current;
  if (!footerEl) return;
  const update = () => setFooterHeight(footerEl.offsetHeight);
  update();
  const ro = new ResizeObserver(update);
  ro.observe(footerEl);
  return () => ro.disconnect();
}, []);

<Button
  className="absolute right-3"
  style={{ bottom: footerHeight + 12 }}
>
  Top
</Button>
          `}
        >
          <ScrollTopDemo mode="threshold" footerSafe />
        </GuideBox>
      </div>
    </div>
  );
}

export default SampleScrollTopButtonPage;
