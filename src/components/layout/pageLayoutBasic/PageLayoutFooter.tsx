import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { LAYOUT_BASIC_CLASS } from "./layoutBasicClass";
import styles from "./PageLayoutBasic.module.scss";

type PageLayoutFooterProps = {
  children?: ReactNode;
};

function PageLayoutFooter({ children = "footer" }: PageLayoutFooterProps) {
  return (
    <footer className={cn(styles.footer, `${LAYOUT_BASIC_CLASS}__footer`)}>
      {children}
    </footer>
  );
}

export { PageLayoutFooter };
