import * as React from "react";

import { Icon } from "@/components/ui/Icon/Icon";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/Input/Input";
import { cn } from "@/lib/utils";

import styles from "./InputStepper.module.css";

export type InputStepperMode = "number" | "date";

export type InputStepperControlVariant = "plusMinus" | "chevron";

type InputGroupType = React.ComponentProps<typeof InputGroup>["type"];

export type InputStepperProps = Omit<
  React.ComponentPropsWithoutRef<typeof InputGroupInput>,
  "type" | "step" | "min" | "max" | "onChange" | "value" | "defaultValue"
> & {
  mode?: InputStepperMode;
  stepperVariant?: InputStepperControlVariant;
  /** number: 증감 단위. date: 일(day) 단위. */
  step?: number;
  min?: string | number;
  max?: string | number;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  inputGroupClassName?: string;
  inputGroupType?: InputGroupType;
};

function padDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function parseIsoDate(value: string): Date | null {
  if (!value) return null;
  const [ys, ms, ds] = value.split("-");
  if (!ys || !ms || !ds) return null;
  const y = Number(ys);
  const mo = Number(ms);
  const d = Number(ds);
  if (!Number.isFinite(y) || !Number.isFinite(mo) || !Number.isFinite(d))
    return null;
  const dt = new Date(y, mo - 1, d);
  return Number.isNaN(dt.getTime()) ? null : dt;
}

function clampDate(value: string, min?: string, max?: string): string {
  let v = value;
  if (min && v < min) v = min;
  if (max && v > max) v = max;
  return v;
}

function normalizeFloat(n: number, step: number): number {
  const decimals = Math.max(
    0,
    (String(step).split(".")[1] ?? "").length,
    (String(n).split(".")[1] ?? "").length
  );
  const f = 10 ** Math.min(decimals, 8);
  return Math.round(n * f) / f;
}

function parseNumBounds(
  min?: string | number,
  max?: string | number
): { min?: number; max?: number } {
  const minN =
    min === undefined || min === ""
      ? undefined
      : Number(min);
  const maxN =
    max === undefined || max === ""
      ? undefined
      : Number(max);
  return {
    min: Number.isFinite(minN) ? minN : undefined,
    max: Number.isFinite(maxN) ? maxN : undefined,
  };
}

