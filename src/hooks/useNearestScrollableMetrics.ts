import type { RefObject } from "react";
import { useEffect, useRef, useState } from "react";

export type NearestScrollableMetrics = {
  scrollTop: number;
  scrollLeft: number;
  scrollHeight: number;
  scrollWidth: number;
  clientHeight: number;
  clientWidth: number;
  maxScrollTop: number;
  maxScrollLeft: number;
  scrollYProgress: number;
  scrollXProgress: number;
};

function isElementScrollable(el: HTMLElement): boolean {
  const style = getComputedStyle(el);
  const oy = style.overflowY;
  const ox = style.overflowX;

  const yAllows =
    oy === "auto" || oy === "scroll" || oy === "overlay";
  const xAllows =
    ox === "auto" || ox === "scroll" || ox === "overlay";

  const vertical = yAllows && el.scrollHeight > el.clientHeight + 1;
  const horizontal = xAllows && el.scrollWidth > el.clientWidth + 1;

  return vertical || horizontal;
}

/**
 * `start`부터 부모 방향으로 올라가며, 스크롤 가능한 **가장 가까운** 요소를 찾습니다.
 * (시작 노드 자신이 스크롤 컨테이너면 그대로 반환)
 */
export function findNearestScrollableElement(
  start: HTMLElement | null,
): HTMLElement | null {
  if (!start) return null;

  let el: HTMLElement | null = start;
  while (el) {
    if (isElementScrollable(el)) return el;
    el = el.parentElement;
  }

  const root = document.scrollingElement;
  if (root instanceof HTMLElement && isElementScrollable(root)) {
    return root;
  }
  return null;
}

function readMetrics(el: HTMLElement): NearestScrollableMetrics {
  const {
    scrollTop,
    scrollLeft,
    scrollHeight,
    scrollWidth,
    clientHeight,
    clientWidth,
  } = el;
  const maxScrollTop = Math.max(0, scrollHeight - clientHeight);
  const maxScrollLeft = Math.max(0, scrollWidth - clientWidth);
  return {
    scrollTop,
    scrollLeft,
    scrollHeight,
    scrollWidth,
    clientHeight,
    clientWidth,
    maxScrollTop,
    maxScrollLeft,
    scrollYProgress: maxScrollTop > 0 ? scrollTop / maxScrollTop : 0,
    scrollXProgress: maxScrollLeft > 0 ? scrollLeft / maxScrollLeft : 0,
  };
}

export type UseNearestScrollableMetricsOptions = {
  observeResize?: boolean;
};

/**
 * `elementRef`가 가리키는 노드에서 시작해 **처음 만나는 스크롤 가능한 조상**의
 * scrollTop / scrollHeight / clientHeight 등 스크롤 속성을 구독해 반환합니다.
 */
export function useNearestScrollableMetrics(
  elementRef: RefObject<HTMLElement | null>,
  options?: UseNearestScrollableMetricsOptions,
): {
  scrollElement: HTMLElement | null;
  metrics: NearestScrollableMetrics | null;
} {
  const observeResize = options?.observeResize ?? true;
  const [scrollElement, setScrollElement] = useState<HTMLElement | null>(null);
  const [metrics, setMetrics] = useState<NearestScrollableMetrics | null>(null);
  const subscribedRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const start = elementRef.current;
    if (!start) return;

    const onScroll = (e: Event) => {
      const t = e.currentTarget as HTMLElement;
      setMetrics(readMetrics(t));
    };

    const attachScrollListener = () => {
      const next = findNearestScrollableElement(start);
      if (next === subscribedRef.current) {
        if (next) setMetrics(readMetrics(next));
        return;
      }
      subscribedRef.current?.removeEventListener("scroll", onScroll);
      subscribedRef.current = next ?? null;
      setScrollElement(subscribedRef.current);
      if (subscribedRef.current) {
        setMetrics(readMetrics(subscribedRef.current));
        subscribedRef.current.addEventListener("scroll", onScroll, {
          passive: true,
        });
      } else {
        setMetrics(null);
      }
    };

    let rafId = 0;
    const scheduleInitial = () => {
      rafId = requestAnimationFrame(() => {
        attachScrollListener();
      });
    };
    scheduleInitial();

    const onResize = () => attachScrollListener();
    window.addEventListener("resize", onResize, { passive: true });

    let ro: ResizeObserver | null = null;
    if (observeResize && typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(() => attachScrollListener());
      ro.observe(start);
    }

    return () => {
      cancelAnimationFrame(rafId);
      subscribedRef.current?.removeEventListener("scroll", onScroll);
      subscribedRef.current = null;
      window.removeEventListener("resize", onResize);
      ro?.disconnect();
    };
  }, [elementRef, observeResize]);

  return { scrollElement, metrics };
}
