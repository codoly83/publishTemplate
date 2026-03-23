import * as React from "react";

import { cn } from "@/lib/utils";

import styles from "./Loading.module.css";

type SpinnerSize = "sm" | "md" | "lg";

type LoadingIndicatorProps = {
  label?: string;
  size?: SpinnerSize;
  className?: string;
};

function LoadingIndicator({
  label = "로딩 중",
  size = "md",
  className,
}: LoadingIndicatorProps) {
  return (
    <div className={cn(styles.indicator, className)}>
      <span className={cn(styles.spinner, styles[`spinner-${size}`])} />
      <span className={styles.label}>{label}</span>
    </div>
  );
}

type LoadingProps = React.ComponentProps<"div"> & {
  loading?: boolean;
  fullscreen?: boolean;
  label?: string;
  size?: SpinnerSize;
  overlayClassName?: string;
};

function Loading({
  loading = false,
  fullscreen = true,
  label,
  size = "md",
  className,
  overlayClassName,
  children,
  ...props
}: LoadingProps) {
  if (fullscreen) {
    if (!loading) return null;

    return (
      <div
        data-slot="loading-screen"
        role="status"
        aria-live="polite"
        aria-busy="true"
        className={cn(styles.screenOverlay, className)}
        {...props}
      >
        <LoadingIndicator label={label} size={size} />
      </div>
    );
  }

  return (
    <div
      data-slot="loading-area"
      className={cn(styles.areaRoot, className)}
      aria-busy={loading}
      {...props}
    >
      {children}
      {loading ? (
        <div
          className={cn(styles.areaOverlay, overlayClassName)}
          role="status"
          aria-live="polite"
        >
          <LoadingIndicator label={label} size={size} />
        </div>
      ) : null}
    </div>
  );
}

export { Loading, LoadingIndicator };
export type { LoadingIndicatorProps, LoadingProps };
