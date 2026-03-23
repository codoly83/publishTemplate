import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { LAYOUT_BASIC_CLASS } from "./layoutBasicClass";
import styles from "./PageLayoutBasic.module.scss";

type PageLayoutHeaderProps = {
  children?: ReactNode;
};

function PageLayoutHeader({ children = "header" }: PageLayoutHeaderProps) {
  return (
    <header className={cn(styles.header, `${LAYOUT_BASIC_CLASS}__header`)}>
      <div className={cn(styles.inner, `${LAYOUT_BASIC_CLASS}__header-inner`)}>
        {children}
      </div>
    </header>
  );
}

export { PageLayoutHeader };
