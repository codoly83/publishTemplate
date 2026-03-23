import type { RefObject } from "react";
import { useCallback, useEffect, useState } from "react";

export type UseScrollSpyOptions = {
  /**
   * 스크롤 컨테이너 안에서 "활성 섹션"을 가르키는 기준선 (뷰포트 높이 비율, 0~1).
   * 값이 작을수록 상단에 붙은 섹션이 더 빨리 활성화됩니다.
   * @default 0.22
   */
  activeLineRatio?: number;
};

/**
 * 스크롤 컨테이너(`scrollRef`) 안에서 `id`가 붙은 섹션 중,
 * 기준선을 지나는 마지막 섹션 id를 반환합니다 (일반적인 문서형 ScrollSpy).
 */
export function useScrollSpy(
  scrollRef: RefObject<HTMLElement | null>,
  sectionIds: readonly string[],
  options?: UseScrollSpyOptions,
): string {
  const ratio = options?.activeLineRatio ?? 0.22;
  const [activeId, setActiveId] = useState(sectionIds[0] ?? "");

  const compute = useCallback(() => {
    const root = scrollRef.current;
    if (!root || sectionIds.length === 0) return;

    const rootRect = root.getBoundingClientRect();
    const marker = rootRect.top + root.clientHeight * ratio;

    let active = sectionIds[0];
    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      if (rect.top <= marker) active = id;
    }
    setActiveId(active);
  }, [scrollRef, sectionIds, ratio]);

  useEffect(() => {
    const root = scrollRef.current;
    if (!root) return;

    let rafId = 0;
    const scheduleInitial = () => {
      rafId = requestAnimationFrame(() => {
        compute();
      });
    };
    scheduleInitial();

    root.addEventListener("scroll", compute, { passive: true });
    const onWin = () => compute();
    window.addEventListener("resize", onWin, { passive: true });

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(() => compute());
      ro.observe(root);
    }

    return () => {
      cancelAnimationFrame(rafId);
      root.removeEventListener("scroll", compute);
      window.removeEventListener("resize", onWin);
      ro?.disconnect();
    };
  }, [compute, scrollRef]);

  return activeId;
}

export type ScrollIntoViewInContainerOptions = {
  behavior?: ScrollBehavior;
  /**
   * 컨테이너 상단 기준 추가 오프셋(px). sticky 탭·헤더 높이만큼 빼서
   * 섹션 제목이 가려지지 않게 할 때 사용합니다.
   * @default 0
   */
  offsetTop?: number;
};

/**
 * `scrollIntoView()` 대신 **지정한 스크롤 컨테이너만** `scrollTo` 합니다.
 * (브라우저 기본 `scrollIntoView`는 문서/부모 체인까지 스크롤해 레이아웃이 흔들릴 수 있음)
 */
export function scrollElementIntoViewInContainer(
  container: HTMLElement,
  elementId: string,
  options?: ScrollIntoViewInContainerOptions,
) {
  const el = document.getElementById(elementId);
  if (!el || !container.contains(el)) return;

  const offsetTop = options?.offsetTop ?? 0;
  const behavior = options?.behavior ?? "smooth";

  const nextScrollTop =
    el.getBoundingClientRect().top -
    container.getBoundingClientRect().top +
    container.scrollTop -
    offsetTop;

  container.scrollTo({
    top: Math.max(0, nextScrollTop),
    behavior,
  });
}
