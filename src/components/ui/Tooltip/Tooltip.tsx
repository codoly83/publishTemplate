import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Tooltip as TooltipPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";
import styles from "./Tooltip.module.scss";

type SetOpenAction = boolean | ((prev: boolean) => boolean);

/** clickMode일 때 트리거/콘텐츠가 공유하는 상태 (Radix Tooltip은 hover 전용이라 포인터 이벤트로 직접 제어) */
const TooltipContext = React.createContext<{
  clickMode: boolean;
  open: boolean;
  setOpen: (next: SetOpenAction) => void;
  /** Radix가 pointerdown에서 보내는 닫힘을 무시 (토글은 pointerup에서만) */
  suppressPointerDownCloseRef: React.MutableRefObject<boolean>;
} | null>(null);

const tooltipProviderVariants = cva(styles.tooltipProvider, {
  variants: {
    delay: {
      default: "delay-0",
      fast: "delay-0",
      slow: "delay-300",
    },
  },
  defaultVariants: {
    delay: "default",
  },
});

const tooltipContentVariants = cva(styles.tooltipContent, {
  variants: {
    variant: {
      default: styles.variantDefault,
      light: styles.variantLight,
      dark: styles.variantDark,
      warning: styles.variantWarning,
      error: styles.variantError,
      success: styles.variantSuccess,
      info: styles.variantInfo,
    },
    size: {
      sm: styles.sizeSm,
      md: styles.sizeMd,
      lg: styles.sizeLg,
    },
    arrow: {
      true: "",
      false: "",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
    arrow: true,
  },
});

interface TooltipProviderProps
  extends
    React.ComponentProps<typeof TooltipPrimitive.Provider>,
    VariantProps<typeof tooltipProviderVariants> {
  delayDuration?: number;
  className?: string;
  disableHoverableContent?: boolean;
}

function TooltipProvider({
  className,
  delay = "default",
  delayDuration = 100,
  disableHoverableContent,
  ...props
}: TooltipProviderProps) {
  return (
    <div className={cn(tooltipProviderVariants({ delay }), className)}>
      <TooltipPrimitive.Provider
        data-slot="tooltip-provider"
        delayDuration={delayDuration}
        disableHoverableContent={disableHoverableContent}
        {...props}
      />
    </div>
  );
}

interface TooltipProps extends React.ComponentProps<
  typeof TooltipPrimitive.Root
> {
  delayDuration?: number;
  /** true: hover로 열리지 않고 클릭/키보드로만 토글 (내부 또는 제어 open 사용) */
  clickMode?: boolean;
}

function Tooltip({
  delayDuration = 100,
  clickMode = false,
  open: openProp,
  defaultOpen,
  onOpenChange,
  disableHoverableContent,
  ...props
}: TooltipProps) {
  const [internalOpen, setInternalOpen] = React.useState(
    () => defaultOpen ?? false,
  );
  const isControlled = openProp !== undefined;
  const open = isControlled ? openProp : internalOpen;

  /** clickMode + defaultOpen 시 마운트 직후 Radix가 보내는 첫 false를 무시 (초기 열림 유지) */
  const ignoreFirstRadixCloseRef = React.useRef(
    Boolean(clickMode && !isControlled && defaultOpen === true),
  );

  /** Radix Trigger: pointerdown 시 open이면 onClose → pointerup 토글과 겹쳐 "닫혔다 다시 열림" 방지 */
  const suppressPointerDownCloseRef = React.useRef(false);

  const setOpen = React.useCallback(
    (next: SetOpenAction) => {
      if (isControlled) {
        const resolved =
          typeof next === "function" ? next(openProp as boolean) : next;
        if (
          clickMode &&
          resolved === false &&
          suppressPointerDownCloseRef.current
        ) {
          suppressPointerDownCloseRef.current = false;
          return;
        }
        onOpenChange?.(resolved);
        return;
      }
      setInternalOpen((prev) => {
        const resolved = typeof next === "function" ? next(prev) : next;
        if (ignoreFirstRadixCloseRef.current && resolved === false) {
          ignoreFirstRadixCloseRef.current = false;
          return prev;
        }
        if (
          clickMode &&
          resolved === false &&
          suppressPointerDownCloseRef.current
        ) {
          suppressPointerDownCloseRef.current = false;
          return prev;
        }
        if (ignoreFirstRadixCloseRef.current) {
          ignoreFirstRadixCloseRef.current = false;
        }
        onOpenChange?.(resolved);
        return resolved;
      });
    },
    [clickMode, isControlled, openProp, onOpenChange],
  );

  const contextValue = React.useMemo(
    () => ({
      clickMode,
      open,
      setOpen,
      suppressPointerDownCloseRef,
    }),
    [clickMode, open, setOpen],
  );

  // clickMode: 항상 제어 모드 (hover 열림 방지). 일반 모드: 비제어일 때는 Radix에 맡김
  const rootProps = clickMode
    ? { open, onOpenChange: setOpen }
    : isControlled
      ? { open: openProp, onOpenChange }
      : { defaultOpen, onOpenChange };

  // clickMode: TooltipContentHoverable의 document pointermove로 닫히지 않게 비-hoverable 콘텐츠 사용
  const resolvedDisableHoverableContent = clickMode
    ? true
    : disableHoverableContent;

  return (
    <TooltipContext.Provider value={contextValue}>
      <TooltipPrimitive.Root
        data-slot="tooltip"
        delayDuration={delayDuration}
        disableHoverableContent={resolvedDisableHoverableContent}
        {...rootProps}
        {...props}
      />
    </TooltipContext.Provider>
  );
}

function TooltipTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  const ctx = React.useContext(TooltipContext);

  if (!ctx?.clickMode) {
    return (
      <TooltipPrimitive.Trigger
        data-slot="tooltip-trigger"
        className={cn(styles.tooltipTrigger, className)}
        {...props}
      />
    );
  }

  // Radix는 user 핸들러를 먼저 실행 → preventDefault 시 내부 hover/click 닫힘이 스킵됨
  // pointerleave는 종종 cancelable이 아니라 preventDefault가 먹지 않음 → defaultPrevented를 맞춰 두 번째 핸들러(onTriggerLeave→닫힘)를 스킵
  const blockRadixFollowUp = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!e.defaultPrevented) {
      try {
        Object.defineProperty(e, "defaultPrevented", {
          value: true,
          configurable: true,
        });
      } catch {
        /* noop */
      }
    }
  };

  // Radix: pointerdown에서 open이면 onClose가 먼저 실행될 수 있음 → setOpen에서 suppress로 무시, 실제 토글은 pointerup
  const pointerOpenedRef = React.useRef(false);
  const keyboardToggledRef = React.useRef(false);

  return (
    <TooltipPrimitive.Trigger
      data-slot="tooltip-trigger"
      className={cn(styles.tooltipTrigger, className)}
      {...props}
      onPointerMove={(e) => {
        props.onPointerMove?.(e);
        e.preventDefault();
      }}
      onPointerLeave={(e) => {
        props.onPointerLeave?.(e);
        blockRadixFollowUp(e);
      }}
      onPointerDown={(e) => {
        if (ctx.open) {
          ctx.suppressPointerDownCloseRef.current = true;
        }
        props.onPointerDown?.(e);
        e.preventDefault();
        pointerOpenedRef.current = true;
      }}
      onPointerUp={(e) => {
        props.onPointerUp?.(e);
        if (e.pointerType === "mouse" && e.button !== 0) return;
        e.preventDefault();
        ctx.suppressPointerDownCloseRef.current = false;
        ctx.setOpen((prev) => !prev);
      }}
      onClick={(e) => {
        props.onClick?.(e);
        e.preventDefault();
        if (pointerOpenedRef.current) {
          pointerOpenedRef.current = false;
          return;
        }
        if (keyboardToggledRef.current) {
          keyboardToggledRef.current = false;
          return;
        }
        ctx.setOpen((prev) => !prev);
      }}
      onKeyDown={(e) => {
        props.onKeyDown?.(e);
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          keyboardToggledRef.current = true;
          ctx.setOpen((prev) => !prev);
        }
      }}
    />
  );
}

