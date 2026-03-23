import { Icon } from "@/components/ui/Icon/Icon";
import { MoreHorizontalIcon } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/Button/Button";
import { cn } from "@/lib/utils";
import styles from "./Pagination.module.css";

// ── Primitives ────────────────────────────────────────────────

/** nav 래퍼 단독 사용 시 (직접 조합 패턴) */
function PaginationNav({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn(styles.pagination, className)}
      {...props}
    />
  );
}

function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn(styles.content, className)}
      {...props}
    />
  );
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />;
}

type PaginationLinkProps = {
  isActive?: boolean;
  size?: React.ComponentProps<typeof Button>["size"];
} & React.ComponentProps<"a">;

function PaginationLink({
  className,
  isActive,
  size = "sm",
  ...props
}: PaginationLinkProps) {
  return (
    <Button
      asChild
      variant="ghost"
      size={size}
      data-slot="pagination-link"
      data-active={isActive}
      className={className}
    >
      <a aria-current={isActive ? "page" : undefined} {...props} />
    </Button>
  );
}

function PaginationJumpPrev({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go back 10 pages"
      size="icon"
      className={cn(styles.jump, className)}
      {...props}
    >
      <Icon name="datepicker-left-double" />
    </PaginationLink>
  );
}

function PaginationJumpNext({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go forward 10 pages"
      size="icon"
      className={cn(styles.jump, className)}
      {...props}
    >
      <Icon name="datepicker-right-double" />
    </PaginationLink>
  );
}

function PaginationPrevious({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="icon"
      className={cn(styles.prev, className)}
      {...props}
    >
      <Icon name="datepicker-left" />
    </PaginationLink>
  );
}

function PaginationNext({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="icon"
      className={cn(styles.next, className)}
      {...props}
    >
      <Icon name="datepicker-right" />
    </PaginationLink>
  );
}

function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn(styles.ellipsis, className)}
      {...props}
    >
      <MoreHorizontalIcon size={16} />
      <span className="sr-only">More pages</span>
    </span>
  );
}

// ── Smart component: Pagination ───────────────────────────────

type PaginationProps = {
  /** 전체 페이지 수 */
  total: number;
  /** 현재 활성 페이지 (1-based) */
  current: number;
  /**
   * 표시할 최대 페이지 번호 버튼 수 (기본값 5).
   * ellipsis=false 일 때는 << / >> 점프 거리로만 사용됩니다.
   */
  max?: number;
  /**
   * ellipsis(…) 표시 여부 (기본값 false).
   * true 로 설정하면 max 기준으로 페이지를 그룹화하고 줄임표를 표시합니다.
   */
  ellipsis?: boolean;
  /** 페이지 변경 콜백 */
  onPageChange?: (page: number) => void;
  /** 각 페이지 번호에 대한 href 생성 함수 */
  getHref?: (page: number) => string;
  className?: string;
};

/** ellipsis=false: current 기준 max 개수만큼 페이지를 중앙 정렬해서 반환 */
function buildPageRangeFlat(
  current: number,
  total: number,
  max: number
): number[] {
  if (total <= max) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  const half = Math.floor(max / 2);
  const start = Math.max(1, Math.min(current - half, total - max + 1));
  return Array.from({ length: max }, (_, i) => start + i);
}

/** ellipsis=true: current 기준 max 개수 + 줄임표로 page range를 반환 */
function buildPageRangeWithEllipsis(
  current: number,
  total: number,
  max: number
): (number | "ellipsis")[] {
  if (total <= max) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  // 첫 페이지·마지막 페이지를 제외한 중간 슬롯 수
  const inner = max - 2;
  const lo = Math.max(
    2,
    Math.min(current - Math.floor(inner / 2), total - inner)
  );
  const hi = lo + inner - 1;

  const items: (number | "ellipsis")[] = [1];

  if (lo === 3) items.push(2); // 단 1개만 숨겨질 때 ellipsis 대신 숫자 표시
  else if (lo > 3) items.push("ellipsis");

  for (let p = lo; p <= hi; p++) items.push(p);

  if (hi === total - 2) items.push(total - 1); // 단 1개만 숨겨질 때
  else if (hi < total - 2) items.push("ellipsis");

  items.push(total);
  return items;
}

function Pagination({
  total,
  current,
  max = 10,
  ellipsis = false,
  onPageChange,
  getHref,
  className,
}: PaginationProps) {
  const range = ellipsis
    ? buildPageRangeWithEllipsis(current, total, max)
    : buildPageRangeFlat(current, total, max);

  // jump 거리 = max (ellipsis on / off 모두 동일하게 적용)
  const jump = max;

  const handleClick =
    (page: number) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (!getHref) e.preventDefault();
      onPageChange?.(page);
    };

  const jumpTo = (page: number) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!getHref) e.preventDefault();
    onPageChange?.(page);
  };

  return (
    <PaginationNav className={className}>
      <PaginationContent>
        <PaginationItem>
          <PaginationJumpPrev
            href={getHref ? getHref(Math.max(1, current - jump)) : "#"}
            aria-disabled={current <= 1}
            onClick={jumpTo(Math.max(1, current - jump))}
          />
        </PaginationItem>

        <PaginationItem>
          <PaginationPrevious
            href={getHref ? getHref(Math.max(1, current - 1)) : "#"}
            aria-disabled={current <= 1}
            onClick={(e) => {
              if (!getHref) e.preventDefault();
              if (current > 1) onPageChange?.(current - 1);
            }}
          />
        </PaginationItem>

        {range.map((page, i) =>
          page === "ellipsis" ? (
            <PaginationItem key={`ellipsis-${i}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={page}>
              <PaginationLink
                href={getHref ? getHref(page) : "#"}
                isActive={page === current}
                onClick={handleClick(page)}
                className={styles.number}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          )
        )}

        <PaginationItem>
          <PaginationNext
            href={getHref ? getHref(Math.min(total, current + 1)) : "#"}
            aria-disabled={current >= total}
            onClick={(e) => {
              if (!getHref) e.preventDefault();
              if (current < total) onPageChange?.(current + 1);
            }}
          />
        </PaginationItem>

        <PaginationItem>
          <PaginationJumpNext
            href={getHref ? getHref(Math.min(total, current + jump)) : "#"}
            aria-disabled={current >= total}
            onClick={jumpTo(Math.min(total, current + jump))}
          />
        </PaginationItem>
      </PaginationContent>
    </PaginationNav>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationJumpNext,
  PaginationJumpPrev,
  PaginationLink,
  PaginationNav,
  PaginationNext,
  PaginationPrevious,
};
