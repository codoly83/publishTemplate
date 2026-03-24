import { cva, type VariantProps } from "class-variance-authority";
import { Button } from "@/components/ui/Button/Button";
import { Icon } from "@/components/ui/Icon/Icon";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/Popover/Popover";
import { Select as SelectPrimitive } from "radix-ui";
import * as React from "react";
import { IoMdArrowDropdown } from "react-icons/io";

import { cn } from "@/lib/utils";
import styles from "./Select.module.css";

const selectTriggerVariants = cva(styles.trigger, {
  variants: {
    size: {
      default: styles.triggerSizeDefault,
      sm: styles.triggerSizeSm,
    },
    variant: {
      btnType: styles.variantBtnType,
    },
  },
  defaultVariants: {
    size: "default",
  },
});

type SelectProps = React.ComponentProps<typeof SelectPrimitive.Root>;
type SelectGroupProps = React.ComponentProps<typeof SelectPrimitive.Group>;
type SelectValueProps = React.ComponentProps<typeof SelectPrimitive.Value>;
type SelectTriggerProps = React.ComponentProps<typeof SelectPrimitive.Trigger> &
  VariantProps<typeof selectTriggerVariants>;
type SelectContentProps = React.ComponentProps<typeof SelectPrimitive.Content>;
type SelectLabelProps = React.ComponentProps<typeof SelectPrimitive.Label>;
type SelectItemProps = React.ComponentProps<typeof SelectPrimitive.Item>;
type SelectSeparatorProps = React.ComponentProps<
  typeof SelectPrimitive.Separator
>;
type SelectScrollUpButtonProps = React.ComponentProps<
  typeof SelectPrimitive.ScrollUpButton
>;
type SelectScrollDownButtonProps = React.ComponentProps<
  typeof SelectPrimitive.ScrollDownButton
>;

type SelectResetProps = {
  /** 선택 값이 있을 때만 트리거 우측에 리셋 버튼을 표시 */
  resetEnabled?: boolean;
  /** 리셋 시 값. 기본값은 `undefined`(placeholder 표시) */
  resetValue?: string | undefined;
  /** 리셋 클릭 콜백 (리셋될 값 전달) */
  onResetValue?: (nextValue: string | undefined) => void;
  /** 접근성용 라벨 */
  resetLabel?: string;
};

type SelectWithResetProps = SelectProps & SelectResetProps;

type SelectResetContextValue = {
  resetEnabled: boolean;
  hasValue: boolean;
  resetValue: string | undefined;
  disabled?: boolean;
  resetLabel: string;
  reset: () => void;
};

const SelectResetContext =
  React.createContext<SelectResetContextValue | null>(null);

function useSelectResetContext() {
  return React.useContext(SelectResetContext);
}

function Select({
  resetEnabled = false,
  resetValue = undefined,
  onResetValue,
  resetLabel = "리셋",
  ...props
}: SelectWithResetProps) {
  const { value: valueProp, defaultValue, onValueChange, disabled, ...rootProps } =
    props;

  const isControlled = valueProp !== undefined;
  const [internalValue, setInternalValue] = React.useState<
    string | undefined
  >(() => defaultValue);

  React.useEffect(() => {
    if (isControlled) return;
    setInternalValue(defaultValue);
  }, [defaultValue, isControlled]);

  const resolvedValue = isControlled ? valueProp : internalValue;

  const handleValueChange = React.useCallback(
    (next: string) => {
      if (!isControlled) setInternalValue(next);
      onValueChange?.(next);
    },
    [isControlled, onValueChange]
  );

  const handleReset = React.useCallback(() => {
    // clear => placeholder 표시를 위해 default는 undefined.
    if (!isControlled) setInternalValue(resetValue);
    onResetValue?.(resetValue);
    if (resetValue !== undefined) onValueChange?.(resetValue);
  }, [isControlled, onResetValue, onValueChange, resetValue]);

  const hasValue = resolvedValue != null && resolvedValue !== "";

  const ctxValue: SelectResetContextValue = {
    resetEnabled,
    hasValue,
    resetValue,
    disabled,
    resetLabel,
    reset: handleReset,
  };

  return (
    <SelectResetContext.Provider value={ctxValue}>
      <SelectPrimitive.Root
        data-slot="select"
        {...rootProps}
        disabled={disabled}
        value={resolvedValue}
        onValueChange={handleValueChange}
      />
    </SelectResetContext.Provider>
  );
}

function SelectGroup({ ...props }: SelectGroupProps) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />;
}

