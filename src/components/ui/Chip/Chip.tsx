import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import * as React from "react";

import { cn } from "@/lib/utils";
import styles from "./Chip.module.css";

const chipVariants = cva(styles.chip, {
  variants: {
    variant: {
      tint: styles.variantTint,
      solid: styles.variantSolid,
      stateYes: styles.variantStateYes,
      stateNo: styles.variantStateNo,
      iconData: styles.variantIconData,
    },
    color: {
      blue: styles.colorBlue,
      green: styles.colorGreen,
      yellow: styles.colorYellow,
      red: styles.colorRed,
      purple: styles.colorPurple,
      gray: styles.colorGray,
    },
  },
  defaultVariants: {
    variant: "tint",
  },
});

type ChipProps = React.ComponentProps<"span"> &
  VariantProps<typeof chipVariants> & {
    asChild?: boolean;
    color?: string;
  };

function Chip({
  className,
  variant = "tint",
  asChild = false,
  color,
  ...props
}: ChipProps) {
  const Comp = asChild ? Slot.Root : "span";

  return (
    <Comp
      data-slot="chip"
      data-variant={variant}
      className={cn(chipVariants({ variant, color }), className)}
      {...props}
    />
  );
}

export { Chip };
