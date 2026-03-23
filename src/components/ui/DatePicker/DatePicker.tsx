import { addYears, format, subYears } from "date-fns";
import { ko } from "date-fns/locale";
import * as React from "react";

import { Icon } from "@/components/ui/Icon/Icon";
import { Popover } from "radix-ui";
import {
  DayPicker,
  getDefaultClassNames,
  useDayPicker,
  type CalendarMonth,
  type DateRange,
  type DayPickerProps,
} from "react-day-picker";

import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";
import styles from "./DatePicker.module.css";

type DatePickerVariant = "default" | "btnType";

type DatePickerProps = Omit<
  React.ComponentPropsWithoutRef<"button">,
  "defaultValue" | "onChange" | "value"
> & {
  value?: Date;
  defaultValue?: Date;
  onValueChange?: (value: Date | undefined) => void;
  /**
   * 선택된 값이 있을 때만 트리거 우측에 리셋 버튼을 표시합니다.
   * (reset click 시 값은 `resetValue`로 설정, 기본은 `undefined`로 초기화)
   */
  resetEnabled?: boolean;
  resetValue?: Date | undefined;
  onResetValue?: (nextValue: Date | undefined) => void;
  resetLabel?: string;
  placeholder?: string;
  formatString?: string;
  name?: string;
  variant?: DatePickerVariant;
  align?: "start" | "center" | "end";
  side?: "top" | "right" | "bottom" | "left";
  calendarProps?: Omit<
    DayPickerProps,
    "mode" | "selected" | "onSelect" | "locale"
  >;
  contentClassName?: string;
};

const defaultClassNames = getDefaultClassNames();

const sharedClassNames = {
  root: cn(styles.calendarRoot, defaultClassNames.root),
  months: cn(styles.months, defaultClassNames.months),
  month: cn(styles.month, defaultClassNames.month),
  month_grid: cn(styles.table, defaultClassNames.month_grid),
  weekdays: cn(styles.weekdays, defaultClassNames.weekdays),
  weekday: cn(styles.weekday, defaultClassNames.weekday),
  week: cn(styles.week, defaultClassNames.week),
  day: cn(styles.day, defaultClassNames.day),
  day_button: cn(styles.dayButton, defaultClassNames.day_button),
  selected: cn(styles.selected, defaultClassNames.selected),
  today: cn(styles.today, defaultClassNames.today),
  outside: cn(styles.outside, defaultClassNames.outside),
  disabled: cn(styles.disabled, defaultClassNames.disabled),
  hidden: cn(styles.hidden, defaultClassNames.hidden),
};

const sharedModifiers = {
  sunday: (date: Date) => date.getDay() === 0,
};

const sharedModifiersClassNames = {
  sunday: styles.sunday,
};

// MonthCaptionCustom이 네비게이션을 직접 렌더링하므로 기본 Nav는 제거
const EmptyNav = () => <></>;

// 커스텀 월 헤더: « < 2025.12 > »
function MonthCaptionCustom({
  calendarMonth,
}: {
  calendarMonth: CalendarMonth;
}) {
  const { goToMonth, previousMonth, nextMonth } = useDayPicker();

  return (
    <div className={styles.monthCaption}>
      <button
        type="button"
        className={styles.navButton}
        onClick={() => goToMonth(subYears(calendarMonth.date, 1))}
      >
        <Icon name="datepicker-left-double" className={styles.chevron} />
      </button>
      <button
        type="button"
        className={styles.navButton}
        disabled={!previousMonth}
        onClick={() => previousMonth && goToMonth(previousMonth)}
      >
        <Icon name="datepicker-left" className={styles.chevron} />
      </button>
      <span className={styles.captionLabel}>
        {format(calendarMonth.date, "yyyy.MM")}
      </span>
      <button
        type="button"
        className={styles.navButton}
        disabled={!nextMonth}
        onClick={() => nextMonth && goToMonth(nextMonth)}
      >
        <Icon name="datepicker-right" className={styles.chevron} />
      </button>
      <button
        type="button"
        className={styles.navButton}
        onClick={() => goToMonth(addYears(calendarMonth.date, 1))}
      >
        <Icon name="datepicker-right-double" className={styles.chevron} />
      </button>
    </div>
  );
}

