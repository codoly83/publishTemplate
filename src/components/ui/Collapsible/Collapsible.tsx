import * as React from "react";
import { Collapsible as CollapsiblePrimitive } from "radix-ui";

import { cn } from "@/lib/utils";
import styles from "./Collapsible.module.scss";

type DivProps = React.ComponentPropsWithoutRef<"div">;

export type CollapsibleGroupSingleProps = DivProps & {
  type?: "single";
  /**
   * `type="single"`일 때, 열린 항목을 다시 눌러 모두 닫을 수 있는지 (Radix Accordion `collapsible`과 동일).
   * `false`이면 한 항목이 열린 뒤에는 항상 하나가 열린 상태로 유지됩니다.
   * @default true
   */
  collapsible?: boolean;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string | undefined) => void;
};

export type CollapsibleGroupMultipleProps = DivProps & {
  type: "multiple";
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
};

export type CollapsibleGroupProps =
  | CollapsibleGroupSingleProps
  | CollapsibleGroupMultipleProps;

type CollapsibleGroupContextValue = {
  isOpen: (itemValue: string) => boolean;
  setOpen: (itemValue: string, nextOpen: boolean) => void;
};

const CollapsibleGroupContext = React.createContext<
  CollapsibleGroupContextValue | undefined
>(undefined);

function CollapsibleGroupSingleImpl({
  type: _type,
  collapsible = true,
  value: valueProp,
  defaultValue,
  onValueChange,
  className,
  children,
  ...divProps
}: CollapsibleGroupSingleProps) {
  const [uncontrolled, setUncontrolled] = React.useState<string | undefined>(
    defaultValue,
  );
  const controlled = valueProp !== undefined;
  const value = controlled ? valueProp : uncontrolled;

  const setValue = React.useCallback(
    (next: string | undefined) => {
      if (!controlled) setUncontrolled(next);
      onValueChange?.(next);
    },
    [controlled, onValueChange],
  );

  const setOpen = React.useCallback(
    (itemValue: string, nextOpen: boolean) => {
      if (nextOpen) {
        setValue(itemValue);
        return;
      }
      if (value === itemValue && collapsible) {
        setValue(undefined);
      }
    },
    [value, setValue, collapsible],
  );

  const isOpen = React.useCallback(
    (itemValue: string) => value === itemValue,
    [value],
  );

  const ctx = React.useMemo<CollapsibleGroupContextValue>(
    () => ({ isOpen, setOpen }),
    [isOpen, setOpen],
  );

  return (
    <CollapsibleGroupContext.Provider value={ctx}>
      <div
        data-slot="collapsible-group"
        className={cn(styles.group, className)}
        {...divProps}
      >
        {children}
      </div>
    </CollapsibleGroupContext.Provider>
  );
}

function CollapsibleGroupMultipleImpl({
  type: _type,
  value: valueProp,
  defaultValue = [],
  onValueChange,
  className,
  children,
  ...divProps
}: CollapsibleGroupMultipleProps) {
  const [uncontrolled, setUncontrolled] =
    React.useState<string[]>(defaultValue);
  const controlled = valueProp !== undefined;
  const value = controlled ? valueProp : uncontrolled;

  const setValue = React.useCallback(
    (next: string[]) => {
      if (!controlled) setUncontrolled(next);
      onValueChange?.(next);
    },
    [controlled, onValueChange],
  );

  const setOpen = React.useCallback(
    (itemValue: string, nextOpen: boolean) => {
      const next = new Set(value);
      if (nextOpen) next.add(itemValue);
      else next.delete(itemValue);
      setValue([...next]);
    },
    [value, setValue],
  );

  const isOpen = React.useCallback(
    (itemValue: string) => value.includes(itemValue),
    [value],
  );

  const ctx = React.useMemo<CollapsibleGroupContextValue>(
    () => ({ isOpen, setOpen }),
    [isOpen, setOpen],
  );

  return (
    <CollapsibleGroupContext.Provider value={ctx}>
      <div
        data-slot="collapsible-group"
        className={cn(styles.group, className)}
        {...divProps}
      >
        {children}
      </div>
    </CollapsibleGroupContext.Provider>
  );
}

function CollapsibleGroup(props: CollapsibleGroupProps) {
  const type = props.type ?? "single";
  if (type === "multiple") {
    return (
      <CollapsibleGroupMultipleImpl
        {...(props as CollapsibleGroupMultipleProps)}
      />
    );
  }
  return (
    <CollapsibleGroupSingleImpl {...(props as CollapsibleGroupSingleProps)} />
  );
}

type CollapsibleRootProps = React.ComponentProps<
  typeof CollapsiblePrimitive.Root
>;

export type CollapsibleGroupedProps = Omit<
  CollapsibleRootProps,
  "open" | "defaultOpen" | "onOpenChange"
> & {
  value: string;
};

export type CollapsibleStandaloneProps = CollapsibleRootProps & {
  value?: never;
};

export type CollapsibleProps = CollapsibleStandaloneProps | CollapsibleGroupedProps;

function Collapsible(props: CollapsibleProps) {
  const ctx = React.useContext(CollapsibleGroupContext);
  const grouped =
    "value" in props &&
    props.value !== undefined &&
    typeof props.value === "string";

  if (grouped && ctx) {
    const { value, className, ...rest } = props as CollapsibleGroupedProps;
    return (
      <CollapsiblePrimitive.Root
        data-slot="collapsible"
        open={ctx.isOpen(value)}
        onOpenChange={(open) => ctx.setOpen(value, open)}
        className={cn(styles.collapsible, className)}
        {...rest}
      />
    );
  }

  if (grouped && !ctx) {
    if (import.meta.env.DEV) {
      console.warn(
        "Collapsible: `value` prop은 <CollapsibleGroup> 안에서만 사용하세요. 단독 동작으로 렌더합니다.",
      );
    }
    const { value: _value, className, ...rest } = props as CollapsibleGroupedProps;
    return (
      <CollapsiblePrimitive.Root
        data-slot="collapsible"
        className={cn(styles.collapsible, className)}
        {...rest}
      />
    );
  }

  const { className, ...rest } = props as CollapsibleRootProps;
  return (
    <CollapsiblePrimitive.Root
      data-slot="collapsible"
      className={cn(styles.collapsible, className)}
      {...rest}
    />
  );
}

function CollapsibleTrigger({
  className,
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleTrigger>) {
  return (
    <CollapsiblePrimitive.CollapsibleTrigger
      data-slot="collapsible-trigger"
      className={cn(styles.trigger, className)}
      {...props}
    />
  );
}

function CollapsibleContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleContent>) {
  return (
    <CollapsiblePrimitive.CollapsibleContent
      data-slot="collapsible-content"
      className={cn(styles.content, className)}
      {...props}
    >
      <div className={styles.contentInner}>{children}</div>
    </CollapsiblePrimitive.CollapsibleContent>
  );
}

/** Chevron 등 아이콘에 지정하면 트리거 열림 시 모듈 SCSS로 회전합니다. */
const collapsibleChevronClassName = styles.chevron;

export {
  Collapsible,
  CollapsibleGroup,
  CollapsibleTrigger,
  CollapsibleContent,
  collapsibleChevronClassName,
};
