import { cva } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";
import styles from "./TextArea.module.css";

const textareaVariants = cva(styles.textarea);

type TextareaProps = React.ComponentProps<"textarea">;

function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(textareaVariants(), className)}
      {...props}
    />
  );
}

export { Textarea };
