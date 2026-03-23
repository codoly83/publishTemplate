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
      placeholder = "날짜를 선택하세요",
      side = "bottom",
      value,
      variant = "default",
      ...props
    },
    ref
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
      [isControlled, onValueChange]
    );

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
              className
            )}
            disabled={disabled}
            {...props}
          >
            <span className={styles.triggerText}>{displayValue}</span>
            {variant === "btnType" ? (
              <span className={styles.triggerIconBtn}>
                <Icon name="calendar" className={styles.triggerIcon} />
              </span>
            ) : (
              <Icon name="calendar" className={styles.triggerIcon} />
            )}
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
  }
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
    ref
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
      [committedRange]
    );

    // 달력 날짜 클릭: pending만 업데이트 (자동 닫힘 없음)
    const handleSelect = React.useCallback(
      (nextValue: DateRange | undefined) => {
        setPendingRange(nextValue);
      },
      []
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
              className
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
  }
);

DateRangePicker.displayName = "DateRangePicker";

export { DatePicker, DateRangePicker };
export type { DateRange };
export default DatePicker;
