import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slider as SliderPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";
import styles from "./Slider.module.scss";

const sliderRootVariants = cva(styles.sliderRoot, {
  variants: {
    size: {
      sm: styles.sizeSm,
      md: styles.sizeMd,
      lg: styles.sizeLg,
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type SliderProps = React.ComponentProps<typeof SliderPrimitive.Root> &
  VariantProps<typeof sliderRootVariants>;

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(
  (
    {
      className,
      defaultValue,
      value,
      min = 0,
      max = 100,
      size = "md",
      ...props
    },
    ref,
  ) => {
    const _values = React.useMemo(
      () =>
        Array.isArray(value)
          ? value
          : Array.isArray(defaultValue)
            ? defaultValue
            : [min, max],
      [value, defaultValue, min, max],
    );

    return (
      <SliderPrimitive.Root
        ref={ref}
        data-slot="slider"
        defaultValue={defaultValue}
        value={value}
        min={min}
        max={max}
        className={cn(sliderRootVariants({ size }), className)}
        {...props}
      >
        <SliderPrimitive.Track
          data-slot="slider-track"
          className={styles.sliderTrack}
        >
          <SliderPrimitive.Range
            data-slot="slider-range"
            className={styles.sliderRange}
          />
        </SliderPrimitive.Track>
        {Array.from({ length: _values.length }, (_, index) => (
          <SliderPrimitive.Thumb
            key={index}
            data-slot="slider-thumb"
            className={styles.sliderThumb}
          />
        ))}
      </SliderPrimitive.Root>
    );
  },
);

Slider.displayName = "Slider";

export { Slider, sliderRootVariants };
export type { SliderProps };
export type SliderVariantProps = VariantProps<typeof sliderRootVariants>;
