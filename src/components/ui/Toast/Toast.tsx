import * as React from "react";
import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react";
import { cva } from "class-variance-authority";
import { Toaster as SonnerToaster, type ToasterProps } from "sonner";
import "sonner/dist/styles.css";

import { useTheme } from "@/providers/theme-provider";
import { cn } from "@/lib/utils";
import styles from "./Toast.module.scss";

/** Tooltip 패턴과 동일하게 루트 클래스를 cva로 노출 (확장 시 variant 추가 가능) */
const toastRootVariants = cva(styles.toastRoot);

type ToastProps = ToasterProps;

const Toast = React.forwardRef<HTMLElement, ToastProps>(
  ({ className, ...props }, ref) => {
    const { theme } = useTheme();

    const sonnerTheme: ToasterProps["theme"] =
      theme === "dark" ? "dark" : "light";

    return (
      <SonnerToaster
        ref={ref}
        data-slot="toast"
        theme={sonnerTheme}
        className={cn(toastRootVariants(), "group", className)}
        icons={{
          success: <CircleCheckIcon className="size-4" />,
          info: <InfoIcon className="size-4" />,
          warning: <TriangleAlertIcon className="size-4" />,
          error: <OctagonXIcon className="size-4" />,
          loading: <Loader2Icon className="size-4 animate-spin" />,
        }}
        style={
          {
            "--normal-bg": "var(--bg-base)",
            "--normal-text": "var(--font-b)",
            "--normal-border": "var(--line02)",
            "--border-radius": "8px",
          } as React.CSSProperties
        }
        {...props}
      />
    );
  },
);

Toast.displayName = "Toast";

export { Toast };
export { toast } from "sonner";
export type { ToastProps };
export { toastRootVariants };