function SelectValue({ className, ...props }: SelectValueProps) {
  return (
    <SelectPrimitive.Value
      data-slot="select-value"
      className={cn(styles.value, className)}
      {...props}
    />
  );
}

function SelectTrigger({
  className,
  size,
  variant,
  children,
  disabled: triggerDisabled,
  ...props
}: SelectTriggerProps) {
  const ctx = useSelectResetContext();
  const effectiveDisabled = triggerDisabled ?? ctx?.disabled;
  const showResetButton = Boolean(
    ctx?.resetEnabled && ctx?.hasValue && !effectiveDisabled
  );

  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(selectTriggerVariants({ size, variant }), className)}
      {...props}
    >
      {children}
      <span className={styles.triggerRight} data-slot="select-trigger-right">
        {showResetButton ? (
          <Button
            asChild
            variant="ghost"
            size="icon-sm"
            shape="square"
            color="gray"
            aria-label={ctx?.resetLabel}
            className={styles.resetButton}
            onPointerDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              ctx?.reset();
            }}
          >
            <span>
              <Icon name="btn-close" size={16} />
            </span>
          </Button>
        ) : null}
        <SelectPrimitive.Icon className={styles.triggerIcon}>
          <IoMdArrowDropdown />
        </SelectPrimitive.Icon>
      </span>
    </SelectPrimitive.Trigger>
  );
}

function SelectContent({
  className,
  children,
  position = "popper",
  align = "start",
  side = "bottom",
  ...props
}: SelectContentProps) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        className={cn(
          styles.content,
          position === "popper" && styles.contentPopper,
          className
        )}
        position={position}
        align={align}
        side={side}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn(
            styles.viewport,
            position === "popper" && styles.viewportPopper
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

function SelectLabel({ className, ...props }: SelectLabelProps) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn(styles.label, className)}
      {...props}
    />
  );
}

function SelectItem({ className, children, ...props }: SelectItemProps) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(styles.item, className)}
      {...props}
    >
      <span data-slot="select-item-indicator" className={styles.itemIndicator}>
        <SelectPrimitive.ItemIndicator>
          <CheckIcon />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

function SelectSeparator({ className, ...props }: SelectSeparatorProps) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn(styles.separator, className)}
      {...props}
    />
  );
}

function SelectScrollUpButton({
  className,
  ...props
}: SelectScrollUpButtonProps) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn(styles.scrollButton, className)}
      {...props}
    >
      <ChevronUpIcon />
    </SelectPrimitive.ScrollUpButton>
  );
}

function SelectScrollDownButton({
  className,
  ...props
}: SelectScrollDownButtonProps) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn(styles.scrollButton, className)}
      {...props}
    >
      <ChevronDownIcon />
    </SelectPrimitive.ScrollDownButton>
  );
}

export interface SelectOption {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
}

export type SelectSimpleProps = Omit<SelectProps, "children"> &
  VariantProps<typeof selectTriggerVariants> & {
    /** 한 줄 배치 시 왼쪽 라벨 */
    label?: React.ReactNode;
    options: SelectOption[];
    placeholder?: string;
    triggerClassName?: string;
    contentClassName?: string;
    /** 라벨+트리거 래퍼 */
    className?: string;
    /** 트리거·라벨 연결용 (미지정 시 useId) */
    id?: string;
  };

