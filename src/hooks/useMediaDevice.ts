import { useEffect, useMemo, useState, useSyncExternalStore } from "react";

/** 뷰포트 구간 (px). Tailwind `md`(768)·`lg`(1024)와 동일 계열 */
export const MEDIA_DEVICE_BREAKPOINTS = {
  tabletMin: 768,
  desktopMin: 1024,
} as const;

export type MediaDeviceBreakpoint = "mobile" | "tablet" | "desktop";

export interface UseMediaDeviceOptions {
  /** 기본 768 */
  tabletMin?: number;
  /** 기본 1024 */
  desktopMin?: number;
  /**
   * 특정 페이지·미리보기에서 실제 뷰포트와 무관하게 브레이크포인트만 고정합니다.
   * 지정 시 `width`는 해당 구간을 나타내는 대표 너비로, `height`는 실제 뷰포트 높이를 유지합니다.
   * 터치·포인터·호버 값은 실제 환경 그대로입니다.
   */
  forceBreakpoint?: MediaDeviceBreakpoint | null;
  /**
   * `<html>` 태그에 브레이크포인트 구분자 주입 여부.
   * 기본값은 true이며, `isMobile` / `isTablet` / `isDesktop` 클래스와
   * `data-media-device` 속성을 동기화합니다.
   */
  syncHtmlTag?: boolean;
}

export interface UseMediaDeviceResult {
  width: number;
  height: number;
  breakpoint: MediaDeviceBreakpoint;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  /** `maxTouchPoints > 0` 등 터치 입력 가능 여부 */
  hasTouch: boolean;
  /** `(pointer: coarse)` — 주로 손가락·스타일러스 등 */
  prefersCoarsePointer: boolean;
  /** `(hover: hover)` — 호버 가능 UI */
  canHover: boolean;
}

function resolveBreakpoint(
  width: number,
  tabletMin: number,
  desktopMin: number,
): MediaDeviceBreakpoint {
  if (width < tabletMin) return "mobile";
  if (width < desktopMin) return "tablet";
  return "desktop";
}

/** `forceBreakpoint`일 때 `width`와 구간이 일치하도록 대표 너비를 씁니다. */
function syntheticWidthForBreakpoint(
  b: MediaDeviceBreakpoint,
  tabletMin: number,
  desktopMin: number,
): number {
  switch (b) {
    case "mobile":
      return Math.max(0, tabletMin - 1);
    case "tablet":
      return Math.floor((tabletMin + desktopMin - 1) / 2);
    case "desktop":
      return desktopMin;
  }
}

/** `getSnapshot`은 값이 같을 때 동일 참조를 돌려줘야 무한 렌더가 나지 않습니다. */
const SERVER_VIEWPORT_SNAPSHOT = { width: 0, height: 0 };
let cachedViewportSnapshot = { width: 0, height: 0 };

function getViewportSnapshot() {
  if (typeof window === "undefined") {
    return SERVER_VIEWPORT_SNAPSHOT;
  }
  const width = window.innerWidth;
  const height = window.innerHeight;
  if (
    width === cachedViewportSnapshot.width &&
    height === cachedViewportSnapshot.height
  ) {
    return cachedViewportSnapshot;
  }
  cachedViewportSnapshot = { width, height };
  return cachedViewportSnapshot;
}

function getServerViewportSnapshot() {
  return SERVER_VIEWPORT_SNAPSHOT;
}

function subscribeViewport(onStoreChange: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("resize", onStoreChange);
  window.visualViewport?.addEventListener("resize", onStoreChange);
  window.addEventListener("orientationchange", onStoreChange);
  return () => {
    window.removeEventListener("resize", onStoreChange);
    window.visualViewport?.removeEventListener("resize", onStoreChange);
    window.removeEventListener("orientationchange", onStoreChange);
  };
}

