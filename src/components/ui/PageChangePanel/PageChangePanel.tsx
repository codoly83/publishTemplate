import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { useEffect, useRef, useState } from "react";
import styles from "./PageChangePanel.module.css";

export const LAYOUTS = [
  { value: "default", label: "기본 레이아웃" },
  { value: "twoCol", label: "좌우 2분할" },
  { value: "twoCol2", label: "상하 2분할" },
  { value: "threeCol", label: "3분할" },
] as const;

export type LayoutType = (typeof LAYOUTS)[number]["value"];

export interface SelectConfig {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
}

interface PageChangePanelProps {
  selects: SelectConfig[];
  initialPos?: { x: number; y: number };
}

export function PageChangePanel({ selects, initialPos }: PageChangePanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(
    initialPos ?? null
  );
  const dragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!pos && panelRef.current) {
      const w = panelRef.current.offsetWidth;
      setPos({ x: (window.innerWidth - w) / 2, y: 12 });
    }
  }, []);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest("[data-no-drag]")) return;
    const currentPos = pos ?? {
      x: panelRef.current?.getBoundingClientRect().left ?? 0,
      y: 12,
    };
    dragging.current = true;
    offset.current = {
      x: e.clientX - currentPos.x,
      y: e.clientY - currentPos.y,
    };
    e.preventDefault();
  };

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!dragging.current) return;
      setPos({
        x: e.clientX - offset.current.x,
        y: e.clientY - offset.current.y,
      });
    };
    const onUp = () => {
      dragging.current = false;
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  const panelStyle = pos
    ? { left: pos.x, top: pos.y }
    : { left: "50%", top: 12, transform: "translateX(-50%)" };

  return (
    <div
      ref={panelRef}
      className={styles.pageChangeArea}
      style={panelStyle}
      onMouseDown={handleMouseDown}
    >
      <div className={styles.dragHandle} aria-hidden>
        {Array.from({ length: 6 }).map((_, i) => (
          <span key={i} />
        ))}
      </div>
      {selects.map((select, index) => (
        <div key={index} className={styles.selectGroup} data-no-drag>
          <span className={styles.label}>{select.label}</span>
          <div className={styles.noDrag}>
            <Select value={select.value} onValueChange={select.onChange}>
              <SelectTrigger>
                <SelectValue placeholder={select.placeholder ?? "선택"} />
              </SelectTrigger>
              <SelectContent>
                {select.options.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {index < selects.length - 1 && (
            <span className={styles.divider} aria-hidden />
          )}
        </div>
      ))}
    </div>
  );
}
