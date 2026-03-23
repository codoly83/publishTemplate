import type * as React from "react";

/** 스크롤 컨테이너 안에서 탭 트리거 + 패널 전체를 쌓고, 스크롤 위치로 활성 탭을 맞출 때 사용 */
export type TabsScrollSpyConfig = {
  scrollContainerRef: React.RefObject<HTMLElement | null>;
  sectionIds: readonly string[];
  /** @default useScrollSpy 기본값과 동일 */
  activeLineRatio?: number;
  /** sticky 탭 등으로 scrollTo 시 위에서 뺄 픽셀 */
  scrollOffsetPx?: number;
};

export type TabsScrollSpyPanelProps = React.ComponentPropsWithoutRef<"div"> & {
  value: string;
  /** 스크롤 앵커·getElementBy용 DOM id. 생략 시 `value` */
  panelId?: string;
};
