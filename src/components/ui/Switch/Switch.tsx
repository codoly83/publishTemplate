import { Switch as SwitchPrimitive } from "radix-ui";
import * as React from "react";

import { cn } from "@/lib/utils";
import styles from "./Switch.module.css";

type SwitchProps = React.ComponentProps<typeof SwitchPrimitive.Root> & {
  offLabel?: React.ReactNode;
  onLabel?: React.ReactNode;
  size?: "sm" | "default";
};

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  SwitchProps
>(
  (
    { className, offLabel = "OFF", onLabel = "ON", size = "default", ...props },
    ref
  ) => {
    return (
      <SwitchPrimitive.Root
        ref={ref}
        data-slot="switch"
        data-size={size}
        className={cn(
          styles.switchRoot,
          size === "default"
            ? styles.switchRootSizeDefault
            : styles.switchRootSizeSm,
          className
        )}
        {...props}
      >
        <span aria-hidden="true" className={styles.switchLabel}>
          <span className={cn(styles.switchText, styles.switchTextOn)}>
            {onLabel}
          </span>
          <span className={cn(styles.switchText, styles.switchTextOff)}>
            {offLabel}
          </span>
        </span>
        <SwitchPrimitive.Thumb
          data-slot="switch-thumb"
          className={styles.switchThumb}
        />
      </SwitchPrimitive.Root>
    );
  }
);

Switch.displayName = "Switch";

export { Switch };
