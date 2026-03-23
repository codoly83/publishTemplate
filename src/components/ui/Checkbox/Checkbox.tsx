import { Checkbox as CheckboxPrimitive } from "radix-ui";
import * as React from "react";

import { Icon } from "@/components/ui/Icon/Icon";
import { cn } from "@/lib/utils";
import styles from "./Checkbox.module.css";

type CheckboxGroupProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "defaultValue" | "value" | "onChange"
> & {
  defaultValue?: string[];
  value?: string[];
  onValueChange?: (value: string[]) => void;
};
type CheckboxRootProps = React.ComponentProps<typeof CheckboxPrimitive.Root>;
type CheckboxVariant = "default" | "spec" | "btn";
type CheckboxCheckedState = "checked" | "indeterminate" | "unchecked";

type CheckboxProps = CheckboxRootProps & {
  label?: React.ReactNode;
  wrapperClassName?: string;
  labelClassName?: string;
  children?: React.ReactNode;
  variant?: CheckboxVariant;
};

type CheckboxContextValue = {
  rootProps: CheckboxRootProps;
  itemClassName?: string;
  labelClassName?: string;
  variant: CheckboxVariant;
  checkedState: CheckboxCheckedState;
};

type CheckboxGroupContextValue = {
  value: string[];
  onItemCheckedChange: (itemValue: string, checked: boolean) => void;
};

const CheckboxContext = React.createContext<CheckboxContextValue | null>(null);
const CheckboxGroupContext =
  React.createContext<CheckboxGroupContextValue | null>(null);

function getCheckboxState(
  checked: CheckboxRootProps["checked"]
): CheckboxCheckedState {
  if (checked === "indeterminate") {
    return "indeterminate";
  }

  return checked ? "checked" : "unchecked";
}

function CheckboxGroup({
  className,
  defaultValue,
  onValueChange,
  value,
  ...props
}: CheckboxGroupProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue ?? []);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const handleItemCheckedChange = React.useCallback(
    (itemValue: string, checked: boolean) => {
      const nextValue = checked
        ? currentValue.includes(itemValue)
          ? currentValue
          : [...currentValue, itemValue]
        : currentValue.filter((candidate) => candidate !== itemValue);

      if (!isControlled) {
        setInternalValue(nextValue);
      }

      onValueChange?.(nextValue);
    },
    [currentValue, isControlled, onValueChange]
  );

  return (
    <CheckboxGroupContext.Provider
      value={{
        value: currentValue,
        onItemCheckedChange: handleItemCheckedChange,
      }}
    >
      <div
        data-slot="checkbox-group"
        className={cn(styles.checkboxGroup, className)}
        {...props}
      />
    </CheckboxGroupContext.Provider>
  );
}

const CheckboxItem = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxRootProps
>(({ className, ...props }, ref) => {
  const context = React.useContext(CheckboxContext);
  const rootProps = context?.rootProps;
  const variant = context?.variant ?? "default";
  const isSpecVariant = variant === "spec";
  const isBtnVariant = variant === "btn";

  return (
    <CheckboxPrimitive.Root
      ref={ref}
      data-slot="checkbox"
      data-variant={variant}
      className={cn(
        styles.checkboxRoot,
        variant === "spec" && styles.checkboxRootVariantSpec,
        variant === "btn" && styles.checkboxRootVariantBtn,
        context?.itemClassName,
        className
      )}
      {...rootProps}
      {...props}
    >
      <span data-slot="checkbox-indicator" className={styles.checkboxIndicator}>
        {isSpecVariant ? (
          <Icon
            name="arrow-left-line"
            className={cn(styles.specArrow)}
            aria-hidden="true"
            focusable="false"
          />
        ) : null}
        {isBtnVariant ? (
          <Icon
            name="check-line"
            className={cn(styles.checkboxIcon, styles.checkIcon)}
            aria-hidden="true"
            focusable="false"
          />
        ) : (
          <Icon
            name="checkbox-circle-line"
            className={cn(styles.checkboxIcon, styles.checkIcon)}
            aria-hidden="true"
            focusable="false"
          />
        )}
      </span>
    </CheckboxPrimitive.Root>
  );
});

