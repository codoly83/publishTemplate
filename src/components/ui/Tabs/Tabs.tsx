/* eslint-disable react-refresh/only-export-components -- compound Tabs + useTabActive */
import { cva, type VariantProps } from "class-variance-authority";
import { Tabs as TabsPrimitive } from "radix-ui";
import * as React from "react";

import {
  scrollElementIntoViewInContainer,
  useScrollSpy,
} from "@/hooks/useScrollSpy";
import { cn } from "@/lib/utils";
import type { TabsScrollSpyConfig, TabsScrollSpyPanelProps } from "./Tabs.types";
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
  VariantProps<typeof tabsVariants> & {
    type?: string;
    size?: string;
    scrollSpy?: TabsScrollSpyConfig;
  };

const NOOP_SECTION_IDS = ["__tabs_scroll_spy_disabled__"] as const;

function Tabs({
  className,
  orientation = "horizontal",
  variant = "default",
  type,
  size,
  value: valueProp,
  defaultValue,
  onValueChange,
  scrollSpy,
  ...props
}: TabsProps) {
  const [internalValue, setInternalValue] = React.useState(
    defaultValue ?? "",
  );

  const noopRef = React.useRef<HTMLElement | null>(null);

  const scrollSpyActive = useScrollSpy(
    scrollSpy?.scrollContainerRef ?? noopRef,
    scrollSpy ? scrollSpy.sectionIds : NOOP_SECTION_IDS,
    { activeLineRatio: scrollSpy?.activeLineRatio ?? 0.22 },
  );

  const activeValue = scrollSpy
    ? scrollSpyActive
    : valueProp !== undefined
      ? valueProp
      : internalValue;

  const handleValueChange = React.useCallback(
    (val: string) => {
      if (scrollSpy?.scrollContainerRef.current) {
        scrollElementIntoViewInContainer(
          scrollSpy.scrollContainerRef.current,
          val,
          { offsetTop: scrollSpy.scrollOffsetPx ?? 0 },
        );
      }
      if (!scrollSpy && valueProp === undefined) {
        setInternalValue(val);
      }
      onValueChange?.(val);
    },
    [scrollSpy, valueProp, onValueChange],
  );

  const rootProps = scrollSpy
    ? {
        value: scrollSpyActive,
        onValueChange: handleValueChange,
      }
    : {
        value: valueProp,
        defaultValue,
        onValueChange: handleValueChange,
      };

  return (
    <TabsValueContext.Provider value={activeValue}>
      <TabsPrimitive.Root
        data-slot="tabs"
        data-scroll-spy={scrollSpy ? "true" : undefined}
        data-orientation={orientation}
        data-variant={variant}
        data-type={type}
        data-size={size}
        orientation={orientation}
        className={cn(tabsVariants({ variant, type, size }), className)}
        {...props}
        {...rootProps}
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

/**
 * `scrollSpy`가 켜진 `Tabs`에서 사용합니다.
 * Radix `TabsContent`와 달리 **비활성 패널도 DOM에 그대로 두며** 숨기지 않습니다.
 * 스크롤로 보이는 패널에 맞춰 활성 탭이 바뀌고, 탭 클릭 시 컨테이너만 스크롤합니다.
 */
function TabsScrollSpyPanel({
  value,
  panelId,
  className,
  children,
  ...rest
}: TabsScrollSpyPanelProps) {
  const activeValue = React.useContext(TabsValueContext);
  const isActive = activeValue === value;

  return (
    <TabActiveContext.Provider value={isActive}>
      <div
        id={panelId ?? value}
        role="tabpanel"
        data-slot="tabs-scroll-spy-panel"
        data-state={isActive ? "active" : "inactive"}
        className={cn(styles.tabsScrollSpyPanel, className)}
        {...rest}
      >
        {children}
      </div>
    </TabActiveContext.Provider>
  );
}

export {
  Tabs,
  TabsContent,
  TabsList,
  TabsScrollSpyPanel,
  TabsTrigger,
  useTabActive,
};