export type SelectMultipleProps = VariantProps<typeof selectTriggerVariants> & {
  options: SelectOption[];
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (nextValue: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  triggerClassName?: string;
  contentClassName?: string;
  id?: string;
  label?: React.ReactNode;
  resetEnabled?: boolean;
  resetLabel?: string;
};

function SelectMultiple({
  options,
  value,
  defaultValue,
  onValueChange,
  placeholder = "선택",
  disabled = false,
  className,
  triggerClassName,
  contentClassName,
  id: idProp,
  label,
  size,
  variant,
  resetEnabled = false,
  resetLabel = "리셋",
}: SelectMultipleProps) {
  const [open, setOpen] = React.useState(false);
  const [internalValue, setInternalValue] = React.useState<string[]>(
    defaultValue ?? []
  );
  const isControlled = value !== undefined;
  const selectedValues = isControlled ? value : internalValue;
  const uid = React.useId();
  const triggerId = idProp ?? uid;
  const selectedSet = React.useMemo(() => new Set(selectedValues), [selectedValues]);

  React.useEffect(() => {
    if (!isControlled) {
      setInternalValue(defaultValue ?? []);
    }
  }, [defaultValue, isControlled]);

  const setNextValue = React.useCallback(
    (nextValue: string[]) => {
      if (!isControlled) setInternalValue(nextValue);
      onValueChange?.(nextValue);
    },
    [isControlled, onValueChange]
  );

  const handleToggle = React.useCallback(
    (target: string) => {
      if (disabled) return;
      const exists = selectedSet.has(target);
      const nextValue = exists
        ? selectedValues.filter((candidate) => candidate !== target)
        : [...selectedValues, target];
      setNextValue(nextValue);
    },
    [disabled, selectedSet, selectedValues, setNextValue]
  );

  const selectedLabels = options
    .filter((option) => selectedSet.has(option.value))
    .map((option) => option.label)
    .filter((label): label is string => typeof label === "string");

  const triggerText =
    selectedLabels.length === 0 ? placeholder : selectedLabels.join(", ");

  const hasValue = selectedValues.length > 0;

  return (
    <div
      data-slot="select-multiple"
      className={cn(
        "flex w-full min-w-0 flex-row flex-wrap items-center gap-2",
        className
      )}
    >
      {label != null && label !== "" ? (
        <label
          htmlFor={triggerId}
          className="shrink-0 text-sm font-medium text-font-b"
        >
          {label}
        </label>
      ) : null}
      <div className="min-w-0 flex-1">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <button
              id={triggerId}
              type="button"
              disabled={disabled}
              className={cn(
                selectTriggerVariants({ size, variant }),
                styles.multiTrigger,
                selectedLabels.length === 0 && styles.multiTriggerPlaceholder,
                triggerClassName
              )}
            >
              <span className={styles.value}>
                <span className={styles.multiValueText}>{triggerText}</span>
              </span>
              <span className={styles.triggerRight}>
                {resetEnabled && hasValue && !disabled ? (
                  <Button
                    asChild
                    variant="ghost"
                    size="icon-sm"
                    shape="square"
                    color="gray"
                    aria-label={resetLabel}
                    className={styles.resetButton}
                    onPointerDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setNextValue([]);
                    }}
                  >
                    <span>
                      <Icon name="btn-close" size={16} />
                    </span>
                  </Button>
                ) : null}
                {hasValue ? (
                  <span className={styles.multiCount}>{selectedValues.length}개</span>
                ) : null}
                <span className={styles.triggerIcon}>
                  <IoMdArrowDropdown />
                </span>
              </span>
            </button>
          </PopoverTrigger>
          <PopoverContent
            align="start"
            side="bottom"
            className={cn(styles.multiContent, contentClassName)}
          >
            <div className={styles.multiList}>
              {options.map((option) => {
                const checked = selectedSet.has(option.value);
                return (
                  <button
                    key={option.value}
                    type="button"
                    className={cn(
                      styles.multiItem,
                      checked && styles.multiItemChecked
                    )}
                    onClick={() => handleToggle(option.value)}
                    disabled={option.disabled}
                  >
                    <span>{option.label}</span>
                    <span className={styles.multiItemIndicator} aria-hidden="true">
                      {checked ? <CheckIcon /> : null}
                    </span>
                  </button>
                );
              })}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}

/**
 * label + options만 넘기면 트리거·목록을 한 번에 구성합니다. (한 줄 폼용)
 *
 * @example
 * <SelectSimple label="상태" options={statusOptions} placeholder="선택" defaultValue="pending" />
 */
function SelectSimple({
  label,
  options,
  placeholder,
  triggerClassName,
  contentClassName,
  size,
  variant,
  className,
  id: idProp,
  ...rootProps
}: SelectSimpleProps) {
  const uid = React.useId();
  const triggerId = idProp ?? uid;

  return (
    <div
      data-slot="select-simple"
      className={cn(
        "flex w-full min-w-0 flex-row flex-wrap items-center gap-2",
        className,
      )}
    >
      {label != null && label !== "" ? (
        <label
          htmlFor={triggerId}
          className="shrink-0 text-sm font-medium text-font-b"
        >
          {label}
        </label>
      ) : null}
      <div className="min-w-0 flex-1">
        <Select {...rootProps}>
          <SelectTrigger
            id={triggerId}
            size={size}
            variant={variant}
            className={triggerClassName}
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent className={contentClassName}>
            {options.map((opt) => (
              <SelectItem
                key={opt.value}
                value={opt.value}
                disabled={opt.disabled}
              >
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectSimple,
  SelectMultiple,
  SelectTrigger,
  SelectValue,
};
