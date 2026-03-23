import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { Button } from "@/components/ui/Button/Button";
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

type InputProps = React.ComponentProps<"input">;
type InputGroupProps = React.ComponentProps<"div"> &
  VariantProps<typeof inputGroupVariants>;
type InputGroupButtonProps = React.ComponentProps<typeof Button>;
type InputGroupTextProps = React.ComponentProps<"span">;
type InputGroupInputProps = React.ComponentProps<"input">;
type InputGroupTextareaProps = React.ComponentProps<"textarea">;

function Input({ className, type, ...props }: InputProps) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(inputVariants(), className)}
      {...props}
    />
  );
}

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

function InputGroupInput({ className, ...props }: InputGroupInputProps) {
  return (
    <Input
      data-slot="input-group-control"
      className={cn(
        styles.inputGroupControl,
        styles.inputGroupInput,
        className
      )}
      {...props}
    />
  );
}

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