CheckboxItem.displayName = "CheckboxItem";

function CheckboxLabel({
  className,
  children,
}: React.HTMLAttributes<HTMLDivElement>) {
  const context = React.useContext(CheckboxContext);
  const variant = context?.variant ?? "default";

  return (
    <div
      data-slot="checkbox-label"
      data-variant={variant}
      className={cn(
        styles.checkboxLabel,
        variant === "btn" && styles.checkboxLabelVariantBtn,
        context?.labelClassName,
        className
      )}
    >
      {children}
    </div>
  );
}

type CheckboxComponent = React.ForwardRefExoticComponent<
  CheckboxProps &
    React.RefAttributes<React.ElementRef<typeof CheckboxPrimitive.Root>>
> & {
  Item: typeof CheckboxItem;
  Label: typeof CheckboxLabel;
  item: typeof CheckboxItem;
  label: typeof CheckboxLabel;
};

const CheckboxBase = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(
  (
    {
      children,
      className,
      checked,
      defaultChecked,
      disabled,
      label,
      labelClassName,
      onCheckedChange,
      value,
      variant = "default",
      wrapperClassName,
      ...props
    },
    ref
  ) => {
    const group = React.useContext(CheckboxGroupContext);
    const groupedValue = typeof value === "string" ? value : undefined;
    const isGrouped = Boolean(group && groupedValue);
    const [visualChecked, setVisualChecked] = React.useState<
      boolean | "indeterminate"
    >(defaultChecked ?? false);
    const currentChecked =
      group && groupedValue ? group.value.includes(groupedValue) : checked;
    const checkedState = getCheckboxState(
      isGrouped || checked !== undefined ? currentChecked : visualChecked
    );

    React.useEffect(() => {
      if (!isGrouped && checked === undefined) {
        setVisualChecked(defaultChecked ?? false);
      }
    }, [defaultChecked, checked, isGrouped]);

    const handleCheckedChange = React.useCallback(
      (nextChecked: boolean | "indeterminate") => {
        if (group && groupedValue) {
          group.onItemCheckedChange(groupedValue, nextChecked === true);
        } else if (checked === undefined) {
          setVisualChecked(nextChecked);
        }

        onCheckedChange?.(nextChecked);
      },
      [checked, group, groupedValue, onCheckedChange]
    );

    const contextValue = React.useMemo(
      () => ({
        rootProps: {
          checked: currentChecked,
          defaultChecked: isGrouped ? undefined : defaultChecked,
          disabled,
          onCheckedChange: handleCheckedChange,
          value,
          ...props,
        },
        itemClassName: className,
        labelClassName,
        variant,
        checkedState,
      }),
      [
        className,
        currentChecked,
        defaultChecked,
        disabled,
        handleCheckedChange,
        isGrouped,
        labelClassName,
        props,
        value,
        variant,
        checkedState,
      ]
    );

    const content = children ?? (
      <>
        <CheckboxItem ref={ref} />
        {label ? <CheckboxLabel>{label}</CheckboxLabel> : null}
      </>
    );

    return (
      <CheckboxContext.Provider value={contextValue}>
        <label
          data-slot="checkbox-field"
          data-variant={variant}
          data-state={checkedState}
          className={cn(
            styles.checkboxField,
            variant === "spec" && styles.checkboxFieldVariantSpec,
            variant === "btn" && styles.checkboxFieldVariantBtn,
            disabled && styles.checkboxFieldDisabled,
            wrapperClassName
          )}
        >
          {content}
        </label>
      </CheckboxContext.Provider>
    );
  }
);

CheckboxBase.displayName = "Checkbox";

const Checkbox = Object.assign(CheckboxBase, {
  Item: CheckboxItem,
  Label: CheckboxLabel,
  item: CheckboxItem,
  label: CheckboxLabel,
}) as CheckboxComponent;

export { Checkbox, CheckboxGroup };
