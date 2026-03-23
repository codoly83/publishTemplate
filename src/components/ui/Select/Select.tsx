import { cva, type VariantProps } from "class-variance-authority";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react";
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

function Select({ ...props }: SelectProps) {
  return <SelectPrimitive.Root data-slot="select" {...props} />;
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
  ...props
}: SelectTriggerProps) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(selectTriggerVariants({ size, variant }), className)}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon className={styles.triggerIcon}>
        <IoMdArrowDropdown />
      </SelectPrimitive.Icon>
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
  SelectTrigger,
  SelectValue,
};
