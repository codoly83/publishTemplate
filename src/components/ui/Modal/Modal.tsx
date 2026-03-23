import { Icon } from "@/components/ui/Icon/Icon";
import { ScrollArea } from "@/components/ui";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { Dialog as DialogPrimitive } from "radix-ui";
import * as React from "react";
import styles from "./Modal.module.css";

function Modal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="modal" {...props} />;
}

function ModalTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="modal-trigger" {...props} />;
}

function ModalPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="modal-portal" {...props} />;
}

function ModalClose({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="modal-close" {...props} />;
}

function ModalOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="modal-overlay"
      className={cn(styles.modalOverlay, className)}
      {...props}
    />
  );
}

const modalContentVariants = cva(styles.modalContent, {
  variants: {
    size: {
      alert: styles.sizeAlert,
      small: styles.sizeSmall,
      medium: styles.sizeMedium,
      large: styles.sizeLarge,
      full: styles.sizeFullscreen,
    },
  },
  defaultVariants: {
    size: "medium",
  },
});

type ModalSize = "alert" | "small" | "medium" | "large" | "full";

function ModalContent({
  className,
  children,
  size = "medium",
  showCloseButton = true,
  "aria-describedby": ariaDescribedby,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> &
  VariantProps<typeof modalContentVariants> & {
    showCloseButton?: boolean;
  }) {
  const hasTitle = hasModalPart(children, ModalTitle);
  const hasDescription = hasModalPart(children, ModalDescription);

  return (
    <ModalPortal>
      <ModalOverlay />
      <DialogPrimitive.Content
        data-slot="modal-content"
        data-size={size}
        className={cn(modalContentVariants({ size }), className)}
        {...props}
        aria-describedby={hasDescription ? ariaDescribedby : undefined}
      >
        {showCloseButton && (
          <DialogPrimitive.Close
            data-slot="modal-close-btn"
            className={styles.closeButton}
            aria-label="닫기"
          >
            <Icon name="btn-close" size="md"/>
          </DialogPrimitive.Close>
        )}
        {!hasTitle && (
          <DialogPrimitive.Title
            data-slot="modal-title"
            className={styles.visuallyHidden}
          >
            알림
          </DialogPrimitive.Title>
        )}
        {children}
      </DialogPrimitive.Content>
    </ModalPortal>
  );
}

function ModalHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="modal-header"
      className={cn(styles.modalHeader, className)}
      {...props}
    />
  );
}

function ModalBody({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <ScrollArea className={cn(styles.modalBodyScrollArea, className)}>
      <div data-slot="modal-body" className={cn(styles.modalBody)} {...props} />
    </ScrollArea>
  );
}

function ModalFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="modal-footer"
      className={cn(styles.modalFooter, className)}
      {...props}
    />
  );
}

function hasModalPart(
  children: React.ReactNode,
  part: React.ComponentType,
): boolean {
  return React.Children.toArray(children).some((child) => {
    if (React.isValidElement(child)) {
      if (child.type === part) return true;
      const nested = (child.props as { children?: React.ReactNode }).children;
      if (nested) return hasModalPart(nested, part);
    }
    return false;
  });
}

function ModalTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="modal-title"
      className={cn(styles.modalTitle, className)}
      {...props}
    />
  );
}

function ModalDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="modal-description"
      className={cn(styles.modalDescription, className)}
      {...props}
    />
  );
}

export {
  Modal,
  ModalBody,
  ModalClose,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalPortal,
  ModalTitle,
  ModalTrigger,
};
export type { ModalSize };
