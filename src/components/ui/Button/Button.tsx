import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import styles from "./Button.module.css";

const buttonVariants = cva(styles.button, {
  variants: {
    variant: {
      default: styles.variantDefault,
      // destructive: styles.variantDestructive,
      outline: styles.variantOutline,
      // secondary: styles.variantSecondary,
      ghost: styles.variantGhost,
      // link: styles.variantLink,
      text: styles.variantText,
    },
    size: {
      default: styles.sizeDefault,
      md: styles.sizeMd,
      sm: styles.sizeSm,
      icon: styles.sizeIcon,
      "icon-md": styles.sizeIconMd,
      "icon-sm": styles.sizeIconSm,
    },
    shape: {
      default: styles.shapeDefault,
      square: styles.shapeSquare,
    },
    color: {
      default: styles.colorDefault,
      gray: styles.colorGray,
      black: styles.colorBlack,
      grayBg: styles.colorGrayBg,
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

function Button({
  className,
  variant = "default",
  size = "default",
  shape = "default",
  color = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    shape?: string;
    color?: string;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      data-shape={shape}
      className={cn(buttonVariants({ variant, size, color, shape }), className)}
      {...props}
    />
  );
}

export { Button };