const DatePicker = React.forwardRef<HTMLButtonElement, DatePickerProps>(
  (
    {
      align = "start",
      calendarProps,
      className,
      contentClassName,
      defaultValue,
      disabled,
      formatString = "yyyy.MM.dd",
      name,
      onValueChange,
      resetEnabled = false,
      resetValue = undefined,
      onResetValue,
      resetLabel = "선택 해제",
      placeholder = "날짜를 선택하세요",
      side = "bottom",
      value,
      variant = "default",
      ...props
    },
    ref,
  ) => {
    const isControlled = value !== undefined;
    const [open, setOpen] = React.useState(false);
    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const selectedDate = isControlled ? value : internalValue;

    const displayValue = selectedDate
      ? format(selectedDate, formatString, { locale: ko })
      : placeholder;

    const hiddenValue = selectedDate ? format(selectedDate, "yyyy-MM-dd") : "";

    const handleSelect = React.useCallback(
      (nextValue: Date | undefined) => {
        if (!isControlled) {
          setInternalValue(nextValue);
        }

        onValueChange?.(nextValue);
        setOpen(false);
      },
      [isControlled, onValueChange],
    );

    const handleReset = React.useCallback(() => {
      handleSelect(resetValue);
      onResetValue?.(resetValue);
    }, [handleSelect, onResetValue, resetValue]);

    const showResetButton =
      Boolean(resetEnabled) && !!selectedDate && !disabled;

    return (
      <Popover.Root open={open} onOpenChange={setOpen}>
        <Popover.Trigger asChild>
          <button
            ref={ref}
            type="button"
            data-slot="date-picker-trigger"
            data-empty={!selectedDate}
            data-variant={variant}
            className={cn(
              styles.trigger,
              variant === "btnType" && styles.triggerBtnType,
              className,
            )}
            disabled={disabled}
            {...props}
          >
            <span className={styles.triggerText}>{displayValue}</span>
            <span className={styles.rightActions}>
              {showResetButton ? (
                <span
                  role="button"
                  tabIndex={-1}
                  data-slot="date-picker-reset"
                  aria-label={resetLabel}
                  className={styles.resetButton}
                  onPointerDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleReset();
                  }}
                >
                  <Icon
                    name="btn-close"
                    size={16}
                    className={styles.resetIcon}
                  />
                </span>
              ) : null}

              {variant === "btnType" ? (
                <span className={styles.triggerIconBtn}>
                  <Icon name="calendar" className={styles.triggerIcon} />
                </span>
              ) : (
                <Icon name="calendar" className={styles.triggerIcon} />
              )}
            </span>
          </button>
        </Popover.Trigger>
        {name ? <input type="hidden" name={name} value={hiddenValue} /> : null}
        <Popover.Portal>
          <Popover.Content
            data-slot="date-picker-content"
            align={align}
            side={side}
            sideOffset={8}
            className={cn(styles.content, contentClassName)}
          >
            <DayPicker
              showOutsideDays
              locale={ko}
              mode="single"
              selected={selectedDate}
              onSelect={handleSelect}
              className={styles.calendar}
              classNames={sharedClassNames}
              modifiers={sharedModifiers}
              modifiersClassNames={sharedModifiersClassNames}
              components={{ MonthCaption: MonthCaptionCustom, Nav: EmptyNav }}
              {...calendarProps}
            />
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    );
  },
);

DatePicker.displayName = "DatePicker";

// ─── DateRangePicker ───────────────────────────────────────────────────────────

type DateRangePickerProps = Omit<
  React.ComponentPropsWithoutRef<"button">,
  "defaultValue" | "onChange" | "value"
> & {
  value?: DateRange;
  defaultValue?: DateRange;
  onValueChange?: (value: DateRange | undefined) => void;
  placeholder?: string;
  formatString?: string;
  variant?: DatePickerVariant;
  align?: "start" | "center" | "end";
  side?: "top" | "right" | "bottom" | "left";
  calendarProps?: Omit<
    DayPickerProps,
    "mode" | "selected" | "onSelect" | "locale"
  >;
  contentClassName?: string;
};

const rangeClassNames = {
  ...sharedClassNames,
  range_start: cn(styles.rangeStart, defaultClassNames.range_start),
  range_end: cn(styles.rangeEnd, defaultClassNames.range_end),
  range_middle: cn(styles.rangeMiddle, defaultClassNames.range_middle),
};

const DateRangePicker = React.forwardRef<
  HTMLButtonElement,
  DateRangePickerProps
