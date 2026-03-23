import { RadioGroup as RadioGroupPrimitive } from "radix-ui";
import * as React from "react";

import { cn } from "@/lib/utils";
import styles from "./Radio.module.css";

type RadioGroupProps = React.ComponentProps<typeof RadioGroupPrimitive.Root>;
type RadioItemProps = React.ComponentProps<typeof RadioGroupPrimitive.Item>;

type RadioProps = RadioItemProps & {
  label?: React.ReactNode;
  wrapperClassName?: string;
  labelClassName?: string;
  children?: React.ReactNode;
};

type RadioContextValue = {
  itemProps: RadioItemProps;
  itemClassName?: string;
  labelClassName?: string;
};

const RadioContext = React.createContext<RadioContextValue | null>(null);

function RadioGroup({ className, ...props }: RadioGroupProps) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn(styles.radioGroup, className)}
      {...props}
    />
  );
}

const RadioItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioItemProps
>(({ className, ...props }, ref) => {
  const context = React.useContext(RadioContext);
  const itemProps = context?.itemProps;

  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      data-slot="radio-item"
      className={cn(styles.radioItem, context?.itemClassName, className)}
      {...itemProps}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-slot="radio-indicator"
        className={styles.radioIndicator}
      >
        <span className={styles.radioDot} />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});

RadioItem.displayName = "RadioItem";

function RadioLabel({
  className,
  children,
}: React.HTMLAttributes<HTMLDivElement>) {
  const context = React.useContext(RadioContext);

  return (
    <div
      data-slot="radio-label"
      className={cn(styles.radioLabel, context?.labelClassName, className)}
    >
      {children}
    </div>
  );
}

type RadioComponent = React.ForwardRefExoticComponent<
  RadioProps &
    React.RefAttributes<React.ElementRef<typeof RadioGroupPrimitive.Item>>
> & {
  Item: typeof RadioItem;
  Label: typeof RadioLabel;
  item: typeof RadioItem;
  label: typeof RadioLabel;
};

const RadioBase = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioProps
>(
  (
    {
      children,
      className,
      disabled,
      label,
      labelClassName,
      wrapperClassName,
      ...props
    },
    ref
  ) => {
    const contextValue = React.useMemo(
      () => ({
        itemProps: {
          disabled,
          ...props,
        },
        itemClassName: className,
        labelClassName,
      }),
      [className, disabled, labelClassName, props]
    );

    const content = children ?? (
      <>
        <RadioItem ref={ref} value={props.value} />
        {label ? <RadioLabel>{label}</RadioLabel> : null}
      </>
    );

    return (
      <RadioContext.Provider value={contextValue}>
        <label
          data-slot="radio-field"
          className={cn(
            styles.radioField,
            disabled && styles.radioFieldDisabled,
            wrapperClassName
          )}
        >
          {content}
        </label>
      </RadioContext.Provider>
    );
  }
);

RadioBase.displayName = "Radio";

const Radio = Object.assign(RadioBase, {
  Item: RadioItem,
  Label: RadioLabel,
  item: RadioItem,
  label: RadioLabel,
}) as RadioComponent;

export { Radio, RadioGroup };
export default Radio;
