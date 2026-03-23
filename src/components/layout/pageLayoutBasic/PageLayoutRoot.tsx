import { Children, type ReactNode } from "react";
import styles from "./PageLayoutRoot.module.scss";

type PageLayoutRootProps = {
  children: ReactNode;
};

/**
 * 세로 1열 레이아웃. 첫 번째 자식은 상단 전체 너비(헤더),
 * 나머지는 그 아래 스크롤 영역에 들어갑니다.
 */
function PageLayoutRoot({ children }: PageLayoutRootProps) {
  const items = Children.toArray(children);
  const top = items[0];
  const scrollable = items.slice(1);

  return (
    <div className={styles.root}>
      {top}
      <div className={styles.viewport}>{scrollable}</div>
    </div>
  );
}

export { PageLayoutRoot };
