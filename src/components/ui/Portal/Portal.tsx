import * as React from "react";
import { createPortal } from "react-dom";

type PortalContainer = string | Element | DocumentFragment | null;

interface PortalProps {
  /** 렌더링할 자식 요소 */
  children: React.ReactNode;
  /**
   * 포탈을 마운트할 DOM 컨테이너.
   * - 문자열: CSS 셀렉터 (`"#id"` 또는 `".className"`)
   * - Element / DocumentFragment: DOM 노드 직접 전달
   * - 미전달 시 기본값: `document.body`
   */
  container?: PortalContainer;
  /** 포탈 렌더링 여부 (false이면 렌더링하지 않음) */
  enabled?: boolean;
}

function resolveContainer(
  container: PortalContainer | undefined,
): Element | DocumentFragment {
  if (!container) return document.body;
  if (typeof container === "string") {
    const el = document.querySelector(container);
    if (!el) {
      console.warn(`[Portal] 셀렉터 "${container}"에 해당하는 요소를 찾을 수 없습니다. document.body를 사용합니다.`);
      return document.body;
    }
    return el;
  }
  return container;
}

/**
 * React Portal을 추상화한 컴포넌트.
 * children을 현재 DOM 트리 외부(기본: document.body)에 렌더링한다.
 *
 * @example
 * // 기본 사용 (document.body에 마운트)
 * <Portal>
 *   <div>모달 오버레이</div>
 * </Portal>
 *
 * @example
 * // id 셀렉터로 마운트
 * <Portal container="#modal-root">
 *   <div>id로 컨테이너 지정</div>
 * </Portal>
 *
 * @example
 * // class 셀렉터로 마운트
 * <Portal container=".portal-layer">
 *   <div>class로 컨테이너 지정</div>
 * </Portal>
 *
 * @example
 * // 조건부 렌더링
 * <Portal enabled={isOpen}>
 *   <div>열렸을 때만 렌더링</div>
 * </Portal>
 */
function Portal({ children, container, enabled = true }: PortalProps) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!enabled || !mounted) return null;

  return createPortal(children, resolveContainer(container));
}

/**
 * 특정 id를 가진 DOM 요소를 자동으로 생성·제거하며 포탈 컨테이너로 사용하는 훅.
 *
 * @example
 * const container = usePortalContainer("tooltip-root");
 * return <Portal container={container}><Tooltip /></Portal>;
 */
function usePortalContainer(id: string): HTMLElement | null {
  const [container, setContainer] = React.useState<HTMLElement | null>(null);

  React.useEffect(() => {
    let el = document.getElementById(id);
    let created = false;

    if (!el) {
      el = document.createElement("div");
      el.id = id;
      document.body.appendChild(el);
      created = true;
    }

    setContainer(el);

    return () => {
      if (created && el?.parentNode) {
        el.parentNode.removeChild(el);
      }
    };
  }, [id]);

  return container;
}

export { Portal, usePortalContainer };
export type { PortalProps, PortalContainer };
