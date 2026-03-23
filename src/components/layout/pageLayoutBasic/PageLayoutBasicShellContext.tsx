import { createContext, useContext } from "react";

/** `ref` 콜백으로 올린 루트 DOM. 자식 effect가 `rootRef.current` 타이밍 이슈 없이 구독한다. */
export type PageLayoutBasicShellContextValue = {
  rootEl: HTMLDivElement | null;
};

export const PageLayoutBasicShellContext =
  createContext<PageLayoutBasicShellContextValue | null>(null);

export function usePageLayoutBasicShell() {
  return useContext(PageLayoutBasicShellContext);
}
