import { useLayoutEffect } from "react";

export interface UseHtmlRootClassOptions {
  /** false이면 클래스를 붙이지 않습니다 */
  enabled?: boolean;
}

/**
 * `document.documentElement`(`<html>`)에 클래스를 붙였다가,
 * 언마운트·`enabled`가 false일 때 제거합니다.
 */
function useHtmlRootClass(
  className: string,
  options: UseHtmlRootClassOptions = {},
) {
  const { enabled = true } = options;
  const trimmed = className.trim();

  useLayoutEffect(() => {
    if (!trimmed || !enabled) return;

    const root = document.documentElement;
    root.classList.add(trimmed);
    return () => {
      root.classList.remove(trimmed);
    };
  }, [trimmed, enabled]);
}

export { useHtmlRootClass };
export default useHtmlRootClass;
