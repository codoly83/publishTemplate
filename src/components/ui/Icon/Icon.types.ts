import * as React from "react";

const svgIcons = import.meta.glob("/src/assets/icons/*.svg", {
  eager: true,
  query: "?react",
}) as Record<string, { default: React.FC<React.SVGProps<SVGSVGElement>> }>;

export const icons = Object.fromEntries(
  Object.entries(svgIcons).map(([path, component]) => {
    const name = path.split("/").pop()?.replace(".svg", "") || "";
    return [name, component.default];
  })
);

export type IconName =
  | "admin"
  | "ai-agent-line"
  | "arrow-down"
  | "arrow-left-line"
  | "arrow-left-right"
  | "attachment"
  | "btn-close"
  | "calculator-on"
  | "calendar"
  | "check-line"
  | "check-mark"
  | "checkbox-circle-fill"
  | "checkbox-circle-line"
  | "checkbox-circle"
  | "close-circle"
  | "datepicker-left-double"
  | "datepicker-left"
  | "datepicker-right-double"
  | "datepicker-right"
  | "desktop-icon"
  | "error-warning-fill"
  | "error-warning"
  | "identification-on"
  | "loader"
  | "logo"
  | "menu-fold"
  | "menu-unfold"
  | "options"
  | "search"
  | "send"
  | "user-settings"
  | "waiting-on";

export const iconNames = Object.keys(icons) as IconName[];

export const sizeMap = {
  sm: 16,
  md: 24,
  lg: 48,
} as const;


// console.log(
//   Object.keys(icons)
//     .map((name) => `"${name}"`)
//     .join(" | ")
// );

export type SizeToken = keyof typeof sizeMap;
