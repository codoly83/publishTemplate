import { useLayoutEffect } from "react";
import { usePageLayoutBasicShell } from "@/components/layout/pageLayoutBasic/PageLayoutBasicShellContext";

/**
 * `PageLayoutBasic` 하위(Outlet 페이지)에서만 사용.
 * 해당 페이지가 보일 때 레이아웃 루트에 클래스를 붙이고, 라우트를 벗어나면 제거합니다.
 *
 * 루트는 `ref` 객체가 아니라 state로 올려 두어, 라우터 진입 직후 첫 페인트에서도
 * `rootEl`이 잡힌 뒤 effect가 다시 돌도록 한다(`rootRef.current`만 쓰면 한 번 null이면 영구 스킵될 수 있음).
 */
export function useLayoutClass(className: string) {
  const shell = usePageLayoutBasicShell();
  const rootEl = shell?.rootEl ?? null;

  useLayoutEffect(() => {
    const trimmed = className.trim();
    if (!trimmed || !rootEl) return;

    rootEl.classList.add(trimmed);
    return () => {
      rootEl.classList.remove(trimmed);
    };
  }, [className, rootEl]);
}
