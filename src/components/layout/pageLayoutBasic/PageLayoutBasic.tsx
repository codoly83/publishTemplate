import { cn } from "@/lib/utils";
import { useMemo, useState } from "react";
import { Outlet } from "react-router-dom";
import { PageLayoutFooter } from "./PageLayoutFooter";
import { PageLayoutHeader } from "./PageLayoutHeader";
import { PageLayoutBasicShellContext } from "./PageLayoutBasicShellContext";
import styles from "./PageLayoutBasic.module.scss";

type PageLayoutBasicProps = {
  className?: string;
};

/** 라우트 `children`의 페이지를 `<Outlet />`에 그리는 기본 페이지 레이아웃. */
function PageLayoutBasic({ className }: PageLayoutBasicProps) {
  const [rootEl, setRootEl] = useState<HTMLDivElement | null>(null);
  const shellValue = useMemo(() => ({ rootEl }), [rootEl]);

  return (
    <PageLayoutBasicShellContext.Provider value={shellValue}>
      <div ref={setRootEl} className={cn(styles.root, className)}>
        <PageLayoutHeader />
        <div className={cn(styles.viewport)}>
          <div className={cn(styles.contents)}>
            <Outlet />
          </div>
        </div>
        <PageLayoutFooter />
      </div>
    </PageLayoutBasicShellContext.Provider>
  );
}

export { PageLayoutBasic };
