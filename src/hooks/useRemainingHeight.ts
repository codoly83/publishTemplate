import { useCallback, useEffect, useState } from "react";

interface UseRemainingHeightOptions {
  /** contentWrapper의 gap 값(px). 기본값 16 (gap-4) */
  gap?: number;
  /**
   * true: 기준 높이를 100vh(window.innerHeight)로 계산
   *   → remainingHeight = 100vh - topRef.height - gap
   *   → containerRef 불필요 (JSX에 붙이지 않아도 됨)
   *
   * false(기본): 기준 높이를 containerRef 요소의 실제 높이로 계산
   *   → remainingHeight = containerHeight - topRef.height - gap
   */
  useViewport?: boolean;
}

/**
 * contentBoxTop 높이를 제외한 나머지 높이를 계산하는 훅.
 *
 * - ResizeObserver: 컨테이너·상단 요소의 크기 변화 감지
 * - MutationObserver: 클래스·스타일 속성 변화 등 DOM 변경 감지 후 재계산
 * - useViewport: true 시 window resize 이벤트도 구독
 *
 * useRef 대신 콜백 ref 패턴을 사용하므로 조건부 렌더링으로 요소가
 * 마운트·언마운트될 때도 effect가 정확히 재실행됩니다.
 *
 * @example container 기준
 * const { containerRef, topRef, remainingHeight } = useRemainingHeight({ gap: 16 });
 * <div ref={containerRef}>
 *   <div ref={topRef}>상단 영역</div>
 *   <div style={{ height: remainingHeight }}>메인 콘텐츠</div>
 * </div>
 *
 * @example viewport(100vh) 기준
 * const { topRef, remainingHeight } = useRemainingHeight({ gap: 16, useViewport: true });
 * <div ref={topRef}>상단 영역</div>
 * <div style={{ height: remainingHeight }}>메인 콘텐츠</div>
 */
function useRemainingHeight<
  C extends HTMLElement = HTMLDivElement,
  T extends HTMLElement = HTMLDivElement,
>(options: UseRemainingHeightOptions = {}) {
  const { gap = 16, useViewport = false } = options;

  const [containerEl, setContainerEl] = useState<C | null>(null);
  const [topEl, setTopEl] = useState<T | null>(null);
  const [remainingHeight, setRemainingHeight] = useState<number>(0);

  // 콜백 ref: 요소가 마운트/언마운트될 때 state를 갱신 → effect 재실행 트리거
  const containerRef = useCallback((el: C | null) => setContainerEl(el), []);
  const topRef = useCallback((el: T | null) => setTopEl(el), []);

  useEffect(() => {
    if (!topEl) return;
    if (!useViewport && !containerEl) return;

    const calculate = () => {
      const baseHeight = useViewport
        ? window.innerHeight
        : containerEl!.getBoundingClientRect().height;
      const topHeight = topEl.getBoundingClientRect().height;
      setRemainingHeight(Math.max(0, baseHeight - topHeight - gap));
    };

    calculate();

    const resizeObserver = new ResizeObserver(calculate);
    if (!useViewport && containerEl) resizeObserver.observe(containerEl);
    resizeObserver.observe(topEl);

    const mutationObserver = new MutationObserver(calculate);
    if (!useViewport && containerEl) {
      mutationObserver.observe(containerEl, {
        attributes: true,
        attributeFilter: ["class", "style"],
        childList: true,
        subtree: false,
      });
    }
    mutationObserver.observe(topEl, {
      attributes: true,
      attributeFilter: ["class", "style"],
    });

    if (useViewport) {
      window.addEventListener("resize", calculate);
    }

    return () => {
      resizeObserver.disconnect();
      mutationObserver.disconnect();
      if (useViewport) {
        window.removeEventListener("resize", calculate);
      }
    };
  }, [containerEl, topEl, gap, useViewport]);

  return { containerRef, topRef, remainingHeight };
}

export { useRemainingHeight };
export default useRemainingHeight;