function readPointerHover() {
  if (typeof window === "undefined") {
    return {
      prefersCoarsePointer: false,
      canHover: true,
      hasTouch: false,
    };
  }
  const prefersCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
  const canHover = window.matchMedia("(hover: hover)").matches;
  const hasTouch =
    "maxTouchPoints" in navigator && navigator.maxTouchPoints > 0;
  return { prefersCoarsePointer, canHover, hasTouch };
}

/**
 * 뷰포트 너비로 mobile / tablet / desktop을 구분하고, resize 시 값이 갱신됩니다.
 * 터치·포인터·호버는 미디어 특성 기준(접근 환경 힌트)으로 제공합니다.
 *
 * `forceBreakpoint`로 특정 화면에서만 브레이크포인트를 고정할 수 있습니다.
 */
export function useMediaDevice(
  options: UseMediaDeviceOptions = {},
): UseMediaDeviceResult {
  const tabletMin = options.tabletMin ?? MEDIA_DEVICE_BREAKPOINTS.tabletMin;
  const desktopMin = options.desktopMin ?? MEDIA_DEVICE_BREAKPOINTS.desktopMin;
  const forceBreakpoint = options.forceBreakpoint ?? null;
  const syncHtmlTag = options.syncHtmlTag ?? true;

  const size = useSyncExternalStore(
    subscribeViewport,
    getViewportSnapshot,
    getServerViewportSnapshot,
  );

  const [pointerState, setPointerState] = useState(readPointerHover);

  useEffect(() => {
    const mqCoarse = window.matchMedia("(pointer: coarse)");
    const mqHover = window.matchMedia("(hover: hover)");
    const onMediaChange = () => setPointerState(readPointerHover());

    mqCoarse.addEventListener("change", onMediaChange);
    mqHover.addEventListener("change", onMediaChange);

    return () => {
      mqCoarse.removeEventListener("change", onMediaChange);
      mqHover.removeEventListener("change", onMediaChange);
    };
  }, []);

  const breakpoint = useMemo(() => {
    if (forceBreakpoint) return forceBreakpoint;
    return resolveBreakpoint(size.width, tabletMin, desktopMin);
  }, [forceBreakpoint, size.width, tabletMin, desktopMin]);

  const width = useMemo(() => {
    if (forceBreakpoint) {
      return syntheticWidthForBreakpoint(
        forceBreakpoint,
        tabletMin,
        desktopMin,
      );
    }
    return size.width;
  }, [forceBreakpoint, size.width, tabletMin, desktopMin]);

  useEffect(() => {
    if (!syncHtmlTag || typeof document === "undefined") return;
    const root = document.documentElement;
    const classes = ["isMobile", "isTablet", "isDesktop"] as const;
    const isForced = forceBreakpoint !== null;
    const isLocked = root.getAttribute("data-media-device-locked") === "true";

    // 다른 인스턴스가 forceBreakpoint로 잠근 상태면 일반 동기화는 건너뜁니다.
    if (!isForced && isLocked) return;

    root.classList.remove(...classes);
    switch (breakpoint) {
      case "mobile":
        root.classList.add("isMobile");
        break;
      case "tablet":
        root.classList.add("isTablet");
        break;
      case "desktop":
        root.classList.add("isDesktop");
        break;
    }
    root.setAttribute("data-media-device", breakpoint);
    if (isForced) {
      root.setAttribute("data-media-device-locked", "true");
    }

    return () => {
      if (!isForced && root.getAttribute("data-media-device-locked") === "true") {
        return;
      }
      root.classList.remove(...classes);
      root.removeAttribute("data-media-device");
      if (isForced) {
        root.removeAttribute("data-media-device-locked");
      }
    };
  }, [breakpoint, syncHtmlTag, forceBreakpoint]);

  return {
    width,
    height: size.height,
    breakpoint,
    isMobile: breakpoint === "mobile",
    isTablet: breakpoint === "tablet",
    isDesktop: breakpoint === "desktop",
    hasTouch: pointerState.hasTouch,
    prefersCoarsePointer: pointerState.prefersCoarsePointer,
    canHover: pointerState.canHover,
  };
}
