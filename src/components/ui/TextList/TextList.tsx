import * as React from "react";

import styles from "./TextList.module.css";
import { cn } from "@/lib/utils";

export type TextListMarkerType =
  | "dot"
  | "star"
  | "square"
  | "decimal"
  | "circled";

export type TextListSize = "sm" | "md" | "lg";

export type TextListItem =
  | React.ReactNode
  | {
      id?: React.Key;
      content: React.ReactNode;
      /**
       * 이 항목에만 적용되는 마커 타입(있으면 props의 `markerType`보다 우선).
       * - 예: `dot`, `decimal`, `circled`
       */
      markerType?: TextListMarkerType;
      /**
       * 항목 객체에만 적용되는 마커 타입 별칭
       * (`markerType`과 동일)
       */
      type?: TextListMarkerType;
      /**
       * 마커를 직접 지정(예: "A)", "• Custom", "—" 등).
       * `marker`가 있으면 `markerType`/`decimal` 계산은 무시합니다.
       */
      marker?: React.ReactNode;
      /**
       * `decimal` / `circled`일 때 표시할 번호를 강제로 지정합니다.
       * (예: 섹션 내부 번호가 1부터 시작하지 않는 경우)
       */
      number?: number;
    };

export interface TextListItemElementProps {
  id?: React.Key;
  children: React.ReactNode;
  markerType?: TextListMarkerType;
  type?: TextListMarkerType;
  marker?: React.ReactNode;
  number?: number;
}

export interface TextListProps {
  items?: TextListItem[];
  children?: React.ReactNode;
  /**
   * 기본 마커 타입 (권장: `type`)
   * 항목 객체(`items[]`)에 `markerType`이 있으면 그 값을 우선 사용합니다.
   */
  markerType?: TextListMarkerType;
  /**
   * 기본 마커 타입
   * (사용자 요구사항에 맞춘 별칭)
   */
  type?: TextListMarkerType;
  /** `decimal` / `circled`의 시작 번호(기본 1) */
  start?: number;
  /** 폰트/마커 크기 */
  size?: TextListSize;
  /** 항목 간 세로 간격 (px 또는 CSS length string) */
  gap?: number | string;
  className?: string;
}

function TextListItemElement(_props: TextListItemElementProps) {
  // 실제 렌더링은 부모 `TextList`가 `children`을 스캔해서 처리합니다.
  return null;
}

function circledNumber(n: number): string {
  // 유니코드: ①(2460) ~ ⑳(2473)까지 지원
  if (!Number.isFinite(n)) return String(n);
  const k = Math.trunc(n);
  const base = 0x2460;
  const offset = k - 1;
  const codePoint = base + offset;
  if (codePoint < 0x2460 || codePoint > 0x2473) return String(k);
  return String.fromCharCode(codePoint);
}

function isItemObject(
  item: TextListItem,
): item is Exclude<TextListItem, React.ReactNode> {
  // ReactNode 중 plain object는 드물지만(보통 React element), 안전하게 형태를 검사합니다.
  return (
    item !== null &&
    typeof item === "object" &&
    !React.isValidElement(item) &&
    !Array.isArray(item) &&
    "content" in (item as Record<string, unknown>)
  );
}

const TextListImpl = ({
  items,
  children,
  markerType,
  type,
  start = 1,
  size = "md",
  gap,
  className,
}: TextListProps) => {
  const effectiveMarkerType = type ?? markerType ?? "dot";

  const childrenItems = React.useMemo(() => {
    if (!children) return [] as TextListItem[];

    const acc: TextListItem[] = [];
    React.Children.forEach(children, (child) => {
      if (!child) return;

      if (
        React.isValidElement(child) &&
        child.type === TextListItemElement
      ) {
        const p = child.props as TextListItemElementProps;
        acc.push({
          id: p.id,
          content: p.children,
          markerType: p.markerType,
          type: p.type,
          marker: p.marker,
          number: p.number,
        });
        return;
      }

      // `TextList.Item`이 아닌 자식도 있으면(예: 문자열/일반 ReactNode)
      // 기본 type을 적용하는 content로 취급합니다.
      acc.push(child);
    });

    return acc;
  }, [children]);

  const mergedItems = React.useMemo(() => {
    if (items && items.length) {
      return [...items, ...childrenItems];
    }
    return childrenItems;
  }, [childrenItems, items]);

  const gapValue =
    gap === undefined
      ? undefined
      : typeof gap === "number"
        ? `${gap}px`
        : String(gap);

  const rootStyle = React.useMemo(() => {
    if (!gapValue) return undefined;
    return { ["--text-list-gap" as any]: gapValue } as React.CSSProperties;
  }, [gapValue]);

  return (
    <ul
      className={cn(styles.list, className)}
      style={rootStyle}
      data-size={size}
    >
      {mergedItems.map((item, index) => {
        const itemKey = isItemObject(item)
          ? item.id ?? index
          : (index as React.Key);

        if (isItemObject(item)) {
          const itemEffectiveMarkerType =
            item.type ?? item.markerType ?? effectiveMarkerType;
          const n = item.number ?? start + index;

          let markerNode = item.marker;
          if (markerNode === undefined) {
            switch (itemEffectiveMarkerType) {
              case "dot":
                markerNode = "•";
                break;
              case "star":
                markerNode = "★";
                break;
              case "square":
                markerNode = "■";
                break;
              case "decimal":
                markerNode = `${n}.`;
                break;
              case "circled":
                markerNode = circledNumber(n);
                break;
              default:
                markerNode = "•";
            }
          }

          return (
            <li key={itemKey} className={styles.row}>
              <span className={styles.marker} aria-hidden>
                {markerNode}
              </span>
              <span className={styles.content}>{item.content}</span>
            </li>
          );
        }

        // string/ReactNode 형태는 전체 props `markerType`으로 처리합니다.
        const n = start + index;
        let markerNode: React.ReactNode;
        switch (effectiveMarkerType) {
          case "dot":
            markerNode = "•";
            break;
          case "star":
            markerNode = "★";
            break;
          case "square":
            markerNode = "■";
            break;
          case "decimal":
            markerNode = `${n}.`;
            break;
          case "circled":
            markerNode = circledNumber(n);
            break;
          default:
            markerNode = "•";
        }

        return (
          <li key={itemKey} className={styles.row}>
            <span className={styles.marker} aria-hidden>
              {markerNode}
            </span>
            <span className={styles.content}>{item}</span>
          </li>
        );
      })}
    </ul>
  );
};

const TextList = Object.assign(TextListImpl, {
  Item: TextListItemElement,
});

TextListImpl.displayName = "TextList";
TextListItemElement.displayName = "TextList.Item";

export { TextList };