const InputStepper = React.forwardRef<HTMLInputElement, InputStepperProps>(
  function InputStepper(
    {
      mode = "number",
      stepperVariant = "plusMinus",
      step: stepProp,
      min,
      max,
      value: valueProp,
      defaultValue = "",
      onValueChange,
      onChange,
      disabled,
      readOnly,
      inputGroupClassName,
      inputGroupType = "default",
      className,
      name,
      id,
      ...inputRest
    },
    ref
  ) {
    const stepAmount = stepProp ?? 1;
    const minStr = min !== undefined && min !== "" ? String(min) : undefined;
    const maxStr = max !== undefined && max !== "" ? String(max) : undefined;

    const [internal, setInternal] = React.useState(defaultValue ?? "");
    const isControlled = valueProp !== undefined;
    const value = isControlled ? valueProp : internal;

    const setCommittedValue = React.useCallback(
      (next: string) => {
        if (!isControlled) setInternal(next);
        onValueChange?.(next);
      },
      [isControlled, onValueChange]
    );

    const handleChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const next = e.target.value;
        if (!isControlled) setInternal(next);
        onValueChange?.(next);
        onChange?.(e);
      },
      [isControlled, onChange, onValueChange]
    );

    const { min: minN, max: maxN } = parseNumBounds(min, max);

    const applyNumberStep = React.useCallback(
      (direction: -1 | 1) => {
        const raw = value.trim();
        const parsed = raw === "" ? NaN : Number(raw);
        const base = Number.isFinite(parsed)
          ? parsed
          : minN ?? 0;
        let next = normalizeFloat(
          base + direction * stepAmount,
          stepAmount
        );
        if (minN !== undefined) next = Math.max(minN, next);
        if (maxN !== undefined) next = Math.min(maxN, next);
        const nextStr = String(next);
        setCommittedValue(nextStr);
      },
      [maxN, minN, setCommittedValue, stepAmount, value]
    );

    const applyDateStep = React.useCallback(
      (direction: -1 | 1) => {
        const base = parseIsoDate(value) ?? new Date();
        base.setDate(base.getDate() + direction * stepAmount);
        const nextStr = clampDate(padDate(base), minStr, maxStr);
        setCommittedValue(nextStr);
      },
      [maxStr, minStr, setCommittedValue, stepAmount, value]
    );

    const stepValue = React.useCallback(
      (direction: -1 | 1) => {
        if (disabled || readOnly) return;
        if (mode === "date") applyDateStep(direction);
        else applyNumberStep(direction);
      },
      [applyDateStep, applyNumberStep, disabled, mode, readOnly]
    );

    const decDisabled = React.useMemo(() => {
      if (disabled || readOnly) return true;
      if (mode === "number") {
        const raw = value.trim();
        if (raw === "") return false;
        const n = Number(raw);
        if (!Number.isFinite(n)) return false;
        const prev = normalizeFloat(n - stepAmount, stepAmount);
        return minN !== undefined && prev < minN;
      }
      if (!value) return false;
      if (!minStr) return false;
      const d = parseIsoDate(value);
      if (!d) return false;
      d.setDate(d.getDate() - stepAmount);
      return padDate(d) < minStr;
    }, [disabled, minN, minStr, mode, readOnly, stepAmount, value]);

    const incDisabled = React.useMemo(() => {
      if (disabled || readOnly) return true;
      if (mode === "number") {
        const raw = value.trim();
        if (raw === "") return false;
        const n = Number(raw);
        if (!Number.isFinite(n)) return false;
        const next = normalizeFloat(n + stepAmount, stepAmount);
        return maxN !== undefined && next > maxN;
      }
      if (!value) return false;
      if (!maxStr) return false;
      const d = parseIsoDate(value);
      if (!d) return false;
      d.setDate(d.getDate() + stepAmount);
      return padDate(d) > maxStr;
    }, [disabled, maxN, maxStr, mode, readOnly, stepAmount, value]);

    const inputType = mode === "date" ? "date" : "number";
    const htmlStep = stepAmount;

    const decLabel = mode === "date" ? "이전 날짜" : "값 감소";
    const incLabel = mode === "date" ? "다음 날짜" : "값 증가";

    return (
      <InputGroup type={inputGroupType} className={inputGroupClassName}>
        <InputGroupAddon
          align="inline-start"
          className="p-0! gap-0! pl-2!"
        >
          <InputGroupButton
            type="button"
            variant="ghost"
            size="icon-sm"
            shape="square"
            color="gray"
            disabled={decDisabled}
            aria-label={decLabel}
            onClick={() => stepValue(-1)}
          >
            {stepperVariant === "chevron" ? (
              <Icon name="datepicker-left" size={16} />
            ) : (
              <span className="text-sm font-semibold leading-none">−</span>
            )}
          </InputGroupButton>
        </InputGroupAddon>
        <InputGroupInput
          ref={ref}
          id={id}
          name={name}
          type={inputType}
          step={htmlStep}
          min={minStr}
          max={maxStr}
          value={value}
          disabled={disabled}
          readOnly={readOnly}
          onChange={handleChange}
          className={cn(styles.stepperInput, className)}
          {...inputRest}
        />
        <InputGroupAddon align="inline-end" className="p-0! gap-0! pr-2!">
          <InputGroupButton
            type="button"
            variant="ghost"
            size="icon-sm"
            shape="square"
            color="gray"
            disabled={incDisabled}
            aria-label={incLabel}
            onClick={() => stepValue(1)}
          >
            {stepperVariant === "chevron" ? (
              <Icon name="datepicker-right" size={16} />
            ) : (
              <span className="text-sm font-semibold leading-none">+</span>
            )}
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    );
  }
);

InputStepper.displayName = "InputStepper";

export { InputStepper };
export default InputStepper;