>(
  (
    {
      align = "start",
      calendarProps,
      className,
      contentClassName,
      defaultValue,
      disabled,
      formatString = "yyyy.MM.dd",
      onValueChange,
      placeholder = "기간을 선택하세요",
      side = "bottom",
      value,
      variant = "default",
      ...props
    },
    ref,
  ) => {
    const isControlled = value !== undefined;
    const [open, setOpen] = React.useState(false);

    // 확정된 값 (트리거에 표시, 외부로 전달)
    const [internalValue, setInternalValue] = React.useState<
      DateRange | undefined
    >(defaultValue);
    const committedRange = isControlled ? value : internalValue;

    // 선택 중인 임시 값 (달력에만 반영, 적용 전까지 외부 미전달)
    const [pendingRange, setPendingRange] = React.useState<
      DateRange | undefined
    >(undefined);

    const formatDate = (date: Date | undefined) =>
      date ? format(date, formatString, { locale: ko }) : "-----";

    const displayValue = committedRange?.from
      ? `${formatDate(committedRange.from)} ~ ${formatDate(committedRange.to)}`
      : placeholder;

    const isEmpty = !committedRange?.from;

    // 팝오버 열릴 때: pending을 committed로 초기화
    const handleOpenChange = React.useCallback(
      (nextOpen: boolean) => {
        if (nextOpen) {
          setPendingRange(committedRange);
        }
        setOpen(nextOpen);
      },
      [committedRange],
    );

    // 달력 날짜 클릭: pending만 업데이트 (자동 닫힘 없음)
    const handleSelect = React.useCallback(
      (nextValue: DateRange | undefined) => {
        setPendingRange(nextValue);
      },
      [],
    );

    // 선택 취소: pending 초기화
    const handleClear = React.useCallback(() => {
      setPendingRange(undefined);
    }, []);

    // 적용: pending을 committed로 확정하고 닫기
    const handleApply = React.useCallback(() => {
      if (!isControlled) {
        setInternalValue(pendingRange);
      }
      onValueChange?.(pendingRange);
      setOpen(false);
    }, [isControlled, pendingRange, onValueChange]);

    return (
      <Popover.Root open={open} onOpenChange={handleOpenChange}>
        <Popover.Trigger asChild>
          <button
            ref={ref}
            type="button"
            data-slot="date-range-picker-trigger"
            data-empty={isEmpty}
            data-variant={variant}
            className={cn(
              styles.trigger,
              variant === "btnType" && styles.triggerBtnType,
              className,
            )}
            disabled={disabled}
            {...props}
          >
            <span className={styles.triggerText}>{displayValue}</span>
            <span className={styles.triggerIconBtn}>
              <Icon name="calendar" className={styles.triggerIcon} />
            </span>
          </button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content
            data-slot="date-range-picker-content"
            align={align}
            side={side}
            sideOffset={8}
            className={cn(styles.content, contentClassName)}
          >
            <DayPicker
              showOutsideDays
              locale={ko}
              mode="range"
              selected={pendingRange}
              onSelect={handleSelect}
              className={styles.calendar}
              classNames={rangeClassNames}
              modifiers={sharedModifiers}
              modifiersClassNames={sharedModifiersClassNames}
              components={{ MonthCaption: MonthCaptionCustom, Nav: EmptyNav }}
              {...calendarProps}
            />
            <div className={styles.footer}>
              <Button
                type="button"
                variant="outline"
                shape="square"
                color="gray"
                size="sm"
                className="size-19"
                onClick={handleClear}
              >
                선택 해제
              </Button>
              <Button
                type="button"
                shape="square"
                size="sm"
                color="black"
                className="size-19"
                onClick={handleApply}
              >
                적용
              </Button>
            </div>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    );
  },
);

DateRangePicker.displayName = "DateRangePicker";

// ─── DateRangePicker (2 inputs) ─────────────────────────────────────────────

type DateRangeTwoPickersProps = Omit<
  React.ComponentPropsWithoutRef<"div">,
  "children" | "value" | "defaultValue"
> & {
  value?: DateRange;
  defaultValue?: DateRange;
  onValueChange?: (value: DateRange | undefined) => void;
  /** 시작일 placeholder */
  startPlaceholder?: string;
  /** 종료일 placeholder */
  endPlaceholder?: string;
  formatString?: string;
  variant?: DatePickerVariant;
  align?: "start" | "center" | "end";
  side?: "top" | "right" | "bottom" | "left";
  calendarProps?: Omit<
    DayPickerProps,
    "mode" | "selected" | "onSelect" | "locale"
  >;
  /**
   * form hidden input name (선택)
   * - `fromName`에 시작일을, `toName`에 종료일을 넣습니다.
   */
  fromName?: string;
  toName?: string;
};

