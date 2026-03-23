import { cn } from "@/lib/utils";
import * as React from "react";
import styles from "./Icon.module.css";
import { icons, type IconName, sizeMap, type SizeToken } from "./Icon.types";
interface IconProps
  extends Omit<React.SVGProps<SVGSVGElement>, "size" | "name"> {
  name: IconName;
  size?: SizeToken | number;
  className?: string;
}
const Icon = ({ name, size = "md", className, ...props }: IconProps) => {
  const SvgComponent = icons[name];

  if (!SvgComponent) {
    console.warn(`Icon "${name}" not found in /src/assets/icons`);
    return null;
  }
  const iconSize = typeof size === "string" ? sizeMap[size as SizeToken] : size;
  return (
    <SvgComponent
      width={iconSize}
      height={iconSize}
      className={cn(styles.svgIcon, className, "text-font-g")}
      {...props}
    />
  );
};

export { Icon };
