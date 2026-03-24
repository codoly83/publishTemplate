import { useLayoutClass } from "@/hooks/useLayoutClass";
import type { ReactNode } from "react";
import { HooksSampleHtmlRootTagPanel } from "./hooksSampleHtmlRootTag";
import { HooksSampleLayoutClassPanel } from "./hooksSampleLayoutClass";
import { HooksSampleMediaDevicePanel } from "./hooksSampleMediaDevice";
import { HooksSampleNearestScrollableMetricsPanel } from "./hooksSampleNearestScrollableMetrics";
import { HooksSampleRemainingHeightContainerPanel } from "./hooksSampleRemainingHeightContainer";
import { HooksSampleRemainingHeightViewportPanel } from "./hooksSampleRemainingHeightViewport";
import { HooksSampleScrollSpyPanel } from "./hooksSampleScrollSpy";

function guideShell(title: string, subtitle: string | null, children: ReactNode) {
  return (
    <div className="guide-layout">
      <h1 className="guide-title">{title}</h1>
      {subtitle ? (
        <p className="text-sm text-font-g mb-4 -mt-1">{subtitle}</p>
      ) : null}
      <div className="guide-content">{children}</div>
    </div>
  );
}

/** useRemainingHeight — 컨테이너 기준 */
export function HooksPageUseRemainingHeightContainer() {
  return guideShell(
    "useRemainingHeight",
    "컨테이너 기준 (gap·상단 영역 제외)",
    <HooksSampleRemainingHeightContainerPanel />,
  );
}

/** useRemainingHeight — 뷰포트 기준 */
export function HooksPageUseRemainingHeightViewport() {
  return guideShell(
    "useRemainingHeight",
    "뷰포트(100vh) 기준",
    <HooksSampleRemainingHeightViewportPanel />,
  );
}

export function HooksPageUseNearestScrollableMetrics() {
  return guideShell(
    "useNearestScrollableMetrics",
    null,
    <HooksSampleNearestScrollableMetricsPanel />,
  );
}

export function HooksPageUseScrollSpy() {
  return guideShell("useScrollSpy", null, <HooksSampleScrollSpyPanel />);
}

export function HooksPageUseMediaDevice() {
  return guideShell("useMediaDevice", null, <HooksSampleMediaDevicePanel />);
}

export function HooksPageUseHtmlRootHtmlTag() {
  return guideShell(
    "useHtmlRootClass / useHtmlTag",
    null,
    <HooksSampleHtmlRootTagPanel />,
  );
}

export function HooksPageUseLayoutClass() {
  useLayoutClass("sample-hooks-layout-class-noop");
  return guideShell("useLayoutClass", null, <HooksSampleLayoutClassPanel />);
}