interface TooltipContentProps
  extends
    React.ComponentProps<typeof TooltipPrimitive.Content>,
    VariantProps<typeof tooltipContentVariants> {
  showArrow?: boolean;
  portal?: boolean;
  container?: HTMLElement | null | React.RefObject<HTMLElement>;
  showCloseButton?: boolean;
  onClose?: () => void;
}

function TooltipContent({
  className,
  variant = "default",
  size = "md",
  arrow = false,
  sideOffset = 8,
  portal = true,
  container,
  showCloseButton = false,
  onClose,
  children,
  ...props
}: TooltipContentProps) {
  const ctx = React.useContext(TooltipContext);

  const handleClose = React.useCallback(() => {
    if (ctx?.clickMode) ctx.setOpen(false);
    onClose?.();
  }, [ctx, onClose]);

  const content = (
    <TooltipPrimitive.Content
      data-slot="tooltip-content"
      sideOffset={sideOffset}
      className={cn(
        tooltipContentVariants({ variant, size, arrow: !!arrow }),
        className,
      )}
      {...props}
    >
      <div className="relative">
        {children}
        {showCloseButton && (
          <button
            type="button"
            className={styles.tooltipCloseButton}
            onClick={(e) => {
              e.stopPropagation();
              handleClose();
            }}
            aria-label="Close tooltip"
          >
            ×
          </button>
        )}
      </div>
      {arrow && (
        <TooltipPrimitive.Arrow
          className={cn(styles.tooltipArrow)}
          width={12}
          height={6}
        />
      )}
    </TooltipPrimitive.Content>
  );

  if (portal) {
    if (container) {
      const containerElement =
        container && "current" in container ? container.current : container;
      return (
        <TooltipPrimitive.Portal container={containerElement}>
          {content}
        </TooltipPrimitive.Portal>
      );
    }
    return <TooltipPrimitive.Portal>{content}</TooltipPrimitive.Portal>;
  }

  return content;
}

export {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
  tooltipProviderVariants,
  tooltipContentVariants,
};
export type {
  VariantProps as TooltipVariantProps,
  TooltipContentProps,
  TooltipProps,
  TooltipProviderProps,
};
