import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { Button } from "@/components/ui/Button/Button";
import { Icon } from "@/components/ui/Icon/Icon";
import { Textarea } from "@/components/ui/TextArea/Textarea";
import { cn } from "@/lib/utils";
import styles from "./Input.module.css";

const inputVariants = cva(styles.input);

const inputGroupVariants = cva(styles.inputGroup, {
  variants: {
    type: {
      default: styles.typeDefault,
      btnType: styles.typeBtnType,
    },
  },
  defaultVariants: {
    type: "default",
  },
});

type InputResetProps = {
  /** 리셋 버튼 표시 여부 */
  resetEnabled?: boolean;
  /** 리셋 시 설정할 값 (기본: 빈 문자열) */
  resetValue?: string;
  /** 리셋 버튼 클릭 시 콜백 (리셋될 값 전달) */
  onResetValue?: (nextValue: string) => void;
  /** 접근성용 라벨 */
  resetLabel?: string;
};

type InputProps = React.ComponentProps<"input"> & InputResetProps;
function normalizeInputValue(v: unknown): string {
  if (v === null || v === undefined) return "";
  if (Array.isArray(v)) return v.join("");
  return String(v);
}
type InputGroupProps = React.ComponentProps<"div"> &
  VariantProps<typeof inputGroupVariants>;
type InputGroupButtonProps = React.ComponentProps<typeof Button>;
type InputGroupTextProps = React.ComponentProps<"span">;
type InputGroupInputProps = InputProps;
type InputGroupTextareaProps = React.ComponentProps<"textarea">;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  function InputImpl(
    {
      className,
      type,
      resetEnabled,
      resetValue = "",
      onResetValue,
      resetLabel = "리셋",
      disabled,
      readOnly,
      value,
      defaultValue,
      onChange,
      ...props
    },
    ref
  ) {
    const internalRef = React.useRef<HTMLInputElement | null>(null);
    const dataSlot = (props as { "data-slot"?: string })["data-slot"];
    const isInInputGroup = dataSlot === "input-group-control";
    const [uncontrolledValue, setUncontrolledValue] = React.useState(() =>
      normalizeInputValue(defaultValue)
    );

    const setRefs = React.useCallback(
      (node: HTMLInputElement | null) => {
        internalRef.current = node;

        if (!ref) return;
        if (typeof ref === "function") ref(node);
        else (ref as React.MutableRefObject<HTMLInputElement | null>).current =
          node;
      },
      [ref]
    );

    const isControlled = value !== undefined;
    const controlledValue = isControlled ? normalizeInputValue(value) : "";

    // uncontrolled input은 onChange에서 값을 갱신해 리셋 버튼 표시 조건을 맞춥니다.
    React.useEffect(() => {
      if (isControlled) return;
      setUncontrolledValue(normalizeInputValue(defaultValue));
    }, [defaultValue, isControlled]);

    const handleReset = React.useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();

        const el = internalRef.current;
        if (!el) return;

        // controlled/uncontrolled 모두 리셋될 값을 먼저 반영한 뒤,
        // React onChange는 input 이벤트에 반응하므로 이벤트를 디스패치합니다.
        el.value = resetValue;
        if (!isControlled) setUncontrolledValue(resetValue);

        // React onChange는 input 이벤트에 반응합니다.
        el.dispatchEvent(new Event("input", { bubbles: true }));
        el.dispatchEvent(new Event("change", { bubbles: true }));
        el.focus();

        onResetValue?.(resetValue);
      },
      [isControlled, onResetValue, resetValue]
    );

    const handleChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!isControlled) setUncontrolledValue(e.target.value);
        onChange?.(e);
      },
      [isControlled, onChange]
    );

    const hasValue = isControlled
      ? controlledValue !== ""
      : uncontrolledValue !== "";

    const showResetButton =
      Boolean(resetEnabled) && !disabled && !readOnly && hasValue;

    return (
      <div
        className={cn(
          isInInputGroup ? styles.inputGroupInnerWrapper : inputVariants(),
          className
        )}
        data-slot="input-reset-wrapper"
      >
        <input
          ref={setRefs}
          type={type}
          data-slot="input"
          className={styles.inputControl}
          disabled={disabled}
          readOnly={readOnly}
          {...(isControlled ? { value } : { defaultValue })}
          onChange={handleChange}
          {...props}
        />
        {showResetButton ? (
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            shape="square"
            color="gray"
            aria-label={resetLabel}
            className={styles.resetButton}
            onClick={handleReset}
          >
            <Icon name="btn-close" size={16} />
          </Button>
        ) : null}
      </div>
    );
  }
);
Input.displayName = "Input";

function InputGroup({
  className,
  type = "default",
  ...props
}: InputGroupProps) {
  return (
    <div
      data-slot="input-group"
      role="group"
      className={cn(inputGroupVariants({ type }), className)}
      {...props}
    />
  );
}

const inputGroupAddonVariants = cva(styles.inputGroupAddon, {
  variants: {
    align: {
      "inline-start": styles.alignInlineStart,
      "inline-end": styles.alignInlineEnd,
      "block-start": styles.alignBlockStart,
      "block-end": styles.alignBlockEnd,
    },
  },
  defaultVariants: {
    align: "inline-start",
  },
});

type InputGroupAddonProps = React.ComponentProps<"div"> &
  VariantProps<typeof inputGroupAddonVariants>;

function InputGroupAddon({
  className,
  align = "inline-start",
  ...props
}: InputGroupAddonProps) {
  return (
    <div
      role="group"
      data-slot="input-group-addon"
      data-align={align}
      className={cn(inputGroupAddonVariants({ align }), className)}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("button")) {
          return;
        }
        e.currentTarget.parentElement
          ?.querySelector<HTMLInputElement | HTMLTextAreaElement>(
            'input, textarea, [data-slot="input-group-control"]'
          )
          ?.focus();
      }}
      {...props}
    />
  );
}

function InputGroupButton({
  className,
  type = "button",
  ...props
}: InputGroupButtonProps) {
  return <Button className={className} type={type} {...props} />;
}

function InputGroupText({ className, ...props }: InputGroupTextProps) {
  return <span className={cn(styles.inputGroupText, className)} {...props} />;
}

const InputGroupInput = React.forwardRef<
  HTMLInputElement,
  InputGroupInputProps
>(function InputGroupInputImpl({ className, ...props }, ref) {
  return (
    <Input
      ref={ref}
      data-slot="input-group-control"
      className={cn(
        styles.inputGroupControl,
        styles.inputGroupInput,
        className
      )}
      {...props}
    />
  );
});
InputGroupInput.displayName = "InputGroupInput";

function InputGroupTextarea({ className, ...props }: InputGroupTextareaProps) {
  return (
    <Textarea
      data-slot="input-group-control"
      className={cn(
        styles.inputGroupControl,
        styles.inputGroupTextarea,
        className
      )}
      {...props}
    />
  );
}

export {
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
};
export default Input;