function isBefore(a: Date, b: Date): boolean {
  return a.getTime() < b.getTime();
}

function mergeDisabledBeforeAfter(
  base: DatePickerProps["calendarProps"] | undefined,
  next: { before?: Date; after?: Date }
): DayPickerProps["disabled"] {
  const anyBase = base as any;
  const baseDisabled = anyBase?.disabled as DayPickerProps["disabled"];

  // matcher(함수/배열) 케이스는 보존하고, before/after 오버레이만 적용은 어려우니 그대로 둡니다.
  if (
    baseDisabled == null ||
    typeof baseDisabled !== "object" ||
    Array.isArray(baseDisabled)
  ) {
    return baseDisabled;
  }

  return {
    ...baseDisabled,
    ...next,
  } as DayPickerProps["disabled"];
}

function DateRangePickerTwoPickers({
  value,
  defaultValue,
  onValueChange,
  startPlaceholder = "시작일",
  endPlaceholder = "종료일",
  formatString = "yyyy.MM.dd",
  variant = "default",
  align = "start",
  side = "bottom",
  calendarProps,
  fromName,
  toName,
  className,
  ...rest
}: DateRangeTwoPickersProps) {
  const isControlled = value !== undefined;
  const [internalRange, setInternalRange] = React.useState<DateRange | undefined>(
    defaultValue
  );

  const committed = isControlled ? value : internalRange;

  const handleFromChange = React.useCallback(
    (nextFrom: Date | undefined) => {
      const committedBase = (committed ?? {}) as DateRange;
      const nextRange: DateRange = {
        ...committedBase,
        from: nextFrom ?? undefined,
        to:
          nextFrom != null && committedBase?.to && isBefore(committedBase.to, nextFrom)
            ? nextFrom
            : committedBase?.to,
      };

      const next =
        nextRange.from == null && nextRange.to == null ? undefined : nextRange;

      if (!isControlled) setInternalRange(next);
      onValueChange?.(next);
    },
    [committed, isControlled, onValueChange]
  );

  const handleToChange = React.useCallback(
    (nextTo: Date | undefined) => {
      const committedBase = (committed ?? {}) as DateRange;
      const nextRange: DateRange = {
        ...committedBase,
        to: nextTo ?? undefined,
        from:
          nextTo != null && committedBase?.from && isBefore(nextTo, committedBase.from)
            ? nextTo
            : committedBase?.from,
      };

      const next =
        nextRange.from == null && nextRange.to == null ? undefined : nextRange;

      if (!isControlled) setInternalRange(next);
      onValueChange?.(next);
    },
    [committed, isControlled, onValueChange]
  );

  const startDisabledAfter =
    committed?.to != null ? committed.to : undefined;
  const endDisabledBefore =
    committed?.from != null ? committed.from : undefined;

  const startCalendarProps = startDisabledAfter
    ? {
        ...calendarProps,
        disabled: mergeDisabledBeforeAfter(calendarProps, {
          after: startDisabledAfter,
        }),
      }
    : calendarProps;

  const endCalendarProps = endDisabledBefore
    ? {
        ...calendarProps,
        disabled: mergeDisabledBeforeAfter(calendarProps, {
          before: endDisabledBefore,
        }),
      }
    : calendarProps;

  return (
    <div
      data-slot="date-range-two-pickers"
      className={cn("flex w-full min-w-0 gap-2", className)}
      {...rest}
    >
      <div className="min-w-0 flex-1">
        <DatePicker
          variant={variant}
          align={align}
          side={side}
          formatString={formatString}
          placeholder={startPlaceholder}
          value={committed?.from}
          onValueChange={handleFromChange}
          resetEnabled
          calendarProps={startCalendarProps}
          name={fromName}
        />
      </div>
      <div className="min-w-0 flex-1">
        <DatePicker
          variant={variant}
          align={align}
          side={side}
          formatString={formatString}
          placeholder={endPlaceholder}
          value={committed?.to}
          onValueChange={handleToChange}
          resetEnabled
          calendarProps={endCalendarProps}
          name={toName}
        />
      </div>
    </div>
  );
}

DateRangePickerTwoPickers.displayName = "DateRangePickerTwoPickers";

export { DatePicker, DateRangePicker, DateRangePickerTwoPickers };
export type { DateRange };
export default DatePicker;
