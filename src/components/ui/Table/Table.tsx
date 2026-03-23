import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import styles from "./Table.module.css";
import { ScrollArea } from "../ScrollArea/ScrollArea";

const tableVariants = cva(styles.tableContainer, {
  variants: {
    variant: {
      default: styles.variantDefault,
      sub: styles.variantSub,
    },
    type: {
      horizontal: styles.typeHorizontal,
      vertical: styles.typeVertical,
    },
  },
  defaultVariants: {
    variant: "default",
    type: "horizontal",
  },
});

type TableProps = React.ComponentProps<"table"> &
  VariantProps<typeof tableVariants>;

function Table({
  className,
  variant = "default",
  type = "horizontal",
  ...props
}: TableProps) {
  return (
    <div
      data-slot="table-container"
      data-variant={variant}
      data-type={type}
      className={cn(tableVariants({ variant, type }), className)}
    >
        <table data-slot="table" className={cn(styles.table)} {...props} />
    </div>
  );
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn(styles.tableHeader, className)}
      {...props}
    />
  );
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn(styles.tableBody, className)}
      {...props}
    />
  );
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(styles.tableFooter, className)}
      {...props}
    />
  );
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn(styles.tableRow, className)}
      {...props}
    />
  );
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn(styles.tableHead, className)}
      {...props}
    />
  );
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn(styles.tableCell, className)}
      {...props}
    />
  );
}

function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn(styles.tableCaption, className)}
      {...props}
    />
  );
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};
