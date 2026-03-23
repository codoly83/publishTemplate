import { cva, type VariantProps } from "class-variance-authority";
import { Tabs as TabsPrimitive } from "radix-ui";
import * as React from "react";

import { cn } from "@/lib/utils";
import styles from "./Tabs.module.css";

// 현재 활성 탭 value를 공유하는 Context
const TabsValueContext = React.createContext<string>("");

// TabsContent 내부 컴포넌트가 자신의 탭이 활성화됐는지 알기 위한 Context
const TabActiveContext = React.createContext<boolean>(false);

/** TabsContent 내부에서 현재 탭이 활성화됐는지 여부를 반환하는 훅 */
function useTabActive(): boolean {
  return React.useContext(TabActiveContext);
}

const tabsVariants = cva(styles.tabs, {
  variants: {
    variant: {
      default: styles.variantDefault,
      btn: styles.variantBtn,
    },
    type: {
      line: styles.typeLine,
    },
    size: {
      default: styles.sizeDefault,
      sm: styles.sizeSm,
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type TabsProps = React.ComponentProps<typeof TabsPrimitive.Root> &
  VariantProps<typeof tabsVariants> & { type?: string; size?: string };

function Tabs({
  className,
  orientation = "horizontal",
  variant = "default",
  type,
  size,
  value: valueProp,
  defaultValue,
  onValueChange,
  ...props
}: TabsProps) {
  const [internalValue, setInternalValue] = React.useState(
    defaultValue ?? ""
  );

  // controlled / uncontrolled 모두 대응
  const activeValue = valueProp !== undefined ? valueProp : internalValue;

  const handleValueChange = React.useCallback(
    (val: string) => {
      if (valueProp === undefined) setInternalValue(val);
      onValueChange?.(val);
    },
    [valueProp, onValueChange]
  );

  return (
    <TabsValueContext.Provider value={activeValue}>
      <TabsPrimitive.Root
        data-slot="tabs"
        data-orientation={orientation}
        data-variant={variant}
        data-type={type}
        data-size={size}
        orientation={orientation}
        className={cn(tabsVariants({ variant, type, size }), className)}
        value={valueProp}
        defaultValue={defaultValue}
        onValueChange={handleValueChange}
        {...props}
      />
    </TabsValueContext.Provider>
  );
}

type TabsListProps = React.ComponentProps<typeof TabsPrimitive.List>;

function TabsList({ className, ...props }: TabsListProps) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(styles.tabsList, className)}
      {...props}
    />
  );
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(styles.tabsTrigger, className)}
      {...props}
    />
  );
}

function TabsContent({
  className,
  value,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  const activeValue = React.useContext(TabsValueContext);
  const isActive = activeValue === value;

  return (
    <TabActiveContext.Provider value={isActive}>
      <TabsPrimitive.Content
        data-slot="tabs-content"
        className={cn(styles.tabsContent, className)}
        value={value}
        {...props}
      />
    </TabActiveContext.Provider>
  );
}

export { Tabs, TabsContent, TabsList, TabsTrigger, useTabActive };
